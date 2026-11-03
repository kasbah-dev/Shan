// Shanice's KPSEA surprise: name check + reveal + sparkles
(function () {
  var ALLOWED_NAMES = ['shanice']; // add more spellings here if needed

  var form = document.getElementById('nameForm');
  var input = document.getElementById('visitorName');
  var errorMessage = document.getElementById('errorMessage');
  var welcome = document.getElementById('welcome');
  var celebration = document.getElementById('celebration');
  var backButton = document.getElementById('backButton');
  var sparkles = document.querySelector('.sparkles');

  // Styles for the sparkles and falling confetti (the CSS file doesn't cover these)
  var style = document.createElement('style');
  style.textContent =
    '.sparkles{position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:0}' +
    '.page,footer{position:relative;z-index:1}' +
    '.sparkle{position:absolute;opacity:0;animation:twinkle 4s ease-in-out infinite}' +
    '@keyframes twinkle{0%,100%{opacity:0;transform:scale(.6)}50%{opacity:.85;transform:scale(1.1)}}' +
    '.fall{position:fixed;top:-40px;z-index:5;pointer-events:none;animation:fall linear forwards}' +
    '@keyframes fall{to{transform:translateY(110vh) rotate(360deg);opacity:.9}}' +
    '.shake{animation:shake .4s}' +
    '@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}';
  document.head.appendChild(style);

  // Background sparkles
  var symbols = ['✨', '💖', '🌸', '⭐'];
  if (sparkles) {
    for (var i = 0; i < 18; i++) {
      var s = document.createElement('span');
      s.className = 'sparkle';
      s.textContent = symbols[i % symbols.length];
      s.style.left = Math.random() * 100 + '%';
      s.style.top = Math.random() * 100 + '%';
      s.style.fontSize = 12 + Math.random() * 16 + 'px';
      s.style.animationDelay = Math.random() * 4 + 's';
      s.style.animationDuration = 3 + Math.random() * 3 + 's';
      sparkles.appendChild(s);
    }
  }

  function normalize(text) {
    return text.trim().toLowerCase().replace(/\s+/g, ' ');
  }

  function isAllowed(name) {
    var n = normalize(name);
    return ALLOWED_NAMES.some(function (allowed) {
      return n === allowed;
    });
  }

  function confettiBurst() {
    var pieces = ['🎉', '🎊', '✨', '🎓', '🌸', '💖'];
    for (var i = 0; i < 40; i++) {
      var p = document.createElement('span');
      p.className = 'fall';
      p.textContent = pieces[Math.floor(Math.random() * pieces.length)];
      p.style.left = Math.random() * 100 + 'vw';
      p.style.fontSize = 18 + Math.random() * 18 + 'px';
      p.style.animationDuration = 2.5 + Math.random() * 2.5 + 's';
      p.style.animationDelay = Math.random() * 1.2 + 's';
      document.body.appendChild(p);
      setTimeout(function (el) { el.remove(); }.bind(null, p), 7000);
    }
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var value = input.value;

    if (isAllowed(value)) {
      errorMessage.textContent = '';
      welcome.classList.add('hidden');
      celebration.classList.remove('hidden');
      // restart the card's rise animation
      celebration.style.animation = 'none';
      void celebration.offsetWidth;
      celebration.style.animation = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      confettiBurst();
    } else {
      errorMessage.textContent = "Hmm, that doesn't look like the right name. Try again 💗";
      input.classList.remove('shake');
      void input.offsetWidth;
      input.classList.add('shake');
      input.focus();
    }
  });

  backButton.addEventListener('click', function () {
    celebration.classList.add('hidden');
    welcome.classList.remove('hidden');
    form.reset();
    errorMessage.textContent = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    input.focus();
  });
})();
