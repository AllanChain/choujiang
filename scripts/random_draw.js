//let playing = false // 记录鼠标事件意义上的状态
let handle = 0; // 记录真正是否循环
let timeoutHandle = 0;
const all_students = {
  米米: "img/16272760.jpg",
  司马龙飞: "img/36528777.jpg",
  txtyb: "img/14294192.jpg"
};
const names = Object.keys(all_students);
const interval = 600;
let textColor = "white";
// 不知道为什么，文字的粒子数与初始值有奇妙关联，故暴力设提示词
// setTimeout("setText('请拖放名单')", 1500)

function clickDo() {
  // if (!names) {
  //   setText('请先上传!');
  //   return;
  // }
  if (handle == 0) {
    continueShowPic();
    clearTimeout(timeoutHandle); // 下一轮开始时，之前的timeout不要插嘴
    textColor = "white";
    randomSelect(); // 不要窒息1s
    handle = setInterval(randomSelect, interval);
  }
}

function setText(s) {
  clearWord();
  nextText = [[], []];
  text = [];
  createText(s);
}

function randomSelect() {
  let selected = names[Math.floor(Math.random() * names.length)];
  setText(selected);
  if (Math.random() < 0.2 && handle != 0) {
    clearInterval(handle);
    handle = 0;
    setTimeout("textColor='#1d73c9'", interval);
    //setTimeout("text.forEach(function(p){p.color='#FF0000'})", interval)
    toCircle();
    avatarImg.src = all_students[selected];
    timeoutHandle = setTimeout(restore, 10000);
  }
}

function restore() {
  if (handle == 0) {
    textColor = "white";
    setText("超新星之夜");
    continueShowPic();
  }
}

function toCircle() {
  clearInterval(showLoop);
  showLoop = null;
  currentLayout = 3;
}

function continueShowPic() {
  avatarImg.src="";
  if (showLoop == null) {
    showPic();
    showLoop = setInterval(showPic, 1800);
  }
}
