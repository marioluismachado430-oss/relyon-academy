/* RelyOn Academy · diagramação do flipbook (livro virtual)
   - normaliza o conteúdo (espaços vazios, imagens com largura fixa, marcações de markdown coladas no texto)
   - pagina MEDINDO o texto no tamanho real da página: nada ultrapassa a área da página
   - recalcula ao mudar o tamanho da tela (computador, tablet, celular, giro do aparelho)
   O mesmo módulo vai embutido no arquivo HTML baixado, para o livro também se ajustar fora do site. */
function __fplModule(){
  var CSS =
    '.fp-measure{position:fixed;left:-20000px;top:0;visibility:hidden;pointer-events:none;z-index:-1}' +
    '.fp-page{overflow:hidden!important}' +
    '.fp-page .fp-text{width:100%;min-width:0}' +
    '.fp-page .fp-text *{max-width:100%;box-sizing:border-box}' +
    '.fp-page .fp-text img{display:block;width:auto!important;height:auto!important;max-width:100%!important;max-height:calc(var(--fp-h,600px)*.46)!important;object-fit:contain;margin:10px auto!important}' +
    '.fp-page .fp-text figure{margin:10px 0}' +
    '.fp-page .fp-text table{width:100%!important;table-layout:fixed;border-collapse:collapse;font-size:.86em;line-height:1.45;margin:10px 0}' +
    '.fp-page .fp-text th,.fp-page .fp-text td{border:1px solid #d8cdae;padding:4px 6px;vertical-align:top;overflow-wrap:anywhere;text-align:left}' +
    '.fp-page .fp-text th{background:#efe6cf}' +
    '.fp-page .fp-text pre,.fp-page .fp-text code{white-space:pre-wrap;overflow-wrap:anywhere}' +
    '.fp-page .fp-text h2,.fp-page .fp-text h3,.fp-page .fp-text h4{font-family:Georgia,serif;color:#a3620f;line-height:1.3;margin:14px 0 6px;text-align:left}' +
    '.fp-page .fp-text h2{font-size:1.2em;text-transform:none;letter-spacing:0}.fp-page .fp-text h3{font-size:1.08em}.fp-page .fp-text h4{font-size:1em}' +
    '.fp-page .fp-text p{margin:0 0 .7em}' +
    '.fp-page .fp-text a{color:#7a4a0c;overflow-wrap:anywhere}' +
    '.fp-page .fp-text > :first-child{margin-top:0!important}' +
    '.fp-page .fp-img-wrap img{max-height:calc(var(--fp-h,600px)*.34)!important}' +
    '.fp-page .fp-cont{font-size:11px;color:#8a7a5c;text-transform:uppercase;letter-spacing:.05em;margin:0 0 8px}' +
    '@media (max-height:500px){.fp-page{padding:16px 14px 18px!important}.fp-page .fp-text{font-size:11.5px!important;line-height:1.55!important}.fp-page h1{font-size:15px!important}.fp-page h3{font-size:12px!important}.fp-page .fp-img-wrap{margin:-16px -14px 8px!important}}' +
        '.fp-cover > h2:first-child{margin-top:calc(var(--fp-h,600px)*.36)}.fp-cover > p.muted:only-child{margin-top:calc(var(--fp-h,600px)*.45)}' +
        '.fp-page .fp-num{position:absolute;bottom:8px;left:0;right:0;text-align:center;font-size:10px;color:#a89878;font-family:Georgia,serif;pointer-events:none}';

  function injetarCss(doc){
    doc = doc || document;
    if (doc.getElementById('fpl-css')) return;
    var st = doc.createElement('style'); st.id = 'fpl-css'; st.textContent = CSS; doc.head.appendChild(st);
  }

  // ---------- tamanho da página conforme a tela ----------
  function tamanho(reservaAlto){
    var vw = window.innerWidth || 800, vh = window.innerHeight || 600;
    var mob = vw < 560;
    var baixo = vh < 500; // celular deitado
    var availW = Math.max(200, vw - (mob ? 20 : 48));
    var availH = Math.max(250, vh - (reservaAlto == null ? (mob || baixo ? 56 : 84) : reservaAlto));
    var r = 0.70; // largura / altura (proporção de página A5)
    var h = Math.min(820, availH), w = Math.round(h * r);
    var duas = !mob && (w * 2 + 8) <= availW;      // cabe livro aberto (duas páginas)?
    var limiteW = duas ? Math.floor((availW - 8) / 2) : availW;
    if (w > limiteW){ w = limiteW; h = Math.round(w / r); }
    if (h > availH){ h = availH; w = Math.round(h * r); }
    w = Math.max(180, Math.min(w, 600)); h = Math.max(250, Math.round(w / r));
    if (h > availH){ h = availH; }
    return { w: w, h: h, duas: duas && (w * 2 + 8) <= availW };
  }

  // ---------- limpeza do conteúdo ----------
  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  function mdInline(s){
    // s já é HTML; só converte padrões de markdown que vieram como texto
    s = s.replace(/\\([.\-*_#()[\]!+|>])/g, '$1');                        // "1\." -> "1."
    s = s.replace(/\[([^\]<>]{1,200})\]\((https?:\/\/[^\s)<>"]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    s = s.replace(/\*\*([^*<>]{1,300})\*\*/g, '<strong>$1</strong>');
    return s;
  }
  function tabelaMd(linhas){
    var cel = function(l){ return l.replace(/^\s*\|/, '').replace(/\|\s*$/, '').split('|').map(function(c){ return c.trim(); }); };
    var cab = cel(linhas[0]), corpo = linhas.slice(2).map(cel);
    return '<table><thead><tr>' + cab.map(function(c){ return '<th>' + mdInline(c) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      corpo.map(function(r){ return '<tr>' + cab.map(function(_, i){ return '<td>' + mdInline(r[i] || '') + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table>';
  }
  // converte linhas de markdown que ficaram no meio do HTML (títulos ##, tabelas |a|b|, links)
  function markdownNoHtml(html){
    var partes = html.split(/(<br\s*\/?>|<\/?(?:div|p)[^>]*>)/i);
    // junta em linhas de texto, preservando as tags de bloco
    var linhas = [], atual = '';
    partes.forEach(function(p){
      if (/^<br|^<\/?(div|p)\b/i.test(p)){ linhas.push({t: atual}); linhas.push({tag: p}); atual = ''; }
      else atual += p;
    });
    linhas.push({t: atual});
    var out = [], i = 0;
    var ehTab = function(x){ return x && x.t != null && /^\s*\|.*\|\s*$/.test(x.t); };
    var proxTexto = function(j){ while (j < linhas.length && linhas[j].tag != null) j++; return j; };
    while (i < linhas.length){
      var L = linhas[i];
      if (L.tag != null){ out.push(L.tag); i++; continue; }
      // tabela: linha |..|, linha de separação |---|, demais linhas
      var j2 = proxTexto(i + 1);
      if (ehTab(L) && j2 < linhas.length && /^\s*\|?\s*:?-{2,}/.test(linhas[j2].t || '')){
        var grupo = [L.t, linhas[j2].t], k = proxTexto(j2 + 1);
        while (k < linhas.length && ehTab(linhas[k])){ grupo.push(linhas[k].t); k = proxTexto(k + 1); }
        out.push(tabelaMd(grupo)); i = k; continue;
      }
      var m = L.t.match(/^\s*(#{1,6})\s+(.+)$/);
      if (m){ var n = Math.min(m[1].length + 1, 4); out.push('<h' + n + '>' + mdInline(m[2]) + '</h' + n + '>'); i++; continue; }
      if (/^\s*-{3,}\s*$/.test(L.t)){ out.push('<hr>'); i++; continue; }
      out.push(mdInline(L.t)); i++;
    }
    return out.join('');
  }
  function normalizar(html){
    if (!html) return '';
    var s = String(html);
    s = s.replace(/<img\b([^>]*?)\s(?:width|height)=("[^"]*"|'[^']*'|[^\s>]+)/gi, '<img$1').replace(/<img\b([^>]*?)\s(?:width|height)=("[^"]*"|'[^']*'|[^\s>]+)/gi, '<img$1');
    // estilos fixos de largura/altura/posição que empurram o conteúdo para fora da página
    s = s.replace(/style=("([^"]*)"|'([^']*)')/gi, function(m, q, a, b){
      var st = (a != null ? a : b).split(';').filter(function(d){ return d.trim() && !/^\s*(width|min-width|height|min-height|max-height|position|left|right|top|float|margin-left|margin-right|white-space)\s*:/i.test(d); }).join(';');
      return st ? 'style="' + st.replace(/"/g, "'") + '"' : '';
    });
    try { s = markdownNoHtml(s); } catch(e){}
    // quebras e blocos vazios em excesso
    var vazio = '(?:<br\\s*\\/?>|<div>\\s*(?:<br\\s*\\/?>)?\\s*<\\/div>|<p>\\s*(?:<br\\s*\\/?>|&nbsp;)?\\s*<\\/p>|&nbsp;|\\s)';
    s = s.replace(new RegExp('^' + vazio + '+', 'i'), '').replace(new RegExp(vazio + '+$', 'i'), '');
    s = s.replace(/(?:\s*<br\s*\/?>\s*){3,}/gi, '<br><br>');
    s = s.replace(/(?:<div>\s*(?:<br\s*\/?>)?\s*<\/div>\s*){2,}/gi, '<div><br></div>');
    return s;
  }

  // ---------- paginação medida ----------
  // espera cada imagem carregar e fixa o tamanho final dela (largura e altura), para a página
  // medida aqui ficar idêntica à página exibida, mesmo que a imagem demore a carregar depois
  function esperarImagens(el, ms, w, h){
    var imgs = [].slice.call(el.querySelectorAll('img'));
    if (!imgs.length) return Promise.resolve();
    var pronto = function(i){
      if (i.complete && i.naturalWidth) return (i.decode ? i.decode().catch(function(){}) : Promise.resolve());
      return new Promise(function(r){ i.addEventListener('load', r, {once:true}); i.addEventListener('error', r, {once:true}); });
    };
    return Promise.race([Promise.all(imgs.map(pronto)), new Promise(function(r){ setTimeout(r, ms || 6000); })]).then(function(){
      imgs.forEach(function(i){ fixarImagem(i, w, h); });
    });
  }
  function fixarImagem(i, w, h){
    if (i.dataset.fpFix) return;
    var cheia = i.closest('.fp-page-full-img'), topo = i.closest('.fp-img-wrap');
    if (cheia) return;
    var caixa = i.parentElement, larg = caixa ? caixa.clientWidth : 0;
    if (!larg){ var pg = i.closest('.fp-page'); larg = pg ? pg.clientWidth - 60 : w - 60; }
    var maxH = Math.round(h * (topo ? 0.34 : 0.46));
    var nw = i.naturalWidth, nh = i.naturalHeight, W, H;
    if (nw && nh){ var k = Math.min(1, larg / nw, maxH / nh); W = Math.max(1, Math.floor(nw * k)); H = Math.max(1, Math.floor(nh * k)); }
    else { W = larg; H = Math.round(maxH * 0.6); i.style.setProperty('object-fit', 'contain', 'important'); }
    if (topo){ W = larg; i.style.setProperty('object-fit', 'contain', 'important'); }
    i.style.setProperty('width', W + 'px', 'important'); i.style.setProperty('height', H + 'px', 'important');
    i.style.setProperty('max-height', 'none', 'important'); i.dataset.fpFix = '1';
  }
  // último recurso: reduz a(s) imagem(ns) da página até tudo caber, mantendo a proporção
  function encolher(p){
    var imgs = [].slice.call(p.querySelectorAll('img')).reverse(), n = 0;
    while (!cabe(p) && imgs.length && n++ < 30){
      var falta = p.scrollHeight - p.clientHeight + 4, feito = false;
      imgs.forEach(function(i){
        if (feito) return;
        var H = i.getBoundingClientRect().height, W = i.getBoundingClientRect().width;
        if (H > 60){ var nh = Math.max(60, H - falta), k = nh / H;
          i.style.setProperty('height', Math.floor(nh) + 'px', 'important'); i.style.setProperty('width', Math.floor(W * k) + 'px', 'important'); feito = true; }
      });
      if (!feito) break;
    }
  }
  function cabe(p){ return p.scrollHeight <= p.clientHeight + 1 && p.scrollWidth <= p.clientWidth + 1; }
  function fluxo(p){ return p.querySelector(':scope > .fp-text') || p.querySelector(':scope > blockquote') || p.querySelector(':scope > ul') || p; }
  function soEspaco(n){ return n.nodeType === 3 ? !n.textContent.trim() : (n.nodeType === 1 && (/^(BR)$/.test(n.tagName) || (!n.textContent.trim() && !n.querySelector('img,table,hr,iframe,video')))); }
  function aparar(c, inicio){
    while (c.firstChild && inicio && soEspaco(c.firstChild)) c.removeChild(c.firstChild);
    while (c.lastChild && soEspaco(c.lastChild)) c.removeChild(c.lastChild);
  }
  function casca(p){
    var np = p.cloneNode(false); np.classList.remove('fp-page-img');
    var c = fluxo(p);
    if (c === p){ return { page: np, c: np }; }
    var tit = p.querySelector(':scope > h3');
    if (tit){ var t2 = document.createElement('div'); t2.className = 'fp-cont'; t2.textContent = tit.textContent + ' (continuação)'; np.appendChild(t2); }
    var c2 = c.cloneNode(false); np.appendChild(c2);
    return { page: np, c: c2 };
  }
  // divide um nó (texto ou elemento) entre a página atual e a próxima
  function dividir(no, destino, p){
    if (no.nodeType === 3){
      var pal = no.textContent.split(/(\s+)/), lo = 0, hi = pal.length, txt = no.textContent;
      while (lo < hi){ var mid = Math.ceil((lo + hi) / 2); no.textContent = pal.slice(0, mid).join(''); if (cabe(p)) lo = mid; else hi = mid - 1; }
      if (lo === 0){ no.textContent = txt; return false; }
      no.textContent = pal.slice(0, lo).join('');
      destino.insertBefore(document.createTextNode(pal.slice(lo).join('').replace(/^\s+/, '')), destino.firstChild);
      return true;
    }
    if (no.nodeType !== 1 || !no.childNodes.length || /^(IMG|TABLE|TR|SVG|VIDEO|IFRAME|PICTURE)$/.test(no.tagName)){
      if (no.tagName === 'TABLE' && no.tBodies[0] && no.tBodies[0].rows.length > 1) return dividirTabela(no, destino, p);
      return false;
    }
    var clone = no.cloneNode(false); destino.insertBefore(clone, destino.firstChild);
    var moveu = false;
    while (!cabe(p) && no.childNodes.length > 1){ clone.insertBefore(no.lastChild, clone.firstChild); moveu = true; }
    if (!cabe(p) && no.childNodes.length === 1){ if (dividir(no.firstChild, clone, p)) moveu = true; }
    if (!clone.childNodes.length) clone.remove();
    return moveu;
  }
  function dividirTabela(t, destino, p){
    var corpo = t.tBodies[0], t2 = t.cloneNode(false);
    if (t.tHead) t2.appendChild(t.tHead.cloneNode(true));
    var b2 = corpo.cloneNode(false); t2.appendChild(b2);
    while (!cabe(p) && corpo.rows.length > 1) b2.insertBefore(corpo.rows[corpo.rows.length - 1], b2.firstChild);
    if (!b2.rows.length) return false;
    destino.insertBefore(t2, destino.firstChild); return true;
  }
  function paginar(paginasHtml, w, h){
    var host = document.createElement('div'); host.className = 'fp-measure';
    host.style.setProperty('--fp-h', h + 'px'); host.style.width = w + 'px';
    document.body.appendChild(host);
    var saida = [];
    var fila = paginasHtml.slice();
    function proxima(){
      if (!fila.length){ host.remove(); return Promise.resolve(saida); }
      var html = fila.shift();
      var tmp = document.createElement('div'); tmp.innerHTML = html;
      var p = tmp.firstElementChild;
      if (!p){ return proxima(); }
      var estiloOrig = p.getAttribute('style');
      // mede exatamente como o PageFlip exibe: caixa fixa, display:block
      p.style.width = w + 'px'; p.style.height = h + 'px'; p.style.display = 'block'; p.style.position = 'relative';
      host.appendChild(p);
      return esperarImagens(p, 6000, w, h).then(function(){
        var guarda = 0, atual = p;
        while (guarda++ < 400){
          var c = fluxo(atual);
          if (c !== atual) aparar(c, true);
          if (cabe(atual) || atual.classList.contains('fp-cover') && !atual.querySelector('blockquote')){ break; }
          var nova = casca(atual), moveu = false;
          host.appendChild(nova.page);
          while (!cabe(atual) && c.childNodes.length > 1){ nova.c.insertBefore(c.lastChild, nova.c.firstChild); moveu = true; }
          if (!cabe(atual) && c.childNodes.length === 1){ if (dividir(c.firstChild, nova.c, atual)) moveu = true; }
          // aproveita o espaço que sobrou: traz de volta o começo do bloco que foi para a próxima página
          if (moveu && cabe(atual) && nova.c.firstChild){
            var volta = nova.c.firstChild; c.appendChild(volta);
            if (!cabe(atual)){ if (!dividir(volta, nova.c, atual)) nova.c.insertBefore(volta, nova.c.firstChild); }
          }
          // garantia: se ainda passou do limite, o último bloco vai inteiro para a próxima página
          while (!cabe(atual) && c.childNodes.length > 1){ nova.c.insertBefore(c.lastChild, nova.c.firstChild); }
          encolher(atual);
          if (!moveu){ // um único bloco que não pode ser dividido (imagem grande): reduz a imagem para caber
            encolher(atual);
            if (c.childNodes.length && (nova.c.childNodes.length || c !== atual)){ /* fica com corte mínimo */ }
            nova.page.remove(); break;
          }
          aparar(c, false); aparar(nova.c, true);
          fecha(atual, estiloOrig);
          if (!nova.c.childNodes.length){ nova.page.remove(); atual = null; break; }
          atual = nova.page;
        }
        if (atual) fecha(atual, estiloOrig);
        return proxima();
      });
    }
    function fecha(el, estilo){
      if (estilo != null) el.setAttribute('style', estilo); else el.removeAttribute('style');
      var c = fluxo(el);
      var temConteudo = el.classList.contains('fp-cover') || el.classList.contains('fp-page-full-img') || (c.textContent.trim() || c.querySelector('img,table,hr'));
      if (temConteudo) saida.push(el.outerHTML);
      el.remove();
    }
    return proxima();
  }

  function numerar(paginas){
    var total = paginas.length;
    return paginas.map(function(pg, i){
      if (i === 0 || i === total - 1 || /fp-cover|fp-page-full-img/.test(pg.slice(0, 120))) return pg;
      return pg.replace(/<\/div>\s*$/, '<div class="fp-num">' + (i + 1) + '</div></div>');
    });
  }

  // monta (ou remonta) o livro dentro de "alvo"
  function montar(alvo, paginasBase, opts){
    opts = opts || {};
    injetarCss();
    var PF = (window.St && window.St.PageFlip) ? window.St.PageFlip : null;
    if (!PF) return Promise.reject(new Error('biblioteca do flipbook não carregou'));
    var sz = tamanho(opts.reservaAlto);
    alvo.style.setProperty('--fp-h', sz.h + 'px');
    if (opts.aviso) opts.aviso(true);
    return paginar(paginasBase.map(normalizarPagina), sz.w, sz.h).then(function(pgs){
      pgs = numerar(pgs);
      var pai = alvo.parentNode, depois = alvo.nextSibling;
      if (opts.instancia){ try { opts.instancia.destroy(); } catch(e){} }
      var livro = document.createElement('div'); livro.className = alvo.className; livro.id = alvo.id;
      livro.style.setProperty('--fp-h', sz.h + 'px');
      livro.innerHTML = pgs.join('');
      if (alvo.parentNode) alvo.parentNode.replaceChild(livro, alvo); else if (pai) pai.insertBefore(livro, depois && depois.parentNode === pai ? depois : null);
      var pf = new PF(livro, { width: sz.w, height: sz.h, size: 'fixed', maxShadowOpacity: 0.5, showCover: true, mobileScrollSupport: true, usePortrait: !sz.duas, autoSize: false });
      pf.loadFromHTML(livro.querySelectorAll('.fp-page'));
      if (opts.pagina){ var alvoPg = Math.min(pgs.length - 1, Math.round(opts.pagina * pgs.length)); try { pf.turnToPage(alvoPg); } catch(e){} }
      if (opts.aviso) opts.aviso(false);
      return { pf: pf, el: livro, tamanho: sz, total: pgs.length };
    });
  }
  function normalizarPagina(pg){
    return pg.replace(/(<div class="fp-text">)([\s\S]*)(<\/div>\s*<\/div>\s*)$/, function(m, a, corpo, b){ return a + normalizar(corpo) + b; });
  }

  // liga o redimensionamento: remonta quando o tamanho da página muda (giro do celular, janela)
  function acompanhar(estado, alvoSel, paginasBase, opts){
    var t = null, ultimo = estado.tamanho;
    function aoMudar(){
      clearTimeout(t);
      t = setTimeout(function(){
        var sz = tamanho(opts && opts.reservaAlto);
        if (!ultimo || sz.w !== ultimo.w || sz.h !== ultimo.h || sz.duas !== ultimo.duas){
          var pos = 0; try { pos = estado.pf.getCurrentPageIndex() / Math.max(1, estado.total); } catch(e){}
          var el = document.querySelector(alvoSel); if (!el) return;
          montar(el, paginasBase, Object.assign({}, opts, { instancia: estado.pf, pagina: pos })).then(function(novo){
            estado.pf = novo.pf; estado.total = novo.total; ultimo = novo.tamanho; if (opts && opts.depois) opts.depois(novo);
          }).catch(function(){});
        }
      }, 250);
    }
    window.addEventListener('resize', aoMudar);
    window.addEventListener('orientationchange', aoMudar);
    return function(){ window.removeEventListener('resize', aoMudar); window.removeEventListener('orientationchange', aoMudar); clearTimeout(t); };
  }

  return { CSS: CSS, injetarCss: injetarCss, tamanho: tamanho, normalizar: normalizar, paginar: paginar, montar: montar, acompanhar: acompanhar };
}
window.FPL = __fplModule();
