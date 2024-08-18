var sourceImage = document.getElementById('sourceImage');
var targetImage = document.getElementById('targetImage');

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
  // 在此处添加触发的效果
  alert('拖动到目标图片上了！');
  var data = event.dataTransfer.getData('text/plain');
  var element = document.getElementById(data);
  // 可以根据需求进行更多的处理
});
