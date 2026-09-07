(function(){
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

  // Lang menu is now real <a href> links (see Navbar.astro) — only open/close stays here.
  var langDropdown = document.getElementById('langDropdown');
  var langToggle = document.getElementById('langToggle');

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

  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');
  navToggle.addEventListener('click', function(){
    var isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // --- theme switcher: day (default) / dark / system ---
  var THEME_COOKIE = 'fancyTextTheme';
  var themeDropdown = document.getElementById('themeDropdown');
  var themeToggle = document.getElementById('themeToggle');
  var themeCurrent = document.getElementById('themeCurrent');
  var themeIcon = document.getElementById('themeIcon');
  var themeMenu = document.getElementById('themeMenu');
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

  // default is Day unless the user has previously chosen otherwise
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
