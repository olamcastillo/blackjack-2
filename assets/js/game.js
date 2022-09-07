//REFERENCES
const btnTake = document.querySelector('#btnTake');
const btnNew = document.querySelector('#btnNew');
const btnEnd = document.querySelector('#btnEnd');
const counterPlayer = document.querySelectorAll('small');
const divCardPlayer = document.querySelector('#card-player');
const divCardComputer = document.querySelector('#card-computer');


/**
  2C - CLUBS
  2D - DIAMONDS
  2H - HEARTS
  2S - SPADES
*/

let deck      = []
const types   = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];

let playerPoints = 0,
    computerPoints = 0;

const createDeck = () => {
  for(let i = 2; i <= 10; i++) {
    //deck.push(i + 'C');
    for(let type of types) {
      deck.push(i + type)
    }
  }

  for(let special of specials) {
    for(let type of types) {
      deck.push( special + type)
    }
  }
  //sorting deck
  deck = _.shuffle(deck);
  return deck;
}
createDeck();

//taking card

const takeCard = () => {

  if(deck.length === 0) {
    throw 'No card available'
  }
  const card = deck.pop();
  console.log(card);
  console.log(deck);
  return card
}

//order card
const cardValue = ( card ) => {
const value = card.substring(0, card.length - 1);  
return ( isNaN( value )) ?  
( value === 'A') ? 1 : 
( value === 'J') ? 11 : 
( value === 'Q') ? 12 : 13 : parseInt(value)
//-------------------------------------
//let points;// 2H => 2 - 10C => 10
// if( isNaN( value ) ) {
  //   points = ( value === 'A') ? 1 : 
  //             ( value === 'J') ? 11 :
  //             ( value === 'Q') ? 12 : 13;
  // }else {
    //   points = parseInt(value); // string to number
    // }
    //----------------------------------------
    // let points = (isNaN( value )) ? 
    // (value === 'A') ?
    //   1 : (value === 'J') ?
    //   11 : (value === 'Q') ?  12 : 13 : parseInt(value);
    // return points;
}
//order card by computer
const computerTurn = ( minPoints) => {
  do{
    const card = takeCard();

    computerPoints = computerPoints + cardValue( card );
    counterPlayer[1].innerText = computerPoints;
    
    const img = document.createElement('img'); //create img card
    img.src = `../assets/cards/${ card }.png`;
    img.classList.add('card');
    divCardComputer.append( img );
    if( minPoints > 21 ) {
      //alert('You Lost');
      break;
    }
  }while( ( computerPoints < minPoints ) && ( minPoints <= 21 ) ); // If turn player's end , the computer play to win or maybe lose --- player poiht is 15, computer play to have a better point (16-21) or the computer maybe lost to.
  
  setTimeout(() => {
    if(computerPoints === minPoints) {
      alert('Both Win')
    }else if( minPoints > 21 ){
        alert('Computer Won')
      } else if(computerPoints > 21) {
        alert('Player Won')
      }else if(computerPoints === 21) {
        alert('Computer Won')
      }
      else if(computerPoints < 21 && minPoints < 21 && computerPoints > minPoints) {
        alert('Computer Won')
      }
    btnNew.disabled = false;
    btnEnd.disabled = false;
  }, 20);
}
// EVENTS

btnTake.addEventListener('click', () => {
const card = takeCard();

playerPoints = playerPoints + cardValue( card );
counterPlayer[0].innerText = playerPoints;

const img = document.createElement('img'); //create img card
img.src = `../assets/cards/${ card }.png`;
img.classList.add('card');
divCardPlayer.append( img );
//table[0].innerHTML = `<img id='card' src='../assets/cards/${card}.png'></img>`;
if(playerPoints > 21) {
  btnTake.disabled = true;
  btnEnd.disabled = true;
  computerTurn( playerPoints );
}else if(playerPoints === 21) {
}
})

btnEnd.addEventListener('click', () => {
  btnTake.disabled = true;
  btnNew.disabled = true;
  computerTurn( playerPoints );
})

btnNew.addEventListener('click', () => {
  console.clear();
  deck = []
  deck = createDeck();
  console.log(deck);
  playerPoints = 0;
  computerPoints = 0;
  counterPlayer[0].innerText = 0;
  counterPlayer[1].innerText = 0;
  divCardPlayer.innerHTML = '';
  divCardComputer.innerHTML = '';
  btnTake.disabled = false;
  btnNew.disabled = false;
})
