$(document).ready( function() {

    var turn = 1

    var player1 = [];
    var player2 = [];
  
    $(".box").click(function(event) {
      if (event.currentTarget.innerHTML == "") {
          event.currentTarget.innerHTML = "x";
          player2.push(parseInt(event.currentTarget.id));
          winning(player2, "Player 2");
          var computerselect = computer();
          $(computerselect).html("o");
          console.log("Computer choice"+player1)
          winning(player1, "Computer");
      }
    });

    function computer() {
      var select = "";
      if ((player2[0] == 5)&& player2.length == 1) {
        select = "#8";
        player1.push(8)
      } else if (player2.length == 1) {
        select = "#5";
        player1.push(5)
      } else {
        // var select = selectfield(player2);
        var select = selectField();
      }
      return select
    }


    function  selectField() {
      getFields(player1)
      getFields(player2)
    }

    function getFields(player) {
      var values = [] 
      for (var i = 0; i < player.length; i++) {
          for (var j = i + 1; j < player.length; j++) {
              values.push((player[i] + player[j]))         
          }
      }
      return values
    }



    function selectfield(player) {
      console.log("Player " + player)
      var values = [] 
      for (var i = 0; i < player.length; i++) {
          for (var j = i + 1; j < player.length; j++) {
              values.push((player[i] + player[j]))         
          }
      }
      console.log("Values: "+values);
      var selection = 0
      for (var i = 0; i < values.length; i++) {
        select = "#"+(15-values[i])
        if (($(select).html() == "") && (values[i] < 15)) {
          selection = 15 - values[i]
          console.log("Values in the if statement:"+values[i])
          console.log("Seleciton in the if statement:"+selection)
        } else if (selection == 0) { selection = attack() }
      };
      console.log("Selection :" + selection);
      select = "#" + selection;
      player1.push(selection);
      console.log("Select: "+select)
      return select;
    }

    function attack() {
      var values = []
      console.log("Player 1:ATTACK"+player1) 
      for (var i = 0; i < player1.length; i++) {
          for (var j = i + 1; j < player1.length; j++) {
              values.push((player1[i] + player1[j]))         
          }
      }
      var selection = parseInt($(".box:empty")[0].id);
      for (var i = 0; i < values.length; i++) {
        select = "#"+(15-values[i])
        if (($(select).html() == "") && (values[i] < 15)) {
          selection = 15 - values[i]
        }
      };
      return selection
    };



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
          $("#winning").html(name+ " won the game ");
        }
      }
    }


  });
