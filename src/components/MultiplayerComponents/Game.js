import React, {useState,useCallback} from 'react'
import DeckAPI from '../api'
import PlayerHand from './PlayerHand'
import DealerHand from './DealerHand'
import {initializeCardData} from '../helpers'
import { v4 as uuidv4 } from 'uuid';
function Game({deckId}) {

    const [playerQueue,setPlayerQueue] = useState([])
    const [loadingCards,setIsLoadingCards] = useState(false)
    const trackPlayerValue = (val) => {
        setPlayerQueue([...playerQueue,val])
    }
    const [playerState, setPlayerState] = useState([])
    const [dealerState, setDealerState] = useState([])

    const handleSetup = useCallback(async(deckId,players) => {
        let cardsArr = await DeckAPI.drawCards(deckId,(2 + players*2))
        let initialDraw = initializeCardData(cardsArr,players)
        setPlayerState([...initialDraw[1]])
        setDealerState([...initialDraw[0]])
        setIsLoadingCards(true)

    },[])
    const handleReset = () => {
        console.log(dealerState)
        setDealerState([])
        setPlayerState([])
        handleSetup(deckId,1)
    }
    return (
        !loadingCards ? 
        <div>
            <p>Loading</p>
            <button onClick={() => handleSetup(deckId,1)}>Start Game</button>
        </div>
        
        :
        <div style={styles.game}>
            <p>This is our Game component</p>
            <button onClick={handleReset}>Reset</button>
            {playerQueue.map(num => <p>{num}</p>)}
            <DealerHand deck={deckId} trackPlayerValue={trackPlayerValue} initialCards={dealerState}/>

            <p>{playerState.length}</p>

            {/* card objects need to be passed down, and number values handled in the reduce. This will allow robust handling of the ace.*/}
        {   playerState.map((cardArr) => {
                
            return <PlayerHand key={uuidv4()} initialCards={cardArr} trackPlayerValue={trackPlayerValue} deck={deckId}/>
            })}

            
            
        </div>
    )
}

const styles = {
    game:{
        backgroundColor:'green',
        fontSize:'36px'
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