// コンテンツ切り替え
const tabs = document.querySelectorAll('.tab');
const pages = document.querySelectorAll('.page');
const html = document.querySelector('html');

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    pages.forEach(p => p.classList.remove('active'));

    tab.classList.add('active');
    pages[index].classList.add('active'); // 順番で対応
    // Aboutのときは画面幅がガタつかないようスクロールバーを強制表示する
    if (index === 1) {
      html.classList.add('scroll-bar');
    }
    else {
      html.classList.remove('scroll-bar');
    }
  });
});

// アコーディオンボタン
const worksCards = document.querySelectorAll('.works-card');
const accordions = document.querySelectorAll('.accordion-btn');
const appears = document.querySelectorAll('.appear-container');

accordions.forEach((accordion, index) => {
  const worksCard = worksCards[index];
  const appear = appears[index];

  accordion.addEventListener('click', () => {
    const isOpen = appear.classList.contains('opened');
    if (isOpen) {
      worksCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    else {
      // accordion.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        accordion.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }

    // トグル
    accordion.classList.toggle('opened');
    appear.classList.toggle('opened');
  });
});

// フルスクリーン表示
const links = document.querySelectorAll('.show-img');
const fullscreen = document.getElementById('fullscreen');
const fullscreenImg = document.getElementById('fullscreen-img');
const closeBtn = document.getElementById('close-btn');

let scrollPos = 0;

links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    scrollPos = window.scrollY;
    fullscreenImg.src = link.getAttribute('href'); // hrefから画像パス取得
    fullscreen.classList.remove('hidden');
    closeBtn.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });
});

closeBtn.addEventListener('click', () => {
  fullscreen.classList.add('hidden');
  closeBtn.classList.add('hidden');
  document.body.style.overflow = '';
  window.scrollTo(0, scrollPos);
});

// 動画再生
const video = document.querySelector('video');
const title = document.getElementById('video-title');
const control = document.getElementById('video-control');
const popup = document.getElementById('sound-popup');
const soundOn = document.getElementById('sound-on');
const soundOff = document.getElementById('sound-off');

function startVideo(muted) {
  // クリックされたら一度だけ実行
  if (video.dataset.started) return;
  video.dataset.started = true;

  // ポップアップを消す
  popup.classList.add('hidden');

  // ミュート設定を設定
  video.muted = muted;

  // コントロールパネルを表示
  video.controls = true;

  // 動画再生
  control.play().catch(err => {
    console.log("自動再生は制限されました:", err);
  });
}

// 初回クリックでポップアップを出す
video.addEventListener('click', () => {
  if (video.dataset.started) return; // 二重防止
  popup.classList.remove('hidden');
});

title.addEventListener('click', () => {
  if (video.dataset.started) return; // 二重防止
  popup.classList.remove('hidden');
});

// 音あり再生
soundOn.addEventListener('click', () => {
  startVideo(false); // muted = false
});

// ミュート再生
soundOff.addEventListener('click', () => {
  startVideo(true); // muted = true
});

// 背景クリックで閉じる
popup.addEventListener("click", (e) => {
  if (e.target === popup) { // 背景部分のみ
    popup.classList.add("hidden");
  }
});
