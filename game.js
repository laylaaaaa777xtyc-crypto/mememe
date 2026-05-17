localStorage.clear();
const size = 4;
const boardEl = document.querySelector("#board");
const animLayerEl = document.querySelector("#anim-layer");
const scoreEl = document.querySelector("#score");
const foundCountEl = document.querySelector("#found-count");
const recipeCountEl = document.querySelector("#recipe-count");
const chainEl = document.querySelector("#chain");
const discoveryEl = document.querySelector("#discovery");
const pediaDetailEl = document.querySelector("#pedia-detail");
const pediaJumpEl = document.querySelector("#pedia-jump");
const showUnlockedEl = document.querySelector("#show-unlocked");
const showAllEl = document.querySelector("#show-all");
const homeScreenEl = document.querySelector("#home-screen");
const startGameButtonEl = document.querySelector("#start-game");
const homeBgmEl = document.querySelector("#home-bgm");
homeBgmEl.volume = 0.7;
let bgmStopped = false;
let bgmWantsPlay = false;
function tryPlayBgm() {
  if (bgmStopped) return;
  bgmWantsPlay = true;
  const p = homeBgmEl.play();
  if (p && p.catch) p.catch(() => {});
}
homeBgmEl.addEventListener("canplay", () => {
  if (bgmWantsPlay && !bgmStopped && homeBgmEl.paused) tryPlayBgm();
});
try { homeBgmEl.load(); } catch (_) {}
tryPlayBgm();
const unlockBgm = (e) => {
  if (e && e.target && e.target.closest && e.target.closest("#start-game")) return;
  tryPlayBgm();
};
homeScreenEl.addEventListener("pointerdown", unlockBgm);
homeScreenEl.addEventListener("touchstart", unlockBgm, { passive: true });
homeScreenEl.addEventListener("click", unlockBgm);
document.addEventListener("keydown", unlockBgm);
const overlayEl = document.querySelector("#overlay");
const overlayTitleEl = document.querySelector("#overlay-title");
const overlayTextEl = document.querySelector("#overlay-text");
const hnjdVideoEl = document.querySelector("#hnjd-video");
const roamContainerEl = document.querySelector("#roam-container");
const roamVideoEl = document.querySelector("#roam-video");
const sijuaVideoEl = document.querySelector("#sijua-video");
const videoPlaceholderEl = document.querySelector("#video-placeholder");
const gaoyaVideoEl = document.querySelector("#gaoya-video");
const bababoVideoEl = document.querySelector("#bababo-video");
const laicaiVideoEl = document.querySelector("#laicai-video");
const qinshihuangVideoEl = document.querySelector("#qinshihuang-video");
const tankVideoEl = document.querySelector("#tank-video");
const daodunVideoEl = document.querySelector("#daodun-video");
const bielaoVideoEl = document.querySelector("#bielao-video");
const gogogoVideoEl = document.querySelector("#gogogo-video");
const zuowanVideoEl = document.querySelector("#zuowan-video");
const wuchuangVideoEl = document.querySelector("#wuchuang-video");
const victoryOverlayEl = document.querySelector("#victory-overlay");
const victoryVideoEl = document.querySelector("#victory-video");
victoryVideoEl.addEventListener("ended", () => {
  victoryOverlayEl.classList.add("hidden");
  victoryVideoEl.pause();
  unlockedLevels = new Set();
  localStorage.removeItem(storageKey);
  startGame();
});
function triggerVictory() {
  hideAllVideos();
  victoryOverlayEl.classList.remove("hidden");
  victoryVideoEl.currentTime = 0;
  victoryVideoEl.play().catch(() => {});
}

let roamAnimId = null;
let roamX = 0, roamY = 0, roamVX = 3.5, roamVY = 2.8;

