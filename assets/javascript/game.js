$(document).ready(function () {
    var main = $('body');
    // =====================================================================================================
    // ==================create objects and variables for each of the characters.===========================
    //=====================================================================================================
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
    var firstHealth = [];
    var enemyPlayer = [];
    var secondChar = [];
    var thirdRow = [];
    var enemyDefeated = [];
    var damageHealth = 0;
    var neutral = main.find('.neutral');
    var btns = main.find("#buttons");
    var arena = main.find('#arena');

    // ==========================================================================================================
    // ================= create characters to display on html ===================================================
    // ==========================================================================================================
    function first() {
        for (var i = 0; i < charPlayer.length; i++) {
            // firstHealth = charPlayer[i].health;
            var playerChar = $('<div>');
            playerChar.addClass("col-3 h-100");
            playerChar.html(`

                        <div class="character card btn btn-primary m-2 p-0 w-100 h-100" id='${charPlayer[i].name}'>
                            <img src='${charPlayer[i].image}' style=' height:100%'>
                            <h3 class="health card-img-overlay p-2" id='firstHealth' style="background-color: maroon; top: 45%; height: 40px; opacity: .75">Health: ${charPlayer[i].health}</h3>
                            <h3 class="attack card-img-overlay p-2" id="firstAttack" style="background-color: forestgreen; top: 65%; height: 40px; opacity: .75">Attack: ${charPlayer[i].attackPower}</h3>
                        </div>
                            
                        `);
            $('.first').append(playerChar);
            console.log(charPlayer[i].name)
        }
    }

    // ==========================================================================================================
    //========= When the page loads, display the objects as divs on the DOM.=====================================
    // ==========================================================================================================
    window.onload = function () {

        // Call on the first function========================================
        first();
    

        //===============================================================================
        //==============first player being selected======================================
        //===============================================================================
        $('.character').on("click", function () {
            if ($(this).attr('id') === 'clint') {
                firstPlayer = (theGood);
                firstHealth = (charPlayer[0].health)
                $('#bounty').hide();
                $('#prisoner').hide();
                secondChar.push(theBad, theUgly)
            }
            else if ($(this).attr('id') === 'bounty') {
                firstPlayer = (theBad);
                firstHealth = (charPlayer[1].health)
                secondChar.push(theGood, theUgly)
                $('#clint').hide();
                $('#prisoner').hide();
                console.log(firstPlayer);
                console.log(secondChar)
            }
            else {
                firstPlayer = (theUgly);
                firstHealth = (charPlayer[2].health)
                secondChar.push(theGood, theBad)
                $('#clint').hide();
                $('#bounty').hide();
                console.log(firstPlayer);
                console.log(secondChar)
            }
            console.log('firstplayer health: ' + firstHealth)


            // ===================================================================================
            //========Once character is selected, move the other players to the second row.========
            for (var i = 0; i < secondChar.length; i++) {
                console.log(secondChar.length)
                var nuetralChar = $('<div>');
                nuetralChar.addClass("col-3  h-100");
                nuetralChar.html(`
                
                <div class="opponent card btn btn-primary m-2 p-0 w-100 h-100" id='${secondChar[i].name}'>
                            <img src='${secondChar[i].image}' style=' height:100%'>
                            <h3 class="health card-img-overlay p-2" id='health' style="background-color: maroon; top: 45%; height: 40px; opacity: .75">Health: ${secondChar[i].health}</h3>
                            <h3 class="attack card-img-overlay p-2" id="health" style="background-color: forestgreen; top: 65%; height: 40px; opacity: .75">Attack: ${secondChar[i].attackPower}</h3>
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
                <h3 class="health card-img-overlay p-2" id='healthEnemy' style="background-color: maroon; top: 45%; height: 40px; opacity: .75">Health: ${enemyPlayer.health}</h3>
                <h3 class="attack card-img-overlay p-2" id='attackEnemy' style="background-color: forestgreen; top: 65%; height: 40px; opacity: .75">Attack: ${enemyPlayer.attackPower}</h3>
                </div>
                
                `);
                $('.enemy').append(enemyChar)
                // $(secondChar[i].health).replaceWith(firstPlayer.health)
            })
        })
    };

    //=============================================================================================================
    //============== Attack button ================================================================================
    // ============================================================================================================
    btns.on('click', function () {
        firstPlayer.health = firstPlayer.health - enemyPlayer.attackPower;
        enemyPlayer.health = enemyPlayer.health - firstPlayer.attackPower;
        console.log('firstplayer health: ' + firstPlayer.health)
        console.log('enemyplayer health: ' + enemyPlayer.health)
        $('#healthEnemy').html('Health: ' + enemyPlayer.health);
        $('#firstHealth').html('Health: ' + firstPlayer.health)

        // if the user loses the battle
        if (firstPlayer.health <= 0) {
            firstPlayer.health = 0;
            $('#firstHealth').html('Health: ' + firstPlayer.health)

        }

        // if the user wins the battle. enter in other rival character.
        else if (enemyPlayer.health <= 0) {
            enemyPlayer.health = 0;
            $('#healthEnemy').html('Health: ' + enemyPlayer.health);
            alert("you've defeated the first enemy");
            alert('Round two');
            $('.opponent').hide();
            enemyDefeated.push(enemyPlayer)
            console.log(enemyDefeated)
            replace();

        }

        if (firstPlayer.health <= 0) {
            console.log(enemyDefeated.length)
            var videoFinish = $('<div>');
            videoFinish.addClass("col-12 vid h-100");
            videoFinish.html(`

            <iframe width="754" height="480" src="https://www.youtube.com/embed/5PgAKzmWmuk?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                            `);
            $('.video').append(videoFinish)
        }
    })

    // =============================================================================================================
    //===========after first has been defeated, it replaces the defeated character with the other character=========
    // =============================================================================================================
    function replace() {
        // If they match, replace .enemy row with the secondChar[1] character. 
        if (enemyPlayer.name === secondChar[0].name) {
            $(enemyPlayer).data(secondChar[1]);
            enemyPlayer.health = secondChar[1].health;
            console.log(enemyPlayer)
            $('.rival').replaceWith(`
    
                                            <div class="rival card btn btn-primary m-2 p-0 w-100 h-100" id='${secondChar[1].name}'>
                                                <img src='${secondChar[1].image}' style=' height:100%'>
                                                <h3 class="health card-img-overlay p-2" id='healthEnemy' style="background-color: maroon; top: 45%; height: 40px; opacity: .75">Health: ${enemyPlayer.health}</h3>
                                                <h3 class="attack card-img-overlay p-2" id='' style="background-color: forestgreen; top: 65%; height: 40px; opacity: .75">Attack: ${secondChar[1].attackPower}</h3>
                                            </div>
    
                                            `)


        }
        // else replace .enemy row with the secondChar[0] character.
        else {
            $(enemyPlayer).attr(secondChar[0]);
            enemyPlayer.health = secondChar[1].health;
            $('.rival').replaceWith(`
    
                                            <div class="rival card btn btn-primary m-2 p-0 w-100 h-100" id='${secondChar[0].name}'>
                                                <img src='${secondChar[0].image}' style=' height:100%'>
                                                <h3 class="health card-img-overlay p-2" id='healthEnemy' style="background-color: maroon; top: 45%; height: 40px; opacity: .75">Health: ${enemyPlayer.health}</h3>
                                                <h3 class="attack card-img-overlay p-2" id='' style="background-color: forestgreen; top: 65%; height: 40px; opacity: .75">Attack: ${secondChar[0].attackPower}</h3>
                                            </div>
    
                                            `)
            $('helath').text('Health: ' + secondChar[0].health);
        }

    }


    // ==============================================================================================================
    //============== When 'Restart' button is clicked, reload the page.=============================================
    // ==============================================================================================================
    $('#reset').click(function reset() {
        location.reload();
    });


})