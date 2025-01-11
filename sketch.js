/*
	The Game Project Part 7 - Game Mechanics
*/

var gameChar_x;
var gameChar_y;
var floorPos_y;

var canyons;

var isLeft;
var isRight;
var isFalling;

var frCount;
var jumpSpeed;

var collectables;

var flagpole;

var isPlummeting;

//implement scrolling - declaring global var
var cameraPosX;
var cameraPosY;

var gameOver;
var levelComplete;

var gameScore;

var cameraLockL;
var cameraLockR;

var enemyHit;

//initialising variables here so restarting via calling setup() maintains lives
var lives = 3;
var currentLives = lives;

var showingInstructions;

var platforms;
var observedFloor;

function setup(){
    //sets lives to the current lives value from the previous attempt
    lives = currentLives;
    
    showingInstructions = true;
    
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = -350;
	gameChar_y = floorPos_y;

    //Inspect the canyon
    canyons = [
        {x_pos: 480, width: 150},
        {x_pos: 800, width: 100},
        {x_pos: 1000, width: 75},
        {x_pos: 1300, width: 170},
        {x_pos: 1900, width: 220},
        {x_pos: -100, width: 90}
    ]
    
    //declare enemy objects
    enemies = [
        {x_pos: 700, y_pos: floorPos_y - 75, patrol: [630, 750], speed: -1, isAlive: true, squishCount: 0},
        {x_pos: 1075, y_pos: floorPos_y - 75, patrol: [1075, 1250], speed: 2, isAlive: true, squishCount: 0},
        {x_pos: 1470, y_pos: floorPos_y - 75, patrol: [1470, 1850], speed: 1.5, isAlive: true, squishCount: 0},
        {x_pos: 1850, y_pos: floorPos_y - 75, patrol: [1470, 1850], speed: -1.5, isAlive: true, squishCount: 0},
        {x_pos: -200, y_pos: floorPos_y - 75, patrol: [400, 405], speed: -0.1, isAlive: true, squishCount: 0},
        {x_pos: 800, y_pos: floorPos_y - 380, patrol: [730, 1120], speed: 2, isAlive: true, squishCount: 0}
    ]
    
    isLeft = false;
    isRight = false;
    isFalling = false;
    
    frCount = 0;
    jumpSpeed = 0;
    
    //Add collectable items objects
    collectables = [
        {x_pos: 300, y_pos: floorPos_y - 130, size: 50, collectBounce: 0, isFound: false},
        {x_pos: 600, y_pos: floorPos_y - 130, size: 50, collectBounce: 0, isFound: false},
        {x_pos: 1000, y_pos: floorPos_y - 130, size: 50, collectBounce: 0, isFound: false},
        {x_pos: 1000, y_pos: floorPos_y - 50, size: 50, collectBounce: 0, isFound: false},
        {x_pos: 100, y_pos: floorPos_y - 30, size: 50, collectBounce: 0, isFound: false},
        {x_pos: 200, y_pos: floorPos_y - 230, size: 50, collectBounce: 0, isFound: false},
        {x_pos: 1850, y_pos: floorPos_y - 130, size: 50, collectBounce: 0, isFound: false},
        {x_pos: 2070, y_pos: floorPos_y - 100, size: 50, collectBounce: 0, isFound: false},
        {x_pos: 2000, y_pos: floorPos_y - 250, size: 50, collectBounce: 0, isFound: false},
        {x_pos: 2200, y_pos: floorPos_y - 100, size: 50, collectBounce: 0, isFound: false},
        {x_pos: -400, y_pos: floorPos_y - 200, size: 50, collectBounce: 0, isFound: false},
        {x_pos: 300, y_pos: floorPos_y - 270, size: 50, collectBounce: 0, isFound: false},
        {x_pos: 300, y_pos: floorPos_y - 330, size: 50, collectBounce: 0, isFound: false},
        {x_pos: 300, y_pos: floorPos_y - 390, size: 50, collectBounce: 0, isFound: false},
        {x_pos: 300, y_pos: floorPos_y - 450, size: 50, collectBounce: 0, isFound: false},
        {x_pos: 300, y_pos: floorPos_y - 450, size: 50, collectBounce: 0, isFound: false},
        {x_pos: 700, y_pos: floorPos_y - 360, size: 50, collectBounce: 0, isFound: false},
        {x_pos: 790, y_pos: floorPos_y - 360, size: 50, collectBounce: 0, isFound: false},
        {x_pos: 880, y_pos: floorPos_y - 360, size: 50, collectBounce: 0, isFound: false},
        {x_pos: 950, y_pos: floorPos_y - 360, size: 50, collectBounce: 0, isFound: false},
        {x_pos: 1020, y_pos: floorPos_y - 360, size: 50, collectBounce: 0, isFound: false},
    ]
    
    //add platform objects
    platforms = [
        {x_pos: 50, y_pos: floorPos_y - 50, width: 200},
        {x_pos: 300, y_pos: floorPos_y - 200, width: 70},
        {x_pos: 180, y_pos: floorPos_y - 160, width: 70},
        {x_pos: 600, y_pos: floorPos_y - 190, width: 40},
        {x_pos: 500, y_pos: floorPos_y - 275, width: 100},
        {x_pos: 700, y_pos: floorPos_y - 300, width: 450}
    ]
    observedFloor = 0;
    
    //Add the flagpole
    flagpole = {
        x_pos: 2400,
        crossValR: 255,
        crossPulse: -1,
        isReached: false,
        startHeight: 300,
        topHeight: 133,
        flagHeight: 0
    }
    flagpole.flagHeight = flagpole.startHeight;
    
    isPlummeting = false;
    
    cameraPosX = 0;
    cameraPosY = 0;
    
    gameOver = false;
    levelComplete = false;
    
    gameScore = 0;
    
    cameraLockL = gameChar_x - 1500;
    cameraLockR = gameChar_x + 900;
    
    enemyHit = false;
}

