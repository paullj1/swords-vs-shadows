/*
 *Objects
 */
function defender(type, tmpposX, tmpposY)
{
	this.defType = type;
	this.posX = tmpposX;
	this.posY = tmpposY;
	this.defUpgrade = defUpgrade;
	this.getUpgrade = getUpgrade;
	this.visible = false;
	this.attack = false;
	this.walk = false;
	this.die = false;
	this.dead = false;
	this.ready = false;
	this.framenumber=0;
    this.imgload = loadimg;
	this.hasTarget=false;
	this.target;
	if(type == 0)//Pikeman
	{
		//Image processing...		
		this.attframemax=8;
		this.dieframemax=3;
		this.attanims = new Array(9);
		this.deathanims = new Array(4);
		this.path = "./images/pikeman/";
		this.attname = "PikemanAttack";
		this.deathname = "PikemanDeath";
		this.defImg = new Image();
		this.defImg.src = "./images/pikeman/PikemanAttack0.png";
		this.width = 40;
		this.height = 60;
		this.posX -= 35;
		this.posY -= 65;
		//Attributes processing...
		this.defLife = 200;
		this.defMaxLife = 200;
		this.defDamage = 80;
		this.defRange = 60;
		this.defSpeed = 20;//Attack speed, 2 seconds between attacks = 20.
		this.defSpeedMax = 20;
		this.name = "Pikeman";
		this.description = "High range and speed, but lower defense and damage than the Crusader";
		this.upgrade0 = "Delete this defender";
		this.upgrade0imgsrc = "./images/icon/upgradeicons/delete.png";
		this.upgrade1 = "+50 Armor: $10";
		this.upgrade1imgsrc = "./images/icon/upgradeicons/lifeupgrade.png";
		this.upgrade1cost = 10;
		this.upgraded1 = false;
		this.upgrade2 = "+20 Damage: $10";
		this.upgrade2imgsrc = "./images/icon/upgradeicons/defupgrademeele.png";
		this.upgrade2cost = 10;
		this.upgraded2 = false;
		this.upgrade3 = "+10 Range: $10";
		this.upgrade3imgsrc = "./images/icon/upgradeicons/attupgrademeele.png";
		this.upgrade3cost = 10;
		this.upgraded3 = false;
		this.cost = 100;
	}
	else if(type == 1)// Marksman
	{
		//Image processing...		
		this.attframemax=6;
		this.dieframemax=1;
		this.attanims = new Array(7);
		this.deathanims = new Array(2);
		this.path = "./images/marksman/";
		this.attname = "MarksmanAttack";
		this.deathname = "MarksmanDeath";
		this.defImg = new Image();
		this.defImg.src = "./images/marksman/MarksmanAttack0.png";
		this.width = 60;
		this.height = 70;
		this.posX -=50;
		this.posY -=56;
		//Attributes processing...
		this.defLife = 150;
		this.defMaxLife = 150;
		this.defDamage = 60;
		this.defRange = 150;
		this.defSpeed = 20;
		this.defSpeedMax = 20;
		this.name = "Marksman";
		this.description = "High damage and range, but low defense and speed.";
		this.upgrade0 = "Delete this defender";
		this.upgrade0imgsrc = "./images/icon/upgradeicons/delete.png";
		this.upgrade1 = "+50 Armor: $10";
		this.upgrade1imgsrc = "./images/icon/upgradeicons/lifeupgrade.png";
		this.upgrade1cost = 10;
		this.upgraded1 = false;
		this.upgrade2 = "+20 Damage: $10";
		this.upgrade2imgsrc = "./images/icon/upgradeicons/defupgrademarksman.png";
		this.upgrade2cost = 10;
		this.upgraded2 = false;
		this.upgrade3 = "+10 Range: $10";
		this.upgrade3imgsrc = "./images/icon/upgradeicons/attupgrademarksman.png";
		this.upgrade3cost = 10;
		this.upgraded3 = false;
		this.cost = 100;
	}
	else if(type == 2)// Crusader
	{
		//Image processing...		
		this.attframemax=7;
		this.dieframemax=1;
		this.attanims = new Array(8);
		this.deathanims = new Array(2);
		this.path = "./images/crusader/";
		this.attname = "CrusaderAttack";
		this.deathname = "CrusaderDeath";
		this.defImg = new Image();
		this.defImg.src = "./images/crusader/CrusaderAttack0.png";
		this.width = 60;
		this.height = 70;
		this.posX -= 70;
		this.posY -= 69;
		//Attributes processing...
		this.defLife = 300;
		this.defMaxLife = 300;
		this.defDamage = 150;
		this.defRange = 60;
		this.defSpeed = 20;
		this.defSpeedMax = 20;
		this.name = "Crusader";
		this.description = "High defense and damage, but low range and speed";
		this.upgrade0 = "Delete this defender";
		this.upgrade0imgsrc = "./images/icon/upgradeicons/delete.png";
		this.upgrade1 = "+50 Armor: $10";
		this.upgrade1imgsrc = "./images/icon/upgradeicons/lifeupgrade.png";
		this.upgrade1cost = 10;
		this.upgraded1 = false;
		this.upgrade2 = "+20 Damage: $10";
		this.upgrade2imgsrc = "./images/icon/upgradeicons/attupgrademeele.png";
		this.upgrade2cost = 10;
		this.upgraded2 = false;
		this.upgrade3 = "+10 Range: $10";
		this.upgrade3imgsrc = "./images/icon/upgradeicons/defupgrademeele.png";
		this.upgrade3cost = 10;
		this.upgraded3 = false;
		this.cost = 300;
	}
	else if(type == 3)// Archer
	{
		//Image processing...		
		this.attframemax=5;
		this.dieframemax=2;
		this.attanims = new Array(6);
		this.deathanims = new Array(3);
		this.path = "./images/archer/";
		this.attname = "ArcherAttack";
		this.deathname = "ArcherDeath";
		this.defImg = new Image();
		this.defImg.src = "./images/archer/ArcherAttack0.png";
		this.width = 30;
		this.height = 60;
		this.posX -= 70;
		this.posY -= 70;
		//Attributes processing...
		this.defLife = 200;
		this.defMaxLife = 200;
		this.defDamage = 100;
		this.defRange = 175;
		this.defSpeed = 20;
		this.defSpeedMax = 20;
		this.name = "Archer";
		this.description = "Long range and high speed, but less damage and defense";
		this.upgrade0 = "Delete this defender";
		this.upgrade0imgsrc = "./images/icon/upgradeicons/delete.png";
		this.upgrade1 = "+50 Armor: $10";
		this.upgrade1imgsrc = "./images/icon/upgradeicons/lifeupgrade.png";
		this.upgrade1cost = 10;
		this.upgraded1 = false;
		this.upgrade2 = "+20 Damage: $10";
		this.upgrade2imgsrc = "./images/icon/upgradeicons/attupgradearcher.png";
		this.upgrade2cost = 10;
		this.upgraded2 = false;
		this.upgrade3 = "+10 Range: $10";
		this.upgrade3imgsrc = "./images/icon/upgradeicons/defupgradearcher.png";
		this.upgrade3cost = 10;
		this.upgraded3 = false;
		this.cost = 300;
	}
	else if(type == 4)// Priest
	{
		//Image processing...		
		this.attframemax=7;
		this.dieframemax=2;
		this.attanims = new Array(8);
		this.deathanims = new Array(3);
		this.path = "./images/priest/";
		this.attname = "PriestAttack";
		this.deathname = "PriestDeath";
		this.defImg = new Image();
		this.defImg.src = "./images/priest/PriestAttack0.png";
		this.width = 40;
		this.height = 70;
		this.posX -= 28;
		this.posY -= 76;
		//Attributes processing...
		this.defLife = 200;
		this.defMaxLife = 200;
		this.defDamage = 120;
		this.defRange = 200;
		this.defSpeed = 20;
		this.defSpeedMax = 20;
		this.name = "Priest";
		this.description = "Uses magic, heavy damage and range, but lower defense and speed.";
		this.upgrade0 = "Delete this defender";
		this.upgrade0imgsrc = "./images/icon/upgradeicons/delete.png";
		this.upgrade1 = "+50 Armor: $10";
		this.upgrade1imgsrc = "./images/icon/upgradeicons/lifeupgrade.png";
		this.upgrade1cost = 10;
		this.upgraded1 = false;
		this.upgrade2 = "+20 Damage: $10";
		this.upgrade2imgsrc = "./images/icon/upgradeicons/attupgradepriest.png";
		this.upgrade2cost = 10;
		this.upgraded2 = false;
		this.upgrade3 = "+10 Range: $10";
		this.upgrade3imgsrc = "./images/icon/upgradeicons/defupgradepriest.png";
		this.upgrade3cost = 10;
		this.upgraded3 = false;
		this.cost = 400;
	}
	else if(type == 5) //Arch mage
	{
		//Image processing...		
		this.attframemax=9;
		this.dieframemax=0;
		this.spellframenumber=0;
		this.attanims = new Array(10);
		this.deathanims = new Array(1);
		this.path = "./images/archmage/";
		this.attname = "ArchmageAttack";
		this.deathname = "ArchmageDeath";
		this.defImg = new Image();
		this.defImg.src = "./images/archmage/ArchmageAttack0.png";
		this.spellImg = new Image();
		this.width = 60;
		this.height = 70;
		this.posX = 64;
		this.posY = 2;
		//Attributes processing...
		this.defLife = 50;
		this.defMaxLife = 50;
		this.defDamage = 100;
		this.defRange = 80;
		this.defSpeed = 20;
		this.defSpeedMax = 20;
		this.name = "Arch Mage";
		this.description = "Uses magic, uses different casts to disable or kill attackers";
		this.upgrade0 = "Heal defenders  Cost: $1000";
		this.upgrade0imgsrc = "./images/icon/upgradeicons/spelllife.png";
		this.upgrade0cost = 1000;
		this.upgrade1 = "Attack 2: Fire  Cost: $100";
		this.upgrade1imgsrc = "./images/icon/upgradeicons/spellfire.png";
		this.upgrade1cost = 100;
		this.upgrade2 = "Attack 3: Ice  Cost: $100";
		this.upgrade2imgsrc = "./images/icon/upgradeicons/spellice.png";
		this.upgrade2cost = 100;
		this.upgrade3 = "Attack 4: Water  Cost: $100";
		this.upgrade3imgsrc = "./images/action.png";
		this.upgrade3cost = 100;
		this.cost = 600;
		//Attacks
		this.att1 = "light";
		this.att1framemax = 11;
		this.att1arr = new Array(12);
		this.att2 = "fire";
		this.att2framemax = 6;
		this.att2arr = new Array(7);
		this.att3 = "snow";
		this.att3framemax = 12;
		this.att3arr = new Array(13);
	}
	else //if(type == 6) Castle
	{
		//Image processing...
		this.firelvl = 2;
		this.attframemax=3;
		this.attanims = new Array(4);
		this.firelvl1arr = new Array(3);
		this.firelvl2arr = new Array(3);
		this.firelvl3arr = new Array(3);
		this.path = "./images/castle/";
		this.attname = "CastleAttack";
		this.fire1 = "firelv1";
		this.fire2 = "firelv2";
		this.fire3 = "firelv3";
		this.deathname = "CastleDeath";
		this.defImg = new Image();
		this.defImg.src = "./images/castle/CastleAttack0.png";
		this.posX = 0;
		this.posY = 0;
		this.upgrade = 0;
		//Attributes processing...
		this.defLife = 200;
		this.defMaxLife = 200;
		this.defDamage = 100;
		this.defRange = 100;
		this.defSpeed = 20;
		this.defSpeedMax = 20;
		this.name = "Castle";
		this.description = "This is your main Castle";
		this.upgrade0 = "Repair castle  Cost: $1000";
		this.upgrade0imgsrc = "./images/icon/upgradeicons/repair.png";
		this.upgrade0cost = 1000;
		this.upgrade1 = "Type: Spikes  Cost: $500";
		this.upgrade1imgsrc = "./images/icon/upgradeicons/spike.png";
		this.upgrade1cost = 500;
		this.upgrade2 = "Type: Extra Towers  Cost: $500";
		this.upgrade2imgsrc = "./images/icon/upgradeicons/tower.png";
		this.upgrade2cost = 500;
		this.upgrade3 = "";
		this.upgrade3imgsrc = "./images/action.png";
	}
}

