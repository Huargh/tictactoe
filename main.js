var playerSymbol;
var computerSymbol = "O";
var no_of_moves = 0;
var gameOver
var board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const winLines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], //horizontal
  [0, 3, 6], [1, 4, 7], [2, 5, 8], //vertical
  [0, 4, 8], [2, 4, 6] //diagonal
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
                    playerSymbol = "X";
                    computerSymbol = "O";
                    $("#playerSymbol").html(playerSymbol);
                    $( this ).dialog( "close" );
                 },
                 "O": function() {
                   playerSymbol = "O";
                   computerSymbol = "X";
                   computerStarts( computerSymbol )
                   $("#playerSymbol").html(playerSymbol);
                   $( this ).dialog( "close" );
                 }
             }
  });
};

function human_plays(button) {
  button.text(playerSymbol);
  no_of_moves++;
  humanFields.push(parseInt(button.attr('id')));
  humanFields.sort( );
};

function computer_plays() {
  var playable = return_cells_avail(); //array of fields not yet played
  //2DO: More intelligent behavior
  computer_clicks(playable[Math.floor(Math.random() * playable.length)]);
};

function return_cells_avail() {
  return board.filter( el => !humanFields.includes( el ) && !computerFields.includes( el ) );
};

function turnPlayed(button) {
  if (!gameOver) {
  if ($(this).text() !== "") {
    alert("Hang on... that's not a valid turn!");
  }
  else {
    human_plays($(this));
    if (playerWon(humanFields)) {
      setTimeout(function(){ alert("Congratulations! You won!") }, 10);
      gameOver = true; }
    if (gameOver === false) {
      setTimeout(function() {
        computer_plays()
        if (playerWon(computerFields)) {
          setTimeout(function(){ alert("Sorry, you lost. Better luck next time!") }, 10);
          gameOver = true;
        }
      }, 400);
    }
  }


}
};

function computerStarts( ) {
  $('#0').text(computerSymbol);
  computerFields.push(parseInt($('#0').attr('id')));
  computerFields.sort( );
  no_of_moves++;
};

function computer_clicks(cellID) {
  var btnID = '#' + cellID;
  $(btnID).text(computerSymbol);
  no_of_moves++;
  computerFields.push(cellID);
  computerFields.sort();
}

function clearBoard( ) {
  var btnID;
  var buttonsList = document.querySelectorAll('.btn');
  humanFields = [];
  computerFields = [];
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
