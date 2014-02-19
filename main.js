/*
 *Swords Vs. Shadows: Paul Jordan, Tim Mahanke
 *This is a tower defense game crossed with a real time strategy game
 *
 *Copyright 2010 all rights reserved.
 */
//Ininaial Game values:
//Initial gold value
var gold = 1000;
var cash;
//Initial score
var score = 0;
var type = 0;
var state = 0;
var selectedDefender = 50;
//0-3 determines number of enemies sent on a turn
var currentnumEnemies = 0;
var currentwaveEnemies = 0;
//Arrays of enemies and defenders
var allEnemies = new Array(5);
var allDefenders = new Array(7);//Hard coded in checkCollision(), and deleteDefender()
var currentBuildnum = 0;//Pointer for allDefenders[]
var backgroundimg = new Image();
//Alert box HTML Id
var aBox;
//Castle defender object
var castleSelected = false;
var myCastle;
//Archmage vars
var hasArchMage = false;
var archMageIndex;
//Defender description
var infoCleared = true;
//Time vars
var time;
var currentTime;
var starttime;
//Are the castle upgrades purchased?
var castleUpgrade1 = false;
var castleUpgrade2 = false;

//Wave variables
//Enemy paths, start(x,y) end(x,y)
var path1 = [220,134,614,177];
var path2 = [181,191,615,257];
var path3 = [87,242,615,335];
//Path full booleans
var path1full = false;
var path2full = false;
var path3full = false;
var waveStarted = false;
var hasenemy = false;
var waveComplete = false;
var STARTX = 0;
var STARTY = 1;
var ENDX = 2;
var ENDY = 3;
var numEnemies = 10;
var waveNum = 1;
var waveLoop = 70 // 10 to start;
var rand;
var temppath;
var pathnum;
var yframe = 14;
var xframe = 81;

//Archmage attack images
var life = false;
var fire = false;
var ice = false;
var att1 = "light";
var att1framemax = 11;
var att1arr = new Array(12);
var att2 = "fire";
var att2framemax = 3;
var att2arr = new Array(4);
var att3 = "snow";
var att3framemax = 12;
var att3arr = new Array(13);

/**
 * start game function gets canvas and mouse, then starts the main
 * loop on the proper time interval
 */
function startGame()
{
	var canvas1 = document.getElementById("mainWindow");
	canvas1.onmouseup = getMouse;
	myCastle = new defender(6,0,0);
	myCastle.imgload();
	time = setInterval('mainloop()', 142);
	//imageload();
	currentTime = new Date();
	starttime=currentTime.getTime();
}

/**
 * not active function currently
 * image preloader
 */
function imageload()
{
	pauseGame();
	for(var i = 0; i <= att1framemax; i++)
    {
    	att1arr[i] = new Image();
    	att1arr[i].src ="./images/archmage/" + "magic/" + "light" + i + ".png";
    }
    for(var i = 0; i <= att2framemax; i++)
    {
    	att2arr[i] = new Image();
    	att2arr[i].src = "./images/archmage/" + "magic/" + "fire" + i + ".png";
    }
    for(var i = 0; i <= att3framemax; i++)
    {
    	att3arr[i] = new Image();
    	att3arr[i].src = "./images/archmage/" + "magic/" + "snow" + i + ".png";
    }
	att3arr[att3framemax].onload=alert("loaded");
}
/**
 * this is the main function that is called on the interval
 */
function mainloop()
{	
	logic();
	render();
	if(!waveStarted&&!path1full&&!path2full&&!path3full&&!hasenemy)
	{
		aBox = document.getElementById("alerts");
		aBox.style.display = 'block';
		var counter = Math.ceil(waveLoop / 7);
		aBox.innerHTML="Wave starts in "+ counter;
		if(waveLoop <=0&&!waveStarted)
		{
			waveStarted=true;
			waveLoop = 35;
			//  let player know next wave number
			aBox = document.getElementById("alerts");
			aBox.style.display = 'block';
			aBox.innerHTML="Wave "+waveNum;
		}
		waveLoop--;
		
	}
	if(myCastle.defLife <= 0)
	{
		clearInterval(time);
		endGame();
	}
}

//Pause Function
function pauseGame()
{
	clearInterval(time);	
}

//Resume function
function resumeGame()
{
	time = setInterval('mainloop()', 142);
}

//Init background Image
function initBackground()
{
	backgroundimg.src = "./images/bg.png";
	cxt.drawImage(backgroundimg,0,0);
}

