// storage.js — Sincronização com API central (note-sigma-bice.vercel.app)

const SYNC_API = 'https://note-sigma-bice.vercel.app/api/results';

const HistoryStore = {
  async fetchAll() {
    const res = await fetch(SYNC_API, { cache: 'no-store' });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Erreur ${res.status}`);
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  }
};

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}