function roamStep() {
  const elW = roamContainerEl.offsetWidth;
  const elH = roamContainerEl.offsetHeight;
  const maxX = window.innerWidth - elW;
  const maxY = window.innerHeight - elH;
  roamX += roamVX;
  roamY += roamVY;
  if (roamX <= 0)      { roamX = 0;    roamVX =  Math.abs(roamVX) + (Math.random() - 0.5); }
  if (roamX >= maxX)   { roamX = maxX; roamVX = -Math.abs(roamVX) - (Math.random() - 0.5); }
  if (roamY <= 0)      { roamY = 0;    roamVY =  Math.abs(roamVY) + (Math.random() - 0.5); }
  if (roamY >= maxY)   { roamY = maxY; roamVY = -Math.abs(roamVY) - (Math.random() - 0.5); }
  roamVX = Math.max(-6, Math.min(6, roamVX));
  roamVY = Math.max(-6, Math.min(6, roamVY));
  roamContainerEl.style.left = roamX + "px";
  roamContainerEl.style.top  = roamY + "px";
  roamAnimId = requestAnimationFrame(roamStep);
}

function triggerRoamVideo() {
  hideAllVideos();
  roamContainerEl.style.display = "block";
  roamVideoEl.currentTime = 0;
  roamVideoEl.play();
  // 等元素渲染后读取真实尺寸再定位
  requestAnimationFrame(() => {
    const elW = roamContainerEl.offsetWidth;
    const elH = roamContainerEl.offsetHeight;
    roamX = Math.random() * Math.max(0, window.innerWidth - elW);
    roamY = Math.random() * Math.max(0, window.innerHeight - elH);
    roamVX = (Math.random() > 0.5 ? 1 : -1) * (3 + Math.random() * 2);
    roamVY = (Math.random() > 0.5 ? 1 : -1) * (2.5 + Math.random() * 2);
    roamContainerEl.style.left = roamX + "px";
    roamContainerEl.style.top  = roamY + "px";
    if (roamAnimId) cancelAnimationFrame(roamAnimId);
    roamAnimId = requestAnimationFrame(roamStep);
  });
}

roamContainerEl.addEventListener("click", () => {
  roamContainerEl.style.display = "none";
  roamVideoEl.pause();
  if (roamAnimId) { cancelAnimationFrame(roamAnimId); roamAnimId = null; }
});

function hideAllVideos() {
  videoPlaceholderEl.style.display = "none";
  [hnjdVideoEl, sijuaVideoEl, gaoyaVideoEl, bababoVideoEl, laicaiVideoEl, qinshihuangVideoEl, tankVideoEl, daodunVideoEl, bielaoVideoEl, gogogoVideoEl, zuowanVideoEl, wuchuangVideoEl].forEach(v => {
    v.pause();
    v.style.display = "none";
  });
}

function triggerGaoyaVideo() {
  hideAllVideos();
  gaoyaVideoEl.style.display = "block";
  gaoyaVideoEl.currentTime = 0;
  gaoyaVideoEl.play();
}

const evolutionChain = [
  { name: "哈吉米", icon: "😺", image: "assets/hagimi-cat.png", note: "一切离谱从这里开始。", color: "#ffe06d" },
  { name: "南北绿豆", icon: "🥣", image: "assets/nanbeilvdou-cat.png", note: "看起来像下一口就要上头。", color: "#9de08c" },
  { name: "哈吉米南北绿豆", icon: "🥣", image: "assets/hagimi-nanbeilvdou-cat.png", note: "两个词终于黏在一起了。", color: "#ffcf34" },
  { name: "高雅人士", icon: "🎩", note: "气质突然端起来了。", color: "#b8b3ff" },
  { name: "喝点丝瓜汤", icon: "🍲", image: "assets/sijua-img.jpg", note: "先补一口状态。", color: "#ffb44f" },
  { name: "别笑你也过不了第二关", icon: "🎮", image: "assets/bielao-img.jpg", note: "笑容逐渐消失。", color: "#8fd3ff" },
  { name: "巴巴博一", icon: "🥊", image: "assets/bababo-cat.png", note: "理论和物理都很到位。", color: "#ff9da8" },
  { name: "瓦学弟", icon: "🧱", image: "assets/waxuedi-img.jpg", note: "熟悉的压迫感来了。", color: "#91e5d6" },
  { name: "来财", icon: "💰", note: "这一合，财气就来了。", color: "#ffcf34" },
  { name: "带派不老铁", icon: "🤝", note: "这一句自带语音。", color: "#78d66b" },
  { name: "秦始皇骑北极熊", icon: "❄️", note: "历史和地理都沉默了。", color: "#57d7ff" },
  { name: "爱你老己", icon: "💘", note: "真诚是永远的必杀技。", color: "#f7a1c4" },
  { name: "go学长", icon: "🏃", image: "assets/goxuechang-img.jpg", note: "出发速度很有礼貌。", color: "#ffc269" },
  { name: "误闯天家", icon: "🏯", note: "剧情突然变大了。", color: "#bda7ff" },
  { name: "gogogo出发啰", icon: "🚀", note: "不用解释，直接冲。", color: "#72dec4" },
  { name: "如何呢又能怎", icon: "🤷", note: "主打一个松弛反问。", color: "#ffb45f" },
  { name: "做完你的做你的", icon: "🧾", note: "听起来像任务，又像人生。", color: "#d4ef65" },
  { name: "坦克是没有后视镜的", icon: "🛡️", note: "只管往前，不看回头路。", color: "#9cc8ff" },
  { name: "心理委员呢我不得劲", icon: "🧠", note: "需要一点情绪救援。", color: "#f3a6ff" },
  { name: "我的刀盾", icon: "🛡️", image: "assets/daodun-img.png", note: "刀盾在手，谁来都不慌。", color: "#ffd86b" },
];

