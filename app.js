/* RelyOn Academy — SPA */
var STATE = { theme: localStorage.getItem('rly-theme') || 'dark', route: {name:'inicio'}, edit: false };

function h(s){ return String(s==null?'':s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }

function toast(msg){
  var t = document.createElement('div');
  t.className = 'toast'; t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(function(){ t.classList.add('show'); }, 10);
  setTimeout(function(){ t.classList.remove('show'); setTimeout(function(){ t.remove(); }, 300); }, 2600);
}

var ICONS = {
  play:'<path d="M8 5v14l11-7z"/>', flame:'<path d="M12 2c1 3-2 4-2 7a4 4 0 0 0 8 0c0-1-.5-2-1-3 2 1 3 4 3 6a6 6 0 1 1-12 0c0-4 2-7 4-10z"/>',
  heli:'<path d="M2 12h20M12 2v6M7 8h10a2 2 0 0 1 2 2v2H5v-2a2 2 0 0 1 2-2zM10 12v8h4v-8"/>',
  exit:'<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/>',
  raft:'<circle cx="12" cy="12" r="9"/><path d="M12 7v10M7 12h10"/>',
  wrench:'<path d="M14.7 6.3a4 4 0 1 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 1 0 5.4-5.4z"/>',
  book:'<path d="M4 4h12a2 2 0 0 1 2 2v14H6a2 2 0 0 1-2-2V4z"/><path d="M18 4v16"/>',
  scale:'<path d="M12 3v18M5 7l-3 7a4 4 0 0 0 8 0zM19 7l-3 7a4 4 0 0 0 8 0zM5 7h14"/>',
  link:'<path d="M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1"/>',
  check:'<path d="M20 6 9 17l-5-5"/>',
  chev:'<path d="M9 18l6-6-6-6"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
  close:'<path d="M18 6 6 18M6 6l12 12"/>',
  menu:'<path d="M3 6h18M3 12h18M3 18h18"/>',
  sun:'<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>',
  moon:'<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/>',
  doc:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
  cert:'<circle cx="12" cy="8" r="6"/><path d="M9 13 7 22l5-3 5 3-2-9"/>',
  bell:'<path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
  grid:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
  users:'<circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0"/><circle cx="18" cy="8" r="3"/><path d="M15 10a5 5 0 0 1 7 4.8"/>',
  video:'<rect x="2" y="5" width="15" height="14" rx="2"/><path d="M17 10l5-3v10l-5-3z"/>',
  news:'<path d="M4 4h12v16l-4-2-4 2-4-2z"/><path d="M8 8h4M8 11h4"/>',
  case:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  edit:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4Z"/>',
  download:'<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>'
};
function svgIcon(name, attrs){
  attrs = attrs || {};
  var w = attrs.size || 20;
  return '<svg viewBox="0 0 24 24" width="'+w+'" height="'+w+'" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="icon icon-'+name+'">'+(ICONS[name]||'')+'</svg>';
}

var DEFAULT_EDITS = {
  "lessons": {
    "huet": {"0": {"0": {"content": "Em um pouso forçado na água (ditching), o helicóptero tende a capotar rapidamente devido ao centro de gravidade alto. A desorientação espacial é a maior causa de óbito em acidentes desse tipo — por isso o treinamento HUET condiciona o tripulante a manter uma referência fixa (ponto de saída) e contar mentalmente antes de se mover, controlando a resposta de pânico.", "videoUso": {"titulo": "", "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR1p9x6WKxSj7OaIoa1i1NBctyip6BbUzSKejPmVgCRrNkijsx-aQ6OzdJ&s=10"}}}},
    "caci": {"0": {"0": {"content": "# 🔥 Reação química do fogo, triângulo e tetraedro do fogo\n\nO fogo é resultado de uma reação química de combustão entre combustível e comburente, liberando calor e luz. Triângulo do fogo: Calor + Combustível + Comburente. Tetraedro do fogo: Calor + Combustível + Comburente + Reação em cadeia. Extinguir o fogo significa remover um desses elementos: resfriamento, abafamento, retirada do combustível ou inibição química.", "titulo": "Tetraedro do fogo e química da combustão", "media": {"type": "video", "url": "https://www.youtube.com/watch?v=O3jJbYwHHO4", "alt": "Assistir vídeo"}}}},
    "mcia": {"0": {"0": {"content": "A NORMAM-223 (Marinha do Brasil/DPC) exige que todo helideque registrado mantenha equipe EMCIA guarnecida durante operações aéreas, com base na Resolução IMO A.1079(28) item 5.6.2.7 e na Seção STCW A-VI/3. Sem a EMCIA posicionada e equipada, a operação do helicóptero deve ser suspensa."}, "1": {"content": "A equipe é composta por um ALPH, responsável pelo contato visual e radiofônico contínuo com a aeronave, e a BOMBAV, guarnição de combate a incêndio posicionada junto ao canhão de espuma do helideque, pronta para acionamento em até 30 segundos em caso de emergência no pouso ou decolagem."}, "2": {"content": "O treinamento MCIA exige como pré-requisito a certificação STCW A-VI/3 (Combate a Incêndio Avançado), com carga horária mínima definida pela Tabela A-VI/3 e revalidação periódica — tipicamente a cada 5 anos — para manter a habilitação da equipe EMCIA."}}}
  },
  "norms": {
    "stcw": {"trecho": "Tripulantes designados para combate a incêndio devem concluir treinamento avançado cobrindo organização de combate a incêndio a bordo, técnicas de combate, uso de EAPR e coordenação de equipes.", "equip": ["EAPR / SCBA de circuito aberto, autonomia mínima declarada pelo fabricante (típico 30–60 min conforme cilindro)", "Mangueira de incêndio e esguicho regulável (jato pleno / neblina), conforme padrão do navio", "Roupa de aproximação e EPI de combate a incêndio (capacete, balaclava, luvas, botas)", "Rádio portátil para coordenação entre guarnições e com a ponte de comando"], "manuais": [{"nome": "IMO — Human Element (STCW)", "url": "https://www.imo.org/en/OurWork/HumanElement"}, {"nome": "OSHA 29 CFR 1910.134 — Respiratory Protection", "url": "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.134"}]},
    "cap437": {"manuais": [{"nome": "UK CAA — CAP 437", "url": "https://www.caa.co.uk/publication/download/16496"}]},
    "normam223": {"manuais": [{"nome": "Marinha do Brasil — NORMAM-223/DPC", "url": "https://www.marinha.mil.br/dpc/normas-e-procedimentos"}, {"nome": "UK CAA — CAP 437", "url": "https://www.caa.co.uk/publication/download/16496"}], "equip": ["Canhão de espuma do helideque", "EPI de combate a incêndio EMCIA", "Rádio VHF portátil (ALPH)"]},
    "lsa_balsa": {"equip": ["Balsa inflável SOLAS com kit de sobrevivência", "Sinalizador fumígeno/luminoso", "Rádio VHF portátil estanque"]}
  },
  "courses": {
    "caci": {"desc": "Teoria do fogo, EAPR, extintores NFPA 10 e sistema de esgoto SOLAS II-1."},
    "brig": {"img": {"url": "https://cdn.jornaldebrasilia.com.br/wp-content/uploads/2020/12/16215916/treinamentos-dos-brigadistas-hospital-de-base-2-768x512.jpeg", "alt": ""}},
    "mcia": {"img": {"url": "https://aerossurance.com/wp-content/uploads/2024/09/protf-aw139-omni-wreckage-on-deck.jpg", "alt": ""}, "nome": "Manobra e Combate a Incêndio de Aviação"}
  }
};
function mergeDeep(target, source){
  if (source==null) return target;
  if (Array.isArray(source) || typeof source!=='object') return source;
  var out = (target && typeof target==='object' && !Array.isArray(target)) ? target : {};
  Object.keys(source).forEach(function(k){ out[k] = mergeDeep(out[k], source[k]); });
  return out;
}
var EDITS = (function(){
  var base = JSON.parse(JSON.stringify(DEFAULT_EDITS));
  var stored = {};
  try { stored = JSON.parse(localStorage.getItem('rly-edits')||'{}'); } catch(e){ stored = {}; }
  return mergeDeep(base, stored);
})();
function saveEditsStore(){ try { localStorage.setItem('rly-edits', JSON.stringify(EDITS)); } catch(e){} }
function ed(path, fallback){
  var parts = path.split('.'); var o = EDITS;
  for (var i=0;i<parts.length;i++){ if (o==null) return fallback; o = o[parts[i]]; }
  return (o===undefined || o===null) ? fallback : o;
}
function setEditPath(path, value){
  var parts = path.split('.'); var o = EDITS;
  for (var i=0;i<parts.length-1;i++){ var k=parts[i]; if (!o[k] || typeof o[k]!=='object') o[k]={}; o=o[k]; }
  o[parts[parts.length-1]] = value;
  saveEditsStore();
}
function toggleEdit(){ STATE.edit = !STATE.edit; render(); toast(STATE.edit ? 'Modo de edição ativado' : 'Modo de edição desativado'); }
function editableText(path, value){
  var v = ed(path, value);
  if (!STATE.edit) return h(v);
  return '<span class="editable" contenteditable="true" spellcheck="false" data-path="'+h(path)+'" onpaste="onEditablePaste(event)" onblur="onEditableBlur(event)">'+h(v)+'</span>';
}
function editableBlock(path, value){
  var v = ed(path, value);
  if (!STATE.edit) return richHtml(v);
  return '<div class="editable editable-block" contenteditable="true" spellcheck="false" data-path="'+h(path)+'" onpaste="onContentPaste(event)" onblur="onContentBlur(event)">'+richHtml(v)+'</div>';
}
function onEditablePaste(e){ e.preventDefault(); var text = (e.clipboardData || window.clipboardData).getData('text/plain'); document.execCommand('insertText', false, text); }
function onEditableBlur(e){ var el = e.target; setEditPath(el.getAttribute('data-path'), el.innerText); }
function looksHtml(v){ return typeof v==='string' && /</.test(v); }
function richHtml(v){ if (v==null) return ''; return looksHtml(v) ? v : h(v).replace(/\n/g,'<br>'); }
function onContentPaste(e){
  var cd = e.clipboardData || window.clipboardData;
  var items = cd && cd.items;
  var imgItem = null;
  if (items){ for (var i=0;i<items.length;i++){ if (items[i].type && items[i].type.indexOf('image/')===0){ imgItem = items[i]; break; } } }
  if (imgItem){
    e.preventDefault();
    var file = imgItem.getAsFile();
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(){ document.execCommand('insertHTML', false, '<img src="'+reader.result+'" style="max-width:100%;display:block;margin:10px 0;border-radius:8px">'); };
    reader.readAsDataURL(file);
    return;
  }
  e.preventDefault();
  var text = cd.getData('text/plain');
  document.execCommand('insertText', false, text);
}
function onContentBlur(e){ var el = e.target; setEditPath(el.getAttribute('data-path'), el.innerHTML); }
function onEditableListBlur(e){ var el = e.target; var arr = el.innerText.split('\n').map(function(s){ return s.trim(); }).filter(Boolean); setEditPath(el.getAttribute('data-path'), arr); }
function onEditableManuaisBlur(e){ var el = e.target; var lines = el.innerText.split('\n').map(function(s){ return s.trim(); }).filter(Boolean); var arr = lines.map(function(line){ var p = line.split('|'); return {nome:(p[0]||'').trim(), url:(p[1]||'').trim()}; }); setEditPath(el.getAttribute('data-path'), arr); }
function editableImgTag(path, url, alt){ var v = ed(path, {url:url, alt:alt||''}); var click = STATE.edit ? ' onclick="editImagePrompt(\''+path+'\')" style="cursor:pointer"' : ''; return '<img src="'+h(v.url)+'" alt="'+h(v.alt||'')+'" loading="lazy"'+click+'>'; }
function getUploadInput(){ return document.getElementById('img-upload-input'); }
function handleImageUpload(path, extraDefaults){
  var input = getUploadInput();
  if (!input){ toast('Upload de arquivo indisponível neste navegador.'); return; }
  input.onchange = function(e){
    var file = e.target.files && e.target.files[0];
    input.value = '';
    if (!file) return;
    if (!/^image\//.test(file.type)){ toast('Selecione um arquivo de imagem.'); return; }
    if (file.size > 3*1024*1024){ if (!window.confirm('Essa imagem tem '+Math.round(file.size/1024)+'KB e pode deixar o site lento para carregar. Continuar mesmo assim?')) return; }
    var reader = new FileReader();
    reader.onload = function(){
      var cur = ed(path, extraDefaults||{});
      var merged = {};
      for (var k in (extraDefaults||{})){ merged[k]=extraDefaults[k]; }
      for (var k2 in cur){ merged[k2]=cur[k2]; }
      merged.url = reader.result;
      setEditPath(path, merged); render(); toast('Imagem atualizada.');
    };
    reader.onerror = function(){ toast('Não foi possível ler o arquivo.'); };
    reader.readAsDataURL(file);
  };
  input.click();
}
function editImagePrompt(path){
  var cur = ed(path, {url:'', alt:''});
  var fromDevice = window.confirm('Enviar foto do seu computador ou celular?\n\nOK = escolher arquivo\nCancelar = colar um link (URL)');
  if (fromDevice){ handleImageUpload(path); return; }
  var url = window.prompt('Cole a URL da nova imagem:', cur.url||'');
  if (url===null) return;
  var alt = window.prompt('Descrição da imagem (alt):', cur.alt||'');
  var merged = {}; for (var k in cur){ merged[k]=cur[k]; } merged.url=url; merged.alt = (alt==null)?(cur.alt||''):alt;
  setEditPath(path, merged); render();
}
function addLessonMedia(path){
  var t = window.prompt('Tipo de mídia — digite "imagem", "video" ou "embed":', 'imagem');
  if (!t) return;
  t = t.toLowerCase().trim(); if (['imagem','video','embed'].indexOf(t)<0) t='imagem';
  if (t==='imagem'){ var fromDevice = window.confirm('Enviar foto do seu computador ou celular?\n\nOK = escolher arquivo\nCancelar = colar um link (URL)'); if (fromDevice){ handleImageUpload(path+'.media', {type:'image', alt:''}); return; } }
  var url = window.prompt('URL da mídia:', '');
  if (url===null || url==='') return;
  var alt = t==='imagem' ? (window.prompt('Descrição da imagem (alt):','')||'') : (window.prompt('Rótulo exibido no link:','Assistir vídeo')||'Assistir vídeo');
  var typeMap = {imagem:'image', video:'video', embed:'embed'};
  setEditPath(path+'.media', {type:typeMap[t], url:url, alt:alt}); render();
}
function editMediaLinkPrompt(path){ var cur = ed(path+'.media', {type:'video', url:'', alt:'Assistir vídeo'}); var url = window.prompt('URL do vídeo:', cur.url||''); if (url===null) return; var alt = window.prompt('Rótulo exibido no link:', cur.alt||'Assistir vídeo'); setEditPath(path+'.media', {type:'video', url:url, alt:alt||'Assistir vídeo'}); render(); }
function editEmbedPrompt(path){ var cur = ed(path+'.media', {url:''}); var url = window.prompt('URL do embed:', cur.url||''); if (url===null) return; setEditPath(path+'.media', {type:'embed', url:url}); render(); }
function editVideoUsoPrompt(path){ var cur = ed(path+'.videoUso', {titulo:'', url:''}); var url = window.prompt('URL do vídeo de utilização:', cur.url||''); if (url===null) return; var titulo = window.prompt('Título do vídeo:', cur.titulo||''); setEditPath(path+'.videoUso', {titulo: titulo||'', url:url}); render(); }
function bgEditBtn(path){ if (!STATE.edit) return ''; return '<button class="bg-edit-btn" onclick="event.stopPropagation();event.preventDefault();editImagePrompt(\''+path+'\')">'+svgIcon('edit',{size:13})+' Imagem</button>'; }
function equipBody(key, arr){
  var ovArr = ed('norms.'+key+'.equip', null);
  var list = ovArr!=null ? ovArr : (arr||[]);
  if (STATE.edit){ var text = (list||[]).join('\n'); return '<div class="editable editable-block" contenteditable="true" spellcheck="false" data-path="norms.'+key+'.equip" onpaste="onEditablePaste(event)" onblur="onEditableListBlur(event)">'+h(text)+'</div><p class="muted edit-hint">Uma linha por equipamento.</p>'; }
  return (list&&list.length) ? '<ul class="norm-eq">'+list.map(function(e){ return '<li>'+h(e)+'</li>'; }).join('')+'</ul>' : '<ul class="norm-eq"><li class="muted">—</li></ul>';
}
function manuaisBody(key, arr){
  var ovArr = ed('norms.'+key+'.manuais', null);
  var list = ovArr!=null ? ovArr : (arr||[]);
  if (STATE.edit){ var text = (list||[]).map(function(m){ return (m.nome||'')+' | '+(m.url||''); }).join('\n'); return '<div class="editable editable-block" contenteditable="true" spellcheck="false" data-path="norms.'+key+'.manuais" onpaste="onEditablePaste(event)" onblur="onEditableManuaisBlur(event)">'+h(text)+'</div><p class="muted edit-hint">Formato: Nome | URL — uma linha por manual.</p>'; }
  return (list&&list.length) ? list.map(function(m){ return '<a class="man-row" href="'+h(m.url)+'" target="_blank" rel="noopener"><span>'+h(m.nome)+'</span>'+svgIcon('link',{size:14})+'</a>'; }).join('') : '<p class="muted">—</p>';
}
function normTitulo(key){ var n = NORMS[key]; return n ? ed('norms.'+key+'.titulo', n.titulo) : ''; }
function normDescricao(key){ var n = NORMS[key]; return n ? ed('norms.'+key+'.descricao', n.descricao||'') : ''; }
function normImgEquip(key){ var n = NORMS[key]; return ed('norms.'+key+'.imgEquip', (n&&n.imgEquip)||null); }
function normVideoUso(key){ var n = NORMS[key]; return ed('norms.'+key+'.videoUso', (n&&n.videoUso)||null); }
function courseImgEff(c){ var base = STOCK_IMG[c.img]||STOCK_IMG.FIRE; return ed('courses.'+c.id+'.img', base); }
function getEffVideo(idx){ var ov = ed('videos.'+idx, null); var base = VIDEOS[idx]; return ov ? Object.assign({}, base, ov) : base; }
function editVideoCardPrompt(idx){ var v = getEffVideo(idx); var titulo = window.prompt('Título do vídeo:', v.titulo); if (titulo===null) return; var url = window.prompt('URL do vídeo:', v.url); if (url===null) return; setEditPath('videos.'+idx, {titulo:titulo, url:url, area:v.area}); render(); }
function saveJsonEditor(){ var ta = document.getElementById('edits-json'); try { EDITS = JSON.parse(ta.value); saveEditsStore(); toast('Alterações salvas.'); render(); } catch(e){ toast('JSON inválido — verifique a sintaxe.'); } }
function exportEdits(){ var blob = new Blob([JSON.stringify(EDITS,null,2)], {type:'application/json'}); var url = URL.createObjectURL(blob); var a = document.createElement('a'); a.href=url; a.download='relyon-academy-edicoes.json'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function(){ URL.revokeObjectURL(url); }, 1000); }
function importEdits(e){ var file = e.target.files && e.target.files[0]; if (!file) return; var reader = new FileReader(); reader.onload = function(){ try { EDITS = JSON.parse(reader.result); saveEditsStore(); toast('Importado com sucesso.'); render(); } catch(err){ toast('Arquivo inválido.'); } }; reader.readAsText(file); }
function resetEdits(){ if (!window.confirm('Isso remove todas as edições feitas no seu navegador e restaura o conteúdo publicado. Confirmar?')) return; EDITS = JSON.parse(JSON.stringify(DEFAULT_EDITS)); localStorage.removeItem('rly-edits'); toast('Conteúdo publicado restaurado.'); render(); }

function splitContentPages(content, maxLen){
  var raw = content||'';
  if (!raw) return [''];
  var html = looksHtml(raw) ? raw : h(raw).replace(/\n/g,'<br>');
  var blocks = html.split(/(?:<br\s*\/?>\s*){2,}/i).filter(function(b){ return b && b.trim(); });
  if (!blocks.length) blocks = [html];
  var pages = []; var cur = '';
  blocks.forEach(function(b){
    var curLen = cur.replace(/<[^>]+>/g,'').length;
    var bLen = b.replace(/<[^>]+>/g,'').length;
    if (cur && (curLen + bLen) > maxLen){ pages.push(cur); cur = b; }
    else cur = cur ? (cur + '<br><br>' + b) : b;
  });
  if (cur) pages.push(cur);
  return pages.length ? pages : [html];
}
function buildFlipbookPages(titulo, subtitulo, content, trecho, equip, manuais, images){
  var pages = [];
  var coverImg = (images && images[0]) ? images[0] : null;
  pages.push('<div class="fp-page fp-cover"'+(coverImg?' style="background-image:linear-gradient(0deg,rgba(0,0,0,.55),rgba(0,0,0,.25)),url(\''+coverImg.url.replace(/'/g,"%27")+'\')"':'')+'><h2>'+h(subtitulo||'')+'</h2><h1>'+h(titulo||'')+'</h1></div>');
  var extraImages = (images||[]).slice(1);
  var imgIdx = 0;
  splitContentPages(content||'', 950).forEach(function(chunk, i){
    var imgHtml = '';
    if (imgIdx < extraImages.length && (i%2===1)){
      var im = extraImages[imgIdx++];
      imgHtml = '<div class="fp-img-wrap"><img src="'+h(im.url)+'" alt="'+h(im.alt||'')+'"></div>';
    }
    pages.push('<div class="fp-page'+(imgHtml?' fp-page-img':'')+'">'+imgHtml+'<div class="fp-text">'+chunk+'</div></div>');
  });
  while (imgIdx < extraImages.length){
    var im2 = extraImages[imgIdx++];
    pages.push('<div class="fp-page fp-page-full-img"><img src="'+h(im2.url)+'" alt="'+h(im2.alt||'')+'"></div>');
  }
  if (trecho) pages.push('<div class="fp-page fp-cover"><h3>Trecho normativo</h3><blockquote>'+h(trecho)+'</blockquote></div>');
  if (equip && equip.length) pages.push('<div class="fp-page"><h3>Equipamentos</h3><ul>'+equip.map(function(e){ return '<li>'+h(e)+'</li>'; }).join('')+'</ul></div>');
  if (manuais && manuais.length) pages.push('<div class="fp-page"><h3>Manuais</h3><ul>'+manuais.map(function(m){ return '<li>'+h(m.nome)+'</li>'; }).join('')+'</ul></div>');
  pages.push('<div class="fp-page fp-cover"><p class="muted">Fim</p></div>');
  return pages;
}
function downloadFlipbookHtml(titulo, pagesHtml){
  var doc = '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">'+
    '<meta name="viewport" content="width=device-width, initial-scale=1">'+
    '<title>'+h(titulo||'Flipbook')+' — RelyOn Academy</title>'+
    '<style>html,body{margin:0;background:#0B0F17;color:#fff;font-family:system-ui,sans-serif}'+
    '.fp-page{position:relative;background:#121826;color:#fff;padding:30px 26px;box-sizing:border-box;font-size:14px;line-height:1.65;overflow:hidden;border:1px solid #2a3650;background-size:cover;background-position:center}'+
    '.fp-page h1{font-size:19px;margin:6px 0 2px}.fp-page h2{font-size:12px;color:#94A3B8;text-transform:uppercase;letter-spacing:.04em;margin-bottom:0}'+
    '.fp-page h3{font-size:14px;color:#F59E0B;margin-bottom:10px}.fp-page blockquote{font-style:italic;border-left:3px solid #F59E0B;padding-left:10px;margin:0;font-size:13px}'+
    '.fp-page ul{padding-left:18px;margin:0}.fp-page ul li{margin-bottom:6px;font-size:13px}'+
    '.fp-text{font-size:13.5px;line-height:1.7}.fp-text img{max-width:100%;border-radius:6px;margin:8px 0;display:block}'+
    '.fp-cover{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:linear-gradient(160deg,#182036,#121826)}'+
    '.fp-img-wrap{margin:-30px -26px 12px;overflow:hidden}.fp-img-wrap img{width:100%;max-height:200px;object-fit:cover;display:block}'+
    '.fp-page-full-img{padding:0}.fp-page-full-img img{width:100%;height:100%;object-fit:cover;display:block}'+
    'body{display:flex;justify-content:center;padding:20px}#fp-book{width:100%;max-width:800px}</style>'+
    '<script src="https://cdn.jsdelivr.net/npm/page-flip@2.0.7/dist/js/page-flip.browser.js"><\/script>'+
    '</head><body><div id="fp-book">'+pagesHtml.join('')+'</div>'+
    '<script>var pf=new St.PageFlip(document.getElementById("fp-book"),{width:380,height:540,size:"stretch",minWidth:300,maxWidth:700,minHeight:420,maxHeight:820,maxShadowOpacity:0.5,showCover:true,mobileScrollSupport:true,usePortrait:true});pf.loadFromHTML(document.querySelectorAll(".fp-page"));<\/script>'+
    '</body></html>';
  var blob = new Blob([doc], {type:'text/html'});
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url; a.download = (titulo||'flipbook').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')+'.html';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(function(){ URL.revokeObjectURL(url); }, 1000);
}
var __FP_STATE = { titulo:'', pages:[] };
function openFlipbook(titulo, pagesHtml){
  __FP_STATE.titulo = titulo||'flipbook'; __FP_STATE.pages = pagesHtml;
  var layer = document.getElementById('layer');
  layer.innerHTML = '<div class="fp-overlay" onclick="if(event.target===this) closeFlipbook()">'+
    '<div class="fp-toolbar"><button class="btn btn-ghost" onclick="downloadFlipbookHtml(__FP_STATE.titulo, __FP_STATE.pages)">'+svgIcon('download',{size:14})+' Baixar arquivo</button> '+
    '<button class="btn btn-ghost" onclick="closeFlipbook()">'+svgIcon('close',{size:14})+' Fechar</button></div>'+
    '<div id="fp-book" class="fp-book">'+pagesHtml.join('')+'</div>'+
  '</div>';
  layer.classList.add('open');
  try {
    var PF = (window.St && window.St.PageFlip) ? window.St.PageFlip : null;
    if (!PF){ toast('Visualizador de flipbook indisponível (biblioteca não carregou).'); return; }
    var bookEl = document.getElementById('fp-book');
    var pf = new PF(bookEl, { width: 380, height: 540, size:'stretch', minWidth:300, maxWidth:700, minHeight:420, maxHeight:820, maxShadowOpacity:0.5, showCover:true, mobileScrollSupport:true, usePortrait:true });
    pf.loadFromHTML(bookEl.querySelectorAll('.fp-page'));
    window.__fp = pf;
  } catch(e){ toast('Não foi possível abrir o flipbook.'); }
}
function closeFlipbook(){ if (window.__fp){ try { window.__fp.destroy(); } catch(e){} window.__fp = null; } var layer = document.getElementById('layer'); layer.classList.remove('open'); layer.innerHTML = ''; }
function openLessonFlipbook(courseId, mi, ai){
  var mods = MODULES_BY_COURSE[courseId]; var mod = mods[mi]; var a = mod.aulas[ai];
  var path = 'lessons.'+courseId+'.'+mi+'.'+ai;
  var titulo = ed(path+'.titulo', a.titulo);
  var content = ed(path+'.content', a.content||'');
  var primaryNormKey = (a.norms && a.norms[0]) ? a.norms[0] : null;
  var primaryNorm = primaryNormKey ? NORMS[primaryNormKey] : null;
  var trecho = primaryNorm ? ed('norms.'+primaryNormKey+'.trecho', primaryNorm.trecho||'') : '';
  var equip = primaryNormKey ? (ed('norms.'+primaryNormKey+'.equip', primaryNorm.equip)||[]) : [];
  var manuais = primaryNormKey ? (ed('norms.'+primaryNormKey+'.manuais', primaryNorm.manuais)||[]) : [];
  var images = [];
  var media = ed(path+'.media', a.media||{type:'none'});
  if (media && media.type==='image' && media.url) images.push({url:media.url, alt:media.alt||''});
  if (primaryNormKey){
    var imgEquip = normImgEquip(primaryNormKey);
    if (imgEquip && imgEquip.url) images.push({url:imgEquip.url, alt:imgEquip.alt||''});
  }
  openFlipbook(titulo, buildFlipbookPages(titulo, mod.num+' · '+mod.titulo, content, trecho, equip, manuais, images));
}
function openNormFlipbook(key){
  var n = NORMS[key]; if (!n) return;
  var titulo = ed('norms.'+key+'.titulo', n.titulo);
  var descricao = ed('norms.'+key+'.descricao', n.descricao||'');
  var trecho = ed('norms.'+key+'.trecho', n.trecho||'');
  var equip = ed('norms.'+key+'.equip', n.equip)||[];
  var manuais = ed('norms.'+key+'.manuais', n.manuais)||[];
  var images = [];
  var imgEquip = normImgEquip(key);
  if (imgEquip && imgEquip.url) images.push({url:imgEquip.url, alt:imgEquip.alt||''});
  openFlipbook(titulo, buildFlipbookPages(titulo, n.code, descricao||trecho, trecho, equip, manuais, images));
}

var COURSES = [
  {id:'caci', area:'incendio', sigla:'CACI', nome:'Combate a Incêndio Avançado', desc:'Teoria do fogo, EAPR, extintores NFPA 10 e sistema de esgoto SOLAS II-1.', nivel:'Avançado', carga:'40h', modulos:5, aulas:16, instrutor:'Mario Machado', progresso:62, status:'em andamento', img:'FIRE'},
  {id:'mcia', area:'aeronautica', sigla:'MCIA', nome:'Manobra e Combate a Incêndio de Aviação', desc:'EMCIA no helideque — ALPH/BOMBAV, sistema DIFFS e resposta a emergência aeronáutica offshore, conforme NORMAM-223 e CAP 437.', nivel:'Avançado', carga:'40h', modulos:3, aulas:9, instrutor:'Mario Machado', progresso:30, status:'em andamento', img:'HELI'},
  {id:'tsp', area:'sobrevivencia', sigla:'TSP', nome:'Técnicas de Sobrevivência Pessoal (TSP)', desc:'Embarque em balsas, uso de coletes e traje de imersão, abandono de embarcação/plataforma e prevenção de hipotermia em água fria, conforme STCW A-VI/1-1.', nivel:'Básico', carga:'16h', modulos:2, aulas:6, instrutor:'Mario Machado', progresso:100, status:'concluído', img:'RAFT'},
  {id:'cpso', area:'primeiros-socorros', sigla:'CPSO', nome:'Primeiros Socorros e RCP', desc:'Suporte básico de vida, RCP e manejo de hipotermia/quase-afogamento.', nivel:'Básico', carga:'12h', modulos:2, aulas:5, instrutor:'Mario Machado', progresso:0, status:'não iniciado', img:'CPR'},
  {id:'huet', area:'aeronautica', sigla:'HUET', nome:'Escape de Helicóptero Submerso', desc:'HUET — técnicas de escape, orientação subaquática e uso do EAPR aeronáutico.', nivel:'Avançado', carga:'20h', modulos:3, aulas:8, instrutor:'Mario Machado', progresso:45, status:'em andamento', img:'HELI'},
  {id:'brig', area:'incendio', sigla:'BRIG', nome:'Brigada de Incêndio Industrial/Offshore', desc:'Organização de brigada, NR-23 e resposta a emergência em plataformas.', nivel:'Avançado', carga:'32h', modulos:4, aulas:12, instrutor:'Mario Machado', progresso:10, status:'em andamento', img:'PLAT_FIRE'},
  {id:'cerr', area:'sobrevivencia', sigla:'CERR', nome:'Embarcação Rápida de Resgate', desc:'Lançamento, operação e recuperação do bote de resgate rápido (FRC) e técnicas de resgate de homem ao mar, conforme STCW A-VI/2-2.', nivel:'Avançado', carga:'8h', modulos:1, aulas:4, instrutor:'Mario Machado', progresso:100, status:'concluído', img:'RAFT'},
  {id:'cess', area:'sobrevivencia', sigla:'CESS', nome:'Embarcações de Sobrevivência e Salvamento', desc:'Lançamento e operação de balsas infláveis e baleeiras de sobrevivência, embarque e abandono de plataforma, conforme STCW A-VI/2-1.', nivel:'Intermediário', carga:'14h', modulos:2, aulas:7, instrutor:'Mario Machado', progresso:0, status:'não iniciado', img:'BLDG_FIRE'}
];
function byId(arr, id){ for (var i=0;i<arr.length;i++){ if (arr[i].id===id) return arr[i]; } return null; }
function areaName(a){ return {incendio:'Combate a Incêndio', sobrevivencia:'Sobrevivência Pessoal', 'primeiros-socorros':'Primeiros Socorros', aeronautica:'Operações Aeronáuticas', comunicacoes:'Comunicações de Emergência'}[a] || a; }

var CACI_MODULES = [
  {num:'01', titulo:'Teoria do Fogo e Classes de Incêndio', aulas:[
    {titulo:'Tetraedro do fogo e química da combustão', norms:['stcw'], media:{type:'none'}, content:'O fogo resulta da reação entre combustível, comburente (oxigênio), calor e reação em cadeia — os quatro lados do tetraedro do fogo. Remover qualquer um desses elementos interrompe a combustão: resfriamento (água), abafamento (espuma/CO2, remove oxigênio), remoção do combustível ou inibição química da reação em cadeia (pó químico). Compreender qual mecanismo cada agente extintor utiliza é a base para escolher a técnica correta de combate.'},
    {titulo:'Classes A, B, C, D e K — agentes extintores', norms:['nfpa10'], media:{type:'image', url:'https://images.unsplash.com/photo-1569436078135-61753b84e3e8?q=80&w=1200&auto=format&fit=crop', alt:'Extintor de incêndio portátil'}, content:'Classe A (sólidos combustíveis — madeira, papel, tecido): água ou pó ABC. Classe B (líquidos inflamáveis — óleo, combustível): espuma, CO2 ou pó BC. Classe C (equipamentos energizados): agentes não condutores como CO2 ou pó químico. Classe D (metais combustíveis — magnésio, titanium): pó especial classe D, nunca água. Classe K (óleos e gorduras de cozinha): agente úmido (wet chemical) que satura o óleo.'},
    {titulo:'Propagação e comportamento do fogo em compartimentos', norms:['stcw'], media:{type:'image', url:'https://plus.unsplash.com/premium_photo-1661490258326-7b7af12e3dee?q=80&w=1200&auto=format&fit=crop', alt:'Guarnição combatendo incêndio com mangueira'}, content:'Em compartimentos fechados, o fogo evolui por convecção, condução e radiação, podendo atingir flashover (ignição simultânea de todos os materiais do ambiente) quando a temperatura dos gases ultrapassa ~600°C. Sinais de alerta incluem fumaça densa e escura descendo do teto, calor intenso na porta e rolling fire (fogo rolando pelo teto) — nesses casos, a guarnição deve resfriar os gases com jato em neblina antes de avançar.'}
  ]},
  {num:'02', titulo:'EAPR — Equipamento Autônomo de Proteção Respiratória', aulas:[
    {titulo:'Componentes e autonomia do EAPR', norms:['stcw'], media:{type:'image', url:'https://plus.unsplash.com/premium_photo-1661490258326-7b7af12e3dee?q=80&w=1200&auto=format&fit=crop', alt:'Guarnição com EAPR combatendo incêndio'}, content:'O EAPR/SCBA é composto por cilindro de ar comprimido, regulador de primeiro estágio (reduz a pressão do cilindro), válvula de demanda (segundo estágio, entrega ar sob demanda da respiração), mangueiras de alta e baixa pressão, manômetro e máscara facial de vedação total. A autonomia declarada pelo fabricante (tipicamente 30–60 min) é teórica, calculada em repouso — o esforço físico real reduz esse tempo significativamente.'},
    {titulo:'Regra dos terços e gestão de ar', norms:['stcw'], media:{type:'image', url:'https://plus.unsplash.com/premium_photo-1661490258326-7b7af12e3dee?q=80&w=1200&auto=format&fit=crop', alt:'Guarnição com EAPR combatendo incêndio'}, content:'A "regra dos terços" divide o ar disponível em três partes iguais: um terço para o deslocamento até o ponto do sinistro, um terço para o retorno e um terço de reserva de segurança para imprevistos (obstrução, resgate de colega, rota bloqueada). O alarme sonoro de baixa pressão deve soar com essa reserva ainda intacta, nunca como primeiro aviso de que o ar está acabando.'},
    {titulo:'Inspeção pré-uso e troca de cilindro', norms:['stcw'], media:{type:'image', url:'https://plus.unsplash.com/premium_photo-1661490258326-7b7af12e3dee?q=80&w=1200&auto=format&fit=crop', alt:'Guarnição com EAPR combatendo incêndio'}, content:'Antes de cada uso: checar a pressão do cilindro no manômetro, testar a vedação da máscara (inspiração com a válvula de demanda fechada — a máscara deve colabar levemente contra o rosto sem entrada de ar), confirmar o alarme sonoro de baixa pressão e inspecionar visualmente mangueiras e conexões quanto a cortes ou desgaste. A troca de cilindro é feita em área segura, nunca durante o combate ativo.'}
  ]},
  {num:'03', titulo:'Prática de Combate a Incêndio (P.I.)', aulas:[
    {titulo:'Técnica P.A.A.V. de avanço em fogo real', norms:['stcw'], media:{type:'image', url:'https://plus.unsplash.com/premium_photo-1661490258326-7b7af12e3dee?q=80&w=1200&auto=format&fit=crop', alt:'Guarnição combatendo incêndio com mangueira'}, content:'P.A.A.V. — Proteger, Avaliar, Avançar, Ventilar — orienta o avanço seguro da guarnição: proteger-se com EPI completo, avaliar as condições do compartimento (calor, fumaça, sinais de flashover) antes de abrir a porta, avançar agachado mantendo contato com a parede e aplicar ventilação coordenada para remover gases quentes sem alimentar o fogo com oxigênio adicional.'},
    {titulo:'Jato pleno x neblina — leitura térmica do ambiente', norms:['stcw'], media:{type:'image', url:'https://plus.unsplash.com/premium_photo-1661490258326-7b7af12e3dee?q=80&w=1200&auto=format&fit=crop', alt:'Guarnição combatendo incêndio com mangueira'}, content:'O jato pleno (reto) tem maior alcance e poder de penetração, indicado para atacar diretamente o foco do fogo. O jato em neblina (spray) resfria os gases quentes do ambiente e protege a guarnição, mas não deve ser usado em excesso sobre superfícies quentes, pois gera vapor expansivo que pode causar queimaduras. A leitura do ambiente (cor e densidade da fumaça, temperatura percebida) orienta qual padrão usar a cada momento.'},
    {titulo:'Coordenação de guarnição e comunicação por rádio', norms:['stcw'], media:{type:'none'}, content:'Toda guarnição de combate a incêndio opera com um líder designado que mantém comunicação constante por rádio portátil com a central de comando. Protocolos padronizados de chamada (confirmação de entrada, status de ar, pedido de apoio, saída de emergência) evitam ambiguidade em ambiente de baixa visibilidade e alto ruído.'}
  ]},
  {num:'04', titulo:'Extintores Portáteis — NFPA 10', aulas:[
    {titulo:'Seleção de agente por classe de risco', norms:['nfpa10'], media:{type:'image', url:'https://images.unsplash.com/photo-1569436078135-61753b84e3e8?q=80&w=1200&auto=format&fit=crop', alt:'Extintor de incêndio portátil'}, content:'A técnica padrão é o mnemônico P.A.S.S.: Puxar o pino de segurança, Apontar o bocal para a base das chamas, Segurar/apertar a alavanca de descarga e Sacudir (varrer) de um lado a outro. O agente deve corresponder à classe de risco do ambiente mapeado — usar o agente errado (água em fogo elétrico, por exemplo) pode agravar o sinistro.'},
    {titulo:'Distâncias e normas de instalação', norms:['nfpa10inst'], media:{type:'image', url:'https://images.unsplash.com/photo-1569436078135-61753b84e3e8?q=80&w=1200&auto=format&fit=crop', alt:'Extintor de incêndio portátil'}, content:'A NFPA 10 define a distância máxima de deslocamento até um extintor conforme a classe de risco (tipicamente 15–23 m para risco leve/ordinário), além de altura de instalação (topo do extintor a no máximo ~1,5 m do piso) e sinalização fotoluminescente obrigatória para localização rápida em baixa visibilidade.'},
    {titulo:'Inspeção mensal e manutenção anual', norms:['nfpa10manut'], media:{type:'image', url:'https://images.unsplash.com/photo-1569436078135-61753b84e3e8?q=80&w=1200&auto=format&fit=crop', alt:'Extintor de incêndio portátil'}, content:'A inspeção visual mensal verifica lacre intacto, pressão no manômetro (faixa verde), ausência de corrosão e acesso desobstruído. A manutenção anual é feita por técnico qualificado, incluindo checagem interna do agente e, conforme o tipo de cilindro, teste hidrostático periódico (geralmente a cada 5 ou 12 anos).'},
    {titulo:'Procedimento interno de recarga (PO-INC-001)', norms:['po001'], media:{type:'none'}, content:'Extintores descarregados ou reprovados na inspeção são etiquetados, retirados de operação e encaminhados para recarga conforme o procedimento interno PO-INC-001, que documenta rastreabilidade (data, responsável, lote do agente) até o retorno do equipamento ao posto de combate.'}
  ]},
  {num:'05', titulo:'Sistema de Esgoto e Controle de Avarias (SOLAS II-1)', aulas:[
    {titulo:'Bombas de esgoto e válvulas de alívio', norms:['solas2_1'], media:{type:'none'}, content:'O sistema de esgoto (bilge system) remove água acumulada em porões e compartimentos estanques através de bombas principal e de emergência, com válvulas de retenção que impedem retorno de água entre compartimentos. A capacidade mínima de bombeamento é dimensionada conforme o volume dos espaços a serem esgotados.'},
    {titulo:'Três pilares do controle de avarias', norms:['solas2_1'], media:{type:'none'}, content:'Controle de avarias se apoia em três pilares: estanqueidade (manter portas e escotilhas fechadas), estabilidade (gestão de peso e compartimentagem para limitar o ângulo de adernamento) e flutuabilidade (capacidade do casco de permanecer à tona mesmo com compartimentos alagados).'},
    {titulo:'Simulado de alagamento progressivo', norms:['solas2_1'], media:{type:'none'}, content:'O simulado reproduz um alagamento que se propaga entre compartimentos adjacentes por falha de estanqueidade, treinando a tripulação a isolar rapidamente a avaria, acionar bombas de emergência e reportar a progressão à ponte de comando para decisões de estabilidade.'}
  ]}
];
var HUET_MODULES = [
  {num:'01', titulo:'Fundamentos do HUET', aulas:[
    {titulo:'Desorientação subaquática e resposta ao pânico', norms:['stcw'], media:{type:'image', url:'https://images.unsplash.com/photo-1531570003789-62d56ed3b271?q=80&w=1200&auto=format&fit=crop', alt:'Helicóptero'}, content:'Em um pouso forçado na água (ditching), o helicóptero tende a capotar rapidamente devido ao centro de gravidade alto. A desorientação espacial é a maior causa de óbito em acidentes desse tipo — por isso o treinamento HUET condiciona o tripulante a manter uma referência fixa (ponto de saída) e contar mentalmente antes de se mover, controlando a resposta de pânico.'},
    {titulo:'Colete salva-vidas aeronáutico — inspeção e uso', norms:['colete_aero'], media:{type:'image', url:'https://images.unsplash.com/photo-1613002864777-3964f53925d1?q=80&w=1200&auto=format&fit=crop', alt:'Colete salva-vidas'}, content:'O colete salva-vidas aeronáutico é inflado por acionamento manual (válvula de CO2) somente após a saída da aeronave, para não obstruir o escape pela porta/janela. Possui luz estroboscópica de ativação automática por contato com a água e apito de sinalização preso por cordão. A inspeção pré-voo confere validade do cilindro de CO2 e integridade da câmara de ar.'}
  ]},
  {num:'02', titulo:'Procedimentos de Escape', aulas:[
    {titulo:'Referência de saída e sequência de escape', norms:['colete_aero'], media:{type:'image', url:'https://images.unsplash.com/photo-1531570003789-62d56ed3b271?q=80&w=1200&auto=format&fit=crop', alt:'Helicóptero'}, content:'Antes da submersão, cada ocupante identifica sua saída primária e uma alternativa, mantendo uma mão fixa nessa referência durante todo o procedimento. A sequência padrão é: aguardar o cessar de movimento da cabine, soltar o cinto com uma mão enquanto a outra mantém a referência de saída, abrir/remover a janela ou porta e só então sair, puxando-se pela estrutura externa.'},
    {titulo:'Uso do EAPR aeronáutico (rebreather de curta duração)', norms:['colete_aero'], media:{type:'none'}, content:'O rebreather de emergência aeronáutico (short-term air supply) fornece poucos minutos de ar respirável através de um bucal, permitindo tempo adicional para orientação e escape em caso de submersão prolongada da cabine. Deve ser acionado antes da entrada na água, nunca durante o pânico inicial.'}
  ]},
  {num:'03', titulo:'Sobrevivência Pós-Escape', aulas:[
    {titulo:'Embarque em balsa LSA e sinalização', norms:['lsa_balsa'], media:{type:'image', url:'https://images.unsplash.com/photo-1760013767004-9576fc4230cd?q=80&w=1200&auto=format&fit=crop', alt:'Embarcação de sobrevivência em operação'}, content:'Após o escape, os sobreviventes devem se agrupar e localizar a balsa de sobrevivência mais próxima (lançada automaticamente ou manualmente), embarcar preferencialmente com os pés secos e acionar sinalizadores fumígenos/luminosos assim que uma aeronave ou embarcação de resgate for avistada.'},
    {titulo:'Hipotermia e sobrevivência em água fria', norms:['lsa_balsa'], media:{type:'image', url:'https://images.unsplash.com/photo-1760013767004-9576fc4230cd?q=80&w=1200&auto=format&fit=crop', alt:'Embarcação de sobrevivência em operação'}, content:'Enquanto aguarda resgate na água, adotar a postura HELP (joelhos junto ao peito, braços cruzados) reduz a perda de calor pelas áreas de maior troca térmica (tronco, virilha, axilas). Em grupo, o agrupamento em Huddle tem o mesmo efeito e ainda facilita a localização visual pelos socorristas.'}
  ]}
];
var MCIA_MODULES = [
  {num:'01', titulo:'Fundamentos do MCIA e Registro de Helideques', aulas:[
    {titulo:'Enquadramento legal: NORMAM-223 Cap. 6 e Res. IMO A.1079(28) item 5.6.2.7', norms:['normam223'], media:{type:'image', url:'https://images.unsplash.com/photo-1770099172083-724c91d9ccf6?q=80&w=1200&auto=format&fit=crop', alt:'Helideque offshore'}, content:'A NORMAM-223 (Marinha do Brasil/DPC) exige que todo helideque registrado mantenha equipe EMCIA guarnecida durante operações aéreas, com base na Resolução IMO A.1079(28) item 5.6.2.7 e na Seção STCW A-VI/3. Sem a EMCIA posicionada e equipada, a operação do helicóptero deve ser suspensa.'},
    {titulo:'Composição da EMCIA: ALPH, BOMBAV e funções no helideque', norms:['normam223'], media:{type:'image', url:'https://images.unsplash.com/photo-1770099172083-724c91d9ccf6?q=80&w=1200&auto=format&fit=crop', alt:'Helideque offshore'}, content:'A equipe é composta por um ALPH, responsável pelo contato visual e radiofônico contínuo com a aeronave, e a BOMBAV, guarnição de combate a incêndio posicionada junto ao canhão de espuma do helideque, pronta para acionamento em até 30 segundos em caso de emergência no pouso ou decolagem.'},
    {titulo:'Pré-requisitos, carga horária e validade (STCW A-VI/3 e Tabela A-VI/3)', norms:['stcw'], media:{type:'none'}, content:'O treinamento MCIA exige como pré-requisito a certificação STCW A-VI/3 (Combate a Incêndio Avançado), com carga horária mínima definida pela Tabela A-VI/3 e revalidação periódica — tipicamente a cada 5 anos — para manter a habilitação da equipe EMCIA.'}
  ]},
  {num:'02', titulo:'Infraestrutura e Equipamentos do Helideque (CAP 437)', aulas:[
    {titulo:'Sistema de dilúvio (DIFFS) e canhões de espuma ICAO Nível B', norms:['cap437'], media:{type:'image', url:'https://images.unsplash.com/photo-1770099172083-724c91d9ccf6?q=80&w=1200&auto=format&fit=crop', alt:'Helideque offshore'}, content:'O DIFFS (Deck Integrated Fire Fighting System) é acionado manualmente em estações junto ao helideque e remotamente da sala de controle, descarregando espuma ICAO Nível B (3,75 L/min/m² por ≥5 min) por bicos integrados ao piso, com resposta em até 30 segundos, conforme CAP 437 Cap. 5.'},
    {titulo:'EPI de combate a incêndio da brigada de helideque', norms:['cap437'], media:{type:'image', url:'https://plus.unsplash.com/premium_photo-1661490258326-7b7af12e3dee?q=80&w=1200&auto=format&fit=crop', alt:'Guarnição com EPI de combate a incêndio'}, content:'A guarnição EMCIA deve permanecer paramentada com EPI completo de combate a incêndio (capacete com viseira, capuz, luvas e botas resistentes a chama) durante toda a operação aérea, pronta para intervenção imediata sem tempo de vestimenta adicional.'},
    {titulo:'Apêndice L — MMHEL e protocolos de operação degradada', norms:['cap437'], media:{type:'none'}, content:'Quando um equipamento crítico do helideque está indisponível (ex.: canhão de espuma principal em manutenção), o Apêndice L (MMHEL — Master Minimum Helideck Equipment List) do CAP 437 define quais itens mínimos ainda permitem operação segura e sob quais restrições, evitando a paralisação total do helideque por uma falha pontual.'}
  ]},
  {num:'03', titulo:'Procedimentos Operacionais e Resposta a Emergência', aulas:[
    {titulo:'Protocolo de resposta a incêndio em pouso/decolagem', norms:['normam223'], media:{type:'image', url:'https://images.unsplash.com/photo-1770099172083-724c91d9ccf6?q=80&w=1200&auto=format&fit=crop', alt:'Helideque offshore'}, content:'Em caso de incêndio durante pouso ou decolagem, a BOMBAV aciona imediatamente o canhão de espuma do helideque enquanto o ALPH orienta a aeronave e aciona o alarme geral da plataforma, coordenando a resposta até a chegada de apoio adicional.'},
    {titulo:'Comunicação com ALPH/HLO (rádio VHF) e coordenação da guarnição', norms:['stcw'], media:{type:'none'}, content:'A comunicação entre o ALPH, o HLO (Helicopter Landing Officer) e o piloto segue fraseologia padronizada em VHF, confirmando condições do helideque, autorização de pouso/decolagem e eventuais emergências, mantendo todos os envolvidos cientes do status da operação em tempo real.'},
    {titulo:'Resposta a amaragem forçada (ditching) e apoio ao SAR', norms:['normam223'], media:{type:'image', url:'https://images.unsplash.com/photo-1531570003789-62d56ed3b271?q=80&w=1200&auto=format&fit=crop', alt:'Helicóptero'}, content:'Em caso de amaragem forçada nas proximidades da plataforma, a equipe aciona o protocolo de apoio ao SAR (Search and Rescue): lançamento de embarcação de resgate rápido, acionamento de sinalização e coordenação com meios aéreos/navais de busca até a localização e resgate dos sobreviventes.'}
  ]}
];
var TSP_MODULES = [
  {num:'01', titulo:'Tipos de Emergência e Embarque em Embarcações de Sobrevivência', aulas:[
    {titulo:'Classificação de emergências e sinais de alarme a bordo', norms:['tsp'], media:{type:'none'}, content:'O sinal geral de emergência (7 apitos curtos + 1 longo) convoca toda a tripulação aos postos de abandono. Cada tipo de emergência (incêndio, alagamento, abandono) tem um sinal sonoro distinto, e todo tripulante deve conhecer seu posto designado no quadro de emergência (muster list) antes de qualquer embarque.'},
    {titulo:'Embarque em balsa inflável e baleeira de sobrevivência', norms:['lsa_balsa'], media:{type:'image', url:'https://images.unsplash.com/photo-1760013767004-9576fc4230cd?q=80&w=1200&auto=format&fit=crop', alt:'Embarcação de sobrevivência em operação'}, videoUso:{titulo:'Como lançar e embarcar em uma balsa salva-vidas inflável (Marine Insight)', url:'https://www.marineinsight.com/marine-safety/video-how-to-launch-and-board-an-inflatable-life-raft/'}, content:'O abandono segue o mnemônico E.O.D.C.A.P. (Embarcar, Orientar, Desatracar, Chamar atenção, Afastar-se, Proteger-se). A balsa infla automaticamente ao puxar o cabo de disparo (painter line). Embarcar preferencialmente com os pés secos, fechar o toldo para reduzir exposição ao vento e lançar a âncora flutuante (drogue) para reduzir a deriva.'},
    {titulo:'Uso correto do colete salva-vidas e traje de imersão', norms:['tsp'], media:{type:'image', url:'https://images.unsplash.com/photo-1613002864777-3964f53925d1?q=80&w=1200&auto=format&fit=crop', alt:'Colete salva-vidas SOLAS'}, videoUso:{titulo:'Como vestir um traje de imersão em menos de 60s (AMSEA)', url:'https://www.amsea.org/post/how-to-don-an-immersion-suit'}, content:'O traje de imersão deve ser vestido o mais cedo possível, sobre a roupa normal, com o zíper frontal fechado até o queixo, capuz ajustado e luvas calçadas por último — meta de treinamento: menos de 60 segundos. O colete salva-vidas é vestido por cima do traje, afivelado, com apito e luz testados antes do embarque.'}
  ]},
  {num:'02', titulo:'Sobrevivência em Água Fria e Hipotermia', aulas:[
    {titulo:'Estágios da hipotermia e sinais de alerta', norms:['tsp'], media:{type:'none'}, content:'A hipotermia evolui em estágios: tremores e pele fria entre 35°C–33°C; confusão mental e "despimento paradoxal" entre 32°C–30°C; colapso de órgãos e risco de parada cardiorrespiratória abaixo de 28°C. Reconhecer os sinais precocemente permite intervenção antes do colapso.'},
    {titulo:'Postura HELP/Huddle e redução da perda de calor', norms:['tsp'], media:{type:'none'}, content:'A água retira calor do corpo muito mais rápido que o ar, mesmo em temperaturas acima de zero. A postura HELP (Heat Escape Lessening Posture — joelhos flexionados junto ao peito, braços cruzados) ou o agrupamento em Huddle entre sobreviventes reduzem a perda de calor nas áreas de maior troca térmica, podendo estender significativamente o tempo de sobrevivência.'},
    {titulo:'Cooperação com equipes de busca e salvamento (SAR)', norms:['tsp'], media:{type:'none'}, content:'Ao avistar uma aeronave ou embarcação de busca, os sobreviventes devem acionar sinalizadores fumígenos/luminosos, manter-se agrupados para facilitar a detecção visual e seguir as instruções da equipe SAR durante a aproximação e o resgate, evitando movimentos que dificultem a operação.'}
  ]}
];
var MODULES_BY_COURSE = {caci:CACI_MODULES, huet:HUET_MODULES, mcia:MCIA_MODULES, tsp:TSP_MODULES};

var NORMS = {
  stcw: {code:'STCW A-VI/3', titulo:'Treinamento Avançado em Combate a Incêndio', orgao:'IMO', ed:'STCW 2011 (emendado Manila)', item:'Seção A-VI/3', trecho:'Tripulantes designados para combate a incêndio devem concluir treinamento avançado cobrindo organização de combate a incêndio a bordo, técnicas de combate, uso de EAPR e coordenação de equipes.', link:'https://www.imo.org/en/OurWork/HumanElement/Pages/Training.aspx', equip:['EAPR / SCBA de circuito aberto, autonomia mínima declarada pelo fabricante (típico 30–60 min conforme cilindro)','Mangueira de incêndio e esguicho regulável (jato pleno / neblina), conforme padrão do navio','Roupa de aproximação e EPI de combate a incêndio (capacete, balaclava, luvas, botas)','Rádio portátil para coordenação entre guarnições e com a ponte de comando'], manuais:[{nome:'IMO — Human Element (STCW)',url:'https://www.imo.org/en/OurWork/HumanElement'},{nome:'OSHA 29 CFR 1910.134 — Respiratory Protection',url:'https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.134'}], descricao:'O EAPR/SCBA é composto por cilindro de ar comprimido, regulador de pressão, mangueiras de alta e baixa pressão, válvula de demanda e máscara facial de vedação total. Antes de cada uso é obrigatório o teste de estanqueidade da máscara, a checagem da pressão do cilindro e o teste do alarme sonoro de baixa pressão. A "regra dos terços" orienta o consumo de ar durante a operação: um terço para o deslocamento até o sinistro, um terço para o retorno e um terço de reserva de segurança. A colocação do equipamento é sempre feita em área segura e ventilada, com checagem em dupla (buddy check) antes do ingresso em ambiente IDLH.', imgEquip:{url:'https://plus.unsplash.com/premium_photo-1661490258326-7b7af12e3dee?q=80&w=1200&auto=format&fit=crop', alt:'Guarnição com EAPR combatendo incêndio'}},
  nfpa10: {code:'NFPA 10', titulo:'Portable Fire Extinguishers — Seleção por Classe', orgao:'NFPA', ed:'Edição 2022', item:'Cap. 5', trecho:'Extintores devem ser selecionados conforme a classe de risco presente no ambiente (A, B, C, D ou K) e a carga de incêndio prevista.', link:'https://www.nfpa.org/codes-and-standards/nfpa-10-standard-development/10', equip:['Extintor de água pressurizada (Classe A)','Extintor de CO2 e pó químico BC/ABC (Classes B/C)','Extintor de pó classe D para metais combustíveis','Extintor classe K para cozinhas industriais'], manuais:[{nome:'NFPA 10 — Standard Overview',url:'https://www.nfpa.org/codes-and-standards/nfpa-10-standard-development/10'},{nome:'Amerex — Manual de Extintores',url:'https://www.amerex-fire.com/resources'}], descricao:'A técnica padrão de operação é descrita pelo mnemônico P.A.S.S.: Puxar o pino de segurança, Apontar o bocal para a base das chamas, Segurar/apertar a alavanca de descarga e Sacudir (varrer) de um lado a outro cobrindo toda a extensão do fogo. O agente extintor deve corresponder à classe do incêndio — água para Classe A, CO2/pó químico para B e C, pó classe D para metais e agente classe K para óleos e gorduras de cozinha. O ataque é iniciado a 2–3 m de distância, aproximando-se progressivamente conforme o fogo é controlado, sempre mantendo uma rota de fuga livre atrás do operador.', imgEquip:{url:'https://images.unsplash.com/photo-1569436078135-61753b84e3e8?q=80&w=1200&auto=format&fit=crop', alt:'Extintor de incêndio portátil'}, videoUso:{titulo:'Como usar um extintor — técnica P.A.S.S. (McGill Campus Safety)', url:'https://www.mcgill.ca/campussafety/fire-prevention/extinguishers-and-training'}},
  nfpa10inst: {code:'NFPA 10 §6', titulo:'Instalação e Distâncias de Extintores', orgao:'NFPA', ed:'Edição 2022', item:'Cap. 6', trecho:'Define distância máxima de deslocamento até o extintor, altura de instalação e sinalização obrigatória.', link:'https://www.nfpa.org/codes-and-standards/nfpa-10-standard-development/10', equip:['Suporte/gancho de parede ou nicho embutido','Placa de sinalização fotoluminescente'], manuais:[{nome:'NFPA 10 — Installation Requirements',url:'https://www.nfpa.org/codes-and-standards/nfpa-10-standard-development/10'}]},
  nfpa10manut: {code:'NFPA 10 §7', titulo:'Inspeção, Manutenção e Recarga', orgao:'NFPA', ed:'Edição 2022', item:'Cap. 7', trecho:'Inspeção visual mensal e manutenção anual por técnico qualificado; teste hidrostático periódico conforme o tipo de cilindro.', link:'https://www.nfpa.org/codes-and-standards/nfpa-10-standard-development/10', equip:['Balança de precisão para checagem de carga','Manômetro de teste','Kit de teste hidrostático'], manuais:[{nome:'NFPA 10 — Inspection, Maintenance and Recharging',url:'https://www.nfpa.org/codes-and-standards/nfpa-10-standard-development/10'},{nome:'Amerex — Manual de Manutenção',url:'https://www.amerex-fire.com/resources'}]},
  po001: {code:'PO-INC-001', titulo:'Procedimento Interno de Recarga de Extintores', orgao:'RelyOn Academy (interno)', ed:'Rev. 3', item:'Seção 4', trecho:'Procedimento operacional padrão interno para recarga, etiquetagem e baixa de extintores fora de especificação.', link:'interno', equip:['Balança certificada','Etiquetas de rastreabilidade'], manuais:[]},
  solas2_1: {code:'SOLAS II-1', titulo:'Sistema de Esgoto e Controle de Avarias', orgao:'IMO', ed:'SOLAS consolidado 2020', item:'Reg. 21', trecho:'Estabelece requisitos de bombeamento de esgoto, válvulas de alívio e compartimentagem para controle de avarias e estabilidade após alagamento.', link:'https://www.imo.org/en/About/Conventions/Pages/International-Convention-for-the-Safety-of-Life-at-Sea-(SOLAS),-1974.aspx', equip:['Bomba de esgoto principal e de emergência','Válvulas de retenção e alívio','Sensores de nível de porão'], manuais:[{nome:'IMO — SOLAS Consolidated',url:'https://www.imo.org/en/About/Conventions/Pages/International-Convention-for-the-Safety-of-Life-at-Sea-(SOLAS),-1974.aspx'}]},
  colete_aero: {code:'CS-25/LSA', titulo:'Colete Salva-Vidas Aeronáutico', orgao:'ANAC / FAA', ed:'RBAC 25 / FAA-H-8083-21', item:'Equipamento de emergência', trecho:'Colete inflável individual, com acionamento manual e luz de localização, de uso obrigatório em operações sobre a água.', link:'https://www.faa.gov/regulations_policies/handbooks_manuals/aviation', equip:['Colete inflável com cilindro de CO2','Luz estroboscópica de localização','Apito de sinalização'], manuais:[{nome:'FAA-H-8083-21 — Helicopter Flying Handbook',url:'https://www.faa.gov/regulations_policies/handbooks_manuals/aviation'},{nome:'ANAC — RBAC',url:'https://www.gov.br/anac/pt-br'}], descricao:'O colete é inflado por acionamento manual de uma válvula de CO2, puxando o cordão/argola vermelha na parte frontal — preferencialmente após a saída da aeronave, para não obstruir o escape pela janela/porta. Possui luz estroboscópica de ativação automática por contato com a água e apito preso por cordão. Antes de cada voo, o tripulante verifica a validade do cilindro de CO2, a integridade da câmara de ar e veste o colete por cima da roupa, cruzado e afivelado na altura do peito e da cintura.', imgEquip:{url:'https://images.unsplash.com/photo-1613002864777-3964f53925d1?q=80&w=1200&auto=format&fit=crop', alt:'Colete salva-vidas'}},
  lsa_balsa: {code:'LSA Code', titulo:'Balsas e Equipamentos de Sobrevivência', orgao:'IMO', ed:'LSA Code consolidado', item:'Cap. IV', trecho:'Requisitos de balsas infláveis, kit de sobrevivência, sinalização e procedimentos de abandono — mnemônico E.O.D.C.A.P.', link:'https://www.imo.org/en/OurWork/Safety/Pages/LSA.aspx', equip:['Balsa inflável SOLAS com kit de sobrevivência','Sinalizador fumígeno/luminoso','Rádio VHF portátil estanque'], manuais:[{nome:'IMO — LSA Code',url:'https://www.imo.org/en/OurWork/Safety/Pages/LSA.aspx'}], descricao:'O abandono segue o mnemônico E.O.D.C.A.P. (Embarcar, Orientar, Desatracar, Chamar atenção, Afastar-se, Proteger-se). A balsa infla automaticamente ao puxar o cabo de disparo (painter line), que aciona a garrafa de CO2/N2. Após inflada e lançada ao mar, a tripulação deve embarcar preferencialmente com os pés secos, fechar as portas/toldo para reduzir exposição ao vento e frio, lançar a âncora flutuante (drogue) para reduzir a deriva e usar o kit de sobrevivência (água, sinalizadores, kit de reparo, remos) apenas conforme a necessidade.', imgEquip:{url:'https://images.unsplash.com/photo-1760013767004-9576fc4230cd?q=80&w=1200&auto=format&fit=crop', alt:'Embarcação de sobrevivência em operação'}, videoUso:{titulo:'Como lançar e embarcar em uma balsa salva-vidas inflável (Marine Insight)', url:'https://www.marineinsight.com/marine-safety/video-how-to-launch-and-board-an-inflatable-life-raft/'}},
  nr23: {code:'NR-23', titulo:'Proteção Contra Incêndios no Trabalho', orgao:'Ministério do Trabalho (Brasil)', ed:'Atualização 2019', item:'Item 23.1–23.19', trecho:'Norma regulamentadora brasileira que estabelece requisitos de proteção contra incêndios para ambientes de trabalho, incluindo brigadas.', link:'https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/normas-regulamentadoras/nr-23.pdf', equip:['Extintores conforme mapa de risco','Sinalização de rotas de fuga','Kit de primeiros socorros da brigada'], manuais:[{nome:'Gov.br — NR-23',url:'https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/normas-regulamentadoras/nr-23.pdf'}]},
  cap437: {code:'CAP 437', titulo:'Standards for Offshore Helicopter Landing Areas', orgao:'UK CAA', ed:'Edição 9.1 (jan/2026)', item:'Cap. 5 — Helideck Rescue and Fire-Fighting Facilities', trecho:'Exige espuma ICAO Nível B (3,75 L/min/m² por ≥5 min), sistema DIFFS/FMS/RMS com resposta em até 30s e mangueiras de 30 m; Apêndice L (MMHEL) orienta a operação com equipamento crítico indisponível.', link:'https://www.caa.co.uk/publication/download/16496', equip:['Sistema DIFFS (Deluge) ou FMS/RMS','Canhão de espuma ICAO Nível B','EPI de combate a incêndio da brigada de helideque (EMCIA)'], manuais:[{nome:'UK CAA — CAP 437',url:'https://www.caa.co.uk/publication/download/16496'}]},
  normam223: {code:'NORMAM-223', titulo:'Registro de Helideques — Equipe de Manobra e Combate a Incêndio de Aviação (EMCIA)', orgao:'Marinha do Brasil (DPC)', ed:'Edição vigente', item:'Capítulo 6', trecho:'Estabelece os requisitos de registro de helideques e a exigência de equipe EMCIA (1 ALPH + BOMBAV) para guarnecer o heliponto durante operações aéreas, com base na Res. IMO A.1079(28) item 5.6.2.7 e STCW Seção A-VI/3.', link:'https://www.marinha.mil.br/dpc/normas-e-procedimentos', equip:['Canhão de espuma do helideque','EPI de combate a incêndio EMCIA','Rádio VHF portátil (ALPH)'], manuais:[{nome:'Marinha do Brasil — NORMAM-223/DPC',url:'https://www.marinha.mil.br/dpc/normas-e-procedimentos'},{nome:'UK CAA — CAP 437',url:'https://www.caa.co.uk/publication/download/16496'}], descricao:'A guarnição EMCIA se posiciona no heliponto antes do início de qualquer operação aérea, com EPI completo de combate a incêndio (capacete, capuz, luvas, botas) e equipamento de resgate pronto para uso imediato. O ALPH mantém contato visual e radiofônico com a aeronave durante toda a operação, enquanto a BOMBAV permanece junto ao canhão de espuma, pronta para acionamento em até 30 segundos em caso de incêndio no pouso, na decolagem ou de amaragem forçada (ditching) nas proximidades do helideque.', imgEquip:{url:'https://images.unsplash.com/photo-1770099172083-724c91d9ccf6?q=80&w=1200&auto=format&fit=crop', alt:'Helideque offshore'}},
  tsp: {code:'STCW A-VI/1-1', titulo:'Técnicas de Sobrevivência Pessoal (PST)', orgao:'IMO', ed:'STCW 2011 (emendado Manila)', item:'Seção A-VI/1-1', trecho:'Treinamento básico obrigatório para todo tripulante, cobrindo tipos de emergência a bordo, embarque em embarcações de sobrevivência, uso de colete salva-vidas e traje de imersão, prevenção de hipotermia e cooperação com equipes de busca e salvamento.', link:'https://www.imo.org/en/OurWork/HumanElement/Pages/Training.aspx', equip:['Colete salva-vidas SOLAS com luz e apito','Traje de imersão (immersion suit)','Balsa inflável SOLAS','Sinalizador fumígeno/luminoso'], manuais:[{nome:'IMO — Human Element (STCW)',url:'https://www.imo.org/en/OurWork/HumanElement'},{nome:'OSHA — Inmersión en Agua Fria (PDF)',url:'https://obis.osha.gov/dte/grant_materials/fy12/sh-23584-12/InmersionenAguaFria.pdf'}], descricao:'O traje de imersão deve ser vestido o mais cedo possível ao primeiro sinal de emergência, sobre a roupa normal, com o zíper frontal fechado até o queixo, capuz ajustado e luvas calçadas por último — o treinamento busca a meta de menos de 60 segundos. O colete salva-vidas é vestido por cima do traje, afivelado, com apito e luz testados. Na água, a postura HELP (joelhos flexionados junto ao peito, braços cruzados) ou o agrupamento em Huddle entre sobreviventes reduzem significativamente a perda de calor corporal e o avanço da hipotermia.', imgEquip:{url:'https://images.unsplash.com/photo-1613002864777-3964f53925d1?q=80&w=1200&auto=format&fit=crop', alt:'Colete salva-vidas SOLAS'}, videoUso:{titulo:'Como vestir um traje de imersão em menos de 60s (AMSEA)', url:'https://www.amsea.org/post/how-to-don-an-immersion-suit'}},
  normam104: {code:'NORMAM-104', titulo:'Normas da Autoridade Marítima para Embarcações', orgao:'Marinha do Brasil', ed:'Edição vigente', item:'Capítulo de Segurança', trecho:'Estabelece requisitos de segurança, equipamentos salva-vidas e combate a incêndio para embarcações sob bandeira brasileira.', link:'https://www.marinha.mil.br/dpc/normas-e-procedimentos', equip:['Extintores homologados pela Marinha','Balsas e coletes certificados'], manuais:[{nome:'Marinha do Brasil — NORMAM',url:'https://www.marinha.mil.br/dpc/normas-e-procedimentos'}]},
  gmdss: {code:'GMDSS VHF/DSC', titulo:'Comunicações de Socorro VHF/DSC', orgao:'IMO / ITU', ed:'GMDSS vigente', item:'Procedimentos de socorro', trecho:'Procedimentos de chamada de socorro digital seletiva (DSC) e voz em VHF canal 16 para emergências marítimas.', link:'https://www.gov.uk/guidance/vhf-dsc-radio-distress-and-safety-procedures', equip:['Rádio VHF/DSC fixo e portátil'], manuais:[{nome:'UK Gov — VHF/DSC Procedures',url:'https://www.gov.uk/guidance/vhf-dsc-radio-distress-and-safety-procedures'}]},
  sarsat: {code:'COSPAS-SARSAT', titulo:'Localização por Satélite em Emergência', orgao:'COSPAS-SARSAT', ed:'Programa vigente', item:'EPIRB/PLB', trecho:'Sistema internacional de satélites para detecção e localização de balizas de emergência (EPIRB, PLB, ELT).', link:'https://cospas-sarsat.int/en/', equip:['EPIRB','PLB pessoal'], manuais:[{nome:'COSPAS-SARSAT — Site Oficial',url:'https://cospas-sarsat.int/en/'}]}
};

var LIB = [];
LIB.push({code:'STCW A-VI/3', trechos:['"Seafarers shall complete advanced training in fire fighting... including organisation of shipboard fire-fighting, methods of fire fighting, use of breathing apparatus." — IMO STCW Code, Seção A-VI/3.'], videos:[{titulo:'IMO — Human Element Training', url:'https://www.imo.org/en/OurWork/HumanElement/Pages/Training.aspx'}], casos:[{titulo:'Incêndio na sala de máquinas é controlado a bordo de navio da Marinha em patrulha na Amazônia', fonte:'Diário Online (DOL)', url:'https://dol.com.br/noticias/policia/noticia-193296-navio-da-marinha-do-brasil-pega-fogo-em-rio.html'}]});
LIB.push({code:'NFPA 10', trechos:['Extintores devem ser inspecionados mensalmente e submetidos à manutenção anual por pessoal qualificado, conforme NFPA 10 Cap. 7.'], videos:[{titulo:'NFPA — Portable Fire Extinguishers', url:'https://www.nfpa.org/codes-and-standards/nfpa-10-standard-development/10'}], casos:[{titulo:'CPI da Garoa: testemunha diz que extintores da pousada estavam vencidos no dia do incêndio', fonte:'Brasil de Fato', url:'https://www.brasildefato.com.br/2025/05/13/cpi-da-garoa-extintores-da-pousada-estavam-vencidos-no-dia-do-incendio-diz-testemunha/'}]});
LIB.push({code:'CAP 437', trechos:['Helideques offshore devem possuir sistema de diluvio (DIFFS) e equipe de resposta treinada, conforme CAP 437 Seção 4.'], videos:[{titulo:'UK CAA — CAP 437 Download', url:'https://www.caa.co.uk/publication/download/16496'}], casos:[{titulo:'Acidente em pouso de emergência na Bahia mata um e fere 12 funcionários da Petrobras', fonte:'TNH1', url:'https://www.tnh1.com.br/noticia/nid/acidente-em-pouso-de-emergencia-na-bahia-mata-uma-pessoa-e-fere-12-funcionarios-da-petrobras/'}]});
LIB.push({code:'NORMAM-223', trechos:['A equipe EMCIA (ALPH + BOMBAV) deve guarnecer o helideque durante toda operação de aeronave, pronta para acionar o canhão de espuma em caso de incêndio ou amaragem forçada, conforme NORMAM-223 Cap. 6.'], videos:[{titulo:'Marinha do Brasil — Normas e Procedimentos (DPC)', url:'https://www.marinha.mil.br/dpc/normas-e-procedimentos'}], casos:[{titulo:'Petrobras encontra helicóptero que desapareceu na Bacia de Campos após decolar da P-65', fonte:'Exame', url:'https://exame.com/brasil/petrobras-encontra-helicoptero-que-desapareceu-na-bacia-de-campos'}]});
LIB.push({code:'STCW A-VI/1-1', trechos:['A hipotermia evolui em estágios: tremores e pele fria entre 35°C–33°C; confusão mental e "despimento paradoxal" entre 32°C–30°C; colapso de órgãos e risco de parada cardiorrespiratória abaixo de 28°C.', 'A água retira calor do corpo muito mais rápido que o ar, mesmo em temperaturas acima de zero — por isso a prioridade é sair da água ou reduzir a área de contato (postura HELP/Huddle) o quanto antes.'], videos:[{titulo:'Cold Water Safety — Sobrevivência em água fria', url:'https://coldwatersafety.org'}], casos:[{titulo:'Pescador brasileiro é resgatado após 11 dias à deriva a bordo de um freezer no Suriname', fonte:'Diário do Nordeste', url:'https://diariodonordeste.verdesmares.com.br/ultima-hora/mundo/pescador-brasileiro-e-resgatado-apos-11-dias-a-deriva-a-bordo-de-um-freezer-no-suriname-1.3273545'},{titulo:'Hipotermia: o que acontece no corpo de quem morre de frio?', fonte:'Olhar Digital', url:'https://olhardigital.com.br/2025/09/25/medicina-e-saude/hipotermia-o-que-acontece-no-corpo-de-quem-morre-de-frio/'}]});
LIB.push({code:'NORMAM-104', trechos:['Embarcações devem manter equipamentos de combate a incêndio e salva-vidas homologados pela Autoridade Marítima Brasileira.'], videos:[{titulo:'Marinha do Brasil — Normas e Procedimentos', url:'https://www.marinha.mil.br/dpc/normas-e-procedimentos'}], casos:[{titulo:'Marinha resgata cinco pescadores após naufrágio no litoral do Pará', fonte:'Diário do Pará', url:'https://diariodopara.com.br/noticias/marinha-resgata-cinco-pescadores-apos-naufragio-no-litoral-do-para/'}]});
LIB.push({code:'NR-23', trechos:['Toda empresa deve possuir brigada de incêndio dimensionada conforme o risco e a população do local, segundo NR-23.'], videos:[{titulo:'Gov.br — Normas Regulamentadoras', url:'https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/normas-regulamentadoras/nr-23.pdf'}], casos:[{titulo:'Incêndio atinge fábrica de confecções no Rio e trabalhadores escapam pelas janelas', fonte:'Pais&Filhos', url:'https://paisefilhos.com.br/noticias/fogo-atinge-fabrica-no-rio-e-vitimas-se-penduram-em-janelas-para-escapar'}]});
LIB.push({code:'PO-INC-001', trechos:['Procedimento interno — recarga e etiquetagem de extintores fora de especificação (documento de uso interno).'], videos:[], casos:[]});
LIB.push({code:'SOLAS II-1', trechos:['Navios devem dispor de meios de bombeamento de esgoto suficientes para controlar alagamento em qualquer compartimento estanque, SOLAS II-1 Reg. 21.'], videos:[{titulo:'IMO — SOLAS Consolidated', url:'https://www.imo.org/en/About/Conventions/Pages/International-Convention-for-the-Safety-of-Life-at-Sea-(SOLAS),-1974.aspx'}], casos:[{titulo:'Marinha diz que não há "risco imediato" de naufrágio de navio encalhado no Maranhão', fonte:'Jovem Pan', url:'https://jovempan.com.br/brasil/marinha-diz-que-nao-ha-risco-imediato-de-naufragio-no-maranhao/'}]});
LIB.push({code:'LSA Code', trechos:['Toda balsa salva-vidas deve conter kit de sobrevivência padronizado e sinalizadores, conforme LSA Code Cap. IV.'], videos:[{titulo:'IMO — Life-Saving Appliances', url:'https://www.imo.org/en/OurWork/Safety/Pages/LSA.aspx'}], casos:[{titulo:'Embarcação naufraga e nove tripulantes ficam à deriva no Pará antes do resgate', fonte:'O Liberal', url:'https://www.oliberal.com/policia/embarcac-o-naufraga-e-9-tripulantes-ficam-a-deriva-no-para-1.876178'}]});
LIB.push({code:'CS-25/LSA', trechos:['Colete salva-vidas individual de uso obrigatório em operações sobre a água, com acionamento manual e luz de localização.'], videos:[{titulo:'FAA — Helicopter Flying Handbook (PDF)', url:'https://www.faa.gov/regulations_policies/handbooks_manuals/aviation'}], casos:[{titulo:'Marinha resgata 8 pessoas de helicóptero que pousou no mar em Cabo Frio (RJ)', fonte:'SBT News', url:'https://sbtnews.sbt.com.br/noticia/brasil/marinha-resgata-8-pessoas-em-helicoptero-pousado-no-mar-em-cabo-frio-rj'}]});
LIB.push({code:'GMDSS VHF/DSC', trechos:['Chamada de socorro DSC seguida de confirmação em voz no canal 16 é o procedimento padrão GMDSS.'], videos:[{titulo:'UK Gov — VHF/DSC Distress Procedures', url:'https://www.gov.uk/guidance/vhf-dsc-radio-distress-and-safety-procedures'}], casos:[{titulo:'Marinha do Brasil resgata 754 pessoas no mar e em rios em 2023', fonte:'Super Rádio Tupi', url:'https://www.tupi.fm/?p=1732666'}]});
LIB.push({code:'COSPAS-SARSAT', trechos:['O sistema COSPAS-SARSAT detecta e localiza balizas EPIRB, PLB e ELT ativadas em emergências.'], videos:[{titulo:'COSPAS-SARSAT — Site Oficial', url:'https://cospas-sarsat.int/en/'}], casos:[{titulo:'Como o sistema brasileiro de busca e salvamento age quando uma baliza de emergência é acionada', fonte:'Sociedade Militar', url:'https://www.sociedademilitar.com.br/2026/08/sissar-salvaero-brmcc-como-fab-e-acionada-busca-e-salvamento-clmz.html'}]});
function findLib(code){ for (var i=0;i<LIB.length;i++){ if (LIB[i].code===code) return LIB[i]; } return null; }
function normUrl(code){ return '#/biblioteca/'+encodeURIComponent(code); }

var VIDEOS = [
  {titulo:'IMO — Human Element Training', area:'incendio', url:'https://www.imo.org/en/OurWork/HumanElement/Pages/Training.aspx'},
  {titulo:'NFPA 10 — Portable Fire Extinguishers', area:'incendio', url:'https://www.nfpa.org/codes-and-standards/nfpa-10-standard-development/10'},
  {titulo:'UK CAA — CAP 437 Helideck Standards', area:'aeronautica', url:'https://www.caa.co.uk/publication/download/16496'},
  {titulo:'IMO — SOLAS Consolidated', area:'incendio', url:'https://www.imo.org/en/About/Conventions/Pages/International-Convention-for-the-Safety-of-Life-at-Sea-(SOLAS),-1974.aspx'},
  {titulo:'IMO — Life-Saving Appliances (LSA Code)', area:'sobrevivencia', url:'https://www.imo.org/en/OurWork/Safety/Pages/LSA.aspx'},
  {titulo:'FAA — Helicopter Flying Handbook', area:'aeronautica', url:'https://www.faa.gov/regulations_policies/handbooks_manuals/aviation'},
  {titulo:'AHA — CPR & ECC Guidelines', area:'primeiros-socorros', url:'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines'},
  {titulo:'Cold Water Safety — Sobrevivência em água fria', area:'sobrevivencia', url:'https://coldwatersafety.org'},
  {titulo:'UK Gov — GMDSS VHF/DSC', area:'comunicacoes', url:'https://www.gov.uk/guidance/vhf-dsc-radio-distress-and-safety-procedures'},
  {titulo:'COSPAS-SARSAT — Satélites de busca e salvamento', area:'comunicacoes', url:'https://cospas-sarsat.int/en/'}
];

var STOCK_IMG = {
  FIRE:{url:'https://plus.unsplash.com/premium_photo-1661490258326-7b7af12e3dee?q=80&w=1200&auto=format&fit=crop', alt:'Guarnição combatendo incêndio com mangueira', cred:'Unsplash'},
  PLAT_FIRE:{url:'https://images.unsplash.com/photo-1770099172083-724c91d9ccf6?q=80&w=1200&auto=format&fit=crop', alt:'Plataforma offshore', cred:'Unsplash'},
  RAFT:{url:'https://images.unsplash.com/photo-1760013767004-9576fc4230cd?q=80&w=1200&auto=format&fit=crop', alt:'Embarcação de resgate/sobrevivência em operação', cred:'Unsplash'},
  CPR:{url:'https://plus.unsplash.com/premium_photo-1661490162121-41df314e1ef1?q=80&w=1200&auto=format&fit=crop', alt:'Treinamento de primeiros socorros/RCP', cred:'Unsplash'},
  HELI:{url:'https://images.unsplash.com/photo-1531570003789-62d56ed3b271?q=80&w=1200&auto=format&fit=crop', alt:'Helicóptero', cred:'Unsplash'},
  BLDG_FIRE:{url:'https://images.unsplash.com/photo-1596724046566-e6b52100a7a5?q=80&w=1200&auto=format&fit=crop', alt:'Embarcação no mar', cred:'Unsplash'}
};
function mediaFor(tag){ return STOCK_IMG[tag] || STOCK_IMG.FIRE; }

function parseRoute(){
  var hash = location.hash.replace(/^#\/?/, '');
  var parts = hash.split('/').filter(Boolean);
  if (!parts.length) return {name:'inicio'};
  if (parts[0]==='cursos' && parts[1]) return {name:'curso', id:parts[1]};
  if (parts[0]==='cursos') return {name:'cursos'};
  if (parts[0]==='biblioteca' && parts[1]) return {name:'normaDetail', code:decodeURIComponent(parts[1])};
  if (parts[0]==='biblioteca') return {name:'biblioteca'};
  if (parts[0]==='videos') return {name:'videos'};
  if (parts[0]==='admin') return {name:'admin'};
  return {name:'inicio'};
}
window.addEventListener('hashchange', function(){ STATE.route = parseRoute(); render(); });
function nav(path){ location.hash = path; }

function topbar(){
  var links = [ {k:'inicio', t:'Início', path:'#/'}, {k:'cursos', t:'Cursos', path:'#/cursos'}, {k:'biblioteca', t:'Biblioteca Técnica', path:'#/biblioteca'}, {k:'videos', t:'Vídeos', path:'#/videos'}, {k:'admin', t:'Admin', path:'#/admin'} ];
  var cur = STATE.route.name;
  var lk = links.map(function(l){ var active = (cur===l.k) || (cur==='curso' && l.k==='cursos') || (cur==='normaDetail' && l.k==='biblioteca'); return '<a class="navlink'+(active?' active':'')+'" href="'+l.path+'">'+h(l.t)+'</a>'; }).join('');
  return '<header class="topbar"><div class="brand">'+svgIcon('flame',{size:22})+'<span>RelyOn Academy</span></div>'+'<nav class="navlinks">'+lk+'</nav>'+'<div class="topbar-right">'+'<button class="icon-btn'+(STATE.edit?' icon-btn-active':'')+'" onclick="toggleEdit()" title="Modo de edição — editar textos e imagens do site">'+svgIcon('edit',{size:18})+'</button>'+'<button class="icon-btn" onclick="toggleTheme()" title="Alternar tema">'+svgIcon(STATE.theme==='dark'?'sun':'moon',{size:18})+'</button>'+'<div class="user-chip">'+svgIcon('users',{size:16})+'<span>Mario Machado · Instrutor · Equipe de Combate a Incêndio e Náutica</span></div>'+'</div></header>';
}
function mnav(){ return '<nav class="mnav">'+'<a href="#/"><span>'+svgIcon('grid',{size:18})+'</span>Início</a>'+'<a href="#/cursos"><span>'+svgIcon('book',{size:18})+'</span>Cursos</a>'+'<a href="#/biblioteca"><span>'+svgIcon('scale',{size:18})+'</span>Biblioteca</a>'+'<a href="#/videos"><span>'+svgIcon('video',{size:18})+'</span>Vídeos</a>'+'</nav>'; }
function toggleTheme(){ STATE.theme = STATE.theme==='dark' ? 'light' : 'dark'; localStorage.setItem('rly-theme', STATE.theme); document.documentElement.setAttribute('data-theme', STATE.theme); render(); }

function pInicio(){
  var emAndamento = COURSES.filter(function(c){ return c.status==='em andamento'; });
  var rail = emAndamento.map(function(c){
    var img = courseImgEff(c);
    var tag = STATE.edit ? 'div' : 'a';
    var hrefAttr = STATE.edit ? '' : ' href="#/cursos/'+c.id+'"';
    var openBtn = STATE.edit ? '<a class="chip rail-open" href="#/cursos/'+c.id+'">Abrir '+svgIcon('chev',{size:10})+'</a>' : '';
    return '<'+tag+' class="rail-card"'+hrefAttr+' style="background-image:linear-gradient(180deg,rgba(0,0,0,.1),rgba(0,0,0,.65)),url('+h(img.url)+')">'+bgEditBtn('courses.'+c.id+'.img')+'<div class="rail-prog"><div class="rail-prog-bar" style="width:'+c.progresso+'%"></div></div>'+'<div class="rail-meta"><span class="chip">'+h(c.sigla)+'</span><h4>'+editableText('courses.'+c.id+'.nome', c.nome)+'</h4><span>'+c.progresso+'% concluído</span></div>'+openBtn+'</'+tag+'>';
  }).join('');
  var areas = {};
  COURSES.forEach(function(c){ areas[c.area] = (areas[c.area]||0)+1; });
  var areaCards = Object.keys(areas).map(function(a){ return '<div class="area-card"><div class="area-icon">'+svgIcon(a==='incendio'?'flame':a==='aeronautica'?'heli':a==='sobrevivencia'?'raft':a==='comunicacoes'?'link':'check',{size:22})+'</div>'+'<h4>'+h(areaName(a))+'</h4><span>'+areas[a]+' curso(s)</span></div>'; }).join('');
  var catalogo = COURSES.slice(0,4).map(courseCard).join('');
  return '<section class="hero"><div class="hero-text"><span class="eyebrow">Plataforma de Instrutores</span>'+'<h1>Formação técnica em combate a incêndio, sobrevivência e emergências</h1>'+'<p>Trilhas com rastreabilidade normativa completa: cada tema aponta a norma oficial, os equipamentos envolvidos, manuais de fabricantes e casos reais.</p>'+'<div class="hero-actions"><a class="btn btn-primary" href="#/cursos">Ver cursos'+svgIcon('chev',{size:16})+'</a><a class="btn btn-ghost" href="#/biblioteca">Biblioteca Técnica</a></div></div>'+'<div class="hero-stats">'+'<div class="stat"><strong>'+COURSES.length+'</strong><span>cursos ativos</span></div>'+'<div class="stat"><strong>'+Object.keys(NORMS).length+'</strong><span>normas rastreadas</span></div>'+'<div class="stat"><strong>'+VIDEOS.length+'</strong><span>vídeos técnicos</span></div>'+'</div></section>'+'<section class="section"><h2>Continue treinando</h2><div class="rail">'+rail+'</div></section>'+'<section class="section"><h2>Áreas técnicas</h2><div class="area-grid">'+areaCards+'</div></section>'+'<section class="section"><h2>Catálogo</h2><div class="course-grid">'+catalogo+'</div><a class="btn btn-ghost" href="#/cursos">Ver todos os cursos'+svgIcon('chev',{size:16})+'</a></section>';
}

var FILT = 'todas';
function statusChip(s){ var cls = s==='concluído' ? 'chip-done' : s==='em andamento' ? 'chip-progress' : 'chip-idle'; return '<span class="chip '+cls+'">'+h(s)+'</span>'; }
function stripCell(label, value){ return '<div class="strip-cell"><strong>'+h(value)+'</strong><span>'+h(label)+'</span></div>'; }
function courseCard(c){
  var img = courseImgEff(c);
  var tag = STATE.edit ? 'div' : 'a';
  var hrefAttr = STATE.edit ? '' : ' href="#/cursos/'+c.id+'"';
  var openBtn = STATE.edit ? '<a class="chip card-open" href="#/cursos/'+c.id+'">Abrir curso '+svgIcon('chev',{size:10})+'</a>' : '';
  return '<'+tag+' class="course-card"'+hrefAttr+'>'+'<div class="course-card-img" style="background-image:url('+h(img.url)+')"><span class="chip">'+h(c.sigla)+'</span>'+bgEditBtn('courses.'+c.id+'.img')+'</div>'+'<div class="course-card-body"><h3>'+editableText('courses.'+c.id+'.nome', c.nome)+'</h3><p>'+editableText('courses.'+c.id+'.desc', c.desc)+'</p>'+'<div class="course-card-foot">'+statusChip(c.status)+'<span>'+c.carga+' · '+c.modulos+' módulos</span></div>'+openBtn+'</div></'+tag+'>';
}
function pCursos(){
  var areas = ['todas'].concat(Object.keys(areaNamesMap()));
  var filtBar = areas.map(function(a){ return '<button class="filt-btn'+(FILT===a?' active':'')+'" onclick="setFilt(\''+a+'\')">'+h(a==='todas'?'Todas':areaName(a))+'</button>'; }).join('');
  var list = COURSES.filter(function(c){ return FILT==='todas' || c.area===FILT; }).map(courseCard).join('');
  return '<section class="section"><h2>Cursos</h2><div class="filt-bar">'+filtBar+'</div><div class="course-grid">'+(list||'<p class="muted">Nenhum curso encontrado.</p>')+'</div></section>';
}
function areaNamesMap(){ var m={}; COURSES.forEach(function(c){ m[c.area]=1; }); return m; }
function setFilt(a){ FILT=a; render(); }

var ACTIVE_LESSON = {};
var ACCORDION_OPEN = {};
function selectLesson(courseId, mi, ai){ ACTIVE_LESSON[courseId] = {mi:mi, ai:ai}; ACCORDION_OPEN[courseId] = ACCORDION_OPEN[courseId] || {}; ACCORDION_OPEN[courseId][mi] = true; render(); }
function toggleAccordion(courseId, mi){ ACCORDION_OPEN[courseId] = ACCORDION_OPEN[courseId] || {}; ACCORDION_OPEN[courseId][mi] = !ACCORDION_OPEN[courseId][mi]; render(); }
function lessonMediaHtml(path, a){
  var media = ed(path+'.media', a.media || {type:'none'});
  var vu = ed(path+'.videoUso', a.videoUso || null);
  var rows = '';
  if (media.type==='image' && media.url){ rows += '<div class="lesson-media lesson-media-img">'+editableImgTag(path+'.media', media.url, media.alt)+'</div>'; }
  else if (media.type==='embed' && media.url){ rows += '<div class="lesson-media lesson-media-embed"><iframe src="'+h(media.url)+'" loading="lazy" allowfullscreen frameborder="0"></iframe></div>'; if (STATE.edit) rows += '<button class="edit-inline-btn" onclick="editEmbedPrompt(\''+path+'\')">'+svgIcon('edit',{size:12})+' Editar embed</button>'; }
  else if (media.type==='video' && media.url){ rows += '<a class="media-row media-uso" href="'+h(media.url)+'" target="_blank" rel="noopener">'+svgIcon('video',{size:16})+'<span>'+h(media.alt||'Assistir vídeo')+'</span>'+svgIcon('chev',{size:13})+'</a>'; if (STATE.edit) rows += '<button class="edit-inline-btn" onclick="event.preventDefault();editMediaLinkPrompt(\''+path+'\')">'+svgIcon('edit',{size:12})+'</button>'; }
  else if (STATE.edit){ rows += '<button class="add-media-btn" onclick="addLessonMedia(\''+path+'\')">'+svgIcon('edit',{size:14})+' Adicionar imagem/vídeo desta aula</button>'; }
  if (vu && vu.url){ rows += '<a class="media-row media-uso" href="'+h(vu.url)+'" target="_blank" rel="noopener">'+svgIcon('video',{size:16})+'<span><strong>Vídeo de utilização do equipamento</strong><br>'+h(vu.titulo)+'</span>'+svgIcon('chev',{size:13})+'</a>'+(STATE.edit ? '<button class="edit-inline-btn" onclick="event.preventDefault();editVideoUsoPrompt(\''+path+'\')">'+svgIcon('edit',{size:12})+'</button>' : ''); }
  else if (STATE.edit){ rows += '<button class="add-media-btn" onclick="editVideoUsoPrompt(\''+path+'\')">'+svgIcon('edit',{size:14})+' Adicionar vídeo de utilização do equipamento</button>'; }
  return rows;
}
function lessonPanel(courseId, mi, ai){
  var mods = MODULES_BY_COURSE[courseId];
  var mod = mods[mi]; var a = mod.aulas[ai];
  var path = 'lessons.'+courseId+'.'+mi+'.'+ai;
  var normChips = (a.norms||[]).map(function(nk){ var n = NORMS[nk]; if (!n) return ''; return '<a class="norm-tag" href="'+normUrl(n.code)+'">'+svgIcon('scale',{size:13})+h(n.code)+'</a>'; }).join('');
  var primaryNormKey = (a.norms && a.norms[0]) ? a.norms[0] : null;
  var primaryNorm = primaryNormKey ? NORMS[primaryNormKey] : null;
  var fonte = primaryNorm ? fonteBtn(primaryNorm) : '';
  var trecho = primaryNorm ? '<blockquote class="norm-trecho">'+editableText('norms.'+primaryNormKey+'.trecho', primaryNorm.trecho||'')+'</blockquote>' : '';
  var mediaHtml = lessonMediaHtml(path, a);
  var content = '<p class="norm-desc lesson-content">'+editableBlock(path+'.content', a.content||'')+'</p>';
  var showEquip = primaryNormKey && (STATE.edit || (primaryNorm.equip && primaryNorm.equip.length));
  var showMan = primaryNormKey && (STATE.edit || (primaryNorm.manuais && primaryNorm.manuais.length));
  var equipHtml = showEquip ? ('<div class="norm-sub"><div class="norm-sub-h">'+svgIcon('wrench',{size:14})+'Equipamentos técnicos</div>'+equipBody(primaryNormKey, primaryNorm.equip)+'</div>') : '';
  var manHtml = showMan ? ('<div class="norm-sub"><div class="norm-sub-h">'+svgIcon('book',{size:14})+'Manuais e referências oficiais</div><div class="norm-man">'+manuaisBody(primaryNormKey, primaryNorm.manuais)+'</div></div>') : '';
  var flipBtn = '<button class="btn btn-ghost flip-btn" onclick="openLessonFlipbook(\''+courseId+'\','+mi+','+ai+')">'+svgIcon('book',{size:14})+' Abrir como Flipbook</button>';
  return '<div class="lesson-panel">'+'<div class="lesson-panel-h"><span class="chip">'+h(mod.num)+' · Módulo '+h(mod.titulo)+'</span></div>'+'<h2 class="lesson-title">'+editableText(path+'.titulo', a.titulo)+'</h2>'+'<div class="lesson-norms">'+normChips+fonte+flipBtn+'</div>'+mediaHtml+content+trecho+equipHtml+manHtml+'</div>';
}
function accordionHtml(courseId, mods){
  var openMap = ACCORDION_OPEN[courseId] || {};
  var active = ACTIVE_LESSON[courseId] || {mi:0, ai:0};
  return mods.map(function(m, mi){
    var isOpen = openMap[mi] !== false;
    var aulas = m.aulas.map(function(a, ai){
      var isActive = active.mi===mi && active.ai===ai;
      var normChips = (a.norms||[]).map(function(nk){ var n = NORMS[nk]; return n ? '<span class="aula-norm-mini">'+h(n.code)+'</span>' : ''; }).join('');
      var titEff = ed('lessons.'+courseId+'.'+mi+'.'+ai+'.titulo', a.titulo);
      return '<li class="aula-row'+(isActive?' aula-active':'')+'" onclick="selectLesson(\''+courseId+'\','+mi+','+ai+')">'+'<span class="aula-num">'+(ai+1)+'</span><span class="aula-tit">'+h(titEff)+'</span><span class="aula-norms">'+normChips+'</span></li>';
    }).join('');
    return '<div class="acc-block'+(isOpen?' acc-open':'')+'">'+'<div class="acc-head" onclick="toggleAccordion(\''+courseId+'\','+mi+')"><span class="mod-num">'+h(m.num)+'</span><span class="acc-tit">'+h(m.titulo)+'</span>'+svgIcon('chev',{size:14})+'</div>'+'<ul class="aula-list">'+aulas+'</ul></div>';
  }).join('');
}
function pCurso(id){
  var c = byId(COURSES, id);
  if (!c) return '<section class="section"><p>Curso não encontrado.</p></section>';
  var mods = MODULES_BY_COURSE[id];
  var img = courseImgEff(c);
  var head = '<section class="course-hero" style="position:relative;background-image:linear-gradient(180deg,rgba(0,0,0,.2),rgba(0,0,0,.75)),url('+h(img.url)+')">'+bgEditBtn('courses.'+c.id+'.img')+'<span class="chip">'+h(c.sigla)+'</span><h1>'+editableText('courses.'+c.id+'.nome', c.nome)+'</h1><p>'+editableBlock('courses.'+c.id+'.desc', c.desc)+'</p>'+'<div class="strip">'+stripCell('Carga horária', c.carga)+stripCell('Módulos', c.modulos)+stripCell('Aulas', c.aulas)+stripCell('Nível', c.nivel)+stripCell('Progresso', c.progresso+'%')+'</div></section>';
  if (!mods){ var fallback = '<div class="modulo-block"><p class="muted">Conteúdo detalhado deste curso está em preparação. Consulte a Biblioteca Técnica para as normas aplicáveis à área de '+h(areaName(c.area))+'.</p></div>'; return head+'<section class="section"><h2>Módulos e aulas</h2>'+fallback+'</section>'; }
  if (!ACTIVE_LESSON[id]) ACTIVE_LESSON[id] = {mi:0, ai:0};
  var active = ACTIVE_LESSON[id];
  return head+'<section class="section"><h2>Módulos e aulas</h2>'+'<div class="course-split">'+'<div class="course-split-left">'+accordionHtml(id, mods)+'</div>'+'<div class="course-split-right">'+lessonPanel(id, active.mi, active.ai)+'</div>'+'</div></section>';
}

function fonteBtn(n){ if (!n.link || n.link==='interno') return '<span class="fonte-badge fonte-interno">'+svgIcon('doc',{size:14})+'Documento interno</span>'; return '<a class="fonte-badge fonte-ext" href="'+h(n.link)+'" target="_blank" rel="noopener">'+svgIcon('link',{size:14})+'Fonte oficial'+svgIcon('chev',{size:12})+'</a>'; }

function pBiblioteca(){
  var cards = Object.keys(NORMS).map(function(k){ var n = NORMS[k]; return '<a class="lib-card" href="'+normUrl(n.code)+'"><div class="lib-card-h"><span class="chip">'+h(n.orgao)+'</span>'+svgIcon('scale',{size:16})+'</div>'+'<h4>'+h(n.code)+'</h4><p>'+h(normTitulo(k))+'</p></a>'; }).join('');
  return '<section class="section"><h2>Biblioteca Técnica</h2><p class="muted">Normas, equipamentos, manuais de fabricantes, vídeos e casos reais organizados por tema — base de consulta para instrutores.</p>'+'<div class="lib-grid">'+cards+'</div></section>';
}
function pNormaDetail(code){
  var n = null, key = null;
  Object.keys(NORMS).forEach(function(k){ if (NORMS[k].code===code) { n = NORMS[k]; key = k; } });
  if (!n) return '<section class="section"><p>Norma não encontrada. <a href="#/biblioteca">Voltar à Biblioteca</a></p></section>';
  var lib = findLib(n.code);
  var trechos = lib && lib.trechos.length ? lib.trechos.map(function(t){ return '<blockquote class="norm-trecho">'+h(t)+'</blockquote>'; }).join('') : '<p class="muted">Sem trechos cadastrados.</p>';
  var videoRows = [];
  var vuRow = normVideoUso(key);
  if (vuRow && vuRow.url) videoRows.push('<a class="media-row media-uso" href="'+h(vuRow.url)+'" target="_blank" rel="noopener">'+svgIcon('video',{size:16})+'<span><strong>Vídeo de utilização do equipamento</strong><br>'+h(vuRow.titulo)+'</span>'+svgIcon('chev',{size:13})+'</a>'+(STATE.edit?'<button class="edit-inline-btn" onclick="event.preventDefault();editVideoUsoPrompt(\'norms.'+key+'\')">'+svgIcon('edit',{size:12})+'</button>':''));
  if (lib && lib.videos.length) lib.videos.forEach(function(v){ videoRows.push('<a class="media-row" href="'+h(v.url)+'" target="_blank" rel="noopener">'+svgIcon('video',{size:16})+'<span>'+h(v.titulo)+'</span>'+svgIcon('chev',{size:13})+'</a>'); });
  var videos = videoRows.length ? videoRows.join('') : (STATE.edit ? '' : '<p class="muted">Sem vídeos cadastrados.</p>');
  var casos = lib && lib.casos.length ? lib.casos.map(function(c){ return '<a class="media-row" href="'+h(c.url)+'" target="_blank" rel="noopener">'+svgIcon('news',{size:16})+'<span>'+h(c.titulo)+' <em>— '+h(c.fonte)+'</em></span>'+svgIcon('chev',{size:13})+'</a>'; }).join('') : '<p class="muted">Sem casos cadastrados.</p>';
  var equipHtml = equipBody(key, n.equip);
  var manHtml = manuaisBody(key, n.manuais);
  var imgVal = normImgEquip(key);
  var imgHtml = (imgVal && imgVal.url) ? ('<div class="norma-img">'+editableImgTag('norms.'+key+'.imgEquip', imgVal.url, imgVal.alt)+'</div>') : (STATE.edit ? ('<div class="norma-img-empty"><button class="add-media-btn" onclick="editImagePrompt(\'norms.'+key+'.imgEquip\')">'+svgIcon('edit',{size:14})+' Adicionar imagem do equipamento</button></div>') : '');
  var descVal = normDescricao(key);
  var descHtml = (descVal || STATE.edit) ? ('<div class="detail-col detail-full"><h4>'+svgIcon('doc',{size:16})+'Descrição detalhada e como usar</h4><p class="norm-desc">'+editableBlock('norms.'+key+'.descricao', n.descricao||'')+'</p></div>') : '';
  var vuVal = normVideoUso(key);
  var vuHtml = (vuVal && vuVal.url) ? '' : (STATE.edit ? ('<button class="add-media-btn" onclick="editVideoUsoPrompt(\'norms.'+key+'\')">'+svgIcon('edit',{size:14})+' Adicionar vídeo de utilização do equipamento</button>') : '');
  return '<section class="section"><a class="back-link" href="#/biblioteca">'+svgIcon('chev',{size:14})+' Biblioteca Técnica</a>'+'<div class="norma-detail"><span class="chip">'+h(n.orgao)+'</span><h1>'+h(n.code)+'</h1><h3>'+editableText('norms.'+key+'.titulo', n.titulo)+'</h3><span class="norm-meta">'+h(n.ed)+' · '+h(n.item)+'</span>'+fonteBtn(n)+' <button class="btn btn-ghost flip-btn" onclick="openNormFlipbook(\''+key+'\')">'+svgIcon('book',{size:14})+' Abrir como Flipbook</button>'+imgHtml+'<div class="detail-grid">'+'<div class="detail-col"><h4>'+svgIcon('doc',{size:16})+'Trecho da norma</h4>'+trechos+'</div>'+descHtml+'<div class="detail-col"><h4>'+svgIcon('wrench',{size:16})+'Equipamentos</h4>'+equipHtml+'</div>'+'<div class="detail-col"><h4>'+svgIcon('book',{size:16})+'Manuais</h4><div class="norm-man">'+manHtml+'</div></div>'+'<div class="detail-col"><h4>'+svgIcon('video',{size:16})+'Vídeos'+'</h4>'+videos+vuHtml+'</div>'+'<div class="detail-col"><h4>'+svgIcon('case',{size:16})+'Casos reais</h4>'+casos+'</div>'+'</div></div></section>';
}

function videoCard(v, idx){
  var eff = getEffVideo(idx);
  var editBtn = STATE.edit ? '<button class="edit-inline-btn video-edit-btn" onclick="event.preventDefault();event.stopPropagation();editVideoCardPrompt('+idx+')">'+svgIcon('edit',{size:13})+'</button>' : '';
  return '<a class="video-card" href="'+h(eff.url)+'" target="_blank" rel="noopener">'+editBtn+'<div class="video-thumb">'+svgIcon('play',{size:28})+'</div>'+'<div class="video-body"><span class="chip">'+h(areaName(eff.area))+'</span><h4>'+h(eff.titulo)+'</h4></div></a>';
}
function pVideos(){ return '<section class="section"><h2>Vídeos Técnicos</h2><p class="muted">Links organizados por área, direto das fontes oficiais.</p><div class="video-grid">'+VIDEOS.map(function(v,idx){ return videoCard(v, idx); }).join('')+'</div></section>'; }

function pAdmin(){
  var jsonStr = JSON.stringify(EDITS, null, 2);
  return '<section class="section"><h2>Painel do Instrutor</h2><div class="admin-grid">'+'<div class="admin-card"><strong>'+COURSES.length+'</strong><span>cursos cadastrados</span></div>'+'<div class="admin-card"><strong>'+Object.keys(NORMS).length+'</strong><span>normas rastreadas</span></div>'+'<div class="admin-card"><strong>'+LIB.length+'</strong><span>entradas na biblioteca técnica</span></div>'+'<div class="admin-card"><strong>'+VIDEOS.length+'</strong><span>vídeos catalogados</span></div>'+'</div>'+'<div class="modulo-block" style="margin-top:28px"><h3 style="margin-bottom:6px">Modo de Edição</h3>'+'<p class="muted">Clique no ícone de lápis no topo da página para ativar o modo de edição. Com ele ativo, clique em qualquer texto para editá-lo, clique em uma imagem para trocar a URL, e use os botões pontilhados para adicionar mídia onde não houver. As alterações ficam salvas neste navegador.</p>'+'<h3 style="margin:18px 0 6px">Editor Avançado (JSON)</h3>'+'<p class="muted">Edita diretamente todas as sobreposições de conteúdo — útil para colar textos extraídos de outro lugar em qualquer campo do site, ou para backup/restauração.</p>'+'<textarea id="edits-json" class="json-editor" spellcheck="false">'+h(jsonStr)+'</textarea>'+'<div class="admin-actions">'+'<button class="btn btn-primary" onclick="saveJsonEditor()">Salvar JSON</button>'+'<button class="btn btn-ghost" onclick="exportEdits()">Exportar backup</button>'+'<button class="btn btn-ghost" onclick="document.getElementById(\'import-file\').click()">Importar backup</button>'+'<input type="file" id="import-file" accept="application/json" style="display:none" onchange="importEdits(event)">'+'<button class="btn btn-ghost" onclick="resetEdits()">Restaurar conteúdo original</button>'+'</div></div></section>';
}

function foot(){ return '<footer class="foot"><span>© 2026 RelyOn Academy — ferramenta de desenvolvimento de instrutores.</span></footer>'; }

function render(){
  document.documentElement.setAttribute('data-theme', STATE.theme);
  document.documentElement.classList.toggle('edit-on', !!STATE.edit);
  var r = STATE.route;
  var content;
  if (r.name==='inicio') content = pInicio();
  else if (r.name==='cursos') content = pCursos();
  else if (r.name==='curso') content = pCurso(r.id);
  else if (r.name==='biblioteca') content = pBiblioteca();
  else if (r.name==='normaDetail') content = pNormaDetail(r.code);
  else if (r.name==='videos') content = pVideos();
  else if (r.name==='admin') content = pAdmin();
  else content = pInicio();
  document.getElementById('app').innerHTML = topbar()+'<main class="main">'+content+'</main>'+mnav()+foot();
  window.scrollTo(0,0);
}

STATE.route = parseRoute();
render();
