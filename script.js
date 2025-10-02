"use strict";

//declare clue arrays
const twoCorrect = new Array();
const oneCorrect = new Array();
const wellPlaced = new Array();
const noCorrect = new Array();

const answer = [];

let gameOver = false;

function shuffleArray(array) {
  // Shuffle using Fisher–Yates
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // swap
  }
  return array;
}

function rearrange(array, num, index, isEqual) {
  if (isEqual == true) {
    while (array.indexOf(num) !== index) shuffleArray(array);
    return array;
  } else {
    while (array.indexOf(num) === index) shuffleArray(array);
    return array;
  }
}

//set named indexes
const indexes = shuffleArray([0, 1, 2]);
let wpIndex = indexes[0];
let notWpIndex1 = indexes[1];
let notWpIndex2 = indexes[2];

//declare named clue numbers
let wpNum = -1;
let notWpNum1 = -1;
let notWpNum2 = -1;

//declare arrays to hold existent and non-existent values
const existent = new Set();
const nonExistent = new Set();

let currentAnsBox = $("#ans1"); //to recieve user set value
$("#ans1").addClass("active");
let hasWon = new Array();
const wrongVal = new Array();

//Generate clue with two correct but wrongly placed numbers
function twoClue() {
  const tempSet = new Set();
  while (tempSet.size < 3) {
    const num = Math.floor(Math.random() * 10);
    tempSet.add(num);
  }

  let temp = Array.from(tempSet);
  notWpNum1 = temp[notWpIndex1];
  existent.add(notWpNum1);
  notWpNum2 = temp[notWpIndex2];
  existent.add(notWpNum2);
  nonExistent.add(temp[wpIndex]);

  for (const num of temp) {
    twoCorrect.push(num);
  }
}

//Generate clue with one correct and well placed number
function wpClue() {
  const tempSet = new Set();
  let num = Math.floor(Math.random() * 10);
  while (nonExistent.has(num)) num = Math.floor(Math.random() * 10);
  tempSet.add(num);
  existent.add(num);
  wpNum = num;

  while (tempSet.size < 3) {
    num = Math.floor(Math.random() * 10);
    while (existent.has(num)) num = Math.floor(Math.random() * 10);
    tempSet.add(num);
    nonExistent.add(num);
  }

  let temp = Array.from(tempSet);

  temp = rearrange(temp, wpNum, wpIndex, true);

  for (const num of temp) {
    wellPlaced.push(num);
  }

  if (existent.size < 3) {
    wpNum == notWpNum1 ? (notWpNum1 = -1) : (notWpNum2 = -1);
  }
}

//Generate clue with one correct but wrongly placed number
function oneClue() {
  const tempSet = new Set();
  let num = -1;
  let tempNum = -1;

  if (existent.size < 3) {
    num = Math.floor(Math.random() * 10);
    while (nonExistent.has(num)) num = Math.floor(Math.random() * 10);
    tempSet.add(num);
    existent.add(num);
  } else {
    let index = Math.floor(Math.random() * 3);
    num = Array.from(existent)[index];
    tempSet.add(num);
  }

  if (notWpNum1 == -1) {
    notWpNum1 = num;
  } else if (notWpNum2 == -1) {
    notWpNum2 = num;
  }

  while (tempSet.size < 3) {
    num = Math.floor(Math.random() * 10);
    while (existent.has(num)) num = Math.floor(Math.random() * 10);
    tempSet.add(num);
    nonExistent.add(num);
  }

  let temp = Array.from(tempSet);
  if (temp.includes(wpNum)) {
    rearrange(temp, wpNum, wpIndex, false);
  }
  if (temp.includes(notWpNum1)) {
    rearrange(temp, notWpNum1, notWpIndex2, false);
  }
  if (temp.includes(notWpNum2)) {
    rearrange(temp, notWpNum2, notWpIndex1, false);
  }

  for (const num of temp) {
    oneCorrect.push(num);
  }
}

//Generate clue with all incorrect numbers
function noneCorrect() {
  let tempSet = new Set();
  while (tempSet.size < 3) {
    let num = Math.floor(Math.random() * 10);
    while (existent.has(num)) num = Math.floor(Math.random() * 10);
    tempSet.add(num);
    nonExistent.add(num);
  }
  for (const num of tempSet) {
    noCorrect.push(num);
  }
}

