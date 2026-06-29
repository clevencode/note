# Dashboard Institutionnel

## O que era Vercel KV?

**Vercel KV** é um banco de dados Redis pago/configurável no Vercel. Era necessário criar storage, conectar ao projeto e fazer redeploy — por isso o app pedia configuração.

**Substituímos por Supabase** (gratuito, mais simples).

## WiFi não funciona para rastrear alunos

Sites no navegador **não conseguem ver** a rede WiFi conectada (regra de segurança dos browsers). Cada celular/computador guarda dados separadamente.

A solução correta é uma **nuvem compartilhada** (Supabase): o quiz envia o resultado e o dashboard lê de qualquer lugar.

## Configuração em 5 minutos (gratuito)

### 1. Criar conta
[supabase.com](https://supabase.com) → **New Project** (gratuito)

### 2. Criar tabela
**SQL Editor** → colar o conteúdo de `supabase-setup.sql` → **Run**

### 3. Copiar credenciais
**Settings** → **API**:
- Project URL
- `anon` `public` key

### 4. Configurar os dois projetos
Editar `js/cloud-config.js` em **ambos** os repositórios:

```javascript
const CLOUD_CONFIG = {
  enabled: true,
  supabaseUrl: 'https://SEU_PROJETO.supabase.co',
  supabaseKey: 'SUA_ANON_KEY'
};
```

### 5. Deploy
```bash
git push   # nos dois repos (Question e note)
```

## Fluxo

```
Quiz (question-ecru-iota.vercel.app)
  → envia resultado ao Supabase
Dashboard (note-sigma-bice.vercel.app)
  → lê resultados do Supabase
```