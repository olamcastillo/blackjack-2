

(() => {

  'use strict'


  //REFERENCES
  const btnTake = document.querySelector('#btnTake'),
        btnNew = document.querySelector('#btnNew'),
        btnEnd = document.querySelector('#btnEnd');
        
  const divCardsPlayers = document.querySelectorAll('.divCard'),
        counterPlayer = document.querySelectorAll('small');


  /**
    2C - CLUBS
    2D - DIAMONDS
    2H - HEARTS
    2S - SPADES
  */

  let deck      = []
  const types   = ['C', 'D', 'H', 'S'],
        specials = ['A', 'J', 'Q', 'K'];

  let pointsPlayers = [];

  const startGame = ( numPlayers = 2 ) => {
    deck = createDeck(); 
    pointsPlayers = []
    for( let i = 0; i < numPlayers ; i++) {
      pointsPlayers.push(0);
    }
    counterPlayer.forEach( elem => elem.innerText = 0);
    divCardsPlayers.forEach( elem => elem.innerHTML = '');


  }

  const createDeck = () => {
    deck = [];
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
    return  _.shuffle( deck );;
  }

  //taking card
  const takeCard = () => {
    if(deck.length === 0) {
      throw 'No card available'
    }
    return deck.pop()
  }

  //order card
  const cardValue = ( card ) => {
  const value = card.substring(0, card.length - 1);  
  return ( isNaN( value )) ?  
  ( value === 'A') ? 1 : 
  ( value === 'J') ? 11 : 
  ( value === 'Q') ? 12 : 13 : parseInt(value)

  }
  //player turn = first '0' / computer turn = last '0'
  const accumPointsPlayer = ( card, turn ) => {
    pointsPlayers[turn] = pointsPlayers[turn] + cardValue( card );
    counterPlayer[turn].innerText = pointsPlayers[turn];
    return pointsPlayers[turn];
  }

  const createCard = ( card, turn) => {

    const img = document.createElement('img'); //create img card
    img.src = `../assets/cards/${ card }.png`;
    img.classList.add('card');
    divCardsPlayers[turn].append( img );
  }

  const chooseWinner = () => {
    const [ minPoints , computerPoints ] = pointsPlayers;
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
      btnEnd.disabled = true;
    }, 100);
  }

  //order card by computer
  const computerTurn = ( minPoints) => {
    let computerPoints = 0;
    do{
      const card = takeCard();
      computerPoints = accumPointsPlayer( card, pointsPlayers.length - 1);
      createCard( card, pointsPlayers.length - 1);

    }while( ( computerPoints < minPoints ) && ( minPoints <= 21 ) ); // If turn player's end , the computer play to win or maybe lose --- player poiht is 15, computer play to have a better point (16-21) or the computer maybe lost to.
    
    chooseWinner();
  }
  // EVENTS

  btnTake.addEventListener('click', () => {
  const card = takeCard();
  const playerPoints = accumPointsPlayer( card, 0);
  createCard( card, 0);
  
  if(playerPoints > 21) {
    btnTake.disabled = true;
    btnEnd.disabled = true;
    computerTurn( pointsPlayers[0] );
  }else if(playerPoints === 21) {
  }
  })

  btnEnd.addEventListener('click', () => {
    btnTake.disabled = true;
    btnNew.disabled = true;
    const card = takeCard();
    computerTurn( pointsPlayers[0] );
  })

  btnNew.addEventListener('click', () => {
    startGame();
    btnTake.disabled = false;
    btnEnd.disabled = false;
  })

  return {
    newGame: startGame()
  }

})();