function drawPlatforms(){
    strokeWeight(8);
    stroke(0);
    for (var i = 0; i < platforms.length; i++){
        line(platforms[i].x_pos,
             platforms[i].y_pos,
             platforms[i].x_pos + platforms[i].width,
             platforms[i].y_pos);
    }
    strokeWeight(1);
}

function drawInstructions(){
    //draws the instructions but hides them once a level of scroll is reached
    if (showingInstructions && !gameOver && !levelComplete){
        push();
        textSize(20);
        fill(255);
        strokeWeight(4);
        stroke(0);
        text("avoid", -80, floorPos_y - 90);
        line(-55, floorPos_y - 75, -55, floorPos_y - 10);
        triangle(-52, floorPos_y - 10, -58, floorPos_y - 10, -55, floorPos_y - 6);
        text("jump on", -210, floorPos_y - 160);
        line(-174, floorPos_y - 145, -174, floorPos_y - 90);
        triangle(-171, floorPos_y - 90, -177, floorPos_y - 90, -174, floorPos_y - 85);
        text("collect", -330, floorPos_y - 200);
        text("Go right: reach the flag", -330, floorPos_y - 300);
        line(-300, floorPos_y - 270, -174, floorPos_y - 270);
        triangle(-174, floorPos_y - 274, -174, floorPos_y - 266, -168, floorPos_y - 270);
        noFill();
        beginShape();
        curveVertex(-310, 0);
        curveVertex(-310, 241);
        curveVertex(-360, 256);
        curveVertex(-600, 100);
        endShape();
        fill(255);
        triangle(-360, 254, -360, 262, -367, 258);
        pop();
    }
}

function drawLives(){
    //draws the life bar according to the amount of lives remaining
    for (var i = 0; i < lives; i++){
        //head
        fill(235, 189, 164); //sets skin colour
        strokeWeight(2);
        stroke(0);
        ellipse(40 + 3 + i * 40, 130 - 60, 30, 30);
        //draws the head first so the facial features aren't obscured

        //ears
        stroke(0);
        strokeWeight(2);
        arc(40 - 13 + i * 40, 130 - 61, 5, 5, HALF_PI, PI + HALF_PI);
        arc(40 + 18 + i * 40, 130 - 61, 5, 5, PI + HALF_PI, HALF_PI);

        //eyeball
        fill(255);
        strokeWeight(1.5);
        ellipse(40 - 1 + i * 40, 130 - 65, 7.5, 15);
        ellipse(40 + 8 + i * 40, 130 - 65, 7.5, 15);
        //draws two white eyeballs

        //pupil
        fill(0);
        ellipse(40 - 1 + i * 40, 130 - 60, 5, 5);
        ellipse(40 + 8 + i * 40, 130 - 60, 5, 5);
        //draws two black pupils afterwards so the black is overlayed onto the white

        //mouth
        noFill();
        line(40 - 4 + i * 40, 130 - 55, 40 + 8 + i * 40, 130 - 55);
        strokeWeight(1);
    }
}

function drawMountains(){
    //make an array of mountains
    var mountains = [
        {mountainX: 350, mountainBack: 50, mountainTop: 240},
        {mountainX: 435, mountainBack: 100, mountainTop: 255},
        {mountainX: 900, mountainBack: 120, mountainTop: 255},
        {mountainX: 1600, mountainBack: 80, mountainTop: 230}
    ]
    var mountainY = floorPos_y;
    //draw the mountains
    for (var i = 0; i < mountains.length; i++){
        fill(mountains[i].mountainBack);
        triangle(mountains[i].mountainX,
                 mountainY,
                 mountains[i].mountainX + 165,
                 mountainY - 363,
                 mountains[i].mountainX + 365,
                 mountainY);
        fill(mountains[i].mountainTop);
        beginShape(); //draw the snowy peak of the mountain
        vertex(mountains[i].mountainX + 119,
               mountainY - 262);
        vertex(mountains[i].mountainX + 135,
               mountainY - 251);
        vertex(mountains[i].mountainX + 152,
               mountainY - 271);
        vertex(mountains[i].mountainX + 187,
               mountainY - 283);
        vertex(mountains[i].mountainX + 212,
               mountainY - 277);
        vertex(mountains[i].mountainX + 165,
               mountainY - 363);
        endShape(CLOSE);
        noStroke();
        fill(255);
    }
}

