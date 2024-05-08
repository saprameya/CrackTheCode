var inputBox = document.getElementById("input-box0");
inputBox.focus();
const ans = ['X','X','X'];
var popup = document.getElementsByClassName("popup");
var playAgainLost = document.getElementById("playAgainLost");
var playAgainWon = document.getElementById("playAgainWon");
var closeLost = document.getElementById("closeLost");
var closeWon = document.getElementById("closeWon");
let gameOver = false;



const CLUE_SIZE = 3;
const answer = [];

let existentNums = [];
let nonExistentNums = [];
let wellPlacedClueArr = [];
let twoCorrectClueArr = [];
let oneCorrectClueArr = [];
let noCorrectClueArr = [];


let wellplacedIndex = -1;
let wellpacedNum = -1;
let corrNotPlacedNum1 = -1;
let corrNotPlacedNum2 = -1;
let corrNotPlacedIndex1 = -1;
let corrNotPlacedIndex2 = -1;
let gameWon = true;

function inputNumber(num){
    
    
    if(inputBox == document.getElementById("input-box0")){
        ans[0] = num;
        inputBox.value = ans[0];
        inputBox= document.getElementById("input-box1");
    }
    else if(inputBox == document.getElementById("input-box1")){
        ans[1] = num;
        inputBox.value = ans[1];
        inputBox=document.getElementById("input-box2");
    }
    else if(inputBox == document.getElementById("input-box2")){
        
        ans[2] = num;
        inputBox.value = ans[2];
        inputBox = document.getElementById("");
    }
    inputBox.focus();
    
}

var body = document.getElementById("body");

body.addEventListener("click", function(e){
    if(!gameOver){
        var elem = e.target;
        if(elem.type == "submit"){
            if(elem == document.getElementById("submit"))
            {
                submit();
            }
            else{
                if(inputBox == document.getElementById("")){
                    alert("Please click on a box to input");
                }    
                else {
                    let num = elem.innerText;
                    inputNumber(num);
                }
            }
            
        }
        else if(elem.type == "text"){
            inputBox = elem;
            inputBox.focus();
            
        }
        else{
            inputBox = document.getElementById("");
        }
    
    }
});

var submit = document.getElementById("submit");

submit.addEventListener("click", function(e){

    if(!gameOver){
        document.getElementById("input-box0").value = ans[0];
        document.getElementById("input-box1").value = ans[1];
        document.getElementById("input-box2").value = ans[2];
    
        let ansCount = 0;
       
        for(let i = 0; i < ans.length; i++) {
    
            if(ans[0] == 'X' || ans[1] == 'X' || ans[2] == 'X'){
                alert("You must input all three numbers");
                break;            
            }
            if ( isNaN(parseFloat(ans[i])) && !isFinite(ans[i]) ) {
                alert("You must input all three numbers");
                break;
            }
            if(ans[0] == ans[1] || ans[0] == ans[2] || ans[1] == ans[2]){
                alert("Duplicate digits is not allowed");
                break;
            }
            else{
                ansCount++;
            }
        
        }
        let answerArray = [];
        for(let i = 0; i < ans.length; i++) {
            answerArray[i] = parseInt(ans[i]);
        }
        
        if(ansCount == CLUE_SIZE){
            checkAnswer(answerArray);
            if (gameWon == false){
                var popup = document.getElementById("popup-lost");
                popup.classList.add("open-popupLost");
            }
            else {
                var popup = document.getElementById("popup-won");
                popup.classList.add("open-popupWon");
    
            }
            
        }
    
    }
});




playAgainLost.addEventListener("click", function (e){
    popup = document.getElementById("popup-lost");
    popup.classList.remove("open-popupLost");
    location.reload();
});

playAgainWon.addEventListener("click", function (e){
    
    popup = document.getElementById("popup-won");
    popup.classList.remove("open-popupWon");
    location.reload();

});

closeLost.addEventListener("click", function (e){
    popup = document.getElementById("popup-lost");
    popup.classList.remove("open-popupLost");
   disableElements();
});

closeWon.addEventListener("click", function (e){
    popup = document.getElementById("popup-won");
    popup.classList.remove("open-popupWon");
    disableElements();

});

function disableElements(){
    var input = document.getElementById("input-box0");
    input.disabled = true;
    input = document.getElementById("input-box1");
    input.disabled = true;
    input = document.getElementById("input-box2");
    input.disabled = true;
    submit.disabled = true;
}