const absurdNames = [
  "反向许愿机",
  "带薪发呆引擎",
  "宇宙级撤回键",
  "五维奶茶店",
  "自动摸鱼协议",
  "老板看不见斗篷",
  "早八消除器",
  "终极下班铃",
];
const absurdIcons = ["🧞", "🛎️", "🌀", "🍵", "🧠", "🪄", "🎲", "💎"];
const absurdColors = ["#c7f36f", "#8fe8ff", "#ffd06f", "#ff9fba", "#bda7ff", "#7ee2aa", "#f7f0a0"];
const collectionTotal = 100;
const storageKey = "zheYeNengHeUnlockedLevels";
const videoStorageKey = "zheYeNengHeVideoTriggered";
const videoTriggered = new Set(JSON.parse(localStorage.getItem(videoStorageKey) || "[]"));
function markVideoTriggered(id) {
  videoTriggered.add(id);
  localStorage.setItem(videoStorageKey, JSON.stringify([...videoTriggered]));
}
function canTriggerVideo(id) { return !videoTriggered.has(id); }

let grid;
let score;
let foundMax;
let unlockedLevels = loadUnlockedLevels();
let selectedPediaLevel = 0;
let pediaMode = "unlocked";
let mergedCells;
let touchStart = null;
let isAnimating = false;

startGame();

function itemAt(level) {
  if (evolutionChain[level]) return evolutionChain[level];

  const offset = level - evolutionChain.length;
  const version = Math.floor(offset / absurdNames.length) + 2;
  return {
    name: `${absurdNames[offset % absurdNames.length]} v${version}`,
    icon: absurdIcons[offset % absurdIcons.length],
    color: absurdColors[offset % absurdColors.length],
    note: "进化链已经开始即兴发挥。",
  };
}

function startGame() {
  grid = Array.from({ length: size }, () => Array(size).fill(null));
  score = 0;
  foundMax = 0;
  mergedCells = new Set();
  isAnimating = false;
  overlayEl.classList.add("hidden");
  addRandomTile();
  addRandomTile();
  syncFoundFromGrid();
  render();
  renderPediaDetail(0);
}

function addRandomTile() {
  const empty = [];
  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      if (grid[row][col] === null) empty.push({ row, col });
    }
  }

  if (!empty.length) return false;
  const spot = empty[Math.floor(Math.random() * empty.length)];
  grid[spot.row][spot.col] = 0;
  return true;
}

function syncFoundFromGrid() {
  const levels = grid.flat().filter((value) => value !== null);
  foundMax = Math.max(foundMax, ...levels, 0);
  levels.forEach((level) => unlockLevel(level));
  updateDiscovery(foundMax);
}

