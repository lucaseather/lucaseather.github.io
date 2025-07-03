const grid = document.getElementById("grid");
const rows = 20;
const cols = 40;
let clickCount = 0;
let textCycle = ["p", "l", "e", "a", "s", "e"];
let clickedCells = [];

function createGrid() {
  for (let i = 0; i < rows * cols; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", () => onCellClick(cell));
    grid.appendChild(cell);
  }
}
// 確保瀏覽器載入後播放音樂（需互動觸發）
function playMusic() {
    const audio = new Audio("First Love.mp3");
    audio.loop = true;
    audio.play().catch((e) => {
        console.log("等待使用者互動才能播放音樂...");
    });

    // 儲存 audio 物件讓之後可以控制
    window._bgm = audio;
}

// 使用者第一次互動才觸發播放
document.addEventListener("click", () => {
    if (!window._bgm) {
        playMusic();
    }
});

function onCellClick(cell) {
  if (cell.classList.contains("clicked")) return;

  clickCount++;
  if (clickCount % 7 !== 0) {
    const letter = textCycle[(clickCount - 1) % 6];
    cell.textContent = letter;
    cell.classList.add("clicked");
    clickedCells.push(cell);
  } else {
    alert("Please take good care of yourself.");
    drawMessage();

    clickedCells.forEach((c) => {
      c.textContent = "";
      c.classList.remove("clicked");
    });
    clickedCells = [];
    clickCount = 0;
  }
}

function drawMessage() {
  const message = [" STAY ", " SAFE "];
  const font = {
    "A": [" XX ", "X  X", "X  X", "XXXX", "X  X", "X  X"],
    "E": ["XXXX", "X   ", "XXX ", "X   ", "X   ", "XXXX"],
    "F": ["XXXX", "X   ", "XXX ", "X   ", "X   ", "X   "],
    "S": [" XXX", "X   ", " XX ", "   X", "X  X", "XXX "],
    "T": ["XXXXX", "  X  ", "  X  ", "  X  ", "  X  ", "  X  "],
    "Y": ["X   X", "X   X", " XXX ", "  X  ", "  X  ", "  X  "],
    " ": ["    ", "    ", "    ", "    ", "    ", "    "],
  };

  const startRow = 5;
  const startCol = 5;

  message.forEach((line, lineIdx) => {
    const rowOffset = startRow + lineIdx * 7;
    let colOffset = startCol;

    for (const char of line) {
      const pattern = font[char] || font[" "];
      pattern.forEach((row, dy) => {
        for (let dx = 0; dx < row.length; dx++) {
          if (row[dx] === "X") {
            const r = rowOffset + dy;
            const c = colOffset + dx;
            const index = r * cols + c;
            const cell = document.querySelector(`.cell[data-index='${index}']`);
            if (cell) {
              cell.classList.add("bomb");
            }
          }
        }
      });
      colOffset += 6;
    }
  });
}

createGrid();