//Generate well placed clue
function generateWPClue(){

    let clueArray = [];
    while(clueArray.length < CLUE_SIZE) {
        let num = Math.floor(Math.random() * 10);
        if(!clueArray.includes(num)) {
            clueArray.push(num);
        }
    }

    //Randomly pick an index and its corresponding array element and set it to well-placed index and well-placed
    //number variables
    wellplacedIndex = Math.floor(Math.random() * CLUE_SIZE);
    wellpacedNum = clueArray[wellplacedIndex];


    
    //Set an index randomly to equal correctNotPlacedIndex1
    let randIndex = Math.floor(Math.random() * CLUE_SIZE);
    while(randIndex == wellplacedIndex){
        randIndex = Math.floor(Math.random() * CLUE_SIZE);
    }
    corrNotPlacedIndex1 = randIndex;

    for(let i = 0; i < clueArray.length; i++){
        if(i != wellplacedIndex){
            nonExistentNums.push(clueArray[i]);

            if(i != corrNotPlacedIndex1){
                corrNotPlacedIndex2 = i;
            }
        }
        else{
            existentNums.push(clueArray[i]);
            wellpacedNum = clueArray[i];
        }
       
    }

    wellPlacedClueArr = clueArray;    

 
}


//Generate two correct clue
function generateTwoCorrectClue(){
    let clueArray = new Array (CLUE_SIZE);
    let num = Math.floor(Math.random() * 10);

    //Add two random numbers that do not belong to non-existent numbers array
    while(clueArray.includes(num) || nonExistentNums.includes(num)){
        num = Math.floor(Math.random() * 10);
    }
    clueArray[corrNotPlacedIndex1] = num;
    corrNotPlacedNum1 = num;


    num = Math.floor(Math.random() * 10);

    while(clueArray.includes(num) || nonExistentNums.includes(num)){
        num = Math.floor(Math.random() * 10);
    }
    clueArray[corrNotPlacedIndex2] = num;
    corrNotPlacedNum2 = num;
    

    //Add one additional random number to clue array
    while(clueArray.includes(num) || existentNums.includes(num)){
        num = Math.floor(Math.random() * 10);
    }
    clueArray[wellplacedIndex] = num;


    corrNotPlacedIndex1 = clueArray.indexOf(corrNotPlacedNum1);
    corrNotPlacedIndex2 = clueArray.indexOf(corrNotPlacedNum2);

    if(!existentNums.includes(corrNotPlacedNum1) && !nonExistentNums.includes(corrNotPlacedNum1)){
        existentNums.push(corrNotPlacedNum1);
    }

    if(!existentNums.includes(corrNotPlacedNum2) && !nonExistentNums.includes(corrNotPlacedNum2)){
        existentNums.push(corrNotPlacedNum2);
    }

    for(let i = 0; i < clueArray.length; i++){
        if(!existentNums.includes(clueArray[i]) && !nonExistentNums.includes(clueArray[i])){
            nonExistentNums.push(clueArray[i]);
        }
    }


    twoCorrectClueArr = clueArray;
    
    
}

//Generate one correct clue
function generateOneCorrectClue(){

    let clueArray = [];
    let num = Math.floor(Math.random() * 10);

    //if enough existent numbers exist, pick one from those
    if (existentNums.length > CLUE_SIZE-1){
        let randIndex = Math.floor(Math.random() * CLUE_SIZE);
        clueArray.push(existentNums[randIndex]);
    }
    else{
        while(nonExistentNums.includes(num)){
            num = Math.floor(Math.random() * 10);
        }
        clueArray.push(num);
    }
        

    //Add two numbers that are not already existing numbers
    while(clueArray.length < CLUE_SIZE) {

        num = Math.floor(Math.random() * 10);
        while(clueArray.includes(num) || (existentNums.includes(num))){
            num = Math.floor(Math.random() * 10);
        }
        clueArray.push(num);


    }


let existentNumCount = 0;
for(let i = 0; i < clueArray.length; i++){
    if(existentNums.includes(clueArray[i])){
        existentNumCount++;
    }
}

if(existentNumCount == 0){
    randIndex = Math.floor(Math.random() * CLUE_SIZE);
    while(existentNums.includes(clueArray[randIndex])){
        randIndex = Math.floor(Math.random() * CLUE_SIZE);

    }
    if(wellpacedNum == corrNotPlacedNum1){
        corrNotPlacedNum1 = clueArray[randIndex];
        existentNums.push(clueArray[randIndex]);
    }
    else if (wellpacedNum == corrNotPlacedNum2){
        corrNotPlacedNum2 = clueArray[randIndex];
        existentNums.push(clueArray[randIndex]);
    }
}

for(let i = 0; i < clueArray.length; i++){
    if(clueArray[i] == corrNotPlacedNum1 || clueArray[i] == corrNotPlacedNum2 || clueArray[i] == wellpacedNum){
        if(!existentNums.includes(clueArray[i])){
            existentNums.push(clueArray[i]);
        }
        else {
            if(!nonExistentNums.includes(clueArray[i])){
                nonExistentNums.push(clueArray[i]);
            }

        }
    }
}


clueArray = shuffle(clueArray);


if(clueArray.includes(wellpacedNum)){
    while(clueArray.indexOf(wellpacedNum) == wellplacedIndex){
        clueArray = shuffle(clueArray);
    }
}
else if(clueArray.includes(corrNotPlacedNum1)){
    while(clueArray.indexOf(corrNotPlacedNum1) == corrNotPlacedIndex2){
        clueArray = shuffle(clueArray);
    }
}
else if(clueArray.includes(corrNotPlacedNum2)){
    while(clueArray.indexOf(corrNotPlacedNum2) == corrNotPlacedIndex1){
        clueArray = shuffle(clueArray);
    }
}
oneCorrectClueArr = clueArray;

}