function render() {
  boardEl.innerHTML = "";

  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      const cell = document.createElement("div");
      cell.className = "cell";
      const level = grid[row][col];

      if (level !== null) {
        const item = itemAt(level);
        const tile = document.createElement("div");
        tile.className = `tile${level >= 2 ? " result" : ""}${mergedCells.has(`${row}-${col}`) ? " merged" : ""}`;
        tile.style.background = tileBackground(item, level);
        tile.innerHTML = tileContent(item);
        cell.append(tile);
      }

      boardEl.append(cell);
    }
  }

  scoreEl.textContent = score;
  foundCountEl.textContent = `${unlockedLevels.size} / ${collectionTotal}`;
  recipeCountEl.textContent = `${unlockedLevels.size} / ${collectionTotal}`;
  showUnlockedEl.classList.toggle("active", pediaMode === "unlocked");
  showAllEl.classList.toggle("active", pediaMode === "all");
  renderChain();
  mergedCells = new Set();
}

function tileContent(item) {
  return `
    <div class="tile-inner">
      <div class="tile-icon" aria-hidden="true">${iconContent(item)}</div>
      <div class="tile-name">${item.name}</div>
    </div>
  `;
}

function iconContent(item) {
  return item.image ? `<img src="${item.image}" alt="" />` : item.icon;
}

function tileBackground(item, level) {
  const shine = level >= 2 ? "radial-gradient(circle at 28% 22%, rgba(255,255,255,.78), transparent 20%)," : "";
  return `${shine} linear-gradient(145deg, ${item.color}, ${shadeFor(level)})`;
}

function shadeFor(level) {
  const shades = ["#b59a78", "#ff7b54", "#51b8da", "#58bb68", "#8c7dff", "#ef9c44", "#8594ff"];
  return shades[level % shades.length];
}

function renderChain() {
  chainEl.innerHTML = "";
  const levels =
    pediaMode === "unlocked"
      ? [...unlockedLevels].sort((a, b) => a - b)
      : Array.from({ length: collectionTotal }, (_, level) => level);

  levels.forEach((level) => {
    const item = itemAt(level);
    const discovered = unlockedLevels.has(level);
    const li = document.createElement("li");
    li.className = `${discovered ? "" : "locked"}${level === selectedPediaLevel ? " selected" : ""}`;
    li.innerHTML = `
      <button class="pedia-entry" type="button" data-level="${level}">
        <span class="mini-icon">${discovered ? iconContent(item) : "❓"}</span>
        <span>${discovered ? item.name : "未知进化"}</span>
      </button>
    `;
    chainEl.append(li);
  });
}

function renderPediaDetail(level) {
  const item = itemAt(level);
  const unlocked = unlockedLevels.has(level);
  const path = level === 0 ? "初始出现" : `${itemAt(level - 1).name} + ${itemAt(level - 1).name}`;

  pediaDetailEl.innerHTML = `
    <div class="mini-icon">${unlocked ? iconContent(item) : "❓"}</div>
    <div>
      <strong>${unlocked ? item.name : "未知进化"}</strong>
      <p>${unlocked ? item.note : "这个梗还没有合成出来，先保持神秘。"}</p>
      <span>进化路径：${unlocked ? path : "???"}</span>
    </div>
  `;
}

function updateDiscovery(level) {
  const item = itemAt(level);
  discoveryEl.innerHTML = `
    <div class="discovery-icon">${iconContent(item)}</div>
    <div>
      <strong>${item.name}</strong>
      <p>${item.note}</p>
    </div>
  `;
}

