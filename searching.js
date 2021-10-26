window.addEventListener('DOMContentLoaded', () => {
    const announcer = document.querySelector('.announcer');
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const targetText = document.querySelector('.target');
    const resetButton = document.querySelector('#reset');
    const leftButton = document.querySelector('#leftArrow');
    const rightButton = document.querySelector('#rightArrow');



    let board = [];
    let viewport = 0;
    let target;
    let operationCounter = 0;

    fillBoard();
    
    console.log(board);
    function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    function fillBoard(){
        board = Array.from({length: 18}, () => Math.floor(Math.random() * 50));
        
        target = board[randomInteger(2, 17)];
        
        var j = 0;
        tiles.forEach(tile => {
            tile.addEventListener('click', onClick);
            tile.innerText = board[j];
            j++;
        });
        board.sort((a, b) => a - b);
    }
    function onClick(){
        viewport = tiles.indexOf(this);
        moveViewport();
        checkTarget(viewport);
        operationCounter++;
    }    

    function moveLeft(){
        if(viewport == 0){
            return;
        }
        viewport--;
        moveViewport();
        operationCounter++;
        checkTarget(viewport);
    }
    
    const moveRight = () =>{
        if(viewport == 17){
            return;
        }
        viewport++;
        moveViewport();
        operationCounter++;
        checkTarget(viewport);
    }
    
    const moveViewport = () =>{
        var i = 0;
        for(let tile of tiles){
            if(i == viewport){
                tile.innerText = board[i];
                i++;
                continue;
            }
            tile.innerText = "";
            i++;
        }
    }    
    moveViewport();
    
    const updateTarget= () =>{
        targetText.innerHTML = `Target is ${target}`;
    }
    updateTarget();

    const announce = () =>{    
        announcer.innerHTML = 'Target found!<br>';
        announcer.innerHTML += `It took you ${operationCounter} operations to find target.<br>`
        announcer.innerHTML += `It took binary search ${binaryOperations} operations to find target.<br>`        
        announcer.style.display = 'block';
    }
    
    const checkTarget = (index) => {
        if(board[index] == target){
            console.log("found")
            announce();
            for(let tile of tiles){
                tile.removeEventListener('click', onClick);
            }
        }
    };

    const resetBoard = () => {
        fillBoard();
        viewport = 0;
        moveViewport();
        updateTarget();
        
        
        
        operationCounter = 0;
        announcer.innerHTML = '';
        announcer.style.display = 'none';
    }
    resetButton.addEventListener('click', resetBoard);
    leftButton.addEventListener('click', moveLeft);
    rightButton.addEventListener('click', moveRight);
    
    //===============Algorithm Zone===============\\
    //Binary Search
    let binaryArray = [];
    let binaryOperations = 0;
    loadArray(binaryArray);
    binarySearch(binaryArray, target);
        
    //Binary Search
    function binarySearch(array, target) {
        let start = 0;
        let end = array.length - 1;
      
        while (start <= end) {
          let mid = Math.floor((start + end) / 2);
          if (array[mid] === target) {
            binaryOperations++;
            return mid;
          }
      
          if (target < array[mid]) {
            binaryOperations++;
            end = mid - 1;
          } else {
            binaryOperations++;
            start = mid + 1;
          }
        }
        return -1;
      }


    //helper function to load array
    
    function loadArray(array){
        for(var i = 0; i<board.length; i++){
            array[i] = board[i];
        }
    }

});


