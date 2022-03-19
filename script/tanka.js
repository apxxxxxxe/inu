const MAX = 8;
let generatedPoemArray = [];
let pickedPoemArray = [];

window.onload = function () {
  recreatePoems();
  adjustHeaderComponent();
};

function adjustTanka() {
  const header = document.getElementById("header");
  const header_p = header.querySelector("p");
  const heightlimit = header.clientHeight;
  let size = parseInt(
    window.getComputedStyle(header_p).getPropertyValue("font-size"),
  );
  while (
    heightlimit <
      header_p.getBoundingClientRect().height && size > 1
  ) {
    size--;
    header_p.style.fontSize = size + "px";
  }
}

function adjustHeaderComponent() {
  const header = document.getElementById("header");
  const header_p = header.querySelector("p");
  const heightlimit = header.clientHeight;
  let size = parseInt(
    window.getComputedStyle(header_p).getPropertyValue("font-size"),
  );
  while (
    heightlimit <
      header_p.getBoundingClientRect().height && size > 1
  ) {
    size--;
    header_p.style.fontSize = size + "px";
  }
}

function recreatePoems() {
  createPoems(MAX);
  showPoems();
}

function createPoems(num) {
  const baboon = new Baboon();
  generatedPoemArray = [];
  for (let i = 0; i < num; i++) {
    generatedPoemArray.push(baboon.create());
  }
}

function showPoems() {
  let baboonOutput = document.getElementById("baboonOutput");
  baboonOutput.innerHTML = "";
  for (let i = 0; i < generatedPoemArray.length; i++) {
      let poem = document.createElement("p");
      poem.appendChild(document.createTextNode(generatedPoemArray[i]));
      poem.addEventListener('click', {index: i, handleEvent: pickPoem});
      poem.setAttribute("class","generatedpoem poems");
      baboonOutput.appendChild(poem);
  }

  let baboonPicked = document.getElementById("baboonPicked");
  if (pickedPoemArray.length == 0) {
    document.getElementById("copybtn").style.display = "none";
    baboonPicked.innerHTML = "<p id='helpmessage'>短歌をクリックしてピックアップ</p>";
  } else {
    document.getElementById("copybtn").style.display = "inline-block";
    baboonPicked.innerHTML = "";
    for (let i = 0; i < pickedPoemArray.length; i++) {
      let poem = document.createElement("p");
      poem.appendChild(document.createTextNode(pickedPoemArray[i]));
      poem.addEventListener('click', {index: i, handleEvent: restorePoem});
      poem.setAttribute("class","storedpoem poems");
      baboonPicked.appendChild(poem);
    }
  }
}

function pickPoem() {
  let index = this.index;
  pickedPoemArray.push(generatedPoemArray.splice(index, 1));
  showPoems();
  turnCopyButtonImg(0);
  document.getElementById("help").style.display = "none";
}

function restorePoem(index) {
  generatedPoemArray.push(pickedPoemArray.splice(index, 1));
  showPoems();
  turnCopyButtonImg(0);
}

function copyToClipboard() {
  let textArea = document.getElementById("poemtextarea");
  textArea.innerHTML = "";
  for (let poem of pickedPoemArray) {
    textArea.innerHTML += poem + "\n";
  }
  textArea.select();
  document.execCommand("Copy");
  turnCopyButtonImg(1);
}

function turnCopyButtonImg(push) {
  let copyButton = document.getElementById("copybtn");
  let copyButtonImg = document.getElementById("copyimg");
  let copiedButtonImg = document.getElementById("copiedimg");
  let copiedmessage = document.getElementById("copiedmessage");
  if (push == 0) {
    copyButton.classList.remove("pushedbtn");
    copyButtonImg.style.display = "inline-block";
    copiedButtonImg.style.display = "none";
    copiedmessage.style.display = "none";
  } else {
    copyButton.classList.add("pushedbtn");
    copyButtonImg.style.display = "none";
    copiedButtonImg.style.display = "inline-block";

    copiedmessage.style.top = "calc(1rem + " +
      copyButton.getBoundingClientRect().bottom + "px)";
    copiedmessage.style.display = "inline-block";
  }
}
