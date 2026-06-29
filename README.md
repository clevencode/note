# Dashboard Institutionnel

Painel em **https://note-sigma-bice.vercel.app** que recebe os resultados do quiz em **https://question-ecru-iota.vercel.app**.

## Sincronização

1. Aluno termina o quiz → resultado enviado via `POST /api/results`
2. Dashboard busca dados via `GET /api/results`
3. Atualização automática a cada 30 segundos

## Configuração no Vercel (obrigatório)

1. Abra o projeto **note** no [Vercel Dashboard](https://vercel.com)
2. **Storage** → Create Database → **KV**
3. Conecte o KV ao projeto **note**
4. Redeploy o projeto

Sem o Vercel KV, a API retorna erro 503 e o dashboard não exibe dados.

## Deploy

```bash
cd dashboard-institucional
git push origin main
```

Vercel instala `@vercel/kv` automaticamente via `package.json`.

## Desenvolvimento local

```bash
npm install
npx vercel dev
```

O quiz em produção envia para `https://note-sigma-bice.vercel.app/api/results`.