function getUpgrade(type)
{
	if(type == 0)
	{
		return this.upgrade0;
	}
	else if(type == 1)
	{
		return this.upgrade1;
	}
	else if(type == 2)
	{
		return this.upgrade2;
	}
	else //if(type == 3)
	{
		return this.upgrade3;
	}
}

//@param: which upgrade, and current gold
//@returns: current gold - the cost if upgrade was accomplished
function defUpgrade(level, gold)
{
	var abox;
	if(level == 1)
	{
		if(gold - this.upgrade1cost >= 0 && !this.upgraded1)
		{
			//Level two increases defense (max Life)
			this.defMaxLife += 50;
			this.defLife = this.defMaxLife;
			this.upgraded1 = true;
			gold -= this.upgrade1cost;
			return gold;
		}
		else
		{
			aBox = document.getElementById("alerts");
			aBox.style.display = 'block';
			aBox.innerHTML="You can't use this upgrade";
			return gold;
		}
	}
	else if(level == 2)
	{
		if(gold - this.upgrade2cost >= 0 && !this.upgraded2)
		{
			//Level one increases damage		
			this.defDamage += 20;
			this.upgraded2 = true;
			gold -= this.upgrade2cost;
			return gold;
		}
		else
		{
			aBox = document.getElementById("alerts");
			aBox.style.display = 'block';
			aBox.innerHTML="You can't use this upgrade";
			return gold;
		}
	}
	else //if(level == 3)
	{
		if(gold - this.upgrade2cost >= 0 && !this.upgraded3)
		{
			//Level three increases range
			this.defRange += 10;
			this.upgraded3 = true;
			gold -= this.upgrade3cost;
			return gold;
		}
		else
		{
			aBox = document.getElementById("alerts");
			aBox.style.display = 'block';
			aBox.innerHTML="You can't use this upgrade";
			return gold;
		}		
	}
	return gold;
} 