async function move(direction) {
  if (isAnimating) return;

  const result = computeMove(direction);
  if (!result.changed) return;

  isAnimating = true;
  await playMoveAnimation(result.transitions, result.merges);

  grid = result.grid;
  mergedCells = result.mergedCells;
  score += result.scoreGain;
  if (result.highestMerge > foundMax) {
    foundMax = result.highestMerge;
    updateDiscovery(foundMax);
  }
  const triggerHnjd  = result.unlocked.includes(2) && canTriggerVideo("hnjd");
  const triggerGaoya = result.unlocked.includes(3) && canTriggerVideo("gaoya");
  const triggerSijua = result.unlocked.includes(4) && canTriggerVideo("sijua");
  const triggerBielao = result.unlocked.includes(5) && canTriggerVideo("bielao");
  const triggerBababo = result.unlocked.includes(6) && canTriggerVideo("bababo");
  const triggerLaicai = result.unlocked.includes(8) && canTriggerVideo("laicai");
  const triggerQinshihuang = result.unlocked.includes(10) && canTriggerVideo("qinshihuang");
  const triggerWuchuang = result.unlocked.includes(13) && canTriggerVideo("wuchuang");
  const triggerGogogo = result.unlocked.includes(14) && canTriggerVideo("gogogo");
  const triggerZuowan = result.unlocked.includes(16) && canTriggerVideo("zuowan");
  const triggerTank = result.unlocked.includes(17) && canTriggerVideo("tank");
  const triggerDaodun = result.unlocked.includes(19) && canTriggerVideo("daodun");
  const triggerVictoryNow = result.unlocked.includes(20);
  const beforeCount = unlockedLevels.size;
  result.unlocked.forEach((level) => unlockLevel(level));
  if (beforeCount < 10 && unlockedLevels.size >= 10 && canTriggerVideo("roam")) {
    markVideoTriggered("roam");
    triggerRoamVideo();
  }

  if (triggerVictoryNow) {
    triggerVictory();
  } else if (triggerDaodun) {
    markVideoTriggered("daodun");
    hideAllVideos();
    daodunVideoEl.style.display = "block";
    daodunVideoEl.currentTime = 0;
    daodunVideoEl.play();
  } else if (triggerTank) {
    markVideoTriggered("tank");
    hideAllVideos();
    tankVideoEl.style.display = "block";
    tankVideoEl.currentTime = 0;
    tankVideoEl.play();
  } else if (triggerZuowan) {
    markVideoTriggered("zuowan");
    hideAllVideos();
    zuowanVideoEl.style.display = "block";
    zuowanVideoEl.currentTime = 0;
    zuowanVideoEl.play();
  } else if (triggerGogogo) {
    markVideoTriggered("gogogo");
    hideAllVideos();
    gogogoVideoEl.style.display = "block";
    gogogoVideoEl.currentTime = 0;
    gogogoVideoEl.play();
  } else if (triggerWuchuang) {
    markVideoTriggered("wuchuang");
    hideAllVideos();
    wuchuangVideoEl.style.display = "block";
    wuchuangVideoEl.currentTime = 0;
    wuchuangVideoEl.play();
  } else if (triggerQinshihuang) {
    markVideoTriggered("qinshihuang");
    hideAllVideos();
    qinshihuangVideoEl.style.display = "block";
    qinshihuangVideoEl.currentTime = 0;
    qinshihuangVideoEl.play();
  } else if (triggerLaicai) {
    markVideoTriggered("laicai");
    hideAllVideos();
    laicaiVideoEl.style.display = "block";
    laicaiVideoEl.currentTime = 0;
    laicaiVideoEl.play();
  } else if (triggerBababo) {
    markVideoTriggered("bababo");
    hideAllVideos();
    bababoVideoEl.style.display = "block";
    bababoVideoEl.currentTime = 0;
    bababoVideoEl.play();
  } else if (triggerBielao) {
    markVideoTriggered("bielao");
    hideAllVideos();
    bielaoVideoEl.style.display = "block";
    bielaoVideoEl.currentTime = 0;
    bielaoVideoEl.play();
  } else if (triggerGaoya) {
    markVideoTriggered("gaoya");
    triggerGaoyaVideo();
  } else if (triggerSijua) {
    markVideoTriggered("sijua");
    hideAllVideos();
    sijuaVideoEl.style.display = "block";
    sijuaVideoEl.currentTime = 0;
    sijuaVideoEl.play();
  } else if (triggerHnjd) {
    markVideoTriggered("hnjd");
    hideAllVideos();
    hnjdVideoEl.style.display = "block";
    hnjdVideoEl.currentTime = 0;
    hnjdVideoEl.play();
  }

  addRandomTile();
  syncFoundFromGrid();
  render();
  isAnimating = false;

  if (!canMove()) {
    overlayTitleEl.textContent = "进化堵车了";
    overlayTextEl.textContent = "没有能合成的相同梗了，再来一局继续离谱。";
    overlayEl.classList.remove("hidden");
  }
}