function checkNoneCorrect(answer) {
  const noneCorrProblems = [true, ""];
  let heading = `\n\nClue: ${noCorrect.join("")}...Nothing is correct:`;
  let probString = "";

  for (const num of answer) {
    if (noCorrect.includes(num)) {
      noneCorrProblems[0] = false;
      probString += `\n-${num} cannot be part of the answer.`;
      wrongVal.push(num);
    }
  }

  if (noneCorrProblems.includes(false)) noneCorrProblems[1] = heading + probString;
  return noneCorrProblems;
}

function checkWP(answer) {
  let correctCount = 0;
  const wpProblems = [true, ""];
  let heading = `\n\nClue: ${wellPlaced.join("")}...One number is correct and well placed:`;
  let probString = "";

  for (const num of answer) {
    if (wellPlaced.includes(num)) {
      correctCount++;

      if (!wrongVal.includes(num)) {
        if (answer.indexOf(num) !== wellPlaced.indexOf(num)) {
          wpProblems[0] = false;

          probString += `\n-${num} must appear in position ${wellPlaced.indexOf(num) + 1} in the answer`;
          wrongVal.push(num);
        }
      }
    }
  }
  if (correctCount !== 1) {
    wpProblems[0] = false;

    probString += `\n-Answer must contain exactly one number from this clue`;
  }
  if (wpProblems.includes(false)) wpProblems[1] = heading + probString;
  return wpProblems;
}

function checkTwoCorrect(answer) {
  let correctCount = 0;
  const twoCorrProblems = [true, ""];
  let heading = `\n\nClue: ${twoCorrect.join("")}...Two numbers are correct but wrongly placed:`;
  let probString = "";

  for (const num of answer) {
    if (twoCorrect.includes(num)) {
      correctCount++;

      if (!wrongVal.includes(num)) {
        if (answer.indexOf(num) === twoCorrect.indexOf(num)) {
          twoCorrProblems[0] = false;

          probString += `\n-${num} must not appear in position ${twoCorrect.indexOf(num) + 1} in the answer`;
        }
      }
    }
  }
  if (correctCount !== 2) {
    twoCorrProblems[0] = false;
    probString += `\n-Answer must contain exactly two numbers from this clue`;
  }
  if (twoCorrProblems.includes(false)) twoCorrProblems[1] = heading + probString;
  return twoCorrProblems;
}

function checkOneCorrect(answer) {
  let correctCount = 0;
  const oneCorrProblems = [true, ""];
  let heading = `\n\nClue: ${oneCorrect.join("")}...One number is correct but not well placed:`;
  let probString = "";

  for (const num of answer) {
    if (oneCorrect.includes(num)) {
      correctCount++;
      if (!wrongVal.includes(num)) {
        if (answer.indexOf(num) === oneCorrect.indexOf(num)) {
          oneCorrProblems[0] = false;

          probString += `\n-${num} must not appear in position ${oneCorrect.indexOf(num) + 1} in the answer`;
          wrongVal.push(num);
        }
      }
    }
  }
  if (correctCount !== 1) {
    oneCorrProblems[0] = false;

    probString += `\n-Answer must contain exactly one number from this clue`;
  }
  if (oneCorrProblems.includes(false)) oneCorrProblems[1] = heading + probString;
  return oneCorrProblems;
}

function checkAnswer(answer) {
  const problems = new Array();
  let problem = `\n\nWhat went wrong:`;
  const noneCorrChecked = checkNoneCorrect(answer);
  const wpChecked = checkWP(answer);
  const twoCorrChecked = checkTwoCorrect(answer);
  const oneCorrChecked = checkOneCorrect(answer);
  hasWon = noneCorrChecked.includes(false) || wpChecked.includes(false) || twoCorrChecked.includes(false) || oneCorrChecked.includes(false) ? false : true;
  problem += noneCorrChecked[1] + wpChecked[1] + twoCorrChecked[1] + oneCorrChecked[1];

  hasWon ? showAlert("You win!") : showAlert(`You lose!\nYour answer: ${answer.join("")} \n ${problem}`);
}

