// JavaScript：建立 20x10 的小方塊
const grid = document.getElementById('grid');

for (let i = 0; i < 200; i++) {
  const square = document.createElement('div');
  square.classList.add('square');
  
  // 點擊後顯示字
  square.addEventListener('click', () => {
    square.textContent = '字'; // 你可以換成其他文字
    square.style.backgroundColor = '#ffccdd';
  });

  grid.appendChild(square);
}
