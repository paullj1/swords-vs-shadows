function goGame()
{	
	document.getElementById('story1').style.display = 'none';
	startGame();
}

function pause()
{	
	document.getElementById('pause').style.display = 'block';
	pauseGame();
}

function divDisplay(divID, state)
{
	document.getElementById(divID).style.display = state;
}

//Display defender type on mouse over
function displayDefType(type)
{
	if(type == 1)
	{
		var action_desc = document.getElementById('action_desc');
		action_desc.innerHTML = "Pikeman: cost 100";
	}
	else if(type == 2)
	{
		var action_desc = document.getElementById('action_desc');
		action_desc.innerHTML = "Marksman: cost 100";
	}
	else if(type == 3)
	{
		var action_desc = document.getElementById('action_desc');
		action_desc.innerHTML = "Crusader: cost 300";
	}
	else if(type == 4)
	{
		var action_desc = document.getElementById('action_desc');
		action_desc.innerHTML = "Archer: cost 300";
	}
	else if(type == 5)
	{
		var action_desc = document.getElementById('action_desc');
		action_desc.innerHTML = "Priest: cost 400";
	}
	else //if(type == 6)
	{
		var action_desc = document.getElementById('action_desc');
		action_desc.innerHTML = "Arch Mage: cost 600";
	}
}

function clearActDesc()
{
	var action_desc = document.getElementById('action_desc');
	action_desc.innerHTML = "";
}