'use strict';

// בחירת אלמנטים מה-HTML
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0E0 = document.getElementById('current--0');
const current0El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// הגדרת משתנים
let scores, activePlayer, currentScore, playing;

// פונקציה לאתחול המשחק
const init = function () {
  scores = [0, 0]; // תחילת ניקוד לשני השחקנים
  activePlayer = 0; // שחקן פעיל (0 או 1)
  currentScore = 0; // ניקוד נוכחי
  playing = true; // משתנה שמציין אם המשחק פעיל

  // איפוס הניקוד בממשק המשתמש
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0E0.textContent = 0;
  current0El.textContent = 0;

  // הסתרת הקוביה והגדרת השחקן הפעיל
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

// פונקציה להחלפת השחקן הפעיל
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// קריאה לפונקציה init לאתחול המשחק
init();

// פונקציונליות לזריקת הקוביה
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. יצירת מספר אקראי לקוביה
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // 2. הצגת הקוביה בממשק המשתמש
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. בדיקה אם יצא 1: אם כן, מעבירים תור לשחקן הבא
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// כאשר לוחצים על כפתור ההחזקה
btnHold.addEventListener('click', function () {
  if (playing) {
    // הוספת הניקוד הנוכחי לניקוד הכללי של השחקן
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // בדיקה אם השחקן ניצח
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

// כאשר לוחצים על כפתור התחלה חדשה
btnNew.addEventListener('click', init);
