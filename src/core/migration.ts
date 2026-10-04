import { SiteManifest, SiteTheme } from '../types/manifest';

export const CURRENT_SCHEMA_VERSION = 1;

export const DEFAULT_THEME: SiteTheme = {
  primaryColor: '#f59e0b',
  accentColor: '#38bdf8',
  backgroundColor: '#090d16',
  textColor: '#f8fafc',
  cardBackground: '#111726',
  fontFamily: 'Vazirmatn',
  borderRadius: 'md',
  darkMode: true,
};

/**
 * Migrates any raw or older manifest object to the current SchemaVersion 1.
 */
export function migrateManifest(raw: Record<string, unknown>): SiteManifest {
  const version = typeof raw.schemaVersion === 'number' ? raw.schemaVersion : 1;

  let migrated = { ...raw };

  // If in future version > 1 is introduced, chain migrations here:
  // if (version < 2) { migrated = migrateV1ToV2(migrated); }

  const now = new Date().toISOString();

  const manifest: SiteManifest = {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    projectId: (typeof migrated.projectId === 'string' && migrated.projectId) ? migrated.projectId : `project-${Date.now()}`,
    type: 'website',
    meta: {
      title: (migrated.meta as any)?.title || 'وب‌سایت جدید من',
      description: (migrated.meta as any)?.description || 'صفحه لندینگ سریع و مدرن ساخته‌شده با کوره توانا',
      language: (migrated.meta as any)?.language || 'fa',
      rtl: (migrated.meta as any)?.rtl !== false,
      favicon: (migrated.meta as any)?.favicon || '',
      author: (migrated.meta as any)?.author || 'Tavana Product Forge',
    },
    theme: {
      ...DEFAULT_THEME,
      ...(typeof migrated.theme === 'object' && migrated.theme ? migrated.theme : {}),
    },
    backend: 'none',
    blocks: Array.isArray(migrated.blocks) ? migrated.blocks : [],
    settings: {
      smoothScroll: (migrated.settings as any)?.smoothScroll ?? true,
      backToTop: (migrated.settings as any)?.backToTop ?? true,
      customCss: (migrated.settings as any)?.customCss || '',
    },
    createdAt: (typeof migrated.createdAt === 'string' && migrated.createdAt) ? migrated.createdAt : now,
    updatedAt: now,
  };

  return manifest;
}
