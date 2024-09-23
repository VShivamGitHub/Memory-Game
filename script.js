// data
const imgSets = {
    fruits: '/img/fruits/',
    cars: '/img/cars/',
    ben10: '/img/ben10/',
    birds: '/img/birds/',
    planes: '/img/planes/',
    cakes: '/img/cakes/',
    animals: '/img/animals/',
    dinosaurs: '/img/dinosaurs/',
};


/***********************************************************************************/
let imgIDX = [1,2,3,4,5,6];
const imageSet = [];
let hintClick = 0;
let shuffledImages = [];
const visit = new Set();
let gameStarted = false;
let firstCard = {} , secondCard = {};
let clickCount = 0;
let wonCardsCnt = 0;
let moves = 0;
let minMoves = 0;
let wonCards = [0,1,2,3,4,5,6,7,8,9,10,11];

const cardType = document.getElementById('cardType');
cardType.addEventListener('change' , function(){
    assignCards();
});

function assignCards(){
    let imgSrc = imgSets[cardType.value];
    imgIDX.forEach(function(imgIdx,index){
        imageSet.push(`${imgSrc}${index+1}.jpg`);
    });
}
 
const playButton = document.getElementById('playButton');
playButton.addEventListener('click',function(){
    console.log('Key pressed');
    if(!gameStarted){
        initializeData();
        showRealImages(); // Show images for a brief moment at the start
        const start = document.querySelector('.start');
        const hide = document.querySelectorAll('.hide');
        const won = document.querySelector('.won');
        hide.forEach(function(element){
            element.classList.remove('hide');
        });
        start.classList.add('hide');
        won.classList.add('hide');
        gameStarted = true;
    }
});


// Show real images briefly at the start of the game
function showRealImages() {

    const imageList = document.querySelectorAll('.image-list');
    imageList.forEach((image, index) => {
        image.src = '/img/question-mark.png';
    });

    // setTimeout(() => {
    //     imageList.forEach((image) => {
    //         image.src = '/img/question-mark.png'; 
    //     });
    // }, 2000);
}


// Function to shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

// Function to initialize game data
function initializeData() {
    const imageList = document.querySelectorAll('.image-list');
    shuffledImages = shuffle([...imageSet, ...imageSet]); // Duplicate the images and shuffle

    // Assign shuffled images to the grid
    imageList.forEach(function(image, index) {
        image.dataset.index = index; // Store index in dataset
        image.addEventListener('click', handleCardClick); // Add click event listener
    });
}

document.getElementById('hintButton').addEventListener('click', function () {
    const hintButton = this;
    
    if(hintClick == 0){
        // Disable the button to prevent multiple clicks
        // hintButton.disabled = true;
        hintClick = 1;
        
        const score = document.querySelector('.score');
        const Sc = document.querySelector('.Sc');
        Sc.style.border = "5px solid white";
        Sc.style.backgroundColor = "white";
        Sc.style.color = "black";
        score.innerText = `${moves}+2`;
        moves = moves + 2;
        console.log("I am at Hint Button");
        setTimeout(() => {
            Sc.style.border = "5px solid black";
            Sc.style.backgroundColor = "black";
            Sc.style.color = "white";
            score.innerText = `${moves}`;
            
            // Re-enable the button after the timeout completes
        }, 750);
        showHint();
    }
    else{
        alert("You Clicked Too Fast !");
    }
    
});


function showHint() {
    if (wonCardsCnt < 6) {
        const imageList = document.querySelectorAll('.image-list');
        let randomIdx = Math.floor(Math.random() * wonCards.length);
        imageList[wonCards[randomIdx]].src = shuffledImages[wonCards[randomIdx]];
        console.log("i am in showHint");
        console.log(`This is the index of Unvisited Card :${randomIdx}`);
        wonCards.forEach(function(idx){
            console.log(idx);
        });
        setTimeout(() => {
            imageList[wonCards[randomIdx]].src = '/img/question-mark.png'; // Hide the image after delay
            // hintButton.disabled = false;
            hintClick = 0;
        }, 2000); // 2 seconds delay
    } else {
        // hintButton.disabled = false;
        hintClick = 0;
        alert("Cannot Take Hint For Less Than 6 Cards!");
    }
}

document.getElementById('endGame').addEventListener('click', function (){
    endGame();
});

// Handle card clicks
function handleCardClick(event) {
    const clickedImage = event.target;
    const index = clickedImage.dataset.index; // Retrieve index from dataset
    moves++;
    document.querySelector('.score').innerText = `${moves}`;
    if(!visit.has(index)){
        clickedImage.src = shuffledImages[index];
        
        // Your logic to handle the card click
        if(clickCount == 0){
            firstCard = {clickedImage,index};
            visit.add(index);
            clickCount = clickCount + 1;
            console.log("I am in HandleCardCLick first IF ");
        }
        else if(clickCount == 1){
            secondCard = {clickedImage,index};
            visit.add(index);
            clickCount = 0;
            console.log("I am in HandleCardCLick Second IF ");
            checkMatch();
        }
    }
}
function checkMatch(){
    if(firstCard.clickedImage.src === secondCard.clickedImage.src){
        console.log("I am i checkMatch first IF");
        wonCardsCnt = wonCardsCnt + 2;
        if ((wonCardsCnt / 2) === imageSet.length) { // Check if all cards are matched
            endGame();
        }
        console.log(`FirstWon Card Index : ${firstCard.index}`);
        console.log(`SecondWon Card Index : ${secondCard.index}`);
        wonCards = wonCards.filter(idx => idx != firstCard.index );
        wonCards = wonCards.filter(idx => idx != secondCard.index );
        wonCards.forEach(function(idx){
            console.log(idx);
        });
        firstCard = {};
        secondCard = {};
    }
    else{
        console.log("I am in checkMatch Second IF");
        setTimeout(() => {
            visit.delete(firstCard.index); 
            visit.delete(secondCard.index); 
            firstCard.clickedImage.src = '/img/question-mark.png';
            secondCard.clickedImage.src = '/img/question-mark.png';
            firstCard = {};
            secondCard = {};
        }, 500);
    }
}

function endGame() {
    const unhide = document.querySelectorAll('.unhide');
    const won = document.querySelector('.won');
    unhide.forEach(function(element){
        element.classList.add('hide');
    });
    won.classList.remove('hide');
    const h1InsideWon = document.querySelector('.won h1');
    minMoves = Math.min(minMoves,moves);
    document.querySelector('.mSc').innerText=`${moves}`;
    if(wonCardsCnt === 12){
        h1InsideWon.innerText = `Yay!! You Won The Game !`;
    }
    else{
        h1InsideWon.innerText = `You Lost The Game !`;
    }
    document.querySelector('.winScore').innerText = `${moves}`;
}

// Function to restart the game
function restart() {
    document.querySelector('.score').textContent = "0";
    const start = document.querySelector('.start');
    const hide = document.querySelectorAll('.unhide');
    const won = document.querySelector('.won');
    hide.forEach(function(element){
        element.classList.add('hide');
    });
    start.classList.remove('hide');
    won.classList.add('hide');
    visit.clear();
    moves = 0;
    wonCardsCnt = 0;
    gameStarted = false;
    shuffledImages.length = 0;
    imageSet.length = 0;
}