//Logic Function
function logic()
{	
	// move all attackers and check path variable
	for(var i=0; i<=allEnemies.length;i++)
	{
		// check range between attacker and defender
		// change states to attack
		// attackers
		if(allEnemies[i]!=null&&allEnemies[i].die!=true)
		{
			var temprange = allEnemies[i].enemyRange;
			//var tempattRange;
			var attdistance;
			// attacker
			for(var j=0; j<allDefenders.length;j++)
			{
				if(allDefenders[j]!=null&&allDefenders[j].die!=true)
				{
					// if distance center to rough center is less
					// than attack range, attack.
					attdistance = Math.sqrt(Math.pow(((allEnemies[i].currentx+50)-(allDefenders[j].posX+50)), 2)
						+ Math.pow(((allEnemies[i].currenty+40)-(allDefenders[j].posY+40)), 2));
					// defender ready attack
					if(attdistance<=temprange)
					{
						allEnemies[i].hasTarget=true;
						allEnemies[i].target=allDefenders[j];
					}
				}
			}

			// if target and ok to attack
			if(allEnemies[i]!=null && allEnemies[i].hasTarget)
				{
					// set my attack now
					 allEnemies[i].attack=true;
					 allEnemies[i].walk=false;
					// allEnemies[i].framenumber=0;
					// do the actual attack
					// i'm attack ready
					if(allEnemies[i].ready)
					{
						// just attacked, no longer ready
						allEnemies[i].ready=false;
						// deduct damage from life
						if(allEnemies[i].target!=myCastle)
						{
							allEnemies[i].target.defLife = allEnemies[i].target.defLife-allEnemies[i].enemyDamage;
						}
						else
							{
								allEnemies[i].target.defLife = allEnemies[i].target.defLife-allEnemies[i].enemyDamage;
								allEnemies[i].enemyLife= allEnemies[i].enemyLife-myCastle.defDamage;
							}
					}
					//check if i killed my target
					// set my target false
					// set my walk true now
					if(allEnemies[i].target.defLife<=0)
					{
						allEnemies[i].hasTarget=false;
						allEnemies[i].walk=true;
						allEnemies[i].attack=false;
						//allEnemies[i].framenumber=0;
					}
					// if i die
					if(allEnemies[i].enemyLife<=0)
					{
						allEnemies[i].die=true;
						allEnemies[i].target.hasTarget=false;
					}
				}
		}
		// if there is an enemy ready to move, move him
		if(allEnemies[i]!=null)
		{
			if(allEnemies[i].currentx>allEnemies[i].myendx&&allEnemies[i].walk==true)
			{
				allEnemies[i].currentx -= xframe/7;
				allEnemies[i].currenty -= yframe/7;
			}
			 // reached end, so we attack castle
			else if(allEnemies[i].currentx<=allEnemies[i].myendx&&allEnemies[i].walk==true)
			{
				allEnemies[i].walk=false;
				//allEnemies[i].framenumber=0;
				allEnemies[i].attack=true;
				allEnemies[i].atEnd=true;
				allEnemies[i].hasTarget=true;
				allEnemies[i].target=myCastle;
			}
		}

		// cleanup code here, remove dead entities and add their gold to ours
		if(allEnemies[i]!=null&&allEnemies[i].dead==true)
		{
			// clear path
			//hasenemy=false;
			//killed an enemy, add its gold to ours
			gold+=allEnemies[i].gold;
			// clear the path of the dead guy
			var temppath = allEnemies[i].mypathnum;
			switch(temppath)
			{
				case 1:
					path1full=false;
					break;
				case 2:
					path2full=false;
					break;
				case 3:
					path3full=false;
					break;
			}
			//remove
			allEnemies[i] = null;
		}

		// if path clear, set flag to create new attacker on path
		if(waveStarted)
		{
			createAttacker();
		}
	}// end of attacker loop


	// defenders loop
	for(var i=0; i<=allDefenders.length;i++)
	{
		// check range between attacker and defender
		// change states to attack
		// defender
		if(allDefenders[i]!=null&&allDefenders[i].die!=true)
		{
			var tempdefrange = allDefenders[i].defRange;
			//var tempattRange;
			var defdistance;
			// attacker
			for(var j=0; j<allEnemies.length;j++)
			{
				if(allEnemies[j]!=null&&allEnemies[j].die!=true)
				{
					// if distance center to rough center is less
					// than attack range, attack.
					defdistance = Math.sqrt(Math.pow(((allDefenders[i].posX+50)-(allEnemies[j].currentx+50)), 2)
						+ Math.pow(((allDefenders[i].posY+40)-(allEnemies[j].currenty+40)), 2));
					// defender ready attack
					if(defdistance<=tempdefrange)
					{
						allDefenders[i].hasTarget=true;
						allDefenders[i].target=allEnemies[j];
					}
				}
			}

			// if target and ok to attack
			if(allDefenders[i]!=null && allDefenders[i].hasTarget)
				{
					// set my attack now
					 allDefenders[i].attack=true;
					// do the actual attack
					// defender attack ready
					if(allDefenders[i].ready)
					{
						// just attacked, no longer ready
						allDefenders[i].ready=false;
						// deduct damage from life
						allDefenders[i].target.enemyLife = allDefenders[i].target.enemyLife-allDefenders[i].defDamage;
					}
					//check if i killed him
					if(allDefenders[i].target.enemyLife<=0)
					{
						allDefenders[i].hasTarget=false;
					}
					// if i die
					if(allDefenders[i].defLife<=0)
					{
						allDefenders[i].die=true;
					}
				}
		}
		// remove dead defenders
		if(allDefenders[i]!=null && allDefenders[i].dead==true)
		{
			selectedDefender = i;
			deleteDefender();

		}
	}// end defenders loop

	// story check here.
	// if no path has an enemy and wave is off, call storyboard
	if(!path1full&&!path2full&&!path3full&&!waveStarted&&waveComplete)
		{
			showStory(waveNum);
		}
}


/**
 * will create attackers on random paths
 *
 */
