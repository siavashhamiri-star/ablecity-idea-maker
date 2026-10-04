import { SiteManifest, Block, BlockType } from '../types/manifest';

export interface ValidationIssue {
  field: string;
  message: string;
  severity: 'error' | 'warning';
  blockId?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
}

export const ALLOWED_BLOCK_TYPES: BlockType[] = [
  'hero',
  'features',
  'services',
  'gallery',
  'testimonials',
  'pricing',
  'faq',
  'contact',
  'about',
  'cta',
  'footer',
];

/**
 * Validates a complete SiteManifest according to Forge Core Schema
 */
export function validateManifest(data: unknown): ValidationResult {
  const errors: ValidationIssue[] = [];
  const warnings: ValidationIssue[] = [];

  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      errors: [{ field: 'root', message: 'مانیفست باید یک شیء معتبر JSON باشد.', severity: 'error' }],
      warnings: [],
    };
  }

  const m = data as Partial<SiteManifest>;

  // 1. schemaVersion
  if (m.schemaVersion !== 1) {
    errors.push({
      field: 'schemaVersion',
      message: `نسخه اسکیما نامعتبر است (مقدار دریافتی: ${m.schemaVersion}، نسخه مجاز: 1)`,
      severity: 'error',
    });
  }

  // 2. type
  if (m.type !== 'website') {
    errors.push({
      field: 'type',
      message: `نوع پروژه در این فاز فقط می‌تواند 'website' باشد.`,
      severity: 'error',
    });
  }

  // 3. backend
  if (m.backend !== 'none') {
    errors.push({
      field: 'backend',
      message: `در MVP فعلی، مقدار backend باید 'none' باشد.`,
      severity: 'error',
    });
  }

  // 4. meta
  if (!m.meta || typeof m.meta !== 'object') {
    errors.push({ field: 'meta', message: 'اطلاعات متادیتا (meta) موجود نیست.', severity: 'error' });
  } else {
    if (!m.meta.title || !m.meta.title.trim()) {
      errors.push({ field: 'meta.title', message: 'عنوان سایت (title) نمی‌تواند خالی باشد.', severity: 'error' });
    }
  }

  // 5. theme
  if (!m.theme || typeof m.theme !== 'object') {
    warnings.push({ field: 'theme', message: 'تنظیمات تم موجود نیست؛ مقادیر پیش‌فرض اعمال می‌شود.', severity: 'warning' });
  }

  // 6. blocks
  if (!Array.isArray(m.blocks)) {
    errors.push({ field: 'blocks', message: 'لیست بلاک‌ها باید یک آرایه باشد.', severity: 'error' });
  } else if (m.blocks.length === 0) {
    warnings.push({ field: 'blocks', message: 'صفحه هنوز هیچ بلاکی ندارد.', severity: 'warning' });
  } else {
    // Validate individual blocks
    const blockIds = new Set<string>();
    let hasHero = false;

    m.blocks.forEach((block, idx) => {
      if (!block || typeof block !== 'object') {
        errors.push({
          field: `blocks[${idx}]`,
          message: `بلاک در ردیف ${idx + 1} ساختار نامعتبری دارد.`,
          severity: 'error',
        });
        return;
      }

      if (!block.id) {
        errors.push({
          field: `blocks[${idx}].id`,
          message: `شناسه بلاک ردیف ${idx + 1} خالی است.`,
          severity: 'error',
        });
      } else {
        if (blockIds.has(block.id)) {
          warnings.push({
            field: `blocks[${idx}].id`,
            message: `شناسه تکراری برای بلاک: ${block.id}`,
            severity: 'warning',
            blockId: block.id,
          });
        }
        blockIds.add(block.id);
      }

      if (!ALLOWED_BLOCK_TYPES.includes(block.type)) {
        errors.push({
          field: `blocks[${idx}].type`,
          message: `نوع بلاک ناشناخته: '${block.type}'`,
          severity: 'error',
          blockId: block.id,
        });
        return;
      }

      if (block.type === 'hero') {
        hasHero = true;
      }

      // Block specific checks
      const blockIssues = validateBlock(block);
      errors.push(...blockIssues.filter((i) => i.severity === 'error'));
      warnings.push(...blockIssues.filter((i) => i.severity === 'warning'));
    });

    if (!hasHero) {
      warnings.push({
        field: 'blocks',
        message: 'پیشنهاد می‌شود حداقل یک بلاک Hero در ابتدای صفحه قرار دهید.',
        severity: 'warning',
      });
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validates a single block
 */
export function validateBlock(block: Block): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const bId = block.id;

  switch (block.type) {
    case 'hero':
      if (!block.title?.trim()) {
        issues.push({ field: 'hero.title', message: 'عنوان اصلی بلاک Hero خالی است.', severity: 'error', blockId: bId });
      }
      break;

    case 'features':
      if (!block.title?.trim()) {
        issues.push({ field: 'features.title', message: 'عنوان بخش ویژگی‌ها خالی است.', severity: 'warning', blockId: bId });
      }
      if (!Array.isArray(block.items) || block.items.length === 0) {
        issues.push({ field: 'features.items', message: 'بخش ویژگی‌ها هیچ آیتمی ندارد.', severity: 'warning', blockId: bId });
      }
      break;

    case 'services':
      if (!Array.isArray(block.items) || block.items.length === 0) {
        issues.push({ field: 'services.items', message: 'بخش خدمات هیچ آیتمی ندارد.', severity: 'warning', blockId: bId });
      }
      break;

    case 'gallery':
      if (!Array.isArray(block.items) || block.items.length === 0) {
        issues.push({ field: 'gallery.items', message: 'گالری تصویری خالی است.', severity: 'warning', blockId: bId });
      }
      break;

    case 'testimonials':
      if (!Array.isArray(block.items) || block.items.length === 0) {
        issues.push({ field: 'testimonials.items', message: 'بخش نظرات مشتریان خالی است.', severity: 'warning', blockId: bId });
      }
      break;

    case 'pricing':
      if (!Array.isArray(block.items) || block.items.length === 0) {
        issues.push({ field: 'pricing.items', message: 'بخش قیمت‌گذاری حداقل باید یک پلن داشته باشد.', severity: 'warning', blockId: bId });
      }
      break;

    case 'faq':
      if (!Array.isArray(block.items) || block.items.length === 0) {
        issues.push({ field: 'faq.items', message: 'بخش سوالات متداول خالی است.', severity: 'warning', blockId: bId });
      }
      break;

    case 'contact':
      if (!block.email && !block.phone && !block.address && !block.showForm) {
        issues.push({
          field: 'contact',
          message: 'بخش تماس باید حداقل یک راه ارتباطی یا فرم تماس فعال داشته باشد.',
          severity: 'warning',
          blockId: bId,
        });
      }
      break;

    case 'about':
      if (!block.content?.trim()) {
        issues.push({ field: 'about.content', message: 'متن درباره ما خالی است.', severity: 'warning', blockId: bId });
      }
      break;

    case 'cta':
      if (!block.buttonText?.trim()) {
        issues.push({ field: 'cta.buttonText', message: 'متن دکمه اقدام به عمل (CTA) خالی است.', severity: 'warning', blockId: bId });
      }
      break;

    case 'footer':
      if (!block.brandName?.trim()) {
        issues.push({ field: 'footer.brandName', message: 'نام برند در فوتر خالی است.', severity: 'warning', blockId: bId });
      }
      break;
  }

  return issues;
}
