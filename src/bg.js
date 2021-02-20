const body = document.querySelector("body");

const IMG_NUMBER = 29;

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `./src/img/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.appendChild(image);
  // image.addEventListener("loadend", handleImgLoad);
}

function genRandom() {
  return Math.floor(Math.random() * IMG_NUMBER);
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
