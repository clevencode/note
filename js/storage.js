// storage.js — Busca resultados na nuvem (Supabase)

const HistoryStore = {
  fetchAll: fetchResultsFromCloud
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