function computeMove(direction) {
  const nextGrid = Array.from({ length: size }, () => Array(size).fill(null));
  const transitions = [];
  const merges = [];
  const nextMergedCells = new Set();
  let scoreGain = 0;
  let highestMerge = foundMax;
  const unlocked = [];

  getMoveLines(direction).forEach((cells) => {
    const pieces = cells
      .map((cell) => ({ ...cell, level: grid[cell.row][cell.col] }))
      .filter((piece) => piece.level !== null);

    let targetIndex = 0;
    for (let index = 0; index < pieces.length; index += 1) {
      const target = cells[targetIndex];
      const current = pieces[index];
      const next = pieces[index + 1];

      if (next && current.level === next.level) {
        const mergedLevel = current.level + 1;
        nextGrid[target.row][target.col] = mergedLevel;
        nextMergedCells.add(`${target.row}-${target.col}`);
        merges.push({ row: target.row, col: target.col });
        scoreGain += 2 ** (mergedLevel + 1);
        highestMerge = Math.max(highestMerge, mergedLevel);
        unlocked.push(mergedLevel);
        transitions.push(
          { from: current, to: target, level: current.level, merging: true },
          { from: next, to: target, level: next.level, merging: true },
        );
        index += 1;
      } else {
        nextGrid[target.row][target.col] = current.level;
        transitions.push({ from: current, to: target, level: current.level, merging: false });
      }

      targetIndex += 1;
    }
  });

  return {
    grid: nextGrid,
    transitions,
    merges,
    mergedCells: nextMergedCells,
    scoreGain,
    highestMerge,
    unlocked,
    changed: JSON.stringify(grid) !== JSON.stringify(nextGrid),
  };
}

function loadUnlockedLevels() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "[0]");
    return new Set(saved.filter((level) => Number.isInteger(level) && level >= 0 && level < collectionTotal));
  } catch {
    return new Set([0]);
  }
}

function unlockLevel(level) {
  if (level < 0 || level >= collectionTotal || unlockedLevels.has(level)) return;
  unlockedLevels.add(level);
  localStorage.setItem(storageKey, JSON.stringify([...unlockedLevels].sort((a, b) => a - b)));
}

function getMoveLines(direction) {
  const lines = [];

  if (direction === "left" || direction === "right") {
    for (let row = 0; row < size; row += 1) {
      const cols = direction === "left" ? [0, 1, 2, 3] : [3, 2, 1, 0];
      lines.push(cols.map((col) => ({ row, col })));
    }
  }

  if (direction === "up" || direction === "down") {
    for (let col = 0; col < size; col += 1) {
      const rows = direction === "up" ? [0, 1, 2, 3] : [3, 2, 1, 0];
      lines.push(rows.map((row) => ({ row, col })));
    }
  }

  return lines;
}

async function playMoveAnimation(transitions, merges) {
  const cells = [...boardEl.querySelectorAll(".cell")];
  const boardBox = boardEl.getBoundingClientRect();
  animLayerEl.innerHTML = "";
  boardEl.classList.add("animating");

  transitions.forEach((transition) => {
    const fromBox = cells[transition.from.row * size + transition.from.col].getBoundingClientRect();
    const toBox = cells[transition.to.row * size + transition.to.col].getBoundingClientRect();
    const item = itemAt(transition.level);
    const tile = document.createElement("div");

    tile.className = `tile${transition.level >= 2 ? " result" : ""}`;
    tile.style.width = `${fromBox.width}px`;
    tile.style.height = `${fromBox.height}px`;
    tile.style.left = `${fromBox.left - boardBox.left}px`;
    tile.style.top = `${fromBox.top - boardBox.top}px`;
    tile.style.background = tileBackground(item, transition.level);
    tile.innerHTML = tileContent(item);
    animLayerEl.append(tile);

    requestAnimationFrame(() => {
      tile.style.transform = `translate(${toBox.left - fromBox.left}px, ${toBox.top - fromBox.top}px) scale(${transition.merging ? 0.92 : 1})`;
    });
  });

  await wait(230);
  merges.forEach((merge) => addMergeBurst(merge.row, merge.col));
  await wait(180);
  boardEl.classList.remove("animating");
  animLayerEl.innerHTML = "";
}

