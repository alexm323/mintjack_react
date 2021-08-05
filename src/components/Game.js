import React, {useState,useEffect,useCallback} from 'react'
import DeckAPI from '../api'
import PlayerHand from './PlayerHand'
import DealerHand from './DealerHand'
import {initializeCardData} from '../helpers'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'

const styles = {
    game:{
        backgroundColor:'rgba(2, 62, 138, 1)',
        width: '100%',
        borderRadius: '1rem',
        padding: '1.777rem',
        marginTop: '4rem'
    }
}
function Game({deckId}) {
    const [bet, setBet] = useState(false)
    const [betClasses, setBetClasses] = useState({
        '50' : 'navBtns',
        '100' : 'navBtns',
        '500' : 'navBtns'
    })    
    // keeping track of the player hands once they are finished with their turn 
    const [finalPlayerValue,setFinalPlayerValue] = useState(0)
    const [finalDealerValue,setFinalDealerValue] = useState(0)
    const [roundOver, setRoundOver] = useState(false)
    // handle load
    const [loadingCards,setIsLoadingCards] = useState(false)
    const [flipped,setFlipped] = useState(false)
    const [loggedInUser, setLoggedInUser] = useState()
    const [playerState, setPlayerState] = useState([])
    const [dealerState, setDealerState] = useState([])

    // adds the value of they playersHand to the queue when they hit/bust/get to 21 , these values should be passed down to the dealer 
    const setFlippedStatus = (status) => {
        setFlipped(status)
    }
    const trackPlayerValue = (val) => {
        setFinalPlayerValue(val)
    }
    // update the dealer value once the dealer is done hitting, if this triggers then we run the evaluation 
    const trackDealerValue = (val) => {
        setFinalDealerValue(val)
    }
    

    const handleSetup = useCallback(async(deckId,players) => {
        const res = await DeckAPI.drawCard(deckId,(4))
        let cardsArr = (res.cards)
        let initialDraw = initializeCardData(cardsArr,players)
        setPlayerState([...initialDraw[1][0]])
        setDealerState([...initialDraw[0]])
        setIsLoadingCards(true)
    },[])
    function updateBet(e){

        console.log(e.target.textContent)
        setBet(e.target.textContent)

            setBetClasses(() => {
                let result;
                if (e.target.textContent === '50'){
                  result = {
                  '50': 'navBtns-clicked',
                  '100': 'navBtns',
                  '500': 'navBtns' 
                  } 
                } else if(e.target.textContent === '100'){
                    result = {
                        '50': 'navBtns',
                        '100': 'navBtns-clicked',
                        '500': 'navBtns'
                    } 
                }else if(e.target.textContent === '500'){
                    result = {
                        '50': 'navBtns',
                        '100': 'navBtns',
                        '500': 'navBtns-clicked' 
                    }
                }
                return result
                })
        
    }   
    function updateBetOnUser (winCondition,userID,bet) {
        // let user;
        console.log(winCondition)
        console.log(userID)
        console.log(bet)
        if(winCondition === 'win' || winCondition === 'lose'){
           axios.put(`https://blackjackmint.herokuapp.com/post/${winCondition}/${userID}/${bet}`)
            .then(res => {
            console.log(res.data)
            })
        }
        // return user ? user : 'tie'
    };
    // TODO handle the case where the player is greater than the dealer value but still under 21 (add && conditional)
    // TODO handle if a player busts and the dealer busts as well, we can count it as a draw for the player and they don't lost their bet
    
    useEffect(() => {
        console.log('deck id',deckId)
        let result;
        axios.get('https://blackjackmint.herokuapp.com/loggedInUser', {withCredentials: true})
        .then(({data: user}) => {
              setLoggedInUser(user)
            if(finalDealerValue && finalPlayerValue){
                if(finalDealerValue > finalPlayerValue && finalDealerValue <= 21){
                    alert('Dealer Wins')
                    result = 'lose';
                }else if(finalPlayerValue > finalDealerValue && finalPlayerValue <= 21){
                    alert('Player Wins')
                    result = 'win' ;               
                    
                }else if ((finalDealerValue === finalPlayerValue && finalPlayerValue <= 21 && finalDealerValue <= 21) || ((finalDealerValue > 21 && finalPlayerValue > 21) && (finalPlayerValue < finalDealerValue))) {
                    alert('Tie!')
                    result = 'tie';
                }else if(finalDealerValue <= 21  && finalPlayerValue > 21){
                    alert('Dealer Wins!')
                    result = 'lose';            
                }else if(finalDealerValue >= 21  && finalPlayerValue <= 21){
                    alert('Player Wins!')
                    result = 'win' ;
                }else if(finalDealerValue > 21 && finalPlayerValue > 21 && (finalDealerValue < finalPlayerValue)){
                    alert('Dealer')
                    result = 'lose' ;
                } else if ((finalDealerValue === finalPlayerValue && finalPlayerValue >= 21 && finalDealerValue >= 21)){
                    alert('Dealer Wins!')
                    result = 'lose';
                }
                updateBetOnUser(result,user._id,bet)
                setRoundOver(true)
            }
        })
        // console.log('running useeffect in the game component to eval player vs dealer')
        
    }, [finalDealerValue])
    
    useEffect(() => {
        // if can't retrieve deckId from local storage, fetches a deck, and stores id. 
        // if deckid is empty, fetch another deck.  
        // if retrieves deckId, draws cards
    })

    if(!loadingCards){
        return (      
            <div>
                {bet ? 
                (<button onClick={() => handleSetup(deckId,1)} className='navBtns'>Start Game</button> )
                : 
                (<button onClick={() => alert('Please set your bet')} className='navBtns'>Start Game</button>)
                }
                
                <button onClick={(e) => updateBet(e)} className={betClasses['50']}>50</button>
                <button onClick={(e) => updateBet(e)} className={betClasses['100']}>100</button>
                <button onClick={(e) => updateBet(e)} className={betClasses['500']}>500</button>

            </div>
        )
    } else if (roundOver){
        return(
        <div style={styles.game}>
            <DealerHand 
                        setFlippedStatus = {setFlippedStatus} 
                        initialCards={dealerState} 
                        flipped={flipped} 
                        finalPlayerValue={finalPlayerValue} 
                        trackDealerValue={trackDealerValue} 
                        deck={deckId}/>
    
            <PlayerHand 
                    setFlippedStatus = {setFlippedStatus} 
                    flipped={flipped}
                    initialCards={playerState} 
                    trackPlayerValue={trackPlayerValue} 
                    deck={deckId}
                    roundOver={roundOver}/>            
        </div>
        )
    } else{
        return (
            <div style={styles.game}>
                <DealerHand 
                        setFlippedStatus = {setFlippedStatus} 
                        initialCards={dealerState} 
                        flipped={flipped} 
                        finalPlayerValue={finalPlayerValue} 
                        trackDealerValue={trackDealerValue} 
                        deck={deckId}/>
    
                <PlayerHand 
                        setFlippedStatus = {setFlippedStatus} 
                        flipped={flipped}
                        initialCards={playerState} 
                        trackPlayerValue={trackPlayerValue} 
                        deck={deckId}/>
            </div>
        )
    }

}

