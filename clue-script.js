let clueArray = new Array();
let existArray = new Array();
let nonExistArray = new Array();

//Generate random indexes for clues
const index = () => Math.floor(Math.random() * 3);

//generate well placed index
const wellPlacedIndex = index();

//generate correct but not well placed index1
let corrNotPlIndex1 = index();
while (corrNotPlIndex1 === wellPlacedIndex) corrNotPlIndex1 = index();

//generate correct but not well placed index2
let corrNotPlIndex2 = index();
while (
  corrNotPlIndex2 === wellPlacedIndex ||
  corrNotPlIndex2 === corrNotPlIndex1
)
  corrNotPlIndex2 = index();

function generateExistNum(arr) {
  let num = Math.floor(Math.random() * 10);
  while (arr.includes(num) || nonExistArray.includes(num)) {
    num = Math.floor(Math.random() * 10);
  }
  arr.push(num);
  if (!existArray.includes(num)) {
    existArray.push(num);
  }
}

function generateNonExistNum(arr) {
  let num = Math.floor(Math.random() * 10);
  while (arr.includes(num) || existArray.includes(num)) {
    num = Math.floor(Math.random() * 10);
  }
  arr.push(num);

  if (!nonExistArray.includes(num)) {
    nonExistArray.push(num);
  }
}

//Generate well placed clue
let wPNum;
let wPArray = generateWPArray();
function generateWPArray() {
  let temp = new Array();
  generateExistNum(temp);

  for (let index = 0; index < 2; index++) {
    generateNonExistNum(temp);
  }
  while (temp[wellPlacedIndex] !== existArray[0])
    shuffle(temp, wellPlacedIndex, existArray[0], true);
  wPNum = temp[wellPlacedIndex];
  return temp;
}

//Generate two correct clue
let corrNPNum1;
let corrNPNum2;
// let twoCorrArr = new Array(3);
let twoCorrArr = generatetwoCorrArr();
function generatetwoCorrArr() {
  let temp = new Array();
  let newTemp = new Array(3);

  for (let index = 0; index < 2; index++) {
    generateExistNum(temp);
  }
  newTemp[corrNotPlIndex1] = temp[0];
  newTemp[corrNotPlIndex2] = temp[1];
  generateNonExistNum(temp);
  newTemp[wellPlacedIndex] = temp[2];

  corrNPNum1 = newTemp[corrNotPlIndex2];
  corrNPNum2 = newTemp[corrNotPlIndex1];

  return newTemp;
}

//Generate one correct clue
let oneCorrArr = generateOneCorrArr();

function generateOneCorrArr() {
  let temp = new Array();

  if (existArray.length < 3) generateExistNum(temp);

  if (temp.includes(wPNum)) {
    shuffle(temp, wellPlacedIndex, wPNum, false);
  } else if (wPNum === corrNPNum1) {
    corrNPNum1 = temp[0];
  } else if (wPNum === corrNPNum2) {
    corrNPNum2 = temp[0];
  } else {
    let index = Math.floor(Math.random() * 3);
    temp.push(existArray[index]);
  }
  for (let index = 0; index < 2; index++) {
    generateNonExistNum(temp);
  }

  if (temp.includes(wPNum)) {
    shuffle(temp, wellPlacedIndex, wPNum, false);
  } else if (temp.includes(corrNPNum1)) {
    shuffle(temp, corrNotPlIndex1, corrNPNum1, false);
  } else if (temp.includes(corrNPNum2)) {
    shuffle(temp, corrNotPlIndex2, corrNPNum2, false);
  }

  return temp;
}

//Generate none correct clue
let noCorrArr = generateNoCorrArr();
function generateNoCorrArr() {
  let temp = new Array();

  for (let i = 0; i < 3; i++) {
    generateNonExistNum(temp);
  }
  return temp;
}

function shuffle(array, index, num, isTrue) {
  if (isTrue) {
    while (array[index] !== num) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  } else {
    while (array[index] === num) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  }

  return array;
}