function loadimg()
{
    for(var i = 0; i<=this.attframemax; i++)
    {
        this.attanims[i] = new Image();
        this.attanims[i].src = this.path + this.attname + i + ".png";
    }
    for(var i = 0; i<=this.dieframemax; i++)
    {
        this.deathanims[i] = new Image();
        this.deathanims[i].src = this.path + this.deathname + i + ".png";
    }
    for(var i = 0; i<=this.walkframemax; i++)
    {
        this.walkanims[i] = new Image();
        this.walkanims[i].src = this.path + this.walkname + i + ".png";
    }
    for(var i = 0; i<=this.firelvl; i++)
    {

        this.firelvl1arr[i] = new Image();
        this.firelvl1arr[i].src = this.path + this.fire1 + i + ".png";
        this.firelvl2arr[i] = new Image();
        this.firelvl2arr[i].src = this.path + this.fire2 + i + ".png";
        this.firelvl3arr[i] = new Image();
        this.firelvl3arr[i].src = this.path + this.fire3 + i + ".png";
    }
    for(var i = 0; i <= this.att1framemax; i++)
    {
    	this.att1arr[i] = new Image();
		//alert("loading "+this.path + "magic/" + this.att1 + i + ".png");
    	this.att1arr[i].src = this.path + "magic/" + this.att1 + i + ".png";
    }
    for(var i = 0; i <= this.att2framemax; i++)
    {
    	this.att2arr[i] = new Image();
		//alert("loading "+this.path + "magic/" + this.att2 + i + ".png");
    	this.att2arr[i].src = this.path + "magic/" + this.att2 + i + ".png";
    }
    for(var i = 0; i <= this.att3framemax; i++)
    {
    	this.att3arr[i] = new Image();
    	this.att3arr[i].src = this.path + "magic/" + this.att3 + i + ".png";
    }

}

