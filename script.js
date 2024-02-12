
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");

const monsterStats = document.querySelector("#monsterStats");
const monsternametext = document.querySelector("#monsterName");
const monsterhealthText = document.querySelector("#monsterHealth");
const weapons = [
  {
    name: "stick",
    power: 5,
  },
  {
    name: "dagger",
    power: 30,
  },
  {
    name: "claw hammer",
    power: 50,
  },
  {
    name: "sword",
    power: 100,
  },
];
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15,
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60,
  },
  {
    name: "dragon",
    level: 20,
    health: 300,
  },
];
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "you are now in the town square",
  },
  {
    name: "store",
    "button text": [
      "Buy 10 health (10 gold)",
      "Buy weapon(30 gold)",
      "go to townsquare",
    ],
    "button functions": [buyhealth, buyweapon, gotown],
    text: "you enter the store",
  },
  {
    name: "cave",
    "button text": ["fight-slime ", "fight fanged beast", "go to townsquare"],
    "button functions": [fightslime, fightbeast, gotown],
    text: "you enter the cave,you see some monsters",
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, gotown],
    text: "You are fighting a monster",
  },
  {
    name: "kill monster",
    "button text": [
      "go to town square",
      "go to town square",
      "go to town square",
    ],
    "button functions": [gotown, gotown, easterEgg],
    text: 'The monster screams"Arg!" as it dies.You gain experience points and find gold',
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "you die",
  },
  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "you defeat the dragon! You win the gam",
  },
  {
    name:'easter egg',
    'button text':['2','8','Go to town square?'],
    'button functions':[pickTwo,pickEight,gotown],
    text:'You find a secret game.pick a number above.Ten numbers will be randomly chosen between 0 and 10, if the number you choose matches one of the random numbers,you win!'

  }
];
//initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}
function gotown() {
  update(locations[0]);
}
function goStore() {
  update(locations[1]);
}
function goCave() {
  update(locations[2]);
}

function buyhealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "you dont have enough gold to buy health";
  }
}
function buyweapon() {
    if (currentWeapon < weapons.length -  1) {
      if (gold >=  30) {
        gold -=  30;
        currentWeapon++;
        let newweapon = weapons[currentWeapon].name;
        text.innerText = "you now have a " + newweapon + ".";
        inventory.push(newweapon);
        text.innerText += " In your inventory you have " + inventory;
        goldText.innerText = gold;      
      } else {
        text.innerText = "you do not have enough gold to buy a weapon";
      }
    } else {
      text.innerText = "you already have the most powerful weapon";
      button2.innerText = "sell weapon for  15 gold";
      button2.onclick = sellweapon;
    }
  }
  
function sellweapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText - "you sold a " + currentWeapon + ".";
    text.innerText - "in your inventory you have" + inventory;
  } else {
    text.innerText = "Dont sell your only weapon";
  }
}
function fightslime() {
  fighting = 0;
  gofight();
}
function fightbeast() {
  fighting = 1;
  gofight();
}
function fightDragon() {
  fighting = 2;
  gofight();
}
function gofight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsternametext.innerText = monsterHealth;
  monsterhealthText.innerText = monsterHealth;
}
function attack() {
  text.innerText = "the" + monsters[fighting].name + "attacks";
  text.innerText += "you attack it with your " + weapons[currentWeapon].name + ".";
  if(isMonsterHit)
  {health -= getMonstersAttackValue(monsters[fighting].level);}
else{
    text.innerText+='you miss'
}
  monsterHealth -=
    weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  healthText.innerText = health;
  monsterhealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
fighting===2 ? wingame():defeatMonster();
  }
  if(math.random()<=.1 && inventory.length !==1){
    text.innerText+='your'+inventory.pop()+'breaks';
    currentWeapon--;
  }
}
function getMonstersAttackValue(level){
    let hit=[level*5]-(math.floor(math.random()*xp))
    console.log(hit)
    return hit
}
function isMonsterHit(){
    return math.random()>.2 || health<20;
}
function dodge() {
  text.innerText =
    "you dodge the attack from the" + monsters[fighting].name + ".";
}
function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}
function lose() {
  update(locations[5]);
}
function wingame(){
    update(locations[6])
}
function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  gotown();
}
function easterEgg(){
    update(locations[7]);
}
function pickTwo(){
    pickTwo(2)
}
function pickEight(){
    pickEight(8)
}
function pick(guess) {
    let numbers = [];
    while (numbers.length <  10) {
        numbers.push(Math.floor(Math.random() *  11));
    }
    text.innerText = 'You picked ' + guess + ', here are the random numbers:\n';
    for (let i =  0; i <  10; i++) {
        text.innerText += numbers[i] + '\n';
    }
    if (numbers.indexOf(guess) !== -1) {
        text.innerText += 'Right! You win  28 gold\n';
        gold +=  20;
        goldText.innerText = gold;
    } else {
        text.innerText += 'Wrong! You lose  10 health\n';
        health -=  10;
        healthText.innerText = health;
        if (health <=  0) {
            lose();
        }
    }
}


