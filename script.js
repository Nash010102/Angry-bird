/* ============================================================
   MY LITTLE ANGRY BIRD GF 🐦❤️
   script.js
============================================================ */

// ── State ────────────────────────────────────────────────────
let angerLevel = 50; // 0 = zen goddess, 100 = full volcano

// ── DOM refs ────────────────────────────────────────────────
const bird          = document.getElementById('bird');
const birdWrapper   = document.getElementById('birdWrapper');
const meterFill     = document.getElementById('meterFill');
const meterEmoji    = document.getElementById('meterEmoji');
const meterPercent  = document.getElementById('meterPercent');
const speechBubble  = document.getElementById('speechBubble');
const speechText    = document.getElementById('speechText');
const subtitle      = document.getElementById('subtitle');
const toast         = document.getElementById('toast');
const bgHearts      = document.getElementById('bgHearts');
const reasonsGrid   = document.getElementById('reasonsGrid');

// ── Content banks ────────────────────────────────────────────
const moodData = [
  {
    range: [0, 15],
    moodClass: 'love',
    emoji: '🥰',
    subtitles: [
      'She\'s melting like butter right now 🥰',
      'Pure sunshine mode activated ☀️',
      'She might actually let you have the remote today 📺',
    ],
    speech: [
      'I love you so much 💖', 'You\'re my fave person ever~', 'Can we cuddle? 🥺',
      'Okay fine, you\'re kinda the best 💕', '*happy chirping noises* 🎵',
    ],
  },
  {
    range: [16, 35],
    moodClass: 'happy',
    emoji: '😊',
    subtitles: [
      'She\'s vibing! Approach safely 🌸',
      'Good mood alert — hugs are FREE today 🤗',
      'She might even share her snacks!!! 🍬',
    ],
    speech: [
      'Hehe~ hi 🐦', 'I\'m not mad… right now 😌',
      'You\'re okay I guess 😄', 'This is nice 🌸',
      'Don\'t ruin it 👀 (jk luv u)',
    ],
  },
  {
    range: [36, 55],
    moodClass: 'neutral',
    emoji: '😐',
    subtitles: [
      'Neutral zone… tread carefully, friend 👀',
      'She\'s on the fence. Bring snacks. NOW.',
      'Could go either way… your move 🎲',
    ],
    speech: [
      'Mmm. 🙄', 'I\'m fine. (I\'m not fine.)',
      'Whatever.', '...hmph.', 'I didn\'t say I was mad.',
      'I\'m just saying. 😒',
    ],
  },
  {
    range: [56, 75],
    moodClass: 'angry',
    emoji: '😠',
    subtitles: [
      'Red alert 🚨 She is NOT happy rn',
      'The storm is brewing… ⛈️',
      'Why did you do that. WHY.',
    ],
    speech: [
      'Excuse me?! 😤', 'I SAID WHAT I SAID.',
      'DONT. 🚫', 'You have 3 seconds.',
      'Fine. FINE. 😤', '…I\'m definitely not okay rn.',
    ],
  },
  {
    range: [76, 90],
    moodClass: 'angry',
    emoji: '😡',
    subtitles: [
      'She has entered the DANGER ZONE 💥',
      'Run. Or bring chocolate. Both. NOW. 🍫',
      'The angry bird has been fully loaded 🎯',
    ],
    speech: [
      'OH. SO THAT\'S HOW IT IS. 😡',
      'I CANNOT BELIEVE—', 'DO NOT TALK TO ME.',
      'YOU KNOW WHAT YOU DID. 👁️👄👁️',
      'RAAAAAHHH 💢',
    ],
  },
  {
    range: [91, 100],
    moodClass: 'furious',
    emoji: '🤯',
    subtitles: [
      '🚨🚨 MAXIMUM FURY ACHIEVED 🚨🚨',
      'She has fully launched. Brace for impact. 💥',
      'This is a Level 5 Angry Bird emergency 🆘',
    ],
    speech: [
      'THAT IS IT!!!! 💢💢💢',
      'I AM SO DONE. 😤🔥',
      'YOU ARE TESTING ME RIGHT NOW!!!',
      '💥💥 BOOM 💥💥',
      'STEAM COMING OUT OF MY EARS!!!',
    ],
  },
];

