$(document).ready( function() {

    var turn = 1

    var player1 = [];
    var player2 = [];
  
    $(".box").click(function(event) {
      if (event.currentTarget.innerHTML == "") {
        if (turn % 2 == 0) {
          event.currentTarget.innerHTML = "x";
          player2.push(parseInt(event.currentTarget.id));
          winning(player2, "Player 2");
        } else {
          event.currentTarget.innerHTML = "o";
          player1.push(parseInt(event.currentTarget.id));
          winning(player1, "Player 1");
        }
        turn += 1
      }
    });

    function checksum(player) {
      for (var i = 0; i < player.length; i++) {
          for (var j = i + 1; j < player.length; j++) {
              for (var k = j + 1; k < player.length; k++) {
                  if (player[i] + player[j] + player[k] == 15) {
                      return true;
                  }
              }
          }
      }
    }



    function winning(player, name) {
      console.log(player)
      console.log(checksum(player))
      if (player.length >= 3) {
        console.log(checksum(player))
        if (checksum(player)) {
          $("#winning").html("You won the game " + name);
        }
      }
    }


  });
