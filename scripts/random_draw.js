//let playing = false // 记录鼠标事件意义上的状态
let handle = 0; // 记录真正是否循环
let timeoutHandle = 0;
let all_students = null;
let names = null;
let init_click = null;
let total_points = 0;
let point_list = [];
let student_num = 0;
const urlParams = new URLSearchParams(window.location.search);
const prizeType = urlParams.get('prize');
// try to avoid cache
// fetch('user_data.json?'+timeStamp)
fetch('/api/choujiang?'+Math.floor(Date.now() / 1000))
  .then(response => response.json())
  .then(function(data) {
    all_students = data;
    names = Object.keys(all_students);
    names.forEach(function (name, investments) {
      point = all_students[name][prizeType];
      point_list.push(point);
      total_points += point;
      student_num +=1;
    });
    // setTimeout('setText("准备就绪")', 200);
  });
const interval = 200;
let textColor = "white";

function clickDo() {
  if (!init_click) {
    init_click = 1;
    return;
  }
  if (!names) {
    setText("尚未就绪");
    return;
  }
  if (handle == 0) {
    // toCircle();
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
  let rand_point = Math.floor(Math.random() * total_points);
  let accum_point = 0;
  let selected = "";
  for (let i=0; i<student_num; i++) {
    accum_point += point_list[i];
    if (accum_point > rand_point) {
      selected = names[i];
      break;
    }
  }
  setText(selected);
  // avatarImg.src = all_students[selected];
  if (Math.random() < 0.1 && handle != 0) {
    clearInterval(handle);
    handle = 0;
    setTimeout("textColor='#1d73c9'", interval);
    //setTimeout("text.forEach(function(p){p.color='#FF0000'})", interval)
    // toCircle();
    timeoutHandle = setTimeout(restore, 10000);
  }
}

function restore() {
  if (handle == 0) {
    textColor = "white";
    setText("新年晚会");
    // continueShowPic();
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

window.onkeypress = function(e){
  if (e.keyCode == 13){
    window.location.reload();
  }
};
