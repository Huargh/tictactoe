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
var buttonsList = document.querySelectorAll('.btn');

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

function turnPlayed( ) {
  var currentVal = $(this).text();
  if (currentVal !== "") {
    alert("Hang on... that's not a valid turn!");
  }
  else {
    human_plays($(this));
    if (gameOver === false) {
      setTimeout(function() {
        computer_plays()
      }, 400);
    }
  }
};

function human_plays(cell) {
  console.log("human_plays");
  cell.text(playerSymbol);
  no_of_moves++;
  humanFields.push(parseInt(cell.attr('id')));
  humanFields.sort( );
};

function computer_plays() {
  var playable = return_cells_avail(); //array of empty cells
  //2DO: How Does computer Determine the cell to play?
  computer_clicks(playable[0]); //For now: Take the first one available
};

function return_cells_avail() {
  return board.filter( el => !humanFields.includes( el ) && !computerFields.includes( el ) );
};

$('.btn').click(function() {
  console.log("$('.btn').click");
  if (playerWon(humanFields)) {
    alert("Congratulations! You won!");
    gameOver = true; }
  else if (playerWon(computerFields)) {
    alert("Sorry, you lost. Better luck next time!");
    gameOver = true;
  }
});

function computerStarts( ) {
  $('#0').text(computerSymbol);
  computerFields.push(parseInt($('#0').attr('id')));
  computerFields.sort( );
  no_of_moves++;
};

function computer_clicks(cellID) {
  var btnID = '#' + cellID;
  $(btnID).text(computerSymbol);
  computerFields.push(cellID);
  computerFields.sort();
}

function clearBoard( ) {
  var btnID;
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
            return true;
          }
        }
    }
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
}
