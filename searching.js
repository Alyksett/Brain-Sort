window.addEventListener('DOMContentLoaded', () => {
    const announcer = document.querySelector('.announcer');
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const resetButton = document.querySelector('#reset');
    const leftButton = document.querySelector('#leftArrow');
    const rightButton = document.querySelector('#rightArrow');

    fillBoard();
    viewport = 5;
    //moveViewport();

    
    function fillBoard(){
        let board = Array.from({length: 15}, () => Math.floor(Math.random() * 40));
        let target = Math.floor(Math.random() * 40);
        console.log(board);
        var j = 0;
        tiles.forEach(tile => {
            tile.innerText = board[j];
            j++;
        });
    }

    const moveLeft = () =>{
        if(viewport == 0){
            announceOutOfBounds("End of array");
            return;
        }
        viewport--;
        moveViewport();
    }
    
    const moveRight = () =>{
        if(viewport == 14){
            announceOutOfBounds("End of array");
            return;
        }
        viewport++;
        moveViewport();
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
    
    const announceOutOfBounds = (message) => {
        announcer.innerHTML = `${message} <br>`;
    };
    const announce = () =>{
        announcer.innerHTML = 'Target is found!!<br>';
    }
    
    const checkTarget = () => {
        if(this.innerText == target){
            announce();
        }
    };

    const resetBoard = () => {
        fillBoard();
        operationCounter = 0;

        announcer.innerHTML = '';
        announcer.style.display = 'none';

    }

    resetButton.addEventListener('click', resetBoard);
    leftButton.addEventListener('click', moveLeft());
    rightButton.addEventListener('click', moveRight());
    
    //===============Algorithm Zone===============\\
    
    
});


