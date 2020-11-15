let handle = 0; // 记录真正是否循环
let timeoutHandle = 0;
let initClick = null;

const ensureLoop = 20;
let loopNow = 0;

let allStudents = null;
let names = null;
const luckyDogs = [];
let pointsEnabled = true;
let totalPoints = 0;
const pointList = [];
let studentNum = 0;

const urlParams = new URLSearchParams(window.location.search);
const prizeType = urlParams.get("prize");
const eventName = urlParams.get("event");
const apiPoint = urlParams.get("api");
// initial word should be as long as possible
// to get enough particles
window.word = urlParams.get("word");

const interval = 200;
let textColor = "white";

// try to avoid cache
fetch(`${apiPoint}${location.search}&${Math.floor(Date.now() / 1000)}`)
  .then((response) => response.json())
  .then(function (data) {
    allStudents = data;
    if (Array.isArray(allStudents)) {
      pointsEnabled = false;
      names = allStudents
    } else {
      names = Object.keys(allStudents);
      names.forEach((name) => {
        point = allStudents[name][prizeType] + 1;
        pointList.push(point);
        totalPoints += point;
        studentNum += 1;
      });
    }
    // setTimeout('setText("准备就绪")', 200);
  });

function clickDo() {
  if (!initClick) {
    initClick = 1;
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

function naiveSelect() {
  if (pointsEnabled) {
    let rand_point = Math.floor(Math.random() * totalPoints);
    let accum_point = 0;
    for (let i = 0; i < studentNum; i++) {
      accum_point += pointList[i];
      if (accum_point > rand_point) return names[i];
    }
  } else return names[Math.floor(Math.random() * names.length)];
}

function randomSelect() {
  let selected = "人数不足"
  if (luckyDogs.length < names.length)
    while (luckyDogs.includes(selected = naiveSelect()));

  setText(selected);
  // avatarImg.src = all_students[selected];
  if (loopNow++ > ensureLoop && Math.random() < 0.1 && handle != 0) {
    loopNow = 0;
    clearInterval(handle);
    handle = 0;
    luckyDogs.push(selected)
    setTimeout("textColor='#1d73c9'", interval);
    //setTimeout("text.forEach(function(p){p.color='#FF0000'})", interval)
    // toCircle();
    timeoutHandle = setTimeout(restore, 10000);
  }
}

function restore() {
  if (handle == 0) {
    textColor = "white";
    setText(eventName);
    // continueShowPic();
  }
}

function toCircle() {
  clearInterval(showLoop);
  showLoop = null;
  currentLayout = 3;
}

function continueShowPic() {
  avatarImg.src = "";
  if (showLoop == null) {
    showPic();
    showLoop = setInterval(showPic, 1800);
  }
}

window.onkeypress = function (e) {
  if (e.keyCode == 13) {
    window.location.reload();
  }
};