function addMergeBurst(row, col) {
  const cell = boardEl.querySelectorAll(".cell")[row * size + col];
  const cellBox = cell.getBoundingClientRect();
  const boardBox = boardEl.getBoundingClientRect();
  const burst = document.createElement("div");

  burst.className = "merge-burst";
  burst.style.width = `${cellBox.width}px`;
  burst.style.height = `${cellBox.height}px`;
  burst.style.left = `${cellBox.left - boardBox.left}px`;
  burst.style.top = `${cellBox.top - boardBox.top}px`;
  animLayerEl.append(burst);
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function canMove() {
  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      const value = grid[row][col];
      if (value === null) return true;
      if (grid[row + 1]?.[col] === value || grid[row][col + 1] === value) return true;
    }
  }
  return false;
}

document.addEventListener("keydown", (event) => {
  const keys = {
    ArrowUp: "up",
    w: "up",
    W: "up",
    ArrowDown: "down",
    s: "down",
    S: "down",
    ArrowLeft: "left",
    a: "left",
    A: "left",
    ArrowRight: "right",
    d: "right",
    D: "right",
  };

  if (!keys[event.key]) return;
  event.preventDefault();
  move(keys[event.key]);
});

document.querySelectorAll("[data-dir]").forEach((button) => {
  button.addEventListener("click", () => move(button.dataset.dir));
});

function fullReset() {
  unlockedLevels = new Set();
  localStorage.removeItem(storageKey);
  videoTriggered.clear();
  localStorage.removeItem(videoStorageKey);
  selectedPediaLevel = 0;
  pediaMode = "unlocked";
  hideAllVideos();
  videoPlaceholderEl.style.display = "";
  startGame();
}
document.querySelector("#new-game").addEventListener("click", fullReset);
document.querySelector("#retry-button").addEventListener("click", fullReset);
startGameButtonEl.addEventListener("click", () => {
  homeScreenEl.classList.add("hidden");
  bgmStopped = true;
  homeBgmEl.pause();
  homeBgmEl.currentTime = 0;
  const allTriggerVideos = [
    hnjdVideoEl, sijuaVideoEl, gaoyaVideoEl, bababoVideoEl, laicaiVideoEl,
    qinshihuangVideoEl, tankVideoEl, daodunVideoEl, bielaoVideoEl,
    gogogoVideoEl, zuowanVideoEl, wuchuangVideoEl, roamVideoEl, victoryVideoEl,
  ];
  allTriggerVideos.forEach((v) => {
    if (!v) return;
    v.muted = true;
    const p = v.play();
    if (p && p.then) {
      p.then(() => {
        v.pause();
        v.currentTime = 0;
        v.muted = false;
      }).catch(() => {
        v.muted = false;
      });
    }
  });
});
const pediaModalEl = document.querySelector("#pedia-modal");

function openPedia() {
  pediaMode = "unlocked";
  renderChain();
  renderPediaDetail(selectedPediaLevel);
  pediaModalEl.classList.remove("hidden");
}

function closePedia() {
  pediaModalEl.classList.add("hidden");
}

pediaJumpEl.addEventListener("click", openPedia);

document.querySelector("#pedia-close").addEventListener("click", closePedia);
pediaModalEl.addEventListener("click", (event) => {
  if (event.target === pediaModalEl) closePedia();
});

showUnlockedEl.addEventListener("click", () => {
  pediaMode = "unlocked";
  renderChain();
});
showAllEl.addEventListener("click", () => {
  pediaMode = "all";
  renderChain();
});
chainEl.addEventListener("click", (event) => {
  const entry = event.target.closest(".pedia-entry");
  if (!entry) return;
  selectedPediaLevel = Number(entry.dataset.level);
  renderPediaDetail(selectedPediaLevel);
  renderChain();
});

boardEl.addEventListener("pointerdown", (event) => {
  touchStart = { x: event.clientX, y: event.clientY };
});

boardEl.addEventListener("pointerup", (event) => {
  if (!touchStart) return;
  const dx = event.clientX - touchStart.x;
  const dy = event.clientY - touchStart.y;
  touchStart = null;

  if (Math.max(Math.abs(dx), Math.abs(dy)) < 28) return;
  if (Math.abs(dx) > Math.abs(dy)) {
    move(dx > 0 ? "right" : "left");
  } else {
    move(dy > 0 ? "down" : "up");
  }
});
