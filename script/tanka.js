const MAX = 8;
var generatedPoemArray = [];
var pickedPoemArray = [];

window.onload = function () {
  recreatePoems();

  var baboonOutput = document.getElementById("baboonOutput");
  var baboonPicked = document.getElementById("baboonPicked");
  baboonOutput.style.minHeight = baboonOutput.clientHeight + "px";
  baboonPicked.style.minHeight = baboonOutput.clientHeight + "px";

  var outputRealm = document.getElementById("outputrealm");
  var pickedRealm = document.getElementById("pickedrealm");
  outputRealm.style.minHeight = outputRealm.clientHeight + "px";
  pickedRealm.style.minHeight = outputRealm.clientHeight + "px";
};

function recreatePoems() {
  createPoems(MAX);
  showPoems();
}

function createPoems(num) {
  const baboon = new Baboon();
  generatedPoemArray = [];
  for (var i = 0; i < num; i++) {
    generatedPoemArray.push(baboon.create());
  }
}

function showPoems() {
  var baboonOutput = document.getElementById("baboonOutput");
  baboonOutput.innerHTML = "";
  for (var i = 0; i < generatedPoemArray.length; i++) {
    baboonOutput.innerHTML +=
      "<p class='poems'><a class='generatedpoem' href='javascript:pickPoem(" +
      i +
      ")'>" +
      generatedPoemArray[i] +
      "</a></p>";
  }

  var baboonPicked = document.getElementById("baboonPicked");
  if (pickedPoemArray.length == 0) {
    document.getElementById("copybtn").style.display = "none";
    baboonPicked.innerHTML =
      "<p id='helpmessage'>短歌をクリックしてピックアップ</p>";
  } else {
    document.getElementById("copybtn").style.display = "inline-block";
    baboonPicked.innerHTML = "";
    for (var i = 0; i < pickedPoemArray.length; i++) {
      baboonPicked.innerHTML +=
        "<p class='poems'><a class='storedpoem' href='javascript:restorePoem(" +
        i +
        ")'>" +
        pickedPoemArray[i] +
        "</a></p>";
    }
  }
}

function pickPoem(index) {
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
  var textArea = document.getElementById("poemtextarea");
  textArea.innerHTML = "";
  for (var poem of pickedPoemArray) {
    textArea.innerHTML += poem + "\n";
  }
  textArea.select();
  document.execCommand("Copy");
  turnCopyButtonImg(1);
}

function turnCopyButtonImg(push) {
  var copyButton = document.getElementById("copybtn");
  var copyButtonImg = document.getElementById("copyimg");
  var copiedButtonImg = document.getElementById("copiedimg");
  var copiedmessage = document.getElementById("copiedmessage");
  if (push == 0) {
    copyButton.classList.remove("pushedbtn");
    copyButtonImg.style.display = "inline-block";
    copiedButtonImg.style.display = "none";
    copiedmessage.style.display = "none";
  } else {
    copyButton.classList.add("pushedbtn");
    copyButtonImg.style.display = "none";
    copiedButtonImg.style.display = "inline-block";

    copiedmessage.style.top =
      "calc(1rem + " + copyButton.getBoundingClientRect().bottom + "px)";
    copiedmessage.style.display = "inline-block";
  }
}
