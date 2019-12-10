//let playing = false // 记录鼠标事件意义上的状态
let handle = 0; // 记录真正是否循环
let timeoutHandle = 0;
let all_students = null;
let names = null;
fetch('user_data.json')
  .then(response => response.json())
  .then(function(data) {
    all_students = data;
    names = Object.keys(all_students);
  });
const interval = 200;
let textColor = "white";

function clickDo() {
  if (!names) {
    alert("名单尚未传输完毕！");
    return;
  }
  if (handle == 0) {
    toCircle();
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
  avatarImg.src = all_students[selected];
  if (Math.random() < 0.1 && handle != 0) {
    clearInterval(handle);
    handle = 0;
    setTimeout("textColor='#1d73c9'", interval);
    //setTimeout("text.forEach(function(p){p.color='#FF0000'})", interval)
    toCircle();
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