$().ready(() => {
  $("#dialog-confirm").dialog({
    autoOpen: false,
    resizable: false,
    height: "auto",
    width: 400,
    modal: true,
    show: {
      effect: "blind",
      duration: 1000,
    },
    hide: {
      effect: "blind",
      duration: 1000,
    },
    position: {
      my: "center ",
      at: "center ",
      of: $(".puzzle"),
    },
    modal: true,
    width: 300,
  });
  //set clues
  twoClue();
  wpClue();
  oneClue();
  noneCorrect();

  if (window.matchMedia("screen and (max-width: 1024px)").matches) {
    $("#instructions-header").next().slideToggle(1000);
  }
  $("#instructions-header").click((e) => {
    $("#instructions-header").next().slideToggle(1000);
    if ($("#arrow").html() === "▲") {
      $("#arrow").html("▼");
    } else {
      $("#arrow").html("▲");
    }
  });

  //shuffle order of clues
  const clueArray = Array.from($(".clue"));
  shuffleArray(clueArray);

  $(".clues").text("");
  for (const element of clueArray) {
    $(".clues").append(element);
  }

  $("#clue1").text(twoCorrect.join(""));
  $("#clue2").text(wellPlaced.join(""));
  $("#clue3").text(oneCorrect.join(""));
  $("#clue4").text(noCorrect.join(""));

  // set currentAnsBox if user clicks on an input box
  $(".ans-box").on("click", function (e) {
    $(currentAnsBox).toggleClass("active");
    currentAnsBox = $(this);
    $(currentAnsBox).toggleClass("active");
    e.preventDefault();
  });

  //set value of input box and move active input box to the next box
  $(".number-btn").click((e) => {
    if (e.currentTarget.id === "backspace") {
      currentAnsBox.val(e.currentTarget.value);
      e.preventDefault();
    } else if (e.currentTarget.id !== "backspace") {
      currentAnsBox.val(e.currentTarget.value);
      $(currentAnsBox).toggleClass("active");
      currentAnsBox = currentAnsBox.next();
      $(currentAnsBox).toggleClass("active");
      if (currentAnsBox.length == 0) {
        $("#ans1").addClass("active");
        currentAnsBox = $("#ans1");
      }
      e.preventDefault();
    }
  });

  //get submitted answer after confirmation
  $("#submit").click((e) => {
    answer.length = 0;
    let ansIsValid = true;

    $(".ans-box").each(function () {
      const num = parseInt($(this).val());
      if (!$(this).val()) {
        showAlert("Please fill all 3 boxes");
        return (ansIsValid = false);
      } else if (!$.isNumeric(num)) {
        showAlert("Please enter numbers from 0 to 9 only.");
        return (ansIsValid = false);
      }

      if (num < 0 || num > 9) {
        showAlert("Please enter numbers from 0 to 9 only.");
        return (ansIsValid = false);
      }
      answer.push(num);
    });
    const answerSet = Array.from(new Set(answer));
    if (answerSet.length !== answer.length) {
      showAlert("Duplicate numbers not allowed");
      return (ansIsValid = false);
    }
    if (ansIsValid) {
      if (!gameOver) {
        showConfirmation("Submit answer?", "Submit", submitAnswer);
      } else {
        submitAnswer();
      }
    }

    e.preventDefault();
  });

  //confirm whether to generate new puzzle
  $("#clear").click((e) => {
    if (!gameOver) {
      showConfirmation("All progress will be lost!", "New Puzzle", newPuzzle);
    }else{
      newPuzzle();
    }
    e.preventDefault();
  });
});

function showAlert(message) {
  $("#dialog").dialog({
    autoOpen: false,
    show: {
      effect: "blind",
      duration: 1000,
    },
    hide: {
      effect: "blind",
      duration: 1000,
    },
    position: {
      my: "center ",
      at: "center ",
      of: $(".puzzle"),
    },
    modal: true,
    width: 300,
  });

  $("#dialog").dialog("open");
  $("#message").text(message);
}

function showConfirmation(title, btnText, callback) {
  $("#dialog-confirm").dialog({
    title: title,
  });
  $("#dialog-confirm").dialog("option", "buttons", [
    {
      text: btnText,
      click: function () {
        $(this).dialog("close");
        if (typeof callback === "function") {
          callback();
        }
      },
    },
    {
      text: "Cancel",
      click: function () {
        $(this).dialog("close");
      },
    },
  ]);
  $("#dialog-confirm").dialog("open");
}

function submitAnswer() {
  checkAnswer(answer);
  $(".number-btn").each(function () {
    $(this).prop("disabled", true);
  });
  $(".ans-box").each(function () {
    $(this).prop("disabled", true);
  });
  $("#submit").text("Result");
  gameOver = true;
}

function newPuzzle() {
  window.location.reload();
}
