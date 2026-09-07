var LOWER = "abcdefghijklmnopqrstuvwxyz";
  var UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var DIGITS = "0123456789";

  function buildMap(lowerStart, upperStart, digitStart){
    var map = {};
    for(var i=0;i<26;i++){
      if(lowerStart!==null) map[LOWER[i]] = String.fromCodePoint(lowerStart+i);
      if(upperStart!==null) map[UPPER[i]] = String.fromCodePoint(upperStart+i);
    }
    if(digitStart!==null){
      for(var d=0;d<10;d++) map[DIGITS[d]] = String.fromCodePoint(digitStart+d);
    }
    return map;
  }
  function applyMap(text, map, fallback){
    var out = "";
    for(var i=0;i<text.length;i++){
      var ch = text[i];
      out += (map && map[ch]) ? map[ch] : (fallback ? fallback(ch) : ch);
    }
    return out;
  }

  var BOLD = buildMap(0x1D41A, 0x1D400, 0x1D7CE);
  var ITALIC = buildMap(0x1D44E, 0x1D434, null);
  var BOLD_ITALIC = buildMap(0x1D482, 0x1D468, null);
  var SCRIPT = buildMap(0x1D4B6, 0x1D49C, null);
  var BOLD_SCRIPT = buildMap(0x1D4EA, 0x1D4D0, null);
  var FRAKTUR = buildMap(0x1D51E, 0x1D504, null);
  var BOLD_FRAKTUR = buildMap(0x1D586, 0x1D56C, null);
  var DOUBLE_STRUCK = buildMap(0x1D552, 0x1D538, 0x1D7D8);
  var SANS = buildMap(0x1D5BA, 0x1D5A0, 0x1D7E2);
  var SANS_BOLD = buildMap(0x1D5EE, 0x1D5D4, 0x1D7EC);
  var SANS_ITALIC = buildMap(0x1D622, 0x1D608, null);
  var SANS_BOLD_ITALIC = buildMap(0x1D656, 0x1D63C, null);
  var MONO = buildMap(0x1D68A, 0x1D670, 0x1D7F6);

  SCRIPT["e"]="\u212F"; SCRIPT["E"]=String.fromCodePoint(0x2130);
  SCRIPT["g"]="\u210A"; SCRIPT["o"]="\u2134";
  SCRIPT["H"]="\u210B"; SCRIPT["I"]="\u2110"; SCRIPT["L"]="\u2112"; SCRIPT["R"]="\u211B";
  FRAKTUR["H"]="\u210C"; FRAKTUR["I"]="\u2111"; FRAKTUR["R"]="\u211C"; FRAKTUR["Z"]="\u2128";
  DOUBLE_STRUCK["C"]="\u2102"; DOUBLE_STRUCK["H"]="\u210D"; DOUBLE_STRUCK["N"]="\u2115";
  DOUBLE_STRUCK["P"]="\u2119"; DOUBLE_STRUCK["Q"]="\u211A"; DOUBLE_STRUCK["R"]="\u211D"; DOUBLE_STRUCK["Z"]="\u2124";
  ITALIC["h"]="\u210E";

  var CIRCLED = buildMap(0x24D0, 0x24B6, 0x2460); CIRCLED["0"]="\u24EA";
  var CIRCLED_BLACK = buildMap(null, 0x1F150, null);
  var SQUARED = buildMap(null, 0x1F130, null);
  var SQUARED_NEG = buildMap(null, 0x1F170, null);
  var FULLWIDTH = buildMap(0xFF41, 0xFF21, 0xFF10);
  var PAREN = buildMap(0x249C, 0x1F110, null);

  function smallCaps(text){
    var map = {a:'ᴀ',b:'ʙ',c:'ᴄ',d:'ᴅ',e:'ᴇ',f:'ꜰ',g:'ɢ',h:'ʜ',i:'ɪ',j:'ᴊ',k:'ᴋ',l:'ʟ',m:'ᴍ',n:'ɴ',o:'ᴏ',p:'ᴘ',q:'ǫ',r:'ʀ',s:'ꜱ',t:'ᴛ',u:'ᴜ',v:'ᴠ',w:'ᴡ',x:'x',y:'ʏ',z:'ᴢ'};
    return applyMap(text.toLowerCase(), map);
  }
  function superscript(text){
    var map = {a:'ᵃ',b:'ᵇ',c:'ᶜ',d:'ᵈ',e:'ᵉ',f:'ᶠ',g:'ᵍ',h:'ʰ',i:'ⁱ',j:'ʲ',k:'ᵏ',l:'ˡ',m:'ᵐ',n:'ⁿ',o:'ᵒ',p:'ᵖ',q:'q',r:'ʳ',s:'ˢ',t:'ᵗ',u:'ᵘ',v:'ᵛ',w:'ʷ',x:'ˣ',y:'ʸ',z:'ᶻ',
      0:'⁰',1:'¹',2:'²',3:'³',4:'⁴',5:'⁵',6:'⁶',7:'⁷',8:'⁸',9:'⁹'};
    return applyMap(text, map);
  }
  function upsideDown(text){
    var map = {a:'ɐ',b:'q',c:'ɔ',d:'p',e:'ǝ',f:'ɟ',g:'ƃ',h:'ɥ',i:'ᴉ',j:'ɾ',k:'ʞ',l:'l',m:'ɯ',n:'u',o:'o',p:'d',q:'b',r:'ɹ',s:'s',t:'ʇ',u:'n',v:'ʌ',w:'ʍ',x:'x',y:'ʎ',z:'z'};
    var chars = text.split('').reverse();
    return chars.map(function(c){ return map[c] !== undefined ? map[c] : c; }).join('');
  }
  function strikethrough(text){ return text.split('').map(function(c){return c+"\u0336";}).join(''); }
  function underline(text){ return text.split('').map(function(c){return c+"\u0332";}).join(''); }
  function doubleUnderline(text){ return text.split('').map(function(c){return c+"\u0333";}).join(''); }
  function overline(text){ return text.split('').map(function(c){return c+"\u0305";}).join(''); }
  function slashThrough(text){ return text.split('').map(function(c){return c+"\u0338";}).join(''); }
  function bubbleWrap(text){ return text.split('').join(' '); }
  function tinyBox(text){ return "[ " + text.toUpperCase().split('').join(' ') + " ]"; }
  function spacedOut(sep){ return function(text){ return text.split('').join(sep); }; }
  function wideText(text){ return applyMap(text, FULLWIDTH); }
  function repeatWrap(prefix, suffix){ return function(text){ return prefix + text + suffix; }; }
  function dotted(text){ return text.split('').map(function(c){ return /\s/.test(c) ? c : c+"\u0307"; }).join(''); }
  function currency(text){
    var map = {a:'₳',b:'฿',c:'₵',d:'Đ',e:'€',f:'₣',g:'₲',h:'Ⱨ',i:'ł',j:'J',k:'₭',l:'Ⱡ',m:'₥',n:'₦',o:'Ø',p:'₱',q:'Q',r:'Ɽ',s:'$',t:'₮',u:'Ʉ',v:'V',w:'₩',x:'Ӿ',y:'Ɏ',z:'Ⱬ'};
    return applyMap(text.toLowerCase(), map);
  }

  var styles = [
    {name:"Bold", fn:function(t){return applyMap(t, BOLD);}},
    {name:"Italic", fn:function(t){return applyMap(t, ITALIC);}},
    {name:"Bold Italic", fn:function(t){return applyMap(t, BOLD_ITALIC);}},
    {name:"Script", fn:function(t){return applyMap(t, SCRIPT);}},
    {name:"Bold Script", fn:function(t){return applyMap(t, BOLD_SCRIPT);}},
    {name:"Fraktur / Gothic", fn:function(t){return applyMap(t, FRAKTUR);}},
    {name:"Bold Fraktur", fn:function(t){return applyMap(t, BOLD_FRAKTUR);}},
    {name:"Double-Struck", fn:function(t){return applyMap(t, DOUBLE_STRUCK);}},
    {name:"Sans", fn:function(t){return applyMap(t, SANS);}},
    {name:"Sans Bold", fn:function(t){return applyMap(t, SANS_BOLD);}},
    {name:"Sans Italic", fn:function(t){return applyMap(t, SANS_ITALIC);}},
    {name:"Sans Bold Italic", fn:function(t){return applyMap(t, SANS_BOLD_ITALIC);}},
    {name:"Monospace", fn:function(t){return applyMap(t, MONO);}},
    {name:"Small Caps", fn:smallCaps},
    {name:"Superscript", fn:superscript},
    {name:"Fullwidth", fn:wideText},
    {name:"Circled", fn:function(t){return applyMap(t, CIRCLED);}},
    {name:"Circled Black", fn:function(t){return applyMap(t.toUpperCase(), CIRCLED_BLACK, function(c){return c;});}},
    {name:"Squared", fn:function(t){return applyMap(t.toUpperCase(), SQUARED, function(c){return c;});}},
    {name:"Squared Negative", fn:function(t){return applyMap(t.toUpperCase(), SQUARED_NEG, function(c){return c;});}},
    {name:"Parenthesized", fn:function(t){return applyMap(t, PAREN, function(c){return c;});}},
    {name:"Currency", fn:currency},
    {name:"Upside Down", fn:upsideDown},
    {name:"Strikethrough", fn:strikethrough},
    {name:"Underline", fn:underline},
    {name:"Double Underline", fn:doubleUnderline},
    {name:"Overline", fn:overline},
    {name:"Slashed", fn:slashThrough},
    {name:"Dotted", fn:dotted},
    {name:"Wide Spaced", fn:spacedOut(" ")},
    {name:"Dot Spaced", fn:spacedOut(".")},
    {name:"Bubble", fn:bubbleWrap},
    {name:"Boxed Letters", fn:tinyBox},
    {name:"Arrow Wrap", fn:repeatWrap("»» ", " ««")},
    {name:"Star Wrap", fn:repeatWrap("★彡 ", " 彡★")},
    {name:"Xx Wrap", fn:repeatWrap("Xx_", "_xX")},
    {name:"Tilde Wrap", fn:repeatWrap("~*~ ", " ~*~")},
    {name:"Cursive Dots", fn:function(t){return applyMap(t, SCRIPT)+" ⋆";}},
    {name:"Ornate 1", fn:function(t){return "🍒 ⋆ 🍉  🎀  "+applyMap(t, BOLD_SCRIPT)+"  🎀  🍉 ⋆ 🍒";}},
    {name:"Ornate 2", fn:function(t){return "✮  🎀  "+applyMap(t, BOLD_SCRIPT)+"  🎀  ✮";}},
    {name:"Ornate 3", fn:function(t){return "๑۞๑,¸¸,ø¤º°`°๑۩   🎀  "+applyMap(t, BOLD_SCRIPT)+"  🎀   ۩๑°`°º¤ø,¸¸,๑۞๑";}},
    {name:"Ornate 4", fn:function(t){return "🍰  🎀  "+applyMap(t, BOLD_SCRIPT)+"  🎀  🍰";}},
    {name:"Ornate 5", fn:function(t){return "••¤(`×  🎀  "+applyMap(t, BOLD_SCRIPT)+"  🎀  ×`(¤••";}},
    {name:"Ornate 6", fn:function(t){return "😲🐉  "+applyMap(t, BOLD_SCRIPT)+"  ♣🐯";}},
    {name:"Ornate 7", fn:function(t){return "🎉👹  "+applyMap(t, BOLD_SCRIPT)+"  🐍😝";}},
    {name:"Ornate 8", fn:function(t){return "¸„.-•~¹°”ˆ˜¨ "+applyMap(t, BOLD_SCRIPT)+" ¨˜ˆ”°¹~•-.„¸";}},
    {name:"Ornate 9", fn:function(t){return "`•.¸¸.•´´¯`••._.• "+applyMap(t, BOLD_SCRIPT)+" •._.••`¯´´•.¸¸.•`";}},
    {name:"Ornate 10", fn:function(t){return "🐻☞  "+applyMap(t, BOLD_SCRIPT)+"  🎯💙";}},
    {name:"Ornate 11", fn:function(t){return "☯🐊  "+applyMap(t, BOLD_SCRIPT)+"  🐠🎅";}},
    {name:"Ornate 12", fn:function(t){return "⛵🐤  "+applyMap(t, BOLD_SCRIPT)+"  🐠🌷";}},
    {name:"Ornate 13", fn:function(t){return "ஜ۩۞۩ஜ "+applyMap(t, BOLD_SCRIPT)+" ஜ۩۞۩ஜ";}},
    {name:"Ornate 14", fn:function(t){return "🎃🔥  "+applyMap(t, BOLD_SCRIPT)+"  👌💣";}},
    {name:"Ornate 15", fn:function(t){return "¤ (¯´☆✭.¸_)¤ "+applyMap(t, BOLD_SCRIPT)+" ¤(_¸.✭☆´¯) ¤";}},
    {name:"Ornate 16", fn:function(t){return "💝😡  "+applyMap(t, BOLD_SCRIPT)+"  ✌★";}},
    {name:"Ornate 17", fn:function(t){return "ൠ🐤  "+applyMap(t, BOLD_SCRIPT)+"  👺💔";}},
    {name:"Ornate 18", fn:function(t){return "ൠ😾  "+applyMap(t, BOLD_SCRIPT)+"  ✋♗";}},
    {name:"Ornate 19", fn:function(t){return "😡🐺  "+applyMap(t, BOLD_SCRIPT)+"  💙😈";}},
    {name:"Ornate 20", fn:function(t){return "🐤👍  "+applyMap(t, BOLD_SCRIPT)+"  ☟💥";}},
    {name:"Ornate 21", fn:function(t){return "💎✋  "+applyMap(t, BOLD_SCRIPT)+"  ♦🐝";}},
    {name:"Ornate 22", fn:function(t){return "☟🔥  "+applyMap(t, BOLD_SCRIPT)+"  ♔💚";}},
    {name:"Ornate 23", fn:function(t){return "☟😂  "+applyMap(t, BOLD_SCRIPT)+"  🎁♕";}},
    {name:"Ornate 24", fn:function(t){return "☮🎅  "+applyMap(t, BOLD_SCRIPT)+"  ★💚";}},
    {name:"Ornate 25", fn:function(t){return "•._.••´¯``•.¸¸.•` "+applyMap(t, BOLD_SCRIPT)+" `•.¸¸.•´´¯`••._.•";}},
    {name:"Ornate 26", fn:function(t){return "👮♠  "+applyMap(t, BOLD_SCRIPT)+"  🏆☝";}},
    {name:"Ornate 27", fn:function(t){return "`•.¸¸.•´´¯`••._.•   🎀  "+applyMap(t, BOLD_SCRIPT)+"  🎀   •._.••`¯´´•.¸¸.•`";}},
    {name:"Ornate 28", fn:function(t){return "✴  🎀  "+applyMap(t, BOLD_SCRIPT)+"  🎀  ✴";}},
    {name:"Ornate 29", fn:function(t){return ",-*'^'~*-.,_,.-*~   🎀  "+applyMap(t, BOLD_SCRIPT)+"   ~*-.,_,.-*~'^'*-,";}}
  ];

