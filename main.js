var humanSymbol;
var computerSymbol = "O";
var no_of_moves = 0;
var gameOver
var globalBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const winLines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
  [0, 4, 8], [2, 4, 6] // diagonal
];
var humanFields = [];
var computerFields = [];

$( document ).ready( startGame() );

$('#again').click(function() {
  startGame();
});

function startGame( ) {
  gameOver = false;
  clearBoard();
  pickSign();
}

function pickSign() {
  no_of_moves = 0;
  $( "#dialog" ).dialog({
    // autoOpen: false,
    resizable: false,
    height:190,
    modal: true,
    buttons: { "X": function() {
                    humanSymbol = "X";
                    computerSymbol = "O";
                    $("#humanSymbol").html(humanSymbol);
                    $( this ).dialog( "close" );
                 },
                 "O": function() {
                   humanSymbol = "O";
                   computerSymbol = "X";
                   computerStarts( computerSymbol )
                   $("#humanSymbol").html(humanSymbol);
                   $( this ).dialog( "close" );
                 }
             }
  });
};

function human_plays(button) {
  var fieldIDPlayed;
  button.text(humanSymbol);
  no_of_moves++;
  fieldIDPlayed = parseInt(button.attr('id'))
  humanFields.push(fieldIDPlayed);
  globalBoard[fieldIDPlayed] = humanSymbol;
  humanFields.sort( );
};

function computer_plays() {
  // computer_clicks(playable[Math.floor(Math.random() * playable.length)]);
  computer_clicks(minimax(globalBoard, computerSymbol).index);
};

function minimax(currentBoard, playerSymbol){
  var availSpots = return_cells_avail(currentBoard);

  // console.log(availSpots);
  if (winner_per_board(currentBoard, humanSymbol)){
    return {score:-1} }
	else if (winner_per_board(currentBoard, computerSymbol)){
    return {score:1} }
  else if (availSpots.length === 0){
  	return {score:0} }

var moves = [];
  for (var i = 0; i < availSpots.length; i++){
    var move = {};
  	move.index = currentBoard[availSpots[i]];
    currentBoard[availSpots[i]] = playerSymbol;
    if (playerSymbol == computerSymbol){
      var result = minimax(currentBoard, humanSymbol);
      move.score = result.score;
    }
    else{
      var result = minimax(currentBoard, computerSymbol);
      move.score = result.score;
    }
    moves.push(move);
    currentBoard[availSpots[i]] = move.index;
  }

  var bestMove;
  if(playerSymbol === computerSymbol){
    var bestScore = -100;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = 100;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score < bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
}

function winner_per_board(board, player) {
  if (
  (board[0] == player && board[1] == player && board[2] == player) ||
  (board[3] == player && board[4] == player && board[5] == player) ||
  (board[6] == player && board[7] == player && board[8] == player) ||
  (board[0] == player && board[3] == player && board[6] == player) ||
  (board[1] == player && board[4] == player && board[7] == player) ||
  (board[2] == player && board[5] == player && board[8] == player) ||
  (board[0] == player && board[4] == player && board[8] == player) ||
  (board[2] == player && board[4] == player && board[6] == player)
  ) {
  return true;
  }
}

function return_cells_avail(inBoard) {
  // return inBoard.filter( el => !humanFields.includes( el ) &&
	// !computerFields.includes( el ) );
  return inBoard.filter(el => el !== computerSymbol && el !== humanSymbol);
};

function turnPlayed(button) {
  if (!gameOver) {
    if ($(this).text() !== "") {
      alert("Hang on... that's not a valid turn!");
    }
    else {
      human_plays($(this));
      if (playerWon(humanFields)) {
         remove_event_listener( );
         setTimeout(function(){ alert("Congratulations! You won!") }, 10);
         gameOver = true;
       }
       if (gameOver === false) {
        setTimeout(function() {
          computer_plays()
          if (playerWon(computerFields)) {
            remove_event_listener( );
            setTimeout(function(){ alert("Sorry, you lost. Better luck next time!") }, 400);
            gameOver = true;
          }
        }, 400);
      }
    }
  }
};

function computerStarts( ) {
  computer_clicks(0);
};

function computer_clicks(cellID) {
  var btnID = '#' + cellID;
  $(btnID).text(computerSymbol);
  no_of_moves++;
  globalBoard[cellID] = computerSymbol;
  computerFields.push(cellID);
  computerFields.sort();
}

function clearBoard( ) {
  var btnID;
  var buttonsList = document.querySelectorAll('.btn');
  humanFields = [];
  computerFields = [];
  globalBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  for (i = 0; i < 9; i++) {
    btnID = '#' + i;
    $(btnID).text('');
    $(btnID).css("background-color","")
  }
  for (var i = 0; i < buttonsList.length; i++) {
    buttonsList[i].addEventListener('click', turnPlayed, false);
  }
}

function playerWon(playerArr) {
  var cellCount;
  for (i = 0; i < winLines.length; i++) {
    cellCount = 0;
    for (j = 0; j < winLines[i].length; j++) {
        if (playerArr.indexOf(winLines[i][j]) !== -1) {
          cellCount++;
          if (cellCount === 3) {
            mark_red(winLines[i]);
            remove_event_listener( );
            return true;
          }
        }
    }
  }
  if (no_of_moves === 9) {
    alert("That's a draw. You are both winners. yay.");
  }
}


function mark_red(winArr) {
  var btnId;
  console.log("WinArr: "+winArr);
  for (i = 0; i < winArr.length; i++) {
    btnID = '#' + winArr[i];
    $(btnID).css("background-color","red");
    gameOver = true;
  }
};

function remove_event_listener( ) {
  var buttonsList = document.querySelectorAll('.btn');
  for (var i = 0; i < buttonsList.length; i++) {
    buttonsList[i].removeEventListener('click', turnPlayed, false);
  }
};
