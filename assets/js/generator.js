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

  var placeholder = input.getAttribute('data-placeholder-text') || 'Type your text here';
  var copyLabel = input.getAttribute('data-copy-label') || 'Copy';
  var copiedLabel = input.getAttribute('data-copied-label') || 'Copied';

  var lastResults = styles.map(function(s){ return s.fn(placeholder); });

  // Cards are already server-rendered in the HTML (SEO) — just grab the existing spans.
  var renderedSpans = styles.map(function(s, idx){
    var card = document.getElementById('style-' + idx);
    return card ? card.querySelector('.rendered') : null;
  });

  // Re-run the transforms once on load using the page's actual (localized) placeholder,
  // since the static HTML is pre-rendered with the English placeholder text.
  styles.forEach(function(s, idx){
    var result;
    try{ result = s.fn(placeholder); } catch(e){ result = placeholder; }
    lastResults[idx] = result;
    if(renderedSpans[idx]){ renderedSpans[idx].textContent = result; }
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

// --- navbar: hamburger + language dropdown + theme dropdown ---
(function(){
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');
  if(navToggle && navMenu){
    navToggle.addEventListener('click', function(){
      var isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  var langDropdown = document.getElementById('langDropdown');
  var langToggle = document.getElementById('langToggle');
  if(langDropdown && langToggle){
    function closeLangMenu(){
      langDropdown.classList.remove('open');
      langToggle.setAttribute('aria-expanded', 'false');
    }
    langToggle.addEventListener('click', function(e){
      e.stopPropagation();
      var isOpen = langDropdown.classList.toggle('open');
      langToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    document.addEventListener('click', function(e){
      if(!langDropdown.contains(e.target)){ closeLangMenu(); }
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape'){ closeLangMenu(); }
    });
  }

  // --- theme switcher: day (default) / dark / system ---
  function getCookie(name){
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }
  function setCookie(name, value, days){
    var expires = "";
    if(days){
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/; SameSite=Lax";
  }

  var THEME_COOKIE = 'fancyTextTheme';
  var themeDropdown = document.getElementById('themeDropdown');
  var themeToggle = document.getElementById('themeToggle');
  var themeCurrent = document.getElementById('themeCurrent');
  var themeIcon = document.getElementById('themeIcon');
  var themeMenu = document.getElementById('themeMenu');
  if(!themeDropdown || !themeToggle) return;
  var themeButtons = themeMenu.querySelectorAll('button');
  var sunIcon = '<circle cx="12" cy="12" r="5"></circle><path d="M12 1v2"></path><path d="M12 21v2"></path><path d="M4.22 4.22l1.42 1.42"></path><path d="M18.36 18.36l1.42 1.42"></path><path d="M1 12h2"></path><path d="M21 12h2"></path><path d="M4.22 19.78l1.42-1.42"></path><path d="M18.36 5.64l1.42-1.42"></path>';
  var moonIcon = '<path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"></path>';
  var systemIcon = '<rect x="2" y="3" width="20" height="14" rx="2"></rect><path d="M8 21h8"></path><path d="M12 17v4"></path>';

  function resolveTheme(pref){
    if(pref === 'system'){
      return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
    }
    return pref;
  }

  function applyTheme(pref){
    var resolved = resolveTheme(pref);
    document.documentElement.setAttribute('data-theme', resolved);
    if(pref === 'light'){
      themeCurrent.textContent = 'Day';
      themeIcon.innerHTML = sunIcon;
    } else if(pref === 'dark'){
      themeCurrent.textContent = 'Dark';
      themeIcon.innerHTML = moonIcon;
    } else {
      themeCurrent.textContent = 'System';
      themeIcon.innerHTML = systemIcon;
    }
    themeButtons.forEach(function(b){
      b.classList.toggle('selected', b.getAttribute('data-value') === pref);
    });
  }

  function closeThemeMenu(){
    themeDropdown.classList.remove('open');
    themeToggle.setAttribute('aria-expanded', 'false');
  }

  var savedTheme = getCookie(THEME_COOKIE) || 'light';
  applyTheme(savedTheme);

  themeToggle.addEventListener('click', function(e){
    e.stopPropagation();
    var isOpen = themeDropdown.classList.toggle('open');
    themeToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  themeButtons.forEach(function(btn){
    btn.addEventListener('click', function(){
      var pref = btn.getAttribute('data-value');
      setCookie(THEME_COOKIE, pref, 365);
      applyTheme(pref);
      closeThemeMenu();
    });
  });
  document.addEventListener('click', function(e){
    if(!themeDropdown.contains(e.target)){ closeThemeMenu(); }
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){ closeThemeMenu(); }
  });
  if(window.matchMedia){
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(){
      var current = getCookie(THEME_COOKIE) || 'light';
      if(current === 'system'){ applyTheme('system'); }
    });
  }
})();

/* ===== Blog post TOC: mobile expand/collapse + scroll-spy highlight ===== */
(function(){
  var toc = document.getElementById('postToc');
  if(!toc) return;

  var toggle = document.getElementById('postTocToggle');
  var body = document.getElementById('postTocBody');
  var links = Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]'));

  function isDesktop(){
    return window.matchMedia('(min-width:900px)').matches;
  }

  if(toggle){
    toggle.addEventListener('click', function(){
      if(isDesktop()) return;
      var open = toc.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  if(!links.length) return;

  var headings = links.map(function(link){
    var id = decodeURIComponent(link.getAttribute('href').slice(1));
    return document.getElementById(id);
  }).filter(Boolean);

  if(!headings.length || !('IntersectionObserver' in window)) return;

  var activeId = null;

  function setActive(id){
    if(id === activeId) return;
    activeId = id;
    links.forEach(function(link){
      var linkId = decodeURIComponent(link.getAttribute('href').slice(1));
      link.classList.toggle('is-active', linkId === id);
    });
  }

  var visible = new Map();
  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      visible.set(entry.target.id, entry.intersectionRatio);
    });
    var bestId = null, bestRatio = 0;
    visible.forEach(function(ratio, id){
      if(ratio > bestRatio){ bestRatio = ratio; bestId = id; }
    });
    if(bestId){
      setActive(bestId);
    } else {
      var scrollPos = window.scrollY || window.pageYOffset;
      var current = headings[0].id;
      headings.forEach(function(h){
        if(h.getBoundingClientRect().top + scrollPos - 100 <= scrollPos){
          current = h.id;
        }
      });
      setActive(current);
    }
  }, {
    rootMargin: '-90px 0px -70% 0px',
    threshold: [0, 1]
  });

  headings.forEach(function(h){ observer.observe(h); });
  setActive(headings[0].id);
})();