function enemy(type, pathnumber)
{
	this.enemyType = type;
	this.mypathnum = pathnumber;
	this.myendx;
	this.myendy;
	this.currentx;
	this.currenty;
	this.visible = false;
	this.attack = false;
	this.walk = false;
	this.die = false;
	this.dead = false;
	this.ready=false;
	this.hasTarget=false;
	this.target;
	this.framenumber=0;
	this.imgload = loadimg;
	this.atEnd = false;
	if(type == 0)//Imp
	{		
		//Image processing...		
		this.attframemax=6;
		this.dieframemax=2;
		this.walkframemax=6;
		this.attanims = new Array(7);
		this.deathanims = new Array(3);
		this.walkanims = new Array(7);
		this.attImg = new Image();
		this.attImg.src = "./images/imp/impwalk0.png";
		this.path = "./images/imp/";
		this.attname = "impattack";
		this.deathname = "impdeath";
		this.walkname = "impwalk";
		//Attributes processing...
		this.enemyLife = 300;
		this.enemyDamage = 20;
		this.enemyRange = 50;
		this.enemySpeed = 1;
		this.enemySpeedMax = 1;
		this.width = 20;
		this.height = 20;
		this.gold = 25;
	}
	else if(type == 1)//Skeleton
	{		
		//Image processing...		
		this.attframemax=4;
		this.dieframemax=3;
		this.walkframemax=8;
		this.attanims = new Array(5);
		this.deathanims = new Array(4);
		this.walkanims = new Array(9);
		this.attImg = new Image();
		this.attImg.src = "./images/skeleton/SkeletonWalk0.png";
		this.path = "./images/skeleton/";
		this.attname = "SkeletonAttack";
		this.deathname = "SkeletonDeath";
		this.walkname = "SkeletonWalk";
		//Attributes processing...
		this.enemyLife = 300;
		this.enemyDamage = 25;
		this.enemyRange = 50;
		this.enemySpeed = 2;
		this.enemySpeedMax = 2;
		this.width = 20;
		this.height = 20;
		this.gold = 50;
	}
	else if(type == 2)//Ghost
	{		
		//Image processing...		
		this.attframemax=7;
		this.dieframemax=4;
		this.walkframemax=4;
		this.attanims = new Array(8);
		this.deathanims = new Array(5);
		this.walkanims = new Array(5);
		this.attImg = new Image();
		this.attImg.src = "./images/ghost/ghostwalk0.png";
		this.path = "./images/ghost/";
		this.attname = "ghostatt";
		this.deathname = "ghostdie";
		this.walkname = "ghostwalk";
		//Attributes processing...
		this.enemyLife = 350;
		this.enemyDamage = 30;
		this.enemyRange = 50;
		this.enemySpeed = 2;
		this.enemySpeedMax = 2;
		this.width = 20;
		this.height = 20;
		this.gold = 75;
	}
	else if(type == 3)//Dragon
	{		
		//Image processing...		
		this.attframemax=7;
		this.dieframemax=1;
		this.walkframemax=3;
		this.attanims = new Array(8);
		this.deathanims = new Array(2);
		this.walkanims = new Array(4);
		this.attImg = new Image();
		this.attImg.src = "./images/dragon/DragonWalk0.png";
		this.path = "./images/dragon/";
		this.attname = "DragonAttack";
		this.deathname = "DragonDeath";
		this.walkname = "DragonWalk";
		//Attributes processing...
		this.enemyLife = 450;
		this.enemyDamage = 40;
		this.enemyRange = 50;
		this.enemySpeed = 2;
		this.enemySpeedMax = 2;
		this.width = 20;
		this.height = 20;
		this.gold = 200;
	}
	else //if(type == 3) Devil
	{		
		//Image processing...
		this.type=4;
		this.attframemax=9;
		this.dieframemax=1;
		this.walkframemax=0;
		this.attanims = new Array(10);
		this.deathanims = new Array(2);
		this.walkanims = new Array(1);
		this.attImg = new Image();
		this.attImg.src = "./images/devil/DevilWalk1.png";
		this.path = "./images/devil/";
		this.attname = "devil";
		this.deathname = "DevilDeath";
		this.walkname = "DevilWalk";
		//Attributes processing...
		this.enemyLife = 600;
		this.enemyDamage = 50;
		this.enemyRange = 50;
		this.enemySpeed = 2;
		this.enemySpeedMax = 2;
		this.width = 20;
		this.height = 20;
		this.gold = 250;
	}
}