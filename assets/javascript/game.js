$(document).ready(function () {
    var main = $('body');
    // =============================================================
    // create objects for each of the characters.
    //=========================================================
    // The Good character
    var theGood = {
        image: 'assets/images/the_good_resize.jpg',
        name: 'clint',
        health: 160,
        attackPower: 80,
    };
    // The Bad character
    var theBad = {
        image: 'assets/images/the_bad.jpg',
        name: "bounty",
        health: 200,
        attackPower: 40,
    };
    // The Ugly character
    var theUgly = {
        image: 'assets/images/the_ugly.jpg',
        name: "prisoner",
        health: 175,
        attackPower: 60,
    };

    var charPlayer = [];
    charPlayer.push(theGood, theBad, theUgly);
    var selected = false;
    var firstPlayer = [];
    var enemyPlayer = [];
    var secondChar = [];
    var thirdRow = [];
    var enemyDefeated = [];
    var damageHealth = 0;
    var neutral = main.find('.neutral');
    var btns = main.find("#buttons");
    
    // ================================================================================
    //========= When the page loads, display the objects as divs on the DOM.============
    // =================================================================================
    window.onload = function () {
        for (var i = 0; i < charPlayer.length; i++) {
            var playerChar = $('<div>');
            playerChar.addClass("col-3 h-100");
            playerChar.html(`

                        <div class="character card btn btn-primary m-2 p-0 w-100 h-100" id='${charPlayer[i].name}'>
                            <img src='${charPlayer[i].image}' style=' height:100%'>
                            <h3 class="health card-img-overlay p-2" id='firstHealth' style="background-color: maroon; top: 45%; height: 40px; opacity: .75"></h3>
                            <h3 class="attack card-img-overlay p-2" id="firstAttack" style="background-color: forestgreen; top: 65%; height: 40px; opacity: .75"></h3>
                            </div>
                            
                            `);
                            $('.first').append(playerChar);
                            $('firstHealth').append('Health: ' + charPlayer[i].health)
                            console.log(charPlayer[i].name)
        }


        //===============================================================================
        //==============first player being selected======================================
        //===============================================================================
        $('.character').on("click", function () {
            console.log("hello")
            if ($(this).attr('id') === 'clint') {
                firstPlayer = (theGood);
                playerHealth = (theGood.health)
                $('#bounty').hide();
                $('#prisoner').hide();
                secondChar.push(theBad, theUgly)
            }
            else if ($(this).attr('id') === 'bounty') {
                firstPlayer = (theBad);
                playerHealth = (theBad.health)
                secondChar.push(theGood, theUgly)
                $('#clint').hide();
                $('#prisoner').hide();
                console.log(firstPlayer);
                console.log(secondChar)
            }
            else {
                firstPlayer = (theUgly);
                playerHealth = (theUgly.health)
                secondChar.push(theGood, theBad)
                $('#clint').hide();
                $('#bounty').hide();
                console.log(firstPlayer);
                console.log(secondChar)
            }
            console.log(firstPlayer.health)

            
            // ===================================================================================
            //========Once character is selected, move the other players to the second row.========
            for (var i = 0; i < secondChar.length; i++) {
                console.log(secondChar.length)
                var nuetralChar = $('<div>');
                nuetralChar.addClass("col-3 h-100");
                nuetralChar.html(`

                        <div class="opponent card btn btn-primary m-2 p-0 w-100 h-100" id='${secondChar[i].name}'>
                            <img src='${secondChar[i].image}' style=' height:100%'>
                            <h3 class="health card-img-overlay p-2" id='${secondChar[i].health}' style="background-color: maroon; top: 45%; height: 40px; opacity: .75"></h3>
                            <h3 class="attack card-img-overlay p-2" id="${secondChar[i].attackPower}" style="background-color: forestgreen; top: 65%; height: 40px; opacity: .75"></h3>
                        </div>

                    `);
                // append the second row of the DOM
                neutral.append(nuetralChar);
                
                
            }

            //==============================================================================
            //============= select rival character ==================
            //===============================================================
            $('.opponent').on("click", function () {
                console.log($(this).attr('id'))
                if ($(this).attr('id') === 'clint') {
                    console.log(theGood)
                    enemyPlayer = (theGood);
                    $(this).hide();
                }
                else if ($(this).attr('id') === 'bounty') {
                    enemyPlayer = (theBad);
                    $(this).hide();
                }
                else {
                    enemyPlayer = (theUgly);
                    $(this).hide();
                }

                // =======================================================================
                // == Once rival is selected, move the selected player to the third row of the DOM====
                var enemyChar = $('<div>');
                enemyChar.addClass("col-3 h-100");
                enemyChar.html(`

                        <div class="rival card btn btn-primary m-2 p-0 w-100 h-100" id='${enemyPlayer.name}'>
                            <img src='${enemyPlayer.image}' style=' height:100%'>
                            <h3 class="health card-img-overlay p-2" id='healthEnemy' style="background-color: maroon; top: 45%; height: 40px; opacity: .75"></h3>
                            <h3 class="attack card-img-overlay p-2" id='attackEnemy' style="background-color: forestgreen; top: 65%; height: 40px; opacity: .75"></h3>
                        </div>

                    `);
                $('.enemy').append(enemyChar)
                $('#healthEnemy').html('Health: ' + enemyPlayer.health)
            })
        })
    };





    // $('#firstHealth').html('Health: ' + firstPlayer.health)
    btns.on('click', function () {
        // console.log('first player: ' + firstPlayer.name)
        // console.log('enemy player: ' + enemyPlayer.name)
        firstPlayer.health = firstPlayer.health - enemyPlayer.attackPower;
        enemyPlayer.health = enemyPlayer.health - firstPlayer.attackPower;
        console.log('firstplayer health: ' + firstPlayer.health)
        console.log('enemyplayer health: ' + enemyPlayer.health)
        $('#healthEnemy').html('Heath: ' + enemyPlayer.health);
        $('#firstHealth').html('Health: ' + firstPlayer.health)
        
        // if the user loses the battle
        if (firstPlayer.health <= 0) {
            console.log('you lose');
            confirm('Do you want to play again?')
            if (true) {
                location.reload();
            }
            else {
                alert("loser");
            }
        }

        // if the user wins the battle. enter in other rival character.
        else if (enemyPlayer.health <= 0) {
            // $('.enemy').hide();
            alert("you've defeated the first enemy");
            alert('Round two');
            $('.opponent').hide();
            console.log(secondChar)
            enemyDefeated.push(enemyPlayer)
            // If they match, replace .enemy row with the secondChar[1] character. 
            if (enemyPlayer.name === secondChar[0].name) {
                console.log(enemyPlayer)
                $('.rival').replaceWith(`

                                        <div class="rival card btn btn-primary m-2 p-0 w-100 h-100" id='${secondChar[1].name}'>
                                            <img src='${secondChar[1].image}' style=' height:100%'>
                                            <h3 class="health card-img-overlay p-2" id='${secondChar[1].health}' style="background-color: maroon; top: 45%; height: 40px; opacity: .75"></h3>
                                            <h3 class="attack card-img-overlay p-2" id='${secondChar[1].attackPower}' style="background-color: forestgreen; top: 65%; height: 40px; opacity: .75"></h3>
                                        </div>

                                        `)


            }
            // else replace .enemy row with the secondChar[0] character.
            else {
                $('.rival').replaceWith(`

                                        <div class="rival card btn btn-primary m-2 p-0 w-100 h-100" id='${secondChar[0].name}'>
                                            <img src='${secondChar[0].image}' style=' height:100%'>
                                            <h3 class="health card-img-overlay p-2" id='helath' style="background-color: maroon; top: 45%; height: 40px; opacity: .75"></h3>
                                            <h3 class="attack card-img-overlay p-2" id='${secondChar[0].attackPower}' style="background-color: forestgreen; top: 65%; height: 40px; opacity: .75"></h3>
                                        </div>

                                        `)
                $('helath').text('Health: ' + secondChar[0].health);
            }





        }
    })


    //When 'Restart' button is clicked, reload the page.
    $('#reset').click(function reset() {
        location.reload();
    });


})