function drawTrees(){
    //make an array of tree positions
    var trees_x = [100, 380, 910, 1100, 1500];
    var treePos_y = floorPos_y + 15;
    //draw the trees
    for (var i = 0; i < trees_x.length; i++){
        fill(139,69,19);
        stroke(0);
        beginShape(); //draw trunk
        vertex(trees_x[i], treePos_y);
        vertex(trees_x[i] + 32, treePos_y - 16);
        vertex(trees_x[i] + 41, treePos_y - 98);
        vertex(trees_x[i] + 17, treePos_y - 123);
        vertex(trees_x[i] + 28, treePos_y - 133);
        vertex(trees_x[i] + 49, treePos_y - 114);
        vertex(trees_x[i] + 68, treePos_y - 139);
        vertex(trees_x[i] + 78, treePos_y - 127);
        vertex(trees_x[i] + 65, treePos_y - 103);
        vertex(trees_x[i] + 60, treePos_y - 20);
        vertex(trees_x[i] + 89, treePos_y - 3);
        vertex(trees_x[i] + 53, treePos_y - 11);
        vertex(trees_x[i] + 78, treePos_y + 19);
        vertex(trees_x[i] + 38, treePos_y - 11);
        endShape(CLOSE);
        fill(0,180,0,80);
        ellipse(trees_x[i] + 21, treePos_y - 128, 50, 50); //draw tree leaves
        ellipse(trees_x[i] + 74, treePos_y - 134, 70, 80);
        ellipse(trees_x[i] + 39, treePos_y - 150, 100, 75);
        noStroke();
        fill(255);
    }
}

function drawClouds(){
    //make an array of clouds
    var clouds = [
        {cloudX: 0, cloudY: 0, cloudSize: 1},
        {cloudX: 500, cloudY: 50, cloudSize: 1.3},
        {cloudX: 50, cloudY: 100, cloudSize: 1.5},
        {cloudX: 700, cloudY: 25, cloudSize: 1.1},
        {cloudX: 800, cloudY: 60, cloudSize: 1.4},
        {cloudX: 950, cloudY: 100, cloudSize: 1.6},
        {cloudX: 1200, cloudY: -40, cloudSize: 1.2},
        {cloudX: 1500, cloudY: 40, cloudSize: 1.5},
        {cloudX: 1800, cloudY: 10, cloudSize: 1}
    ]
    //draw the clouds
    for (var i = 0; i < clouds.length; i++){
        stroke(0);
        fill(210, 75);
        ellipse(clouds[i].cloudX,
                clouds[i].cloudY + 100,
                75 * clouds[i].cloudSize,
                50 * clouds[i].cloudSize); 
        ellipse(clouds[i].cloudX + 10,
                clouds[i].cloudY + 110,
                75 * clouds[i].cloudSize,
                50 * clouds[i].cloudSize);
        ellipse(clouds[i].cloudX + 20,
                clouds[i].cloudY + 90,
                75 * clouds[i].cloudSize,
                50 * clouds[i].cloudSize);
        noStroke();
    }
}

function drawScoreCounter(){
    //draw the score counter
    push();
    fill(255,180,0);
    strokeWeight(1);
    stroke(0);
    //draw the larger coin box:
    rect(10, 10, 0.6 * 50, 0.8 * 50);
    fill(255,255,0);
    //draw the smaller coin box:
    rect(15, 15, 0.4 * 50, 0.6 * 50);
    noStroke();
    fill(255);
    stroke(0);
    textSize(20);
    strokeWeight(4);
    //add a score counter
    text("X " + gameScore, 60, 40);
    pop();
}

