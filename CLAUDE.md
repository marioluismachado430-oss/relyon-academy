# RelyOn Academy — contexto do projeto

SPA estática vanilla JS (sem framework), hash-router, tudo renderizado via `render()` e funções de template por concatenação de string.

## Arquivos
- `app.js` — ~11MB (dominado por `DEFAULT_EDITS`, um JSON gigante embutido). Lógica da aplicação toda aqui.
- `flipbook.js` — módulo `window.FPL`, paginação real por medição de DOM (`paginar`/`montar`/`acompanhar`). Carregado ANTES de `app.js` no `index.html`. Também embutido via `.toString()` dentro do HTML baixável (`downloadFlipbookHtml`).
- `style.css` — estilos, inclui `.fp-*` (flipbook), `.read-*` (janela de leitura), `.img-lightbox*` (lupa), `.attach-*` (menu de anexar).
- `index.html` — carrega page-flip.browser.js (CDN), pdf.js (CDN), flipbook.js, app.js.

## Sistema de conteúdo
- `EDITS` / `DEFAULT_EDITS` / `ed(path, fallback)` / `setEditPath(path, value)` — overrides de conteúdo publicado.
- "Tornar permanente" um upload de edições = substituir **por inteiro** o bloco `var DEFAULT_EDITS = {...};` em `app.js` via script Node: localizar `"var DEFAULT_EDITS = "` / `"\nfunction mergeDeep"`, `JSON.parse` o upload, `JSON.stringify` de volta, validar com `node --check app.js`. Não é merge.

## Flipbook — arquitetura
- `buildFlipbookPages(titulo, subtitulo, content, trecho, equip, manuais, images, extras)` — monta array de páginas HTML (capa, texto, trecho normativo, equipamentos, manuais, vídeos, links, slides).
  - Slides (`extras.slides`) com páginas renderizáveis (`slideFlipbookPages`) viram páginas reais no flipbook; só entram na lista "Slides" os itens sem páginas (puro link).
- `openFlipbook(titulo, pagesHtml)` / `closeFlipbook()` — chama `FPL.montar()`, guarda `window.__fp` (instância PageFlip) e `window.__fp_stop` (cleanup do `acompanhar`).
- `openReadWindow(titulo, bodyHtml, standalone)` — janela de leitura scrollável com lupa em imagens (`openImgLightbox`).
  - `openReadMode()` — extrai página(s) visível(is) do flipbook aberto e abre em janela de leitura (botão "Modo leitura").
  - `openSlideFlipbook(path, idx)` — itens de Slides anexados à aula abrem **direto** na janela de leitura (não como flipbook paginado).
- `slideFlipbookPages(item)` vs `slideReadHtml(item)` — primeira gera `.fp-page.fp-page-full-img` (para flipbook/download), segunda gera `<img>` soltos (para janela de leitura).
- `openAttachMenu(path)` — menu visual (grid de ícones) para anexar à aula; substituiu os antigos prompts numerados (`addAttachment`/`addLessonMedia`, removidos).

## Deploy
- Vercel, projeto `relyon-academy` (`prj_LDEHpAfOBe3pUKOGd43alsjbzQpn`), git-connected ao branch `main`, deploy automático a cada push.
- Checar deploy: `mcp__Vercel__list_deployments` (limit 1), comparar `meta.githubCommitSha` com `git log` HEAD local.
- **Não dá pra testar o site ao vivo via Bash/Playwright** — proxy de rede do agente bloqueia `relyon-academy.vercel.app` (`connect_rejected`, host não liberado). `WebFetch` também não é confiável pra esse `app.js` gigante (a sumarização trunca antes de achar funções específicas). **Debug é via leitura estática do código local** — como o site é estático sem build, o commit local = site publicado (confirmar por `githubCommitSha` se necessário).
- Após push, agendar checagem de deploy com `send_later` (~3 min).

## Regras de commit (sempre válidas)
- Só commitar quando o usuário pedir. Nunca force-push, nunca pular hooks/assinatura, sempre commit novo (nunca `--amend`). `git add <arquivos específicos>`, nunca `-A`. Revisar diff staged antes de push (segredos).
- Trailer obrigatório no fim da mensagem de commit:
```
Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_0115BgSkwqrWYwL2gfiUKRMQ
```
- Rodar `node --check app.js` (e `flipbook.js` se tocado) antes de todo commit/deploy.

## Preferências do usuário (sempre aplicar)
- Responder sempre em português.
- Termos/siglas técnicas em inglês, com tradução entre parênteses.
- Sem explicações não solicitadas. Máxima economia de tokens.
