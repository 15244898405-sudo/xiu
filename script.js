const photoEntries = [
  {
    title: "海水拍向礁石的时候",
    location: "St. George, South Africa",
    date: "2026.05",
    mood: "天气再差，海还是很能打",
    story: "训练会被天气卡住，计划也会被改来改去，但海不会解释，它只负责把这一整片蓝色摆在那里。至少从这张图来看，人还活着，眼睛也还在工作。",
    image: "./photos/xjh-ocean-01.jpg",
    accent: "Ocean One"
  },
  {
    title: "被海浪围住的石头",
    location: "St. George, South Africa",
    date: "2026.05",
    mood: "撑住就算赢一点",
    story: "第二张离礁石更近，海水一圈一圈拍上来，很像这段时间的日常节奏。天气、进度、吃饭问题轮着来，但礁石没散，人也就还可以继续耗。",
    image: "./photos/xjh-ocean-02.jpg",
    accent: "Ocean Two"
  },
  {
    title: "沿岸线展开的雾",
    location: "St. George, South Africa",
    date: "2026.05",
    mood: "先看见回去的方向",
    story: "第三张把视野拉开以后，雾和岸线一起往远处退。它不像答案，更像一种提醒: 先把眼前这段熬完，后面的路再慢慢说。",
    image: "./photos/xjh-ocean-03.jpg",
    accent: "Ocean Three"
  }
];

const journalEntries = [
  {
    date: "2026.05.09",
    title: "天气是头号对手",
    mood: "先活下来",
    text: "真正折磨人的不一定是训练本身，而是天气总在最关键的时候出来搅局。进度被卡住以后，人很容易一天都挂在那里，所以能顺手拍下一张海，已经算是在给自己找平衡。"
  },
  {
    date: "2026.05.03",
    title: "吃饭问题也算持续伤害",
    mood: "活着就行",
    text: "有时候消耗人的不是大事，而是那些每天都得面对的小事，比如吃什么、吃得怎么样、能不能别再将就。等这些东西和训练叠在一起，日子就会自动变成生存模式。"
  },
  {
    date: "2026.04.26",
    title: "风景至少不添乱",
    mood: "还能看海",
    text: "天气会反复，饭也未必稳定，但风景至少是稳定站在那里的。把这些海岸线留下来，不是为了文艺，是为了证明这段时间也不全是狼狈。"
  }
];

const galleryGrid = document.getElementById("galleryGrid");
const journalList = document.getElementById("journalList");
const currentChapter = document.getElementById("currentChapter");
const entryCount = document.getElementById("entryCount");
const latestMood = document.getElementById("latestMood");
const memoryStats = document.getElementById("memoryStats");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxMeta = document.getElementById("lightboxMeta");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxStory = document.getElementById("lightboxStory");
const lightboxClose = document.getElementById("lightboxClose");

renderSite();
setupLightbox();

function renderSite() {
  renderGallery();
  renderJournal();
  renderSignals();
  renderMemoryStats();
}

function renderGallery() {
  galleryGrid.innerHTML = "";

  photoEntries.forEach((entry, index) => {
    const card = document.createElement("article");
    card.className = "photo-card";
    card.style.animationDelay = `${index * 90}ms`;

    const hasImage = Boolean(entry.image);
    const media = hasImage
      ? `<img src="${entry.image}" alt="${entry.title}" loading="lazy" />`
      : `<div class="photo-placeholder">${entry.accent}</div>`;

    card.innerHTML = `
      <button type="button" data-photo-index="${index}">
        <div class="photo-media">${media}</div>
        <div class="photo-content">
          <div class="photo-topline">
            <h3>${entry.title}</h3>
            <span class="photo-tag">${entry.mood}</span>
          </div>
          <p class="photo-meta">${entry.location} · ${entry.date}</p>
          <p class="photo-meta">${entry.story}</p>
        </div>
      </button>
    `;

    galleryGrid.appendChild(card);
  });
}

function renderJournal() {
  journalList.innerHTML = "";

  journalEntries.forEach((entry, index) => {
    const card = document.createElement("article");
    card.className = "journal-card";
    card.style.animationDelay = `${index * 100}ms`;
    card.innerHTML = `
      <span class="journal-date">${entry.date}</span>
      <div class="journal-topline">
        <h3>${entry.title}</h3>
        <span class="photo-tag">${entry.mood}</span>
      </div>
      <p>${entry.text}</p>
    `;
    journalList.appendChild(card);
  });
}

function renderSignals() {
  currentChapter.textContent = "圣乔治生存阶段";
  entryCount.textContent = String(photoEntries.length + journalEntries.length);
  latestMood.textContent = journalEntries[0]?.mood ?? "等待更新";
}

function renderMemoryStats() {
  const stats = [
    { label: "摄影条目", value: `${photoEntries.length} 张/则` },
    { label: "生存记录", value: `${journalEntries.length} 段` },
    { label: "推荐部署", value: "GitHub Pages" },
    { label: "更新难度", value: "很低" }
  ];

  memoryStats.innerHTML = "";
  stats.forEach((item) => {
    const card = document.createElement("article");
    card.className = "memory-stat";
    card.innerHTML = `
      <span>${item.label}</span>
      <strong>${item.value}</strong>
    `;
    memoryStats.appendChild(card);
  });
}

function setupLightbox() {
  galleryGrid.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-photo-index]");
    if (!trigger) {
      return;
    }

    const entry = photoEntries[Number(trigger.dataset.photoIndex)];
    lightboxMeta.textContent = `${entry.location} · ${entry.date} · ${entry.mood}`;
    lightboxTitle.textContent = entry.title;
    lightboxStory.textContent = entry.story;

    if (entry.image) {
      lightboxImage.src = entry.image;
      lightboxImage.alt = entry.title;
      lightboxImage.hidden = false;
    } else {
      lightboxImage.removeAttribute("src");
      lightboxImage.alt = "";
      lightboxImage.hidden = true;
    }

    lightbox.showModal();
  });

  lightboxClose.addEventListener("click", () => {
    lightbox.close();
  });

  lightbox.addEventListener("click", (event) => {
    const bounds = lightbox.getBoundingClientRect();
    const clickedOutside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;

    if (clickedOutside) {
      lightbox.close();
    }
  });
}
