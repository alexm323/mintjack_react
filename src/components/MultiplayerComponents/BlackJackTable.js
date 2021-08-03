import React,{useState,useEffect,useCallback} from 'react'
import axios from 'axios'
import Game from './Game'
// fetch the deck and pass it down as a prop to the game component
import CardContext from './Context/CardContext'
const BlackjackTable = () => {

    const [deckId,setDeckId] = useState('')
    const fetchDeck = useCallback(async() => {
      let res = await axios.get('https://deckofcardsapi.com/api/deck/new/')
      setDeckId(res.data.deck_id)
      
    },[]) 
  
    useEffect(() => {
      fetchDeck()
    },[fetchDeck])
    
    return (
      <div style={styles.container}>
        <h1>This is our table</h1>
        <CardContext.Provider>
          <Game deckId={deckId}/>
        </CardContext.Provider>
        
      </div>
    );

    
}

const styles = {
    container:{
        flex:1,
        backgroundColor:'grey'
    }
}
export default BlackjackTable;
