import React, {useState,useEffect,useCallback} from 'react'
import DeckAPI from '../api'
import PlayerHand from './PlayerHand'
import DealerHand from './DealerHand'
import {initializeCardData} from '../helpers'
import { Redirect, Link } from 'react-router-dom'

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
    // keeping track of the player hands once they are finished with their turn 
    const [finalPlayerValue,setFinalPlayerValue] = useState(0)
    const [finalDealerValue,setFinalDealerValue] = useState(0)
    const [roundOver, setRoundOver] = useState(false)
    // handle load
    const [loadingCards,setIsLoadingCards] = useState(false)
    const [flipped,setFlipped] = useState(false)
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

   
    const [playerState, setPlayerState] = useState([])
    const [dealerState, setDealerState] = useState([])

    const handleSetup = useCallback(async(deckId,players) => {
        const res = await DeckAPI.drawCard(deckId,(4))
        let cardsArr = (res.cards)
        let initialDraw = initializeCardData(cardsArr,players)
        setPlayerState([...initialDraw[1][0]])
        setDealerState([...initialDraw[0]])
        setIsLoadingCards(true)
    },[])
    // TODO handle the case where the player is greater than the dealer value but still under 21 (add && conditional)
    // TODO handle if a player busts and the dealer busts as well, we can count it as a draw for the player and they don't lost their bet
    useEffect(() => {
        console.log('deck id',deckId)
        // console.log('running useeffect in the game component to eval player vs dealer')
        if(finalDealerValue && finalPlayerValue){
            if(finalDealerValue > finalPlayerValue && finalDealerValue <= 21){
                console.log('Dealer Wins')
            }else if(finalPlayerValue > finalDealerValue && finalPlayerValue <= 21){
                console.log('Player Wins')
            }else if ((finalDealerValue === finalPlayerValue && finalPlayerValue <= 21 && finalDealerValue <= 21) || ((finalDealerValue > 21 && finalPlayerValue > 21) && (finalPlayerValue < finalDealerValue))) {
                console.log('Tie!')
            }else if(finalDealerValue <= 21  && finalPlayerValue > 21){
                console.log('Dealer Wins!')
            
            }else if(finalDealerValue >= 21  && finalPlayerValue <= 21){
                console.log('Player Wins!')
            }else if(finalDealerValue > 21 && finalPlayerValue > 21 && (finalDealerValue < finalPlayerValue)){
                console.log('Dealer')
            } else if ((finalDealerValue === finalPlayerValue && finalPlayerValue >= 21 && finalDealerValue >= 21)){
                console.log('Dealer Wins!')
            }
            setRoundOver(true)
        }
    }, [finalDealerValue])
    
    useEffect(() => {
        // if can't retrieve deckId from local storage, fetches a deck, and stores id. 
        // if deckid is empty, fetch another deck.  
        // if retrieves deckId, draws cards
    })

    if(!loadingCards){
        return (      
            <div>
                <button onClick={() => handleSetup(deckId,1)} className='navBtns'>Start Game</button>
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
                    deck={deckId}/>
            <button className='navBtns' onClick={() => window.location.reload()}>Play Again</button>
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