(function(){
  var grid = document.getElementById('grid');
  var input = document.getElementById('srcInput');
  if(!grid || !input) return;

  var copyIconSVG = '<svg class="copy-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';

  var placeholder = input.getAttribute('data-placeholder-text') || 'Type your text here';
  var copyLabel = input.getAttribute('data-copy-label') || 'Copy';
  var copiedLabel = input.getAttribute('data-copied-label') || 'Copied';

  var lastResults = styles.map(function(s){ return s.fn(placeholder); });

  // Build grid once
  var frag = document.createDocumentFragment();
  styles.forEach(function(s, idx){
    var card = document.createElement('div');
    card.className = 'style-card';
    card.id = 'style-' + idx;

    var textWrap = document.createElement('div');
    textWrap.className = 'style-text';

    var rendered = document.createElement('span');
    rendered.className = 'rendered';
    rendered.textContent = lastResults[idx];

    var name = document.createElement('span');
    name.className = 'style-name';
    name.textContent = s.name;

    textWrap.appendChild(rendered);
    textWrap.appendChild(name);

    var btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.type = 'button';
    btn.setAttribute('data-index', idx);
    btn.innerHTML = copyIconSVG + '<span class="copy-label">' + copyLabel + '</span>';

    card.appendChild(textWrap);
    card.appendChild(btn);
    frag.appendChild(card);
  });
  grid.appendChild(frag);

  var renderedSpans = styles.map(function(s, idx){
    var card = document.getElementById('style-' + idx);
    return card ? card.querySelector('.rendered') : null;
  });

  // --- cookie helpers ---
  var COOKIE_NAME = "fancyTextInput";
  function setCookie(name, value, days){
    var expires = "";
    if(days){
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/; SameSite=Lax";
  }
  function getCookie(name){
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }

  var savedValue = getCookie(COOKIE_NAME);
  if(savedValue !== null && savedValue.length){
    input.value = savedValue;
  }

  function update(){
    var raw = input.value || "";
    var text = raw.length ? raw : placeholder;
    setCookie(COOKIE_NAME, raw, 30);
    styles.forEach(function(s, idx){
      var result;
      try{ result = s.fn(text); } catch(e){ result = text; }
      lastResults[idx] = result;
      if(renderedSpans[idx]){
        renderedSpans[idx].textContent = result;
      }
    });
  }

  function copyText(text, btn){
    var label = btn.querySelector('.copy-label');
    function done(){
      if(label){ label.textContent = copiedLabel; }
      btn.classList.add('copied');
      setTimeout(function(){
        if(label){ label.textContent = copyLabel; }
        btn.classList.remove('copied');
      }, 1200);
    }
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(done).catch(function(){ fallbackCopy(text, done); });
    } else {
      fallbackCopy(text, done);
    }
  }
  function fallbackCopy(text, done){
    var ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try{ document.execCommand('copy'); }catch(e){}
    document.body.removeChild(ta);
    done();
  }

  grid.addEventListener('click', function(e){
    var btn = e.target.closest ? e.target.closest('.copy-btn') : null;
    if(!btn) return;
    var idx = parseInt(btn.getAttribute('data-index'), 10);
    copyText(lastResults[idx], btn);
  });

  input.addEventListener('input', update);
  if(savedValue !== null && savedValue.length){
    update();
  }

  var inputRow = document.querySelector('.input-row');
  input.addEventListener('focus', function(){
    if(inputRow) inputRow.classList.add('focused');
    input.select();
  });
  input.addEventListener('blur', function(){
    if(inputRow) inputRow.classList.remove('focused');
  });
})();

// --- simple click-to-copy for emoji & symbol pages ---
(function(){
  function copyPlain(text, el){
    function flash(){
      el.classList.add('copied');
      setTimeout(function(){ el.classList.remove('copied'); }, 800);
    }
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(flash);
    } else {
      var ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try{ document.execCommand('copy'); }catch(e){}
      document.body.removeChild(ta);
      flash();
    }
  }
  document.addEventListener('click', function(e){
    var emojiBtn = e.target.closest ? e.target.closest('.emoji-copy') : null;
    if(emojiBtn){ copyPlain(emojiBtn.getAttribute('data-emoji'), emojiBtn); return; }
    var symBtn = e.target.closest ? e.target.closest('.symbol-copy') : null;
    if(symBtn){ copyPlain(symBtn.getAttribute('data-symbol'), symBtn); return; }
  });
})();
