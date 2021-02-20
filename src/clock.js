const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h1");

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const sec = date.getSeconds();

  let ampm = "AM ",
    clockTime = "";

  if (hours >= 12) {
    ampm = "PM ";
  }
  if (hours >= 13) {
    clockTime = `${hours - 12}:${minutes < 10 ? `0${minutes}` : `${minutes}`}:${
      sec < 10 ? `0${sec}` : `${sec}`
    }`;
  } else {
    clockTime = `${hours < 10 ? `0${hours}` : `${hours}`}:${
      minutes < 10 ? `0${minutes}` : `${minutes}`
    }:${sec < 10 ? `0${sec}` : `${sec}`}`;
  }

  clockTitle.innerText = ampm + clockTime;
}

function init() {
  setInterval(getTime, 1000);
}

init();