const reasons = [
  { emoji: '😤', text: 'Even her angry face is adorable' },
  { emoji: '💥', text: 'She cares SO much about everything' },
  { emoji: '🔥', text: 'Passionate about all the little things' },
  { emoji: '🛡️', text: 'She\'d fight a dragon for the people she loves' },
  { emoji: '💕', text: 'Her hugs after a fight are the BEST' },
  { emoji: '👑', text: 'Queen energy, always and forever' },
  { emoji: '🍭', text: 'Sweet when nobody\'s annoying her' },
  { emoji: '🌟', text: 'The brightest person in every room' },
];

// ── Helpers ──────────────────────────────────────────────────
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

function getMood(level) {
  return moodData.find(m => level >= m.range[0] && level <= m.range[1]) || moodData[2];
}

function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// ── UI Update ─────────────────────────────────────────────────
function updateUI(skipSpeech = false) {
  const mood = getMood(angerLevel);

  // Meter
  meterFill.style.width = angerLevel + '%';
  const emojiPos = (angerLevel / 100) * (meterFill.parentElement.offsetWidth - 10);
  meterEmoji.style.right = 'auto';
  meterEmoji.style.left = (emojiPos - 8) + 'px';
  meterEmoji.textContent = mood.emoji;
  meterPercent.textContent = angerLevel + '% RAGE';

  // Bird mood class
  bird.classList.remove('happy', 'neutral', 'angry', 'furious', 'love');
  bird.classList.add(mood.moodClass);

  // Subtitle
  subtitle.textContent = rand(mood.subtitles);

  if (!skipSpeech) showSpeech(rand(mood.speech));
}

let speechTimeout;
function showSpeech(text, duration = 3000) {
  clearTimeout(speechTimeout);
  speechText.textContent = text;
  speechBubble.classList.add('visible');
  speechTimeout = setTimeout(() => speechBubble.classList.remove('visible'), duration);
}

function showToast(text, duration = 2200) {
  toast.textContent = text;
  toast.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove('show'), duration);
}

// ── Anger change ─────────────────────────────────────────────
function changeAnger(delta, toast_msg) {
  const prev = getMood(angerLevel).moodClass;
  angerLevel = clamp(angerLevel + delta, 0, 100);
  updateUI(false);
  if (toast_msg) showToast(toast_msg);

  const next = getMood(angerLevel).moodClass;
  if (prev !== next) {
    // Thematic mood-change notification
    const transitions = {
      'love':    '🥰 She\'s in love mode now~',
      'happy':   '😊 She\'s feeling better!',
      'neutral': '😐 Neutral territory...',
      'angry':   '😤 Uh oh. Watch out!',
      'furious': '🚨 MAXIMUM FURY ENGAGED!!!',
    };
    if (transitions[next]) setTimeout(() => showToast(transitions[next]), 700);
  }
}

// ── Pop animation helper ──────────────────────────────────────
function popBird() {
  bird.classList.remove('popping');
  void bird.offsetWidth; // reflow
  bird.classList.add('popping');
  bird.addEventListener('animationend', () => bird.classList.remove('popping'), { once: true });
}

// ── Steam effect ──────────────────────────────────────────────
function spawnSteam(count = 2) {
  for (let i = 0; i < count; i++) {
    const s = document.createElement('span');
    s.className = 'steam';
    s.textContent = '💢';
    s.style.left = (40 + Math.random() * 80) + 'px';
    s.style.animationDelay = (Math.random() * 0.3) + 's';
    birdWrapper.appendChild(s);
    setTimeout(() => s.remove(), 1200);
  }
}

// ── Heart burst effect ────────────────────────────────────────
function spawnHearts(count = 5) {
  const emojis = ['💖','💕','💗','💓','💝','✨'];
  for (let i = 0; i < count; i++) {
    const h = document.createElement('span');
    h.className = 'heart-burst';
    h.textContent = rand(emojis);
    const angle = (Math.random() * 360) * (Math.PI / 180);
    const dist  = 50 + Math.random() * 50;
    h.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
    h.style.setProperty('--dy', Math.sin(angle) * dist - 30 + 'px');
    h.style.left = (60 + Math.random() * 50) + 'px';
    h.style.top  = (40 + Math.random() * 40) + 'px';
    h.style.animationDelay = (Math.random() * 0.2) + 's';
    birdWrapper.appendChild(h);
    setTimeout(() => h.remove(), 900);
  }
}

