// function mark(target) {
//   target.innerHTML = "X"
// }

// var target = $(".line1.row1")[0]

// mark(target);

$(document).ready( function() {
    // $(".box").click(function(event) {
    //   event.currentTarget.innerHTML = "X";
    // }); 

    var turn = 1

    var player1 = [];
    var player2 = [];
  
    $(".box").click(function(event) {
      if (event.currentTarget.innerHTML == "") {
        if (turn % 2 == 0) {
          event.currentTarget.innerHTML = "x";
          player1.push(parseInt(event.currentTarget.id));
          winning(player1);
        } else {
          event.currentTarget.innerHTML = "o";
          player2.push(parseInt(event.currentTarget.id));
          winning(player2);
        }
        turn += 1
      }
    });

    function checksum(player) {
      // for (var i = 0; i < player.length; i++) {
      //   var sum = player[i]+player[i+1]+player[i+2]
      // };
      var sum = 0;
      // for (var i in player) {
        sum += player[0];
        sum += player[1];
        sum += player[2];
      // }
      if (sum == 15) { return true }
    }

    function winning(player) {
      console.log(player)
      console.log(checksum(player))
      if (player.length >= 3) {
        console.log(checksum(player))
        if (checksum(player)) {
          $("#winning").html("You won the game");
        }
      }
    }


  });
