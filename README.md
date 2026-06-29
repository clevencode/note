# Dashboard Institutionnel

Painel separado do quiz do aluno. Exibe nomes e desempenho dos resultados registrados.

## Projeto independente

Este dashboard **não faz parte** do projeto `quiz-technologie-ia` e não deve ser exibido aos alunos.

## Conexão de dados

Compartilha a chave `techIaQuizHistory` no `localStorage` com o quiz. Para funcionar, ambos devem rodar no **mesmo domínio**:

```bash
cd C:\Users\Clevy
npx serve .
```

- Quiz (aluno): `http://localhost:3000/quiz-technologie-ia/`
- Dashboard (instituição): `http://localhost:3000/dashboard-institucional/`

## Conteúdo

- Total de élèves, tentativas e média
- Card por aluno: último score, melhor score, tentativas
- Tabela com histórico completo