// ── Floating background hearts ────────────────────────────────
function spawnBgHeart() {
  if (angerLevel > 60) return; // No hearts when super angry!
  const h = document.createElement('span');
  h.className = 'floating-heart';
  h.textContent = rand(['💖','💕','💗','💓','🌸','✨','💝']);
  h.style.left = Math.random() * 100 + 'vw';
  const dur = 5 + Math.random() * 6;
  h.style.animationDuration = dur + 's';
  bgHearts.appendChild(h);
  setTimeout(() => h.remove(), dur * 1000);
}
setInterval(spawnBgHeart, 1800);

// ── Button actions ────────────────────────────────────────────
document.getElementById('pokeBtn').addEventListener('click', () => {
  popBird();
  spawnSteam(angerLevel > 60 ? 4 : 2);
  const delta = 8 + Math.floor(Math.random() * 7);
  const msgs = [
    '👉 You poked the bird! Big mistake.',
    '👆 She felt that.',
    '😤 Who said you could poke?!',
    '💢 POKE?! REALLY?!',
  ];
  changeAnger(delta, rand(msgs));
});

document.getElementById('hugBtn').addEventListener('click', () => {
  popBird();
  const delta = -(10 + Math.floor(Math.random() * 8));
  if (angerLevel > 80) {
    showSpeech('Don\'t touch me!!! 😤', 2500);
    spawnSteam(3);
    showToast('She shook you off 😅 Try compliments first!');
    return;
  }
  spawnHearts(4);
  const msgs = [
    '🤗 Aww, the hug worked~',
    '💕 She\'s warming up!',
    '🫂 Squeeze those angers away!',
    '💖 Hugs are powerful medicine!',
  ];
  changeAnger(delta, rand(msgs));
});

document.getElementById('complimentBtn').addEventListener('click', () => {
  popBird();
  const compliments = [
    '✨ "You\'re literally the cutest even when angry"',
    '💕 "Your angry face is adorable, ngl"',
    '🌟 "You\'re the smartest person I know"',
    '💖 "Everything is better when you\'re around"',
    '🎀 "You\'re my favorite human bird ever"',
    '🌸 "Nobody could pull off angry like you do"',
  ];
  const c = rand(compliments);
  showSpeech('...okay fine that was cute 🥺', 3000);
  spawnHearts(6);
  changeAnger(-(12 + Math.floor(Math.random() * 6)), c);
});

document.getElementById('snackBtn').addEventListener('click', () => {
  popBird();
  const snacks = [
    '🍭 Lollipop received! Anger -15%',
    '🍫 Chocolate delivered! Instant mood boost!',
    '🧋 Bubble tea appeared! Critical hit!',
    '🍰 Cake offered! She can\'t stay mad now.',
    '🍩 Donut diplomacy in effect 🍩',
    '🍓 Strawberries deployed 🍓',
  ];
  const delta = -(15 + Math.floor(Math.random() * 8));
  spawnHearts(7);
  changeAnger(delta, rand(snacks));
});

// ── Bird click (random speech) ────────────────────────────────
bird.addEventListener('click', () => {
  popBird();
  const mood = getMood(angerLevel);
  showSpeech(rand(mood.speech), 3000);
  if (angerLevel > 70) spawnSteam(2);
  else if (angerLevel < 30) spawnHearts(3);
});

// ── Reset button ──────────────────────────────────────────────
document.getElementById('resetBtn').addEventListener('click', () => {
  angerLevel = 50;
  updateUI(false);
  showSpeech('Fresh start! ...don\'t mess it up. 🐦', 3000);
  showToast('🌸 New day, clean slate~');
});

// ── Build reason cards ────────────────────────────────────────
reasons.forEach(r => {
  const card = document.createElement('div');
  card.className = 'reason-card';
  card.innerHTML = `<span class="r-emoji">${r.emoji}</span>${r.text}`;
  reasonsGrid.appendChild(card);
});

// ── Init ──────────────────────────────────────────────────────
updateUI(true);
setTimeout(() => showSpeech('Hey… are you staring at me?? 👀', 3500), 1200);

// Auto-taunt every 20s if anger is high
setInterval(() => {
  if (angerLevel > 70 && !speechBubble.classList.contains('visible')) {
    const mood = getMood(angerLevel);
    showSpeech(rand(mood.speech), 3000);
    spawnSteam(1);
  }
}, 20000);
