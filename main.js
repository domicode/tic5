$(document).ready( function() {

    var turn = 1

    var player1 = [];
    var player2 = [];



    
    $(".box").click(function(event) {
      $(".gametype").click(function(event) {
        $(this).attr("value", "2 player game")
      })
      if (event.currentTarget.innerHTML == "") {
          $(this).html("x").addClass("player2")
          player2.push(parseInt(event.currentTarget.id));
          winning(player2, "Player 2");
          var computerselect = computerTurn();
          $(computerselect).html("o").addClass("player1");
          winning(player1, "Computer");
      }
    });


    function computerTurn() {
      var select = "";
      if ((player2[0] == 5)&& player2.length == 1) {
        select = 8;
      } else if (player2.length == 1) {
        select = 5;
      } else {
        select = selectField();
      }
      player1.push(select)
      return "#"+select
    }


    function  selectField() {
      var selection = 0
      if (getFields(player1) == 0) {
        selection = getFields(player2)
      } else selection = getFields(player1);
      if (selection == 0) { 
        selection = getAlternateField(player2);
      }
      return selection
    }


    function getFields(player) {
      var values = []
      for (var i = 0; i < player.length; i++) {
          for (var j = i + 1; j < player.length; j++) {
              values.push((player[i] + player[j]));         
          }
      }

      var selection = 0 
      for (var i = 0; i < values.length; i++) {
        select = "#"+(15-values[i]);
        if (($(select).html() == "") && (values[i] < 15)) {
          selection = 15 - values[i];
        }
      }
      return selection
    }


    function getAlternateField(player) {
      var values = []
      for (var i = 0; i < player.length; i++) {
          for (var j = i + 1; j < player.length; j++) {
              values.push((player[i] + player[j]));         
          }
      }

      values.sort();
      var selection = 0 
      for (var i = 0; i < values.length; i++) {
        var value = (values[i]*2).toString().split("");
        value.reverse();
        var id = parseInt(value[1])

        // This is the better choice, would also work with the normal id
        if (player.length > 2) {
          id = id - 1
        }

        value = value[0];
        value = parseInt(value);
        select = "#"+(value);

        if (value == 0) {
          if (($(".box:empty").length) > id) {
            selection = parseInt($(".box:empty")[id].id);
          } else {
            selection = parseInt($(".box:empty")[0].id);
          }
        }
        if ((values[i] == 15)&&(Math.max.apply(Math, player) == 9)&&(player.length <= 2)) {
          selection = 2;
        }
        if (($(select).html() == "")) {
          selection = value;
        }
      }
      return selection
    }



    function checksumWin(player) {
      for (var i = 0; i < player.length; i++) {
          for (var j = i + 1; j < player.length; j++) {
              for (var k = j + 1; k < player.length; k++) {
                  if (player[i] + player[j] + player[k] == 15) {
                      $("#"+player[i]).addClass("win")
                      $("#"+player[j]).addClass("win")
                      $("#"+player[k]).addClass("win")
                      return true;
                  }
              }
          }
      }
    }


    function winning(player, name) {
      if (player.length == 5) {
        $("#winning").html("Nobody wins, play again").addClass("winning");
        $(".box").off().addClass("disabled");
      }
      if (player.length >= 3) {
        if (checksumWin(player)) {
          $("#winning").html(name+ " won the game").addClass("winning");
          $(".box").off();
          $(".box").not(".win").addClass("disabled");
        }
      }
    }


  });