//Generate no correct clue
function generateNoCorrClue(){

    let clueArray = [];

    while(clueArray.length < CLUE_SIZE) {
        let num = Math.floor(Math.random() * 10);
        if(!clueArray.includes(num) && !existentNums.includes(num)) {
            clueArray.push(num);
            if(!nonExistentNums.includes(num)){
                nonExistentNums.push(num);
            }
        }
    }
    noCorrectClueArr = clueArray;
}


function shuffle(array){
    
    let shuffledArray = [];
    let i = 0;
        
    while(i < array.length){
        let randomNum = Math.floor(Math.random() * array.length);
        if(!shuffledArray.includes(array[randomNum])) {
            shuffledArray.push(array[randomNum]);
            i++;
        }
        
    }
    return shuffledArray;
}

function setClues(){
    let clueArray = [
        {clue: wellPlacedClueArr.join(""), message:"One number is correct and well placed"},

        {clue:twoCorrectClueArr.join(""), message:"Two numbers are correct but wrongly placed"},
        {clue:oneCorrectClueArr.join(""), message:"One number is correct but wrongly placed"},
        {clue:noCorrectClueArr.join(""), message:"Nothing is correct"}

    ];
    clueArray = shuffle(clueArray);
    let clue1 = clueArray[0].clue +"<br>" + clueArray[0].message;
    document.getElementById("CB1").innerHTML = clue1;
    let clue2 = clueArray[1].clue +"<br>" + clueArray[1].message;
    document.getElementById("CB2").innerHTML = clue2;    
    let clue3 = clueArray[2].clue +"<br>" + clueArray[2].message;
    document.getElementById("CB3").innerHTML = clue3;    
    let clue4 = clueArray[3].clue +"<br>" + clueArray[3].message;
    document.getElementById("CB4").innerHTML = clue4;
    
    
}

function load(){
    generateWPClue();
    generateTwoCorrectClue();
    generateOneCorrectClue();
    generateNoCorrClue();    
    setClues();
  }

  function checkAnswer(answer){



    gameWon = checkWellPlaced(answer);

    if(gameWon){
        // alert("line 349");
        gameWon = checkTwoCorrect(answer);
        // alert("line 351");

        if(gameWon){
        // alert("line 366");

            gameWon = checkOneCorrect(answer);
            if(gameWon){
                gameWon = checkNoCorrect(answer);
            }
        }

    }
    gameOver = true;
    
}  

function checkWellPlaced(answer){
    let wpAns = -1;
    let wellpacedCount = 0;

    for(let i = 0; i < answer.length; i++){
        // alert("wellPlacedClueArr.includes(answer[i]) = "+ wellPlacedClueArr.includes(answer[i]));
        if(wellPlacedClueArr.includes((answer[i]))){
            wpAns = answer[i];
            wellpacedCount++;
        }
    }
    if (wellpacedCount != 1){

        gameWon = false;
    }
    else{

        if(answer.indexOf(wpAns) != wellPlacedClueArr.indexOf(wpAns)){
            gameWon = false;
        }

    
    }
    
    return gameWon;
} 

function checkTwoCorrect(answer){
    let twoCorrectCount = 0;
    let cp1 = -1;
    let cp2 = -1;

    for(let i = 0; i < answer.length; i++){
        if(twoCorrectClueArr.includes(answer[i])){
            if(cp1 < 0){
                cp1 = answer[i];

            }
            else{
                cp2 = answer[i];
            }
            twoCorrectCount++;
        }

    }

    
    if(twoCorrectCount == 2){
        
        if(answer.indexOf(cp1)==twoCorrectClueArr.indexOf(cp1)){
            // alert("line 431");
            gameWon = false;
        }
        if (answer.indexOf(cp2)==twoCorrectClueArr.indexOf(cp2)){
            gameWon = false;
        }
        
    }
    else {
        gameWon = false;
    }
 
   
    return gameWon;
}

function checkOneCorrect(answer){
    let oneCorrectCount = 0;
    let correct = -1;
    for(let i = 0; i < answer.length; i++){
        if(oneCorrectClueArr.includes(answer[i])){
            correct = answer[i];
            oneCorrectCount++;
        }
    }
    if (oneCorrectCount != 1){
        gameWon = false;
    }
    else{
        for(let i = 0; i < answer.length; i++){
            if(answer.indexOf(correct)  == oneCorrectClueArr.indexOf(correct)){
                gameWon = false;
                break;
            }
        }
    }
    
   
    return gameWon;

}

function checkNoCorrect(answer){
    for(let i = 0; i < answer.length; i++){
        if(noCorrectClueArr.includes(answer[i])){
            gameWon = false;
            break;
        }
    }
    
   
    return gameWon;
}


