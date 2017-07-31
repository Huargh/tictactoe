var playerSymbol = "O"; // default

$( document ).ready(pickSign());

function pickSign() {
  $( "#dialog" ).dialog({
    // autoOpen: false,
    resizable: false,
    height:190,
    modal: true,
    buttons: { "X": function() {
                    playerSymbol = "X";
                    $( this ).dialog( "close" );
                 },
                 "O": function() {
                   playerSymbol = "O";
                    $( this ).dialog( "close" );
                 }
             }
  });
}

$('.btn').click(function() {
  var currentVal = $(this).text();
  if (currentVal === "") {
    $(this).text(playerSymbol);
  }
});
