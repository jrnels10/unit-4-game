# unit-4-game
Created a wild west shootout game using dynamic divs and functions. 

#Creating the characters
Objects were created for each of the characters in the game. They were then placed in an array to reference when the page loads. 

#Window load
When the window loads, the 'first' function is which loads the characters onto the DOM.

Another two functions are called within the 'Window' function. The first is the 'characters' function which allows the user to click on which character they want to play as. Then pushed the other two characters to the second row using a dynamic div. 

Once the characters are on the second row, the second function, 'opponent' takes place. It allows the user to click on which character they want to battle first. Once selected, the function moves the opponent to the third dynamic row called 'enemy'.

#Attack Button
Another function is created to take place after all the characters have been selected. When clicked, the function subtracts the attack power attribute from the characters object from the health attribute from the enemy characters object and then vice versa. 

Once the health of the enemy character reaches zero, the replace function is called. 

After both the characters have been eliminated or the users characters has died, a video plays from the standoff scene in the Movie... The Good The Bad THe Ugly. 

#Replace function
When the function is called, it replaces the enemy player with the last character to battle. It does so by replacing the complete html in the third row with the other character. 

