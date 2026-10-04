import JSZip from 'jszip';
import { SiteManifest } from '../types/manifest';
import { renderStaticSite } from './renderer';

export async function generateAndroidGradleProject(manifest: SiteManifest): Promise<Blob> {
  const zip = new JSZip();
  const render = renderStaticSite(manifest);

  const cleanPackageName = 'ir.tavana.forge.app';
  const appName = manifest.meta.title || 'Tavana App';

  // 1. Root settings.gradle.kts
  const settingsGradle = `
pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "TavanaProductForge"
include(":app")
`.trim();

  // 2. Root build.gradle.kts (Direct explicit plugin versions without missing version catalog)
  const rootBuildGradle = `
plugins {
    id("com.android.application") version "8.7.0" apply false
    id("org.jetbrains.kotlin.android") version "2.0.21" apply false
}
`.trim();

  // 3. gradle.properties
  const gradleProperties = `
org.gradle.jvmargs=-Xmx2048m -Dfile.encoding=UTF-8
android.useAndroidX=true
android.enableJetifier=true
android.nonTransitiveRClass=true
`.trim();

  // 4. app/build.gradle.kts (Secure environment variables for signing, no hard-coded passwords)
  const appBuildGradle = `
plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "${cleanPackageName}"
    compileSdk = 35

    defaultConfig {
        applicationId = "${cleanPackageName}"
        minSdk = 24
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    signingConfigs {
        create("release") {
            // Secure environment variable signing: No hardcoded secrets!
            val keystorePath = System.getenv("KEYSTORE_FILE") ?: "release-key.jks"
            val keystoreFile = rootProject.file(keystorePath)
            val storePass = System.getenv("KEYSTORE_PASSWORD")
            val kAlias = System.getenv("KEY_ALIAS")
            val kPass = System.getenv("KEY_PASSWORD")

            if (keystoreFile.exists() && !storePass.isNullOrBlank() && !kAlias.isNullOrBlank() && !kPass.isNullOrBlank()) {
                storeFile = keystoreFile
                storePassword = storePass
                keyAlias = kAlias
                keyPassword = kPass
            }
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            val releaseSigning = signingConfigs.getByName("release")
            if (releaseSigning.storeFile != null) {
                signingConfig = releaseSigning
            }
        }
        debug {
            isMinifyEnabled = false
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }

    buildFeatures {
        viewBinding = true
    }
}

dependencies {
    implementation("androidx.core:core-ktx:1.15.0")
    implementation("androidx.appcompat:appcompat:1.7.0")
    implementation("com.google.android.material:material:1.12.0")
    implementation("androidx.webkit:webkit:1.12.1")
    implementation("androidx.constraintlayout:constraintlayout:2.2.0")
}
`.trim();

  // 5. app/proguard-rules.pro
  const proguardRules = `
# Tavana Forge Proguard Rules
-keepattributes *Annotation*
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
-dontwarn android.webkit.**
`.trim();

  // 6. AndroidManifest.xml
  const androidManifest = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="${appName}"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.AppCompat.NoActionBar"
        android:hardwareAccelerated="true">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:configChanges="orientation|screenSize|keyboardHidden">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>`.trim();

  // 7. MainActivity.kt (Robust offline webview with RTL support, hardware acceleration and back navigation)
  const mainActivity = `package ${cleanPackageName}

import android.annotation.SuppressLint
import android.graphics.Bitmap
import android.os.Bundle
import android.view.View
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.OnBackPressedCallback
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        webView = WebView(this).apply {
            layoutParams = android.view.ViewGroup.LayoutParams(
                android.view.ViewGroup.LayoutParams.MATCH_PARENT,
                android.view.ViewGroup.LayoutParams.MATCH_PARENT
            )
        }
        setContentView(webView)

        with(webView.settings) {
            javaScriptEnabled = true
            domStorageEnabled = true
            databaseEnabled = true
            useWideViewPort = true
            loadWithOverviewMode = true
            cacheMode = WebSettings.LOAD_DEFAULT
            allowFileAccess = true
            allowContentAccess = true
        }

        webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
                return false
            }
        }

        webView.webChromeClient = WebChromeClient()

        // Load offline bundled website assets
        webView.loadUrl("file:///android_asset/index.html")

        // Smooth back navigation in WebView
        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (webView.canGoBack()) {
                    webView.goBack()
                } else {
                    isEnabled = false
                    onBackPressedDispatcher.onBackPressed()
                }
            }
        })
    }
}
`.trim();

  // 8. Automated build & signing script: build-release-apk-aab.sh (Secure environment variables only, no hardcoded secrets)
  const automatedBuildScript = `#!/usr/bin/env bash
set -e

echo "=========================================================="
echo " TAVANA PRODUCT FORGE — Android Project Build Script"
echo "=========================================================="

KEYSTORE_FILE="\${KEYSTORE_FILE:-release-key.jks}"

