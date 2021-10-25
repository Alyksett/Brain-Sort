window.addEventListener('DOMContentLoaded', () => {
    const announcer = document.querySelector('.announcer');
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const resetButton = document.querySelector('#reset');

    let board = [0,0,0,0,0,0,0,0,0];
    
    //when clicking and dragging, we need to log the 2 numbers swapped.
    //these are to log those numbers.
    let temp1, temp2;
    let operationCounter = 0;
    
    //setting up a few random boards
    //TODO: Do this more gracefully
    
    const boardArrays = [];
    const board1 = [2, 5, 6, 11, 23, 25, 28, 30, 34];
    const board2 = [4, 8, 15, 16, 23, 42, 71, 72, 77];
    const board3 = [0, 1, 2, 3, 5, 8, 13, 21, 34];
    const board4 = [4, 7, 8, 12, 16, 21, 26, 34, 35];
    const board5 = [2, 6, 10, 21, 23, 24, 27, 29, 38];
    boardArrays.push(board1);    
    boardArrays.push(board2);    
    boardArrays.push(board3);    
    boardArrays.push(board4);    
    boardArrays.push(board5);    
    fillBoard();
    

    /* Randomize array in-place using Durstenfeld shuffle algorithm */
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    
    function fillBoard(){
        let randomBoardNumber = parseInt(Math.floor(Math.random() * 5));
        for(var i = 0; i<board.length; i++){
            board[i] = boardArrays[randomBoardNumber][i];        
        }
        shuffleArray(board);
        console.log(JSON.parse(JSON.stringify(board)));
        
        var j = 0;
        tiles.forEach(tile => {
            tile.innerText = board[j];
            j++;
            tile.addEventListener('dragstart', dragStart);
            tile.addEventListener('dragend', dragEnd);
            tile.addEventListener('dragover', dragOver);
            tile.addEventListener('dragenter', dragEnter);
            tile.addEventListener('dragleave', dragLeave);
            tile.addEventListener('drop', dragDrop);
        });
        
    }





    //getting swap counts for all the different algorithms
    const announce = () => {
        announcer.innerHTML = 'Array is sorted!<br>';
        announcer.innerHTML += `it took you ${operationCounter} swaps to sort this array.<br>`;
        announcer.innerHTML += `The Bubble Sort algorithm took ${bubbleSwaps} swaps to sort the array.<br>`;
        announcer.innerHTML += `The Insertion Sort algorithm took ${insertionSwaps} swaps to sort the array.<br>`;
        announcer.style.display = 'block';
    };
    
    const checkSorted = () => {
        for(var i = 0; i<board.length-1; i++){
            if(board[i]>=board[i+1]){
                return false;
            }
        }
        return true;
    };

    const swap =  (oldIndex, newIndex) => {
        var temp = board[oldIndex];
        board[oldIndex] = board[newIndex];
        board[newIndex] = temp;        
    }

    const resetBoard = () => {
        fillBoard();
        operationCounter = 0;
        //TODO: reset the algorithm swaps, can't do it like this because they're just set to zero.
        // bubbleSwaps = 0;
        // insertionSwaps = 0;
        // quickSwaps = 0;
        announcer.innerHTML = '';
        announcer.style.display = 'none';

    }
    function dragStart() {
        temp1 = this.innerText;
        index1 = this.innerHTML;
        this.className += ' hold';
        setTimeout(() => (this.innerText = ""), 1);
    }
    
    function dragEnd() {
        //if the user doesnt drop a tile on another tile
        if(EventTarget.className != "tile"){
            updateTileArray();
        }
    }
    
    function dragOver(e) {
        e.preventDefault();
    }
    
    function dragEnter(e) {
        e.preventDefault();
        this.className += ' hovered';
    }
    
    function dragLeave() {
        this.className += "tile";
    }
    
    function dragDrop() {
        // if the user drops the number on it's on slot
        if(this.innerText == ""){
            this.innerText = temp1;
            this.className += "tile"
            return;
        }
        
        temp2 = this.innerText;
        swap(board.indexOf(parseInt(temp1)), board.indexOf(parseInt(temp2)));
        updateTileArray();
        console.log(JSON.parse(JSON.stringify(board)));



        this.className += "tile";
        
        operationCounter++;
        
        if(checkSorted() == true){
            announce();
        }
    }
    function updateTileArray(){
        var j = 0;
        tiles.forEach(tile => {
            tile.innerText = board[j];
            j++;
        });
    }
    resetButton.addEventListener('click', resetBoard);
    
    //===============Algorithm Zone===============\\
    
    //creating a new temp array for the algs to sort.
    let bubbleArray = [];
    let quickArray = [];
    let insertionArray = [];
    
    loadArray(bubbleArray);
    loadArray(quickArray);
    loadArray(insertionArray);
    
    let bubbleSwaps = 0;
    let quickSwaps = 0;
    let insertionSwaps = 0;


    //-----Bubble Sort-----\\
    let bubblesort = (array) => {
        let len = array.length;
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len; j++) {
                if (array[j] > array[j + 1]) {
                    let tmp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = tmp;
                    bubbleSwaps++;
                    
                }
            }
        }
    };
    //-----Quick Sort-----\\
   
    //-----Insertion Sort-----\\
    function insertionSort(array) {
        let n = array.length;
            for (let i = 1; i < n; i++) {
                // Choosing the first element in our unsorted subarray
                let current = array[i];
                // The last element of our sorted subarray
                let j = i-1; 
                while ((j > -1) && (current < array[j])) {
                    array[j+1] = array[j];
                    j--;
                    console.log("shit ")
                }
                insertionSwaps++;
                array[j+1] = current;
            }
        return array;
    }
    bubblesort(bubbleArray);
    //quicksort(quickArray);
    insertionSort(insertionArray)


    function loadArray(array){
        for(var i = 0; i<board.length; i++){
            array[i] = board[i];
        }
    }
});