function createAttacker()
{
	rand = 3*Math.random();
	rand = Math.ceil(rand);
	//create enemy, put him in array, randomized by waves
	// if path allows
	var randtype = waveNum*Math.random();
	randtype =Math.ceil(randtype);
	switch(rand)
	{
		case 1:
			temppath = path1;
			if(!path1full&&waveStarted)
			{
				hasenemy=true;
				path1full=true;
				allEnemies[currentnumEnemies] = new enemy(randtype-1,rand);
				allEnemies[currentnumEnemies].imgload();
				allEnemies[currentnumEnemies].visible=true;
				// path end point, where he will attack castle
				allEnemies[currentnumEnemies].myendx = temppath[STARTX];
				allEnemies[currentnumEnemies].myendy = temppath[STARTY];
				// where to start him
				allEnemies[currentnumEnemies].currentx = temppath[ENDX];
				allEnemies[currentnumEnemies].currenty = temppath[ENDY];
				// start walk animation
				allEnemies[currentnumEnemies].walk=true;
				currentnumEnemies++;
				currentwaveEnemies++;
			}
			break;
		case 2:
			temppath = path2;
			if(!path2full&&waveStarted)
			{
				hasenemy=true;
				path2full=true;
				allEnemies[currentnumEnemies] = new enemy(randtype-1,rand);
				allEnemies[currentnumEnemies].imgload();
				allEnemies[currentnumEnemies].visible=true;
				// path end point, where he will attack castle
				allEnemies[currentnumEnemies].myendx = temppath[STARTX];
				allEnemies[currentnumEnemies].myendy = temppath[STARTY];
				// where to start him
				allEnemies[currentnumEnemies].currentx = temppath[ENDX];
				allEnemies[currentnumEnemies].currenty = temppath[ENDY];
				// start walk animation
				allEnemies[currentnumEnemies].walk=true;
				currentnumEnemies++;
				currentwaveEnemies++;
			}
			break;
		case 3:
			temppath = path3;
			if(!path3full&&waveStarted&&randtype!=4&&randtype!=5)
			{
				hasenemy=true;
				path3full=true;
				allEnemies[currentnumEnemies] = new enemy(randtype-1,rand);
				allEnemies[currentnumEnemies].imgload();
				allEnemies[currentnumEnemies].visible=true;
				// path end point, where he will attack castle
				allEnemies[currentnumEnemies].myendx = temppath[STARTX];
				allEnemies[currentnumEnemies].myendy = temppath[STARTY];
				// where to start him
				allEnemies[currentnumEnemies].currentx = temppath[ENDX];
				allEnemies[currentnumEnemies].currenty = temppath[ENDY];
				// start walk animation
				allEnemies[currentnumEnemies].walk=true;
				currentnumEnemies++;
				currentwaveEnemies++;
			}
			break;
	}
		// main keylock var. this needs set to false after storyline read
		

		// have we reached the end of the wave?
		if(currentwaveEnemies>numEnemies)
		{
			// turn off the wave
			waveStarted=false;
			waveComplete=true;
			// tell player it's almost over'
			aBox = document.getElementById("alerts");
			aBox.style.display = 'block';
			aBox.innerHTML="Last one!!";
			// reset wave count
			currentwaveEnemies=0;
			currentnumEnemies=0;
			// next wave
			waveNum++;
			// modify amount of enemies for next wave
			// just doubling atm
			numEnemies*=2;
		}
}