# Security Check: Ensure signing credentials come from environment variables
if [ -z "$KEYSTORE_PASSWORD" ] || [ -z "$KEY_ALIAS" ] || [ -z "$KEY_PASSWORD" ]; then
    echo "----------------------------------------------------------"
    echo " [SECURITY NOTICE] Release signing requires environment variables:"
    echo " - export KEYSTORE_PASSWORD=your_secure_password"
    echo " - export KEY_ALIAS=your_key_alias"
    echo " - export KEY_PASSWORD=your_key_password"
    echo "----------------------------------------------------------"
    echo "Building assembleDebug since release secrets are not set..."
    gradle assembleDebug || ./gradlew assembleDebug
    echo "✓ Debug APK built: app/build/outputs/apk/debug/app-debug.apk"
    exit 0
fi

# If credentials exist, ensure Keystore exists
if [ ! -f "$KEYSTORE_FILE" ]; then
    echo "[1/3] Generating release keystore from environment variables..."
    keytool -genkey -v -keystore "$KEYSTORE_FILE" \\
        -alias "$KEY_ALIAS" \\
        -keyalg RSA \\
        -keysize 2048 \\
        -validity 10000 \\
        -storepass "$KEYSTORE_PASSWORD" \\
        -keypass "$KEY_PASSWORD" \\
        -dname "CN=Tavana, OU=Forge, O=TavanaForge, L=Tehran, ST=Tehran, C=IR"
    echo "✓ Release Keystore generated safely: $KEYSTORE_FILE"
fi

# Build Release APK
echo "[2/3] Building Signed Release APK..."
gradle assembleRelease || ./gradlew assembleRelease

# Build Release AAB (Google Play / Cafe Bazaar App Bundle)
echo "[3/3] Building Signed Release Android App Bundle (AAB)..."
gradle bundleRelease || ./gradlew bundleRelease

echo "=========================================================="
echo " BUILD COMPLETE!"
echo " Signed APK: app/build/outputs/apk/release/app-release.apk"
echo " Signed AAB: app/build/outputs/bundle/release/app-release.aab"
echo "=========================================================="
`.trim();

  // 9. Assets (bundled static website inside APK for 100% offline execution)
  const indexHtml = `<!doctype html>
<html lang="${manifest.meta.language || 'fa'}" dir="${manifest.meta.rtl ? 'rtl' : 'ltr'}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>${manifest.meta.title}</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
${render.html}
    <script src="script.js"></script>
  </body>
</html>`;

  const readmeAndroid = `# Android Source Project — TAVANA PRODUCT FORGE

این بسته شامل سورس پروژه استاندارد **Android Studio (Kotlin + Gradle)** است.

## نکات بسیار مهم و شفافیت فنی:
1. **عدم کامپایل در مرورگر:** فایل نصبی APK یا بسته AAB مستقیماً داخل مرورگر وب کامپایل نمی‌شود. کامپایل نهایی نیازمند نصب JDK 17 و Android SDK 35 یا راه‌اندازی پایپ‌لاین CI (نظیر GitHub Actions) است.
2. **راه‌اندازی پروژه در Android Studio:**
   - کافیست این پوشه را در نرم‌افزار **Android Studio** باز کنید (Open Project).
   - اندروید استودیو به صورت خودکار Gradle Wrapper منطبق را دانلود و پروژه را Sync خواهد کرد.
3. **امنیت امضای ریلیز (Release Signing):**
   - هیچ پسورد یا کلید حساسی به صورت هاردکد در سورس ذخیره نشده است.
   - جهت ساخت نسخه رسمی و امضاشده (Signed APK / AAB)، متغیرهای محیطی زیر را در سیستم خود تنظیم کنید:
     \`\`\`bash
     export KEYSTORE_PASSWORD="پسورد_امن_شما"
     export KEY_ALIAS="نام_کلید_شما"
     export KEY_PASSWORD="پسورد_کلید_شما"
     \`\`\`
   - هرگز فایل Keystore یا پسوردها را داخل مخزن عمومی گیت کامیت نکنید.
4. **تصاویر خارجی (External Images):**
   - اگر وب‌سایت شما از تصاویر اینترنتی (نظیر Unsplash) استفاده می‌کند، این تصاویر برای نمایش نیازمند اتصال اینترنت دستگاه کاربر هستند. برای اجرای ۱۰۰٪ آفلاین، تصاویر را دانلود کرده و در مسیر \`app/src/main/assets/\` قرار داده و آدرس را به صورت محلی ست نمایید.
`;

  // Write all files into the zip structure
  zip.file('settings.gradle.kts', settingsGradle);
  zip.file('build.gradle.kts', rootBuildGradle);
  zip.file('gradle.properties', gradleProperties);
  zip.file('app/build.gradle.kts', appBuildGradle);
  zip.file('app/proguard-rules.pro', proguardRules);
  zip.file('app/src/main/AndroidManifest.xml', androidManifest);
  zip.file('app/src/main/java/ir/tavana/forge/MainActivity.kt', mainActivity);
  zip.file('app/src/main/assets/index.html', indexHtml);
  zip.file('app/src/main/assets/style.css', render.css);
  zip.file('app/src/main/assets/script.js', render.js);
  zip.file('build-release-apk-aab.sh', automatedBuildScript);
  zip.file('README-ANDROID.md', readmeAndroid);

  return await zip.generateAsync({ type: 'blob' });
}
