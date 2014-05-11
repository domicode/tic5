$(document).ready( function() {

    var turn = 1;

    var player1 = [];
    var name1 = { name: "Player 1", wins: 0}
    var player2 = [];
    var name2 = { name: "Player 2", wins: 0}
    var gametype = 2;
    var draws = 0


    setTimeout(function(){$(".info").addClass("fadeout")}, 200)


    $(".gametype").click(function(event) {
      if (gametype % 2 == 1) {
        $(this).attr("value", "2 player game");
        name1.name = "Player 1";
        name1.wins = 0;
        draws = 0;
        gametype += 1;
      } else {
        $(this).attr("value", "vs computer");
        name1.wins = 0;
        name2.wins = 0;
        draws = 0;
        gametype += 1;
      }
    });

    function newGame() {
      $(".newgame").click(function(event) {
        player1 = [];
        player2 = [];
        turn = 1;
        $(".box").removeClass("player2 player1 win winning disabled");
        $("#winning").empty().removeClass("winning");
        $(".box").empty();
        $(".body").hide().fadeIn('fast');
        play();
      });
      play();
    };

    function play() {
      $(".box").click(function(event) {
        if ((event.currentTarget.innerHTML == "")&&(gametype % 2 == 0)) {
          if (turn % 2 == 0) {
            $(this).html("x").addClass("player2")          
            player2.push(parseInt(event.currentTarget.id));
            winning(player2, name2);
          } else {
            $(this).html("o").addClass("player1")
            player1.push(parseInt(event.currentTarget.id));
            winning(player1, name1);
          }
          turn += 1
        }
      });
    };


    function checksumWin(player) {
      for (var i = 0; i < player.length; i++) {
          for (var j = i + 1; j < player.length; j++) {
              for (var k = j + 1; k < player.length; k++) {
                  for (var l = k + 1; k < player.length; k++) {
                      for (var m = l + 1; k < player.length; k++) {
                        for (var n = m + 1; k < player.length; k++) {
                          if (player[i] + player[j] + player[k] + player[l] + player[m] + player[n] == 111) {
                            $("#"+player[i]).addClass("win")
                            $("#"+player[j]).addClass("win")
                            $("#"+player[k]).addClass("win")
                            $("#"+player[l]).addClass("win")
                            $("#"+player[m]).addClass("win")
                            $("#"+player[n]).addClass("win")                                            
                            return true;
                  }
                }
              }
            }
          }
        }
      }
    }


    function winning(player, name) {
      // if ((player.length == 5)&&(!checksumWin(player))) {
      //   draws += 1
      //   $("#winning").html(
      //       "Nobody wins, play again"+
      //       "<p>Statistics:</p> <li>"+name1.name+" wins: "+name1.wins+"</li>"+
      //       "<li>"+name2.name+" wins: "+name2.wins+
      //       "</li><li>draws: "+draws+"</li>"
      //     ).addClass("winning");
      //   $(".box").off().addClass("disabled");
      // }
      if (player.length >= 6) {
        if (checksumWin(player)) {
          name.wins += 1
          $("#winning").html(
              name.name+ " won the game"+                      
              "<p>Statistics:</p> <li>"+name1.name+" wins: "+name1.wins+"</li>"+
              "<li>"+name2.name+" wins: "+name2.wins+
              "</li><li>draws: "+draws+"</li>"
            ).addClass("winning");
          $(".box").off();
          $(".box").not(".win").addClass("disabled");
        }
      }
    }

  newGame();
  });
