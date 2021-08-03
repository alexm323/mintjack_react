import React,{useState,useEffect,useCallback} from 'react'
import DeckAPI from '../api'
import { parseCardValue } from '../helpers'
import Card from './Card'
const DealerHand = ({deck,initialCards,trackPlayerValue}) => {
    const [loadedCards,setLoadedCards] = useState(false)
    const [dealerValue,setDealerValue] = useState(0)
    const [currentCards,setCurrentCards] = useState([])
    const [aces,setAces] = useState(0)
    const loadCards = useCallback(() => {
        let val = initialCards.reduce((a,c) => a + parseCardValue(c.value),0)
        setDealerValue(val)
        setCurrentCards(initialCards)
    },[])
    useEffect(() => {
        loadCards()
        setLoadedCards(true)
    },[])
    const handleDealerHit = async() => {
        if(dealerValue < 17){
            let card = await DeckAPI.hit(deck)
            let cardVal = parseCardValue(card.value)
            setCurrentCards(currentCards => [...currentCards,card])
            if(currentCards.some(card => card.value === "ACE")){
                setAces((prevAceCount) => prevAceCount + 1)
                console.log('we have an ace ',aces)
            }
            if(dealerValue + cardVal > 21 && aces > 1){
                setDealerValue((prevValue) => prevValue + cardVal - (10 * aces))
                setAces((prev) => prev - 1)
            }
            setDealerValue(dealerValue + cardVal)
                        
        }
        
    }


    return (
        !loadedCards ? 
        <p>Loading</p>
        :
        <div>
            <p>Dealer Score</p>
            <p>{dealerValue}</p>
            <button onClick={handleDealerHit}>End Game</button>
            {currentCards.map((card) => {
                return <Card key={card.code} cardName={card.code} cardImg={card.image}/>
            })}
        </div>
    )
}

export default DealerHand