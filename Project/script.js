let max = 1500, sec = 1500, id;
const $ = i => document.getElementById(i), au = $('au');

function draw() {
  let m = String(Math.floor(sec / 60)).padStart(2, '0'), s = String(sec % 60).padStart(2, '0');
  $('t').textContent = `${m}:${s}`;
  document.title = `${m}:${s} - Pomodoro`;
}

function stop() { au.pause(); au.currentTime = 0; }

function toggle() {
  stop();
  if (id) { id = clearInterval(id); $('b').textContent = 'Start'; }
  else {
    $('b').textContent = 'Pause';
    id = setInterval(() => sec > 0 ? (sec--, draw()) : (id = clearInterval(id), $('b').textContent = 'Start', au.play().catch(() => { })), 1000);
  }
}

function reset() { stop(); id = clearInterval(id); $('b').textContent = 'Start'; sec = max; draw(); }

function m(s, el) {
  document.querySelectorAll('.modes button').forEach(b => b.classList.remove('act'));
  el.classList.add('act');
  max = s; reset();
}