export default Game





// axios.put(`https://blackjackmint.herokuapp.com/lose/${userID}/${bet}`)
// .then(res => {
//   console.log(res.data)
// })





// load a game with the
/*
const PlayerContext = React.createContext({});

// immer
import produce from "immer";

const PlayerProvider = ({ children, deckId }) => {
    const [playerState, setPlayerState] = useState({
        players: [],
        round: 0,
        turn: 0,
    });

    const createPlayer = useContext((hand) => {}, [deckId]);
    const draw = useContext((playerIndex) => {
        const card = await deckAPI.get(deckId, 'draw');
        // without immer
        // setPlayerState(play => {
        //    const _p = [...players];
        //    return { ...play, players: _p.splice(playerIndex, 1, {..._p[playerIndex], hand: }) }
        // });
        // with immer
        socket.send('draw', { player, card });
        setPlayerState(produce(play => {
            play.players[playerIndex].hand.push(card);
        }))
    }, [deckId]);


    return (
        <Player.Provider value={{ playerState, setPlayerState }}>
            {children}
        </Player.Provider>
    )
}

const { playerState: { players }, setPlayerState  } = React.useContext(PlayerContext);

<PlayerProvider deckId={}>
    <Game />
</PlayerProvider>
*/
/**
  // context
  players: Players[]
  round: numbers
  turn: round % players.length // 0, 1, 2
  Player {
    hand: { card: card_id, value: number },
    money: number,
    isDealer: boolean
  }
 */