//7 Frames per second currently.
function render()
{
	// clear the screen
	cxt.clearRect(0,0,640,480);
	// draw background
	cxt.drawImage(backgroundimg,0,0);
	// render spell effects last so they are on top
	// if we have a mage and he is attacking
	if(hasArchMage)
	{
		var temparch = allDefenders[archMageIndex];
		if(life&&!fire&&!ice)
		{
			// set current image to next in array
			// if outside of range, reset
			if(temparch.spellframenumber>temparch.att1framemax)
				allDefenders[archMageIndex].spellframenumber=0;
			// draw the image now
			cxt.drawImage(temparch.att1arr[temparch.spellframenumber],0,0);
			temparch.spellframenumber++;
			// if we are passed max frame number, reset
			// turn off attack animation
			// and reload base img
			if(allDefenders[archMageIndex].spellframenumber>allDefenders[archMageIndex].att1framemax)
			{
				allDefenders[archMageIndex].spellframenumber=0;
				life = false;
			}
		}// end life
		if(fire &&!life&&!ice)
		{
			//alert("frame number "+ temparch.spellframenumber);
			// set current image to next in array
			if(temparch.spellframenumber>temparch.att2framemax)
				temparch.spellframenumber=0;
			cxt.drawImage(temparch.att2arr[temparch.spellframenumber],0,0);
			temparch.spellframenumber++;
			// if we are passed max frame number, reset
			// turn off attack animation
			// and reload base img
			if(temparch.spellframenumber>temparch.att2framemax)
			{
				temparch.spellframenumber=0;
				fire = false;
			}
		}// end fire
		if(ice &&!life&&!fire)
		{
			if(allDefenders[archMageIndex].spellframenumber>allDefenders[archMageIndex].att3framemax)
				allDefenders[archMageIndex].spellframenumber=0;
			cxt.drawImage(allDefenders[archMageIndex].att3arr[allDefenders[archMageIndex].spellframenumber],0,0);
			allDefenders[archMageIndex].spellframenumber++;
			// if we are passed max frame number, reset
			// turn off attack animation
			// and reload base img
			if(allDefenders[archMageIndex].spellframenumber>allDefenders[archMageIndex].att3framemax)
			{
				allDefenders[archMageIndex].spellframenumber=0;
				ice = false;
			}
		}// end ice
	}// end spell effects
	// draw castle
	if(myCastle!=null)
	{
		switch(myCastle.upgrade)
		{
			case 0:
				myCastle.defImg.src=myCastle.attanims[myCastle.upgrade].src;
				cxt.drawImage(myCastle.defImg,
						myCastle.posX,
						myCastle.posY);
				break;
			case 1:
				myCastle.defImg.src=myCastle.attanims[myCastle.upgrade].src;
				cxt.drawImage(myCastle.defImg,
						myCastle.posX,
						myCastle.posY);
				break;
			case 2:
				myCastle.defImg.src=myCastle.attanims[myCastle.upgrade].src;
				cxt.drawImage(myCastle.defImg,
						myCastle.posX,
						myCastle.posY);
				break;
			case 3:
				myCastle.defImg.src=myCastle.attanims[myCastle.upgrade].src;
				cxt.drawImage(myCastle.defImg,
						myCastle.posX,
						myCastle.posY);
				break;
		}

		// draw castle damage
		if(myCastle.defLife < (myCastle.defMaxLife * .75)&&myCastle.defLife>=(myCastle.defMaxLife * .5))
		{
			
			cxt.drawImage(myCastle.firelvl1arr[myCastle.firelvl],
						myCastle.posX,
						myCastle.posY);
			myCastle.firelvl++;
			if(myCastle.firelvl>2)
				{
					myCastle.firelvl=0
				}
		}
		else if(myCastle.defLife < (myCastle.defMaxLife * .5)&& myCastle.defLife>=(myCastle.defMaxLife * .25))
		{
			//animate lvl 2 fire
			cxt.drawImage(myCastle.firelvl2arr[myCastle.firelvl],
						myCastle.posX,
						myCastle.posY);
			myCastle.firelvl++;
			if(myCastle.firelvl>2)
				{
					myCastle.firelvl=0
				}
		}
		else if(myCastle.defLife < (myCastle.defMaxLife * .25))
		{
			//animate lvl 3 fire
			cxt.drawImage(myCastle.firelvl3arr[myCastle.firelvl],
						myCastle.posX,
						myCastle.posY);
			myCastle.firelvl++;
			if(myCastle.firelvl>2)
				{
					myCastle.firelvl=0
				}
		}
	}
	// draw main life
	updateLife();
	// cash
	cash = document.getElementById('gold');
	cash.innerHTML = gold;
	//Draw defenders
	for(var i = 0; i < allDefenders.length; i++)
	{
		 //Render Castle and Archmage
		 
		 
		 /**
		 * this will be called in a for loop going thru an array. to delete at end
		 * of death, remove it from the array before next iteration
		 *  if object exists, attack flag is set and death flag isnt, to avoid
		 *  calling death in middle of attack animations
		 */
		if(allDefenders[i]!=null && allDefenders[i].attack==true)
		{
			// set current image to next in array
			allDefenders[i].defImg.src = allDefenders[i].attanims[allDefenders[i].framenumber].src;
			allDefenders[i].framenumber++;
			// if we are passed max frame number, reset
			// turn off attack animation
			// and reload base img
			if(allDefenders[i].framenumber>allDefenders[i].attframemax)
			{
				allDefenders[i].framenumber=0;
				allDefenders[i].attack=false;
				allDefenders[i].ready=true;
				allDefenders[i].defImg.src = allDefenders[i].attanims[allDefenders[i].framenumber].src;
			}
		}
		 /**
		 * if object isn't null, death flag is set and attack flag is off, to avoid
		 * die animation in middle of attack animation and causing confusion
		 */
		if(allDefenders[i]!=null&&allDefenders[i].die==true&&allDefenders[i].attack==false)
		{
			// set current image to first object in array
			allDefenders[i].defImg.src = allDefenders[i].deathanims[allDefenders[i].framenumber].src;
			allDefenders[i].framenumber++;
			// if we are passed max frame number, reset
			// turn off attack animation
			// and reload base img
			if(allDefenders[i].framenumber>allDefenders[i].dieframemax)
				{
					allDefenders[i].framenumber=0;
					allDefenders[i].dead=true;
				}
		}

		// draw them now
		if(allDefenders[i] != null && allDefenders[i].visible)
		{
			if(allDefenders[i].defType == 5)
			{
				cxt.drawImage(allDefenders[i].defImg,
					allDefenders[i].posX,
					allDefenders[i].posY,76,61);
			}
			else if(allDefenders[i].posY > 0 && allDefenders[i].posY <= 185)
			{
				cxt.drawImage(allDefenders[i].defImg,
					allDefenders[i].posX,
					allDefenders[i].posY,90,72);
			}
			else if(allDefenders[i].posY > 185 && allDefenders[i].posY <= 281)
			{
				cxt.drawImage(allDefenders[i].defImg,
					allDefenders[i].posX,
					allDefenders[i].posY,100,80);
			}
			else //if(allDefenders[i].posY > 300 && allDefenders[i].posY <= 480)
			{
				cxt.drawImage(allDefenders[i].defImg,
					allDefenders[i].posX,
					allDefenders[i].posY,110,88);
			}
		}
	}
	//Draw current defender health
	if(allDefenders[selectedDefender] != null)
	{
		if(!infoCleared)
		{
			var health = allDefenders[selectedDefender].defLife;
			var maxUnitLife = allDefenders[selectedDefender].defMaxLife;
			health = (health*80)/maxUnitLife;
			cxt.fillStyle="#660000";
			cxt.fillRect(43,344,80,5);
			cxt.fillStyle="#AA0000";
			cxt.fillRect(43,344,health,5);
			/* If the images ever get fixed, this will draw the attack radius for the selected
			defender.
			cxt.fillStyle="#ffffff";
			drawEllipse(cxt, allDefenders[selectedDefender].posX - 10,
				allDefenders[selectedDefender].posY + 35,
				(allDefenders[selectedDefender].defRange * 2),
				allDefenders[selectedDefender].defRange);*/
		}
		else
		{
			var health = myCastle.defLife;
			var maxUnitLife = myCastle.defMaxLife;
			health = (health*80)/maxUnitLife;
			cxt.fillStyle="#660000";
			cxt.fillRect(43,344,80,5);
			cxt.fillStyle="#AA0000";
			cxt.fillRect(43,344,health,5);
		}
	}

	// render attackers
	for(var j = 0; j < allEnemies.length; j++)
	{
		if(allEnemies[j]!=null && allEnemies[j].walk==true)
		{
			// set current image to next in array
			allEnemies[j].attImg.src = allEnemies[j].walkanims[allEnemies[j].framenumber].src;
			allEnemies[j].framenumber++;
			// if we are passed max frame number, reset
			// turn off attack animation
			// and reload base img
			if(allEnemies[j].framenumber>allEnemies[j].walkframemax)
			{
				allEnemies[j].framenumber=0;
				allEnemies[j].attImg.src = allEnemies[j].walkanims[allEnemies[j].framenumber].src;
			}
		}
		if(allEnemies[j]!=null && allEnemies[j].attack==true&&allEnemies[j].walk==false)
		{
			if(allEnemies[j].framenumber>allEnemies[j].attframemax)
				allEnemies[j].framenumber=0;
			// set current image to next in array
			allEnemies[j].attImg.src = allEnemies[j].attanims[allEnemies[j].framenumber].src;
			allEnemies[j].framenumber++;
			// if we are passed max frame number, reset
			// turn off attack animation
			// and reload base img
			if(allEnemies[j].framenumber>allEnemies[j].attframemax)
			{
				allEnemies[j].framenumber=0;
				allEnemies[j].ready=true;
				allEnemies[j].attack=false;
				allEnemies[j].attImg.src = allEnemies[j].attanims[allEnemies[j].framenumber].src;
			}
		}
		// let all loops finish then kill him
		if(allEnemies[j]!=null && allEnemies[j].die==true&& allEnemies[j].attack==false&& allEnemies[j].walk==false)
		{
			if(allEnemies[j].framenumber>allEnemies[j].dieframemax)
				allEnemies[j].framenumber=0;
			// set current image to next in array
			allEnemies[j].attImg.src = allEnemies[j].deathanims[allEnemies[j].framenumber].src;
			allEnemies[j].framenumber++;
			// if we are passed max frame number, reset
			// turn off attack animation
			// and reload base img
			if(allEnemies[j].framenumber>allEnemies[j].dieframemax)
			{
				allEnemies[j].framenumber=0;
				allEnemies[j].dead=true;
				//allEnemies[j].attImg.src = allEnemies[j].deathanims[allEnemies[j].framenumber].src;
			}
		}
		if(allEnemies[j] != null && allEnemies[j].visible)
		{
			if(allEnemies[j].currenty > 0 && allEnemies[j].currenty <= 185)
			{
				if(allEnemies[j].enemyType==3||allEnemies[j].enemyType==4)
				{
					cxt.drawImage(allEnemies[j].attImg,
					allEnemies[j].currentx,
					allEnemies[j].currenty,180,144);
				}
				else
				{
				cxt.drawImage(allEnemies[j].attImg,
					allEnemies[j].currentx,
					allEnemies[j].currenty,90,72);
				}
			}
			else if(allEnemies[j].currenty > 185 && allEnemies[j].currenty <= 281)
			{
				if(allEnemies[j].enemyType==3||allEnemies[j].enemyType==4)
				{
					cxt.drawImage(allEnemies[j].attImg,
					allEnemies[j].currentx,
					allEnemies[j].currenty,200,160);
				}
				else
				{
					cxt.drawImage(allEnemies[j].attImg,
					allEnemies[j].currentx,
					allEnemies[j].currenty,100,80);
				}
			}
			else //if(allEnemies[j].posY > 300 && allEnemies[j].posY <= 480)
			{
				if(allEnemies[j].enemyType==3||allEnemies[j].enemyType==4)
				{
					cxt.drawImage(allEnemies[j].attImg,
					allEnemies[j].currentx,
					allEnemies[j].currenty,220,176);
				}
				else
				{
				cxt.drawImage(allEnemies[j].attImg,
					allEnemies[j].currentx,
					allEnemies[j].currenty,110,88);
				}
			}
		}
	}// end of attackers loop
}


