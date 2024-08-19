var sourceImage = document.getElementById('sourceImage');
var targetImage = document.getElementById('talkImage');
let animationFrameId;

sourceImage.addEventListener('dragstart', function (event) {
  event.dataTransfer.setData('text/plain', event.target.id);
  console.log('开始拖动图片！');
});

targetImage.addEventListener('dragover', function (event) {
  event.preventDefault();
  console.log('拖动到目标图片上了！');
});

targetImage.addEventListener('drop', function (event) {
  event.preventDefault();
  var data = event.dataTransfer.getData('text/plain');
  var element = document.getElementById(data);
  startAnimation(element, targetImage);
});

function startAnimation(source, target) {
  // 获取窗口尺寸
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;

  // 获取目标图片在页面中的位置
  const targetRect = target.getBoundingClientRect();
  const targetPercentX = (targetRect.left / windowWidth) * 100;
  const targetPercentY = (targetRect.top / windowHeight) * 100;

  // 获取源图片初始位置
  const sourceRect = source.getBoundingClientRect();
  let startPercentX = (sourceRect.left / windowWidth) * 100;
  let startPercentY = (sourceRect.top / windowHeight) * 100;

  let duration = 500; // 动画持续时间（毫秒）
  let startTime = performance.now();

  function animate(currentTime) {
    let elapsedTime = currentTime - startTime;
    if (elapsedTime < duration) {
      let progress = elapsedTime / duration;
      let newPercentX = startPercentX + (targetPercentX - startPercentX) * progress;
      let newPercentY = startPercentY + (targetPercentY - startPercentY) * progress;

      // 将百分比转换为像素值进行设置，并稍微向右下偏移 10px
      let newX = (newPercentX * windowWidth / 100) + 20;
      let newY = (newPercentY * windowHeight / 100) + 20;

      source.style.left = newX + 'px';
      source.style.top = newY + 'px';
      animationFrameId = requestAnimationFrame(animate);
    } else {
      // 最终位置也需要偏移
      let finalX = (targetPercentX * windowWidth / 100) + 20;
      let finalY = (targetPercentY * windowHeight / 100) + 20;
      source.style.left = finalX + 'px';
      source.style.top = finalY + 'px';
    }
  }

  animate(performance.now());
}