function draw(){
    //continually change camera position
    //cameraPosX = -gameChar_x + width / 2;
    cameraPosX = constrain(-gameChar_x + width / 2, cameraLockL, cameraLockR);
    //introduce vertical camera
    cameraPosY = -1 * min(0, gameChar_y - floorPos_y + height / 2);
    
    if (gameChar_x > 425){
        showingInstructions = false;
    }
    
	///////////DRAWING CODE//////////
    
	background(100,155,255); //fill the sky blue
    
    frCount += 10;
    
    gameChar_y -= jumpSpeed; 
    //makes sure that the character always falls if necessary
    
	noStroke();
	fill(0,155,0);
    //scroll the ground only on the vertical axis
    push();
    translate(0, cameraPosY);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground
    pop();
    
    //implement scrolling - push a new drawing state
    push();
    translate(cameraPosX, cameraPosY); //translate the camera position
    
	//render multiple canyons
    for (var i = 0; i < canyons.length; i++){
        noStroke();
	    fill(92, 40, 0);
	    rect(canyons[i].x_pos, floorPos_y, canyons[i].width, height - floorPos_y);
    }
    
    drawMountains();
    drawClouds();
    drawTrees();
    
    //a flag pole
    fill(244,164,96);
    ellipse(flagpole.x_pos,432,50,25);
    rect(flagpole.x_pos - 26,399,52,33);
    stroke(200);
    strokeWeight(4);
    line(flagpole.x_pos - 1,396,flagpole.x_pos - 1,135);
    noStroke();
    fill(255);
    //Flagpole reached state
    if (flagpole.isReached == false){
        rect(flagpole.x_pos + 1,flagpole.startHeight,100,75);
        if (flagpole.crossValR > 255 || flagpole.crossValR < 0){ 
            //changes the colour of the flag's cross
            flagpole.crossPulse = flagpole.crossPulse * -1;
        }
        flagpole.crossValR += flagpole.crossPulse;
        fill(flagpole.crossValR,0,0);
        rect(flagpole.x_pos + 47, flagpole.startHeight, 10, 75);
        rect(flagpole.x_pos + 1, flagpole.startHeight + 31, 100, 10);  
    }
    else{ //raises the flag if reached
        //trigger level complete state
        levelComplete = true;
        isPlummeting = false;
        if (flagpole.flagHeight > flagpole.topHeight){
            flagpole.flagHeight -= 4;
        }
        else{
            flagpole.flagHeight = flagpole.topHeight;
        }
        rect(flagpole.x_pos + 1,flagpole.flagHeight,100,75);
        if (flagpole.crossValR > 255 || flagpole.crossValR < 0){ 
            //changes the colour of the flag's cross
            flagpole.crossPulse = flagpole.crossPulse * -1;
        }
        flagpole.crossValR += flagpole.crossPulse;
        fill(flagpole.crossValR,0,0);
        rect(flagpole.x_pos + 47, flagpole.flagHeight, 10, 75);
        rect(flagpole.x_pos + 1, flagpole.flagHeight + 31, 100, 10);  
    }
    strokeWeight(1.5);
    
    //render enemies
    for (var i = 0; i < enemies.length; i++){
        if (enemies[i].isAlive == true){
            fill(225, 0, 0);
            stroke(0);
            rect(enemies[i].x_pos, enemies[i].y_pos, 50, 50);
            fill(255);
            ellipse(enemies[i].x_pos + 17, enemies[i].y_pos + 20, 10, 10);
            strokeWeight(3);
            point(enemies[i].x_pos + 17, enemies[i].y_pos + 20);
            strokeWeight(1);
            ellipse(enemies[i].x_pos + 34, enemies[i].y_pos + 20, 10, 10);
            strokeWeight(3);
            point(enemies[i].x_pos + 34, enemies[i].y_pos + 20);
            strokeWeight(4);
            noFill();
            arc(enemies[i].x_pos + 25, enemies[i].y_pos + 35, 10, 10, PI, 0);
            strokeWeight(1);
            fill(180);
            ellipse(enemies[i].x_pos + 25, enemies[i].y_pos + 65, 28);
            if (enemies[i].x_pos >= enemies[i].patrol[1] + 1 || enemies[i].x_pos <= enemies[i].patrol[0] - 1){
                //reverse enemy patrol direction should the enemy reach a limit
                enemies[i].speed *= -1;
            }
            enemies[i].x_pos += enemies[i].speed;
        }
        else { //squish the enemy
            if (enemies[i].squishCount < 6){
                enemies[i].squishCount++;
                fill(225, 0, 0);
                stroke(0);
                rect(enemies[i].x_pos, enemies[i].y_pos + 45, 50, 25);
                fill(255);
                ellipse(enemies[i].x_pos + 17, enemies[i].y_pos + 55, 10, 5);
                strokeWeight(3);
                point(enemies[i].x_pos + 17, enemies[i].y_pos + 55);
                strokeWeight(1);
                ellipse(enemies[i].x_pos + 34, enemies[i].y_pos + 55, 10, 5);
                strokeWeight(3);
                point(enemies[i].x_pos + 34, enemies[i].y_pos + 55);
                strokeWeight(4);
                noFill();
                arc(enemies[i].x_pos + 25, enemies[i].y_pos + 60, 10, 5, PI, 0);
                strokeWeight(1);
                fill(180);
                ellipse(enemies[i].x_pos + 25, enemies[i].y_pos + 72, 28, 14);
            }
        }
    }
    
    //render collectable item
    for (var i = 0; i < collectables.length; i++){
        if (collectables[i].isFound == false){
            fill(255,180,0); 
            stroke(0);
            if (collectables[i].collectBounce == 0){ //makes the coin bounce
                collectables[i].collectBounce = 2;
            } else if (collectables[i].collectBounce == 2){
                collectables[i].collectBounce = 4;
            } else if (collectables[i].collectBounce == 4){
                collectables[i].collectBounce = 3
            } else if (collectables[i].collectBounce == 3){
                collectables[i].collectBounce = 1;
            } else if (collectables[i].collectBounce == 1){
                collectables[i].collectBounce = -1;
            } else if (collectables[i].collectBounce == -1){
                collectables[i].collectBounce = -4;
            } else if (collectables[i].collectBounce == -4){
                collectables[i].collectBounce = -2;
            } else if (collectables[i].collectBounce == -2){
                collectables[i].collectBounce = 0;
            }
            //draw the larger coin box:
            rect(collectables[i].x_pos,
                 collectables[i].y_pos + collectables[i].collectBounce,
                 0.6 * collectables[i].size,
                 0.8 * collectables[i].size);
            fill(255,255,0);
            //draw the smaller coin box:
            rect(collectables[i].x_pos + (collectables[i].size / 10),
                    collectables[i].y_pos + 
                    (collectables[i].size / 10) + 
                    collectables[i].collectBounce,
                 0.4 * collectables[i].size,
                 0.6 * collectables[i].size);
            noStroke();
            fill(255);
        }
    }
    
    drawInstructions();
    drawPlatforms();
    
	//the game character
    
    if (!isRight && !isLeft){
        //makes sure the code for moving the legs/changing shirt
        //colour is only ran once
        noStroke();
        animateLegs();
    }
    
	if(isLeft && isFalling && !isPlummeting && !gameOver && !levelComplete){
        //head
        fill(235, 189, 164);
        strokeWeight(2);
        stroke(0);
        ellipse(gameChar_x + 3, gameChar_y - 60, 30, 30);

        //ear
        stroke(0);
        strokeWeight(2);
        arc(gameChar_x + 9, gameChar_y - 61, 5, 5, PI + HALF_PI, HALF_PI);

        //eyeball
        fill(255);
        strokeWeight(1.5);
        ellipse(gameChar_x - 4, gameChar_y - 65, 7.5, 15);

        //pupil
        fill(0);
        if (jumpSpeed > 0){ //jumping and falling state
            //pupil changes position based on Bob's position in the air
            ellipse(gameChar_x - 5.5, gameChar_y - 68, 5, 5);
        }
        else{
            ellipse(gameChar_x - 5.5, gameChar_y - 62, 5, 5);
        }

        //mouth
        fill(0);
        ellipse(gameChar_x - 3, gameChar_y - 52.5, 6, 6);

        //neck
        line(gameChar_x + 9, gameChar_y - 47, gameChar_x + 9, gameChar_y - 40);

        //shirt
        strokeWeight(2);
        fill(0, 180, 0);
        rect(gameChar_x - 15, gameChar_y - 40, 30, 30);

        //shirt design
        textSize(8.5);
        fill(frCount);
        noStroke();
        text("OB", gameChar_x - 13, gameChar_y - 17);

        //left arm
        stroke(0);
        strokeWeight(1.5);
        line(gameChar_x - 15, gameChar_y - 40, gameChar_x - 20, gameChar_y - 60);

        //right arm
        strokeWeight(1.5);
        stroke(0);
        line(gameChar_x + 15, gameChar_y - 40, gameChar_x + 20, gameChar_y - 25);
        line(gameChar_x + 20, gameChar_y - 25, gameChar_x + 18, gameChar_y - 14);

        //legs
        line(gameChar_x - 7, gameChar_y - 10, gameChar_x - 12, gameChar_y);
        line(gameChar_x + 8, gameChar_y - 10, gameChar_x + 13, gameChar_y - 5);
	}
	else if(isRight && isFalling && !isPlummeting && !gameOver && !levelComplete){
		//head
        fill(235, 189, 164);
        strokeWeight(2);
        stroke(0);
        ellipse(gameChar_x + 3, gameChar_y - 60, 30, 30);

        //ear
        stroke(0);
        strokeWeight(2);
        arc(gameChar_x - 4, gameChar_y - 61, 5, 5, HALF_PI, HALF_PI + PI);

        //eyeball
        fill(255);
        strokeWeight(1.5);
        ellipse(gameChar_x + 8, gameChar_y - 65, 7.5, 15);

        //pupil
        fill(0);
        if (jumpSpeed > 0){ //jumping and falling state
            //pupil changes position based on whether Bob is rising or falling
            ellipse(gameChar_x + 9, gameChar_y - 68, 5, 5);
        }
        else{
            ellipse(gameChar_x + 9, gameChar_y - 64, 5, 5);
        }
        

        //mouth
        fill(0);
        ellipse(gameChar_x + 10, gameChar_y - 53, 6, 6);

        //neck
        line(gameChar_x - 6, gameChar_y - 47, gameChar_x - 6, gameChar_y - 40);

        //shirt
        strokeWeight(2);
        fill(0, 180, 0);
        rect(gameChar_x - 15, gameChar_y - 40, 30, 30);

        //left arm
        strokeWeight(1.5);
        line(gameChar_x - 15, gameChar_y - 40, gameChar_x - 20, gameChar_y - 30);
        line(gameChar_x - 20, gameChar_y - 30, gameChar_x - 17.5, gameChar_y - 15);

        //shirt design
        noFill();
        stroke(frCount);
        strokeWeight(3);
        ellipse(gameChar_x + 7, gameChar_y - 32, 10, 10);
        ellipse(gameChar_x + 7, gameChar_y - 22, 10, 10);
        noStroke();
        fill(frCount);
        rect(gameChar_x - 1, gameChar_y - 38, 6, 22);

        //right arm
        strokeWeight(1.5);
        stroke(0);
        line(gameChar_x + 15, gameChar_y - 40, gameChar_x + 22, gameChar_y - 60);

        //legs
        line(gameChar_x - 7, gameChar_y - 10, gameChar_x - 12, gameChar_y - 5);
        line(gameChar_x + 8, gameChar_y - 10, gameChar_x + 13, gameChar_y);

	}
	else if(isLeft && !isRight && !isPlummeting && !gameOver && !levelComplete){
		//head
        fill(235, 189, 164);
        strokeWeight(2);
        stroke(0);
        ellipse(gameChar_x + 3, gameChar_y - 60, 30, 30);

        //ear
        stroke(0);
        strokeWeight(2);
        arc(gameChar_x + 9, gameChar_y - 61, 5, 5, PI + HALF_PI, HALF_PI);

        //eyeball
        fill(255);
        strokeWeight(1.5);
        ellipse(gameChar_x - 4, gameChar_y - 65, 7.5, 15);

        //pupil
        fill(0);
        ellipse(gameChar_x - 5, gameChar_y - 65, 5, 5);

        //mouth
        noFill();
        line(gameChar_x - 9, gameChar_y - 55, gameChar_x + 5, gameChar_y - 55);

        //neck
        line(gameChar_x + 9, gameChar_y - 47, gameChar_x + 9, gameChar_y - 40);

        //shirt
        strokeWeight(2);
        fill(0, 180, 0);
        rect(gameChar_x - 15, gameChar_y - 40, 30, 30);

        //shirt design
        textSize(8.5);
        fill(frCount);
        noStroke();
        text("OB", gameChar_x - 13, gameChar_y - 17);

        //left arm
        stroke(0);
        strokeWeight(1.5);
        line(gameChar_x - 15, gameChar_y - 40, gameChar_x - 20, gameChar_y - 11);

        //right arm
        strokeWeight(1.5);
        stroke(0);
        line(gameChar_x + 15, gameChar_y - 40, gameChar_x + 20, gameChar_y - 11);

        //legs
        animateLegs();
	}
	else if(isRight && !isLeft && !isPlummeting && !gameOver && !levelComplete){
		//head
        fill(235, 189, 164);
        strokeWeight(2);
        stroke(0);
        ellipse(gameChar_x + 3, gameChar_y - 60, 30, 30);

        //ear
        stroke(0);
        strokeWeight(2);
        arc(gameChar_x - 4, gameChar_y - 61, 5, 5, HALF_PI, HALF_PI + PI);

        //eyeball
        fill(255);
        strokeWeight(1.5);
        ellipse(gameChar_x + 8, gameChar_y - 65, 7.5, 15);

        //pupil
        fill(0);
        ellipse(gameChar_x + 9, gameChar_y - 65, 5, 5);

        //mouth
        noFill();
        line(gameChar_x + 1, gameChar_y - 55, gameChar_x + 16, gameChar_y - 55);

        //neck
        line(gameChar_x - 6, gameChar_y - 47, gameChar_x - 6, gameChar_y - 40);

        //shirt
        strokeWeight(2);
        fill(0, 180, 0);
        rect(gameChar_x - 15, gameChar_y - 40, 30, 30);

        //left arm
        strokeWeight(1.5);
        line(gameChar_x - 15, gameChar_y - 40, gameChar_x - 20, gameChar_y - 11);

        //shirt design
        noFill();
        stroke(frCount);
        strokeWeight(3);
        ellipse(gameChar_x + 7, gameChar_y - 32, 10, 10);
        ellipse(gameChar_x + 7, gameChar_y - 22, 10, 10);
        noStroke();
        fill(frCount);
        rect(gameChar_x - 1, gameChar_y - 38, 6, 22);

        //right arm
        strokeWeight(1.5);
        stroke(0);
        line(gameChar_x + 15, gameChar_y - 40, gameChar_x + 20, gameChar_y - 11);

        //legs
        animateLegs();
	}
	else if(isFalling || isPlummeting)
    //ensures the falling state is drawn when either falling or plummetting
	{
		//head
        fill(235, 189, 164);
        strokeWeight(2);
        stroke(0);
        ellipse(gameChar_x + 3, gameChar_y - 60, 30, 30);

        //ears
        stroke(0);
        strokeWeight(2);
        arc(gameChar_x - 13, gameChar_y - 61, 5, 5, HALF_PI, PI + HALF_PI);
        arc(gameChar_x + 18, gameChar_y - 61, 5, 5, PI + HALF_PI, HALF_PI);

        //eyeball
        fill(255);
        strokeWeight(1.5);
        ellipse(gameChar_x + 8, gameChar_y - 65, 7.5, 15);
        ellipse(gameChar_x - 1, gameChar_y - 65, 7.5, 15);

        //pupil
        fill(0);
        if (jumpSpeed > 0){ //jumping and falling state
            //the pupil changes position based on whether Bob is rising or falling
            ellipse(gameChar_x + 8, gameChar_y - 69, 5, 5);
            ellipse(gameChar_x - 1, gameChar_y - 69, 5, 5);
        }
        else{
            ellipse(gameChar_x + 8, gameChar_y - 61, 5, 5);
            ellipse(gameChar_x - 1, gameChar_y - 61, 5, 5);
        }

        //mouth
        fill(0);
        ellipse(gameChar_x + 5, gameChar_y - 53, 6, 6);

        //neck
        line(gameChar_x + 2, gameChar_y - 45, gameChar_x + 2, gameChar_y - 40);

        //shirt
        strokeWeight(2);
        fill(0, 180, 0);
        rect(gameChar_x - 15, gameChar_y - 40, 30, 30);

        //left arm
        strokeWeight(1.5);
        line(gameChar_x - 15, gameChar_y - 40, gameChar_x - 20, gameChar_y - 58);

        //shirt a
        noFill();
        stroke(frCount);
        strokeWeight(3);
        ellipse(gameChar_x - 5, gameChar_y - 32, 10, 10);
        ellipse(gameChar_x - 5, gameChar_y - 22, 10, 10);
        noStroke();
        fill(frCount);
        rect(gameChar_x - 13, gameChar_y - 38, 6, 22);
        textSize(8.5);
        text("OB", gameChar_x + 2, gameChar_y - 17);

        //right arm
        strokeWeight(1.5);
        stroke(0);
        line(gameChar_x + 15, gameChar_y - 40, gameChar_x + 22, gameChar_y - 58);

        //legs
        line(gameChar_x - 7, gameChar_y - 10, gameChar_x - 12, gameChar_y - 4);
        line(gameChar_x + 8, gameChar_y - 10, gameChar_x + 13, gameChar_y - 4);
	}
	else{
		//head
        fill(235, 189, 164); //sets skin colour
        strokeWeight(2);
        stroke(0);
        ellipse(gameChar_x + 3, gameChar_y - 60, 30, 30);
        //draws the head first so the facial features aren't obscured

        //ears
        stroke(0);
        strokeWeight(2);
        arc(gameChar_x - 13, gameChar_y - 61, 5, 5, HALF_PI, PI + HALF_PI);
        arc(gameChar_x + 18, gameChar_y - 61, 5, 5, PI + HALF_PI, HALF_PI);

        //eyeball
        fill(255);
        strokeWeight(1.5);
        ellipse(gameChar_x - 1, gameChar_y - 65, 7.5, 15);
        ellipse(gameChar_x + 8, gameChar_y - 65, 7.5, 15);
        //draws two white eyeballs

        //pupil
        fill(0);
        ellipse(gameChar_x - 1, gameChar_y - 60, 5, 5);
        ellipse(gameChar_x + 8, gameChar_y - 60, 5, 5);
        //draws two black pupils afterwards so the black is overlayed onto the white

        //mouth
        noFill();
        line(gameChar_x - 4, gameChar_y - 55, gameChar_x + 8, gameChar_y - 55);

        //neck
        line(gameChar_x + 2, gameChar_y - 45, gameChar_x + 2, gameChar_y - 40);

        //shirt
        strokeWeight(2);
        fill(0, 180, 0);
        rect(gameChar_x - 15, gameChar_y - 40, 30, 30);

        //left arm
        strokeWeight(1.5);
        line(gameChar_x - 15, gameChar_y - 40, gameChar_x - 20, gameChar_y - 11);

        //shirt design
        noFill();
        stroke(frCount);
        strokeWeight(3);
        //sets a larger width to create the round parts of the 'B' shape
        ellipse(gameChar_x - 5, gameChar_y - 32, 10, 10);
        ellipse(gameChar_x - 5, gameChar_y - 22, 10, 10);
        //draws the round parts of the 'B'
        noStroke();
        fill(frCount);
        //sets the text colour in accordance with the current frame the game is on
        rect(gameChar_x - 13, gameChar_y - 38, 6, 22);
        //gives the 'B' a straight edge
        textSize(8.5);
        text("OB", gameChar_x + 2, gameChar_y - 17); //draws the remainder of "Bob"
        
        //right arm
        strokeWeight(1.5);
        stroke(0);
        line(gameChar_x + 15, gameChar_y - 40, gameChar_x + 20, gameChar_y - 11);

        //legs
        line(gameChar_x - 7, gameChar_y - 10, gameChar_x - 7, gameChar_y + 2);
        line(gameChar_x + 8, gameChar_y - 10, gameChar_x + 8, gameChar_y + 2);
	}
    pop(); //pop drawing state
    
	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
    
    //Collectable item interaction
    for (var i = 0; i < collectables.length; i++){
        if (gameChar_x - 16 + 33 > collectables[i].x_pos &&
            gameChar_y - 75 + 70 > collectables[i].y_pos &&
            gameChar_x - 16 < collectables[i].x_pos + 0.6 * collectables[i].size &&
            gameChar_y - 75 < collectables[i].y_pos + 0.8 * collectables[i].size){
            //ensures that the rectangle that makes up the coin is touching Bob
            if (!collectables[i].isFound){
                //increment the score
                gameScore++;
            }
            collectables[i].isFound = true;
        }
    }
    
    //enemy interaction
    for (var i = 0; i < enemies.length; i++){
        if (enemies[i].isAlive == true){
            if (gameChar_x > enemies[i].x_pos - 10 &&
                gameChar_x < enemies[i].x_pos + 60 &&
                gameChar_y > enemies[i].y_pos - 5 && 
                gameChar_y < enemies[i].y_pos + 10 &&
                enemyHit == false && jumpSpeed <= 0){
                enemies[i].isAlive = false;
                enemyHit = false;
            }
            else if (gameChar_x > enemies[i].x_pos - 9 &&
                     gameChar_x < enemies[i].x_pos + 59 &&
                     gameChar_y > enemies[i].y_pos + 11 &&
                     gameChar_y <= floorPos_y &&
                     !enemyHit && enemies[i].isAlive == true){
                enemyHit = true;
                jumpSpeed = 0;
                jumpSpeed += 15;
            }
        }
    }
        
    //Flagpole interaction
    if (dist(gameChar_x, gameChar_y, flagpole.x_pos - 1, gameChar_y)<= 10 &&
        gameChar_y > 135 && gameChar_y < 396 &&
        flagpole.isReached == false){
        //ensures Bob is within 10 pixels of the flagpole
        flagpole.isReached = true;
    }
    
    if (!isPlummeting && !gameOver && !levelComplete){ 
        //Freezing controls: ensures no horizontal movement when plummeting
        if (isLeft == true && gameChar_x > -cameraLockR + 20){
            gameChar_x -= 5;
        }
        if (isRight == true && gameChar_x < -cameraLockL + width - 20){
            gameChar_x += 5;
        }
    }
    
    if ((gameChar_y == floorPos_y ||
         gameChar_y == platforms[observedFloor].y_pos) &&
         !isPlummeting){
        //ensures that the player can still jump if standing on a suspended platform
        isFalling = false;
    }
    else if (gameChar_y < floorPos_y){
        isFalling = true;
    }
    //loop for handling checking whether or not there is a platform below the player
    for (var i = 0; i < platforms.length; i++){
        if (gameChar_y < floorPos_y){
            if (gameChar_x - 10 >= platforms[i].x_pos &&
                gameChar_x + 10 <= platforms[i].x_pos + platforms[i].width){
                //check horizontal bound first
                if (dist(gameChar_x, gameChar_y, gameChar_x, platforms[i].y_pos) <
                    dist(gameChar_x, gameChar_y, gameChar_x, platforms[observedFloor].y_pos)){
                    //change the current nearest platform if there is one closer than the current one
                    observedFloor = i;
                }
            }
        }
    }
    if (gameChar_x + 10 >= platforms[observedFloor].x_pos &&
        gameChar_x - 10 <= platforms[observedFloor].x_pos + platforms[observedFloor].width &&
        gameChar_y <= platforms[observedFloor].y_pos){
        //ensure the player remains in bounds of the checked platform
        if (dist(gameChar_x, gameChar_y, gameChar_x, platforms[observedFloor].y_pos) <= jumpSpeed * -1){
            //if the player is about to fall through a platform - make them stand on it instead
            jumpSpeed = 0;
            gameChar_y = platforms[observedFloor].y_pos;
        } 
        else if (gameChar_y != platforms[observedFloor].y_pos){
            //keep falling until the player is about to fall through a platform
            jumpSpeed -= 0.5;
        }
    }
    else if ((dist(gameChar_x, gameChar_y, gameChar_x, floorPos_y) > 0 && gameChar_y < floorPos_y) ||
        isPlummeting == true || enemyHit == true) { //ensures falling down the canyon continues to work
        //ensures Bob continues to fall at the same rate even when plummetting
        //console.log("falling due to no platform")
        jumpSpeed -= 0.5;
    }
    else{
        jumpSpeed = 0;
        gameChar_y = floorPos_y; 
        //resets the Y position of Bob when not plummetting
    }
    
    //implement canyon interaction
    //Falling down the canyon:
    //jumping over the canyon possible only because plummetting only
    //happens when gameChar_y >= floorPos_y
    for (var i = 0; i < canyons.length; i++){
        if (gameChar_x > canyons[i].x_pos + 8 &&
            gameChar_x < canyons[i].x_pos + canyons[i].width - 8 &&
            gameChar_y >= floorPos_y || enemyHit == true){ //detects if Bob is over the canyon or hit
            isPlummeting = true; //makes Bob plummet
            break;
        }
        else{
            isPlummeting = false;
        }
    }
    
    //Falls more quickly when falling down the canyon
    if (isPlummeting == true){ //if plummeting, make Bob fall quicker
        jumpSpeed -= 1;
    }
    
    //trigger game over state
    if (gameChar_y > height + 80){
        gameOver = true;
    }
    
    //game over state
    if (gameOver){
        //sets the current value of lives to be the value of lives for the next reset
        currentLives = lives;
        currentLives--; //deducts a life upon death
        push();
        stroke(0);
        fill(255);
        textSize(32);
        strokeWeight(10);
        textAlign(CENTER);
        if (lives > 0){
            //regular game over screen
            var deathString = "Bob has been absolutely clarted.\nPress R to restart";
            text(deathString, width / 2 + textWidth(deathString) / 50, height / 2);
        } else {
            //game over if all lives are depleted
            var deathString = "Bob has received a quadruple clarting\nPress R to play again";
            text(deathString, width / 2 + textWidth(deathString) / 50, height / 2);
            currentLives = 3;
        }
        pop();
        jumpSpeed = 0; //prevents an eventual overflow error from continuing to fall offscreen
    }
    
    //level complete state
    if (levelComplete){
        push();
        stroke(0);
        fill(255);
        textSize(32);
        strokeWeight(10);
        textAlign(CENTER);
        var winString = "Bob has absolutely smashed it.\nPress R to play again";
        text(winString, width / 2 - textWidth(winString) / 50, height / 2);
        currentLives = 3; //resets the life counter back to 3
        pop();
    }
    
    //draws the score and lives HUD over the top of everything else
    drawScoreCounter();
    drawLives();
}

function keyPressed(){
	// if statements to control the animation of the character when
	// keys are pressed.
    
    //Freezing controls:
    //keyPressed code has no effect when isPlummetting is true
    if (!gameOver && !levelComplete){
        if (key == "a" && !isPlummeting){ //allows control when not plummetting
            isLeft = true;
        }
        if (key == "d" && !isPlummeting){ //allows control when not plummetting
            isRight = true;
        }
        if (key == "w" && !isFalling &&
            !isPlummeting){ //allows control when not plummetting
            //prevents jumping if already falling - either down a canyon or from a jump
            jumpSpeed = 15;
        }
    }
    else{
        if (key == "r"){
            setup();
        }
        return;
    }
}

function keyReleased(){
	// if statements to control the animastion of the character when
	// keys are released.
    if (key == "a" || gameOver || levelComplete){
        isLeft = false;
    }
    if (key == "d" || gameOver || levelComplete){
        isRight = false;
    }
}

function drawLegFrame(frameNo){
    //changes between the two separate walking states based on the
    //frameNo parameter
    if (frameNo == 1){
        line(gameChar_x - 7, gameChar_y - 10, gameChar_x - 12, gameChar_y + 2);
        line(gameChar_x + 8, gameChar_y - 10, gameChar_x + 13, gameChar_y + 2);
    }
    else if (frameNo == 2) {
        line(gameChar_x - 7, gameChar_y - 10, gameChar_x + 4, gameChar_y + 2);
        line(gameChar_x + 8, gameChar_y - 10, gameChar_x - 1, gameChar_y + 2);
    }
}

function animateLegs(){
    if (frCount < 125){
        //draws one particular form of legs if less than 125 frames have
        //occured since the last change
        drawLegFrame(1);
    }
    else {
        drawLegFrame(2);
        if (frCount > 255){
            //resets the frame count both to not eventually cause an overflow
            //and also to reduce lines and maths necessary for this change
            frCount = 0;
        }
    }
}