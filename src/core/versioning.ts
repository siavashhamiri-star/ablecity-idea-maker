import { SiteManifest } from '../types/manifest';

export interface VersionSnapshot {
  id: string;
  timestamp: string;
  label: string;
  blockCount: number;
  manifest: SiteManifest;
}

const STORAGE_KEY = 'tavana_forge_history_v1';
const MAX_VERSIONS = 10;

export function getVersionHistory(projectId: string): VersionSnapshot[] {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY}_${projectId}`);
    if (!raw) return [];
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch (e) {
    console.error('Failed to read version history', e);
    return [];
  }
}

export function saveVersionSnapshot(manifest: SiteManifest, label?: string): VersionSnapshot[] {
  try {
    const history = getVersionHistory(manifest.projectId);
    const newSnapshot: VersionSnapshot = {
      id: `ver-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      label: label || `تغییر در ${new Date().toLocaleDateString('fa-IR')}`,
      blockCount: manifest.blocks.length,
      manifest: JSON.parse(JSON.stringify(manifest)),
    };

    const updated = [newSnapshot, ...history].slice(0, MAX_VERSIONS);
    localStorage.setItem(`${STORAGE_KEY}_${manifest.projectId}`, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save version snapshot', e);
    return [];
  }
}

export function clearVersionHistory(projectId: string): void {
  try {
    localStorage.removeItem(`${STORAGE_KEY}_${projectId}`);
  } catch (e) {
    console.error('Failed to clear version history', e);
  }
}
