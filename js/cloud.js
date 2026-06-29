// cloud.js — Leitura dos resultados via Supabase

function isCloudReady() {
  return CLOUD_CONFIG.enabled
    && CLOUD_CONFIG.supabaseUrl.startsWith('https://')
    && CLOUD_CONFIG.supabaseKey.length > 20;
}

function cloudHeaders() {
  return {
    apikey: CLOUD_CONFIG.supabaseKey,
    Authorization: `Bearer ${CLOUD_CONFIG.supabaseKey}`
  };
}

function fromCloudRow(row) {
  return {
    id: row.id,
    name: row.name,
    percent: row.percent,
    correct: row.correct,
    total: row.total,
    wrong: row.wrong,
    grade: row.grade,
    answers: row.answers,
    date: row.created_at
  };
}

async function fetchResultsFromCloud() {
  if (!isCloudReady()) {
    throw new Error('Supabase não configurado. Edite js/cloud-config.js com URL e chave anon.');
  }

  const url = `${CLOUD_CONFIG.supabaseUrl}/rest/v1/quiz_results?order=created_at.desc&limit=500`;
  const res = await fetch(url, { headers: cloudHeaders(), cache: 'no-store' });

  if (!res.ok) {
    throw new Error(`Erreur Supabase ${res.status}. Vérifiez la table quiz_results.`);
  }

  const rows = await res.json();
  return Array.isArray(rows) ? rows.map(fromCloudRow) : [];
}