//Pause game and show portions of the story between waves.
function showStory(waveNum)
{
	pauseGame();
	//trip the keylock
	hasenemy=false;
	waveComplete=false;
	tempwaveNum=waveNum+1;
	if((tempwaveNum % 2) == 0)
	{
		aBox = document.getElementById("story"+tempwaveNum);
		aBox.style.display = 'block';
	}
	else
	{
		resumeGame();
	}

}

//After the castle has been destroyed, inform the user of his score
function endGame()
{
	//Tell user his score
	var end = new Date();
	var endtime = end.getTime();
	score = endtime-starttime;
	// add half your gold
	score += (gold*.5);
	score += (score*(1/waveNum));
	score = Math.ceil(score);
	score -= 51933;
	var gBox = document.getElementById("gameover");
	var sBox = document.getElementById("score");
		gBox.style.display = 'block';
		sBox.innerHTML="Your score is: "+ score;
}

//Get the coordinates of the mouse click
function getMouse(e)
{
	aBox = document.getElementById("alerts");
	aBox.style.display = 'none';
	var tempX = e.layerX;
	var tempY = e.layerY;
	cxt.moveTo(tempX,tempY);	
	clickHandle(tempX, tempY);
}

//Takes the x,y value from getMouse() and determines if it's a valid click
function clickHandle(x, y)
{
	
	//Arch Mage
	if(((x > 64 && x <= 140) && (y > 2 && y <= 64)) && hasArchMage)
	{
		displayInfo(archMageIndex);
		selectedDefender = archMageIndex;
	}
	//Column 1 
	if((x >= 72 && x <= 90) && (y >= 252 && y <= 295))
	{
		clickColumn(x, y)
	}
	//Column 2
	else if((x > 90 && x <= 108) && (y > 234 && y <= 304))
	{
		clickColumn(x, y)
	}
	//Column 3
	else if((x > 108 && x <= 126) && (y > 226 && y <= 295))
	{
		clickColumn(x, y)
	}
	//Column 4
	else if((x > 126 && x <= 144) && (y > 216 && y <= 306))
	{
		clickColumn(x, y)
	}
	//Column 5
	else if((x > 144 && x <= 162) && (y > 198 && y <= 311))
	{
		clickColumn(x, y)
	}
	//Column 6
	else if((x > 162 && x <= 180) && (y > 198 && y <= 315))
	{
		clickColumn(x, y)
	}
	//Column 7
	else if((x > 180 && x <= 198) && (y > 192 && y <= 360))
	{
		clickColumn(x, y)
	}
	//Column 8
	else if((x > 198 && x <= 216) && (y > 180 && y <= 366))
	{
		clickColumn(x, y)
	}
	//Column 9
	else if((x > 216 && x <= 234) && (y > 144 && y <= 366))
	{
		clickColumn(x, y)
	}
	//Column 10
	else if((x > 234 && x <= 252) && (y > 126 && y <= 360))
	{
		clickColumn(x, y)
	}
	//Column 11
	else if((x > 252 && x <= 360) && (y > 108 && y <= 360))	
	{
		clickColumn(x, y)
	}
	//Column 12
	else if((x > 360 && x <= 476) && (y > 108 && y <= 414))	
	{
		clickColumn(x, y)
	}
	else if(state == 2)//User clicked where a defender can not be placed.
	{
		var aBox = document.getElementById("alerts");
		aBox.style.display = 'block';
		aBox.innerHTML="You can't place a defender here!";
	}
}

//clickHandle helper
function clickColumn(x, y)
{
	if(state == 0)//Select mode
	{
		if(checkCollision(x,y))
		{
			displayInfo(selectedDefender);
		}
		else
		{
			aBox = document.getElementById("alerts");
			aBox.style.display = 'block';
			aBox.innerHTML="";
			clearInfo();
		}
	}
	else//Build Node
	{
		if(!checkCollision(x,y) && !castleSelected)
		{
			if(currentBuildnum < allDefenders.length)
			{
				var tempDef = new defender(type, x, y);
				// if we can afford it
				if(gold-tempDef.cost>=0)
				{
					allDefenders[currentBuildnum] = new defender(type, x, y );
					allDefenders[currentBuildnum].imgload();
					allDefenders[currentBuildnum].visible = true;
					gold-=allDefenders[currentBuildnum].cost;
					currentBuildnum++;
					state = 0;
				}
				else
					{
						aBox = document.getElementById("alerts");
						aBox.style.display = 'block';
						aBox.innerHTML="You cannot afford this defender....";
						state = 0;
					}
			}
			else
			{
				aBox = document.getElementById("alerts");
				aBox.style.display = 'block';
				aBox.innerHTML="You have too many defenders!";
				state = 0;
			}
		}
		else
		{
			aBox = document.getElementById("alerts");
			aBox.style.display = 'block';
			aBox.innerHTML="You can't place a defender here!";
		}
	}
}

//Build archmage
function buildArchMage()
{
	if(!hasArchMage && currentBuildnum < allDefenders.length)
	{
		state = 1;
		var tempDef = new defender(5,0,0);
		if(gold - tempDef.cost >= 0)
		{
			archMageIndex = currentBuildnum;
			hasArchMage = true;
			allDefenders[currentBuildnum] = new defender(5, 0, 0);
			allDefenders[currentBuildnum].imgload();
			allDefenders[currentBuildnum].visible = true;
			gold-=allDefenders[currentBuildnum].cost;
			currentBuildnum++;
			state = 0;
		}
		else
		{
			aBox = document.getElementById("alerts");
			aBox.style.display = 'block';
			aBox.innerHTML="You cannot afford this defender....";
			state = 0;
		}
	}
	else
	{
		aBox = document.getElementById("alerts");
		aBox.style.display = 'block';
		aBox.innerHTML="You can't do that!";
	}
}

//Checks for collisions for selection, and deletion.
function checkCollision(x, y)
{
	/*
	 *Check for a collision. Returns True if there is a collision.
	 */
	var collision = false;
	for(var i = 0; i < allDefenders.length; i++)
	{
		if(allDefenders[i] != null)
		{
			// check collision
			if(state == 0 || state == 1)//Only worry about the single pixel the mouse is over
			{
				if((x >= allDefenders[i].posX && 
					x <= (allDefenders[i].posX + allDefenders[i].width)) &&
					(y >= allDefenders[i].posY &&
					y <= (allDefenders[i].posY + allDefenders[i].height)))
				{
					collision = true;
					selectedDefender = i;
					return collision;
				}
			}
			else//figure in the new object
			{
				var tempDef = new defender(type, x, y);
				//Key Error point!!
				if((((x > (allDefenders[i].posX - tempDef.width)))&& 
					((x < (allDefenders[i].posX + allDefenders[i].width))))&&
					(((y > (allDefenders[i].posY - tempDef.height)))&&
					((y < (allDefenders[i].posY + allDefenders[i].height)))))
				{
					collision = true;
					selectedDefender = i;
					return collision;
				}
			}
		}
	}
	return collision;
}

//Function will set the build type, 1 = Type 1, 2 = Type 2, etc...
function setType(x)
{
	type = x;
}

//Function will set the state variable, 0 = select, 2 = build.
function setState(x)
{
	state = x;
}

//Function will remove the slected defender from the defenders array.
function deleteDefender()
{
	for(var i = selectedDefender; i < (allDefenders.length - 1); i++)
	{
		//Maintains archMage pointer
		if(allDefenders[i].defType == 5 && i > 0)
		{
			archMageIndex--;
		}
		allDefenders[i] = allDefenders[i+1];
	}
	allDefenders[(allDefenders.length - 1)] = null;
	currentBuildnum--;
	clearInfo();
}

//Function will display the information for the selected defender in the HTML.
function displayInfo(x)
{
	var tempDef = allDefenders[x];
	var name = document.getElementById('unit_name');
	name.innerHTML = tempDef.name;
	var desc = document.getElementById('unit_description');
	desc.innerHTML = tempDef.description;
	var power = document.getElementById('unit_power');
	power.innerHTML = 'Power: ' + tempDef.defDamage;
	var range = document.getElementById('unit_range');
	range.innerHTML = 'Range: ' + tempDef.defRange;
	infoCleared = false;
	var act1 = document.getElementById('a_img0');
	act1.src = tempDef.upgrade0imgsrc;
	var act2 = document.getElementById('a_img1');
	act2.src = tempDef.upgrade1imgsrc;
	var act3 = document.getElementById('a_img2');
	act3.src = tempDef.upgrade2imgsrc;
	var act4 = document.getElementById('a_img3');
	act4.src = tempDef.upgrade3imgsrc;
}

//http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas
//Draws an ellipse for the attack range if the images ever get fixed.
function drawEllipse(ctx, x, y, w, h)
{
	var kpa = .5522848;
	var ox = (w / 2) * kpa;
	var oy = (h / 2) * kpa;
	var xe = x + w;
	var ye = y + h;
	var xm = x + w / 2;
	var ym = y + h / 2;
	
	ctx.beginPath();
	ctx.moveTo(x,ym);
	ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
	ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
	ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
	ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
	ctx.closePath();
	ctx.stroke();
}

//On mouse over of the buildable characters, this will display the attributes
function mouseOverDesc(x)
{
	tempDef = new defender((x - 1), 0, 0);
	var name = document.getElementById('unit_name');
	name.innerHTML = tempDef.name;
	var desc = document.getElementById('unit_description');
	desc.innerHTML = tempDef.description;
	var power = document.getElementById('unit_power');
	power.innerHTML = 'Power: ' + tempDef.defDamage;
	var range = document.getElementById('unit_range');
	range.innerHTML = 'Range: ' + tempDef.defRange;
}

//Restores the description of the last selected defender
function restoreDesc()
{
	if(!infoCleared)
	{
		displayInfo(selectedDefender);
	}
	else
	{
		clearInfo();
	}
}

//Function will clear the information for the selected defender in the HTML.
function clearInfo()
{
	var name = document.getElementById('unit_name');
	name.innerHTML = myCastle.name;
	var desc = document.getElementById('unit_description');
	desc.innerHTML = myCastle.description;
	var power = document.getElementById('unit_power');
	power.innerHTML = 'Power: ' + myCastle.defDamage;
	var range = document.getElementById('unit_range');
	range.innerHTML = 'Range: ' + myCastle.defRange;;
	infoCleared = true;//Castle Selected
	var act1 = document.getElementById('a_img0');
	act1.src = myCastle.upgrade0imgsrc;
	var act2 = document.getElementById('a_img1');
	act2.src = myCastle.upgrade1imgsrc;
	var act3 = document.getElementById('a_img2');
	act3.src = myCastle.upgrade2imgsrc;
	var act4 = document.getElementById('a_img3');
	act4.src = myCastle.upgrade3imgsrc;
}

//Update main life bar
function updateLife()
{
	var health = myCastle.defLife;
	health = (health*110)/myCastle.defMaxLife;
	cxt.fillStyle="#660000";
	cxt.fillRect(362,440,110,13);
	cxt.fillStyle="#AA0000";
	cxt.fillRect(362,440,health,13);	
}

//Display action description
function displayActDesc(type)
{
	//Depending on the object selected, display the available upgrades.		
	if(allDefenders[selectedDefender] != null && !infoCleared)
	{
		var action_desc = document.getElementById('action_desc');
		action_desc.innerHTML = allDefenders[selectedDefender].getUpgrade(type);
	}
	else
	{
		var action_desc = document.getElementById('action_desc');
		action_desc.innerHTML = myCastle.getUpgrade(type);
	}
}

//Upgrades for the selected defender/castle
function upgradeDef(type)
{
	//Generic Defender
	if(allDefenders[selectedDefender] != null && !infoCleared && allDefenders[selectedDefender].defType != 5)
	{
		if(type == 0 && allDefenders[selectedDefender].defType < 5)
		{
			deleteDefender();
		}
		else if(type > 0 && allDefenders[selectedDefender].defType < 5)
		{
			gold = allDefenders[selectedDefender].defUpgrade(type,gold);
			displayInfo(selectedDefender);
		}
	}
	//Arch Mage
	else if(allDefenders[selectedDefender] != null && !infoCleared)
	{
		if(type == 0)
		{
			if(gold < 1000)
			{
				aBox = document.getElementById("alerts");
				aBox.style.display = 'block';
				aBox.innerHTML="You can't afford this!";
			}
			else
			{
				//Heal all defenders
				for(var i = 0; i < allDefenders.length; i++)
				{
					if(allDefenders[i] != null)
						allDefenders[i].defLife = allDefenders[i].defMaxLife;
				}
				//Play att1 animation for arch mage
				allDefenders[archMageIndex].attack = true;
				life=true;
				gold -= 1000;
			}
		}
		else if(type == 1)
		{
			//Attack 1
			if(gold < 100)
			{
				aBox = document.getElementById("alerts");
				aBox.style.display = 'block';
				aBox.innerHTML="You can't afford this!";
			}
			else
			{
				for(var i = 0; i < allEnemies.length; i++)
				{
					if(allEnemies[i] != null)
						allEnemies[i].enemyLife -= 200;
				}
				allDefenders[archMageIndex].attack = true;
				fire=true;
				gold -= 100;
			}
		}
		else if(type == 2)
		{
			//Attack 2
			if(gold < 100)
			{
				aBox = document.getElementById("alerts");
				aBox.style.display = 'block';
				aBox.innerHTML="You can't afford this!";
			}
			else
			{
				for(var i = 0; i < allEnemies.length; i++)
				{
					if(allEnemies[i] != null)
						allEnemies[i].enemyLife -= 200;
				}
				allDefenders[archMageIndex].attack = true;
				ice=true;
				gold -= 100;
			}
		}		
	}
	//Castle
	else
	{
		// heal castle
		if(type == 0 )
		{
			if(gold < 1000)
			{
				aBox = document.getElementById("alerts");
				aBox.style.display = 'block';
				aBox.innerHTML="You can't afford this!";
			}
			else
			{
				//Heal castle
				myCastle.defLife = myCastle.defMaxLife;
				gold -= 1000;
			}
		}
		// spikes
		else if(type == 1)
		{
			if(!castleUpgrade1 && gold >= 500 && !castleUpgrade2)
			{
				myCastle.upgrade = 1;
				gold -= 500;
				castleUpgrade1 = true;
			}
			else if(!castleUpgrade1 && gold >= 500 && castleUpgrade2)
			{
				myCastle.upgrade = 3;
				myCastle.defDamage+=25;
				gold -= 500;
				castleUpgrade1 = true;
			}
			else
			{
				aBox = document.getElementById("alerts");
				aBox.style.display = 'block';
				aBox.innerHTML="You can't build this!";
			}
		}
		// archer towers
		else if(type == 2)
		{
			if(!castleUpgrade2 && gold >= 500 && !castleUpgrade1)
			{
				myCastle.upgrade = 2;
				myCastle.defDamage+=50;
				gold -= 500;
				castleUpgrade2 = true;
			}
			else if(!castleUpgrade2 && gold >= 500 && castleUpgrade1)
			{
				myCastle.upgrade = 3;
				myCastle.defDamage+=50;
				gold -= 500;
				castleUpgrade2 = true;
			}
			else
			{
				aBox = document.getElementById("alerts");
				aBox.style.display = 'block';
				aBox.innerHTML="You can't build this!";
			}
		}
	}
}

//Action functions called from the HTML.
function action1()
{	
	upgradeDef(0);
}

function action2()
{
	upgradeDef(1);
}

function action3()
{
	upgradeDef(2);
}

function action4()
{
	upgradeDef(3);
}
