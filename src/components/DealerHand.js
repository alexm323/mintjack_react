import React,{useState,useEffect,useCallback} from 'react'
import DeckAPI from '../api'
import { parseCardValue } from '../helpers'
import Card from './Card'

const DealerHand = ({deck,initialCards,finalPlayerValue,trackDealerValue,flipped,setFlippedStatus}) => {
    const [loadedCards,setLoadedCards] = useState(false)
    const [dealerValue,setDealerValue] = useState(0)
    const [currentCards,setCurrentCards] = useState([])
    
    // if the card is an ace , ace ===1 
    // if the value < 12 and the hand has an ace , +10
    const handleHit = async() => {
        // console.log(initialCards) // [{...},{...}]
        
        const nextCard = await DeckAPI.drawOne(deck);      
        console.log('next card: ',nextCard)
        setCurrentCards([...currentCards,nextCard]) /// All cards in player hand: [{...},{...}]

        let nextCardValue = parseCardValue(nextCard.value) //  Value of next card, NOT initial card values: 11       

        // console.log('all aces: ',numOfAces(),' initial aces: ',numOfInitialAces())

        // TODO: resolve edge case of if there are two initial aces, and a hit results in > 21, or if there are 3+ aces in a hand
        setDealerValue((prev) => {
            let current;
            if((hasAce() || nextCard.value === 'ACE') && (prev + nextCardValue) > 21){
                //distinguish between initial ace and next card ace
                let aceCase = 1;
                // if initial ace, and next Ace
                if(hasInitialAce() && nextCard.value === 'ACE'){
                    if((prev + nextCard.value) > 21) { // make next ace value of one
                        current = prev + aceCase
                        tagAnAce()
                        // todo put below in else if if breaking stuff
                        // ((prev + aceCase) > 21)
                    } else { // make both aces value of one
                        current = prev + aceCase - 10
                        tagAnAce()
                        tagAnAce()
                    } 

                // if no initial ace and next is ace
                } else if ((!hasInitialAce()) && nextCard.value === 'ACE'){
                    current = prev + aceCase; // make next ace value of one
                    tagAnAce()
                // if initial ace and no next ace
                } else if (hasInitialAce() && nextCard.value !== 'ACE'){
                    current = prev + nextCardValue - (10 * numOfUntaggedAces()) // make an initial ace value of one
                    tagAnAce()
                }
            } else {
                current = prev + nextCardValue
            }
            return current;
        })

        


        // check if hand has an ace, and return num of aces if yes
        function numOfAces () {           
               
                return currentCards.reduce((acc,{value}) => {
                    if (value === 'ACE'){
                        acc++
                    }
                    return acc;
                } ,0)            
        }
        function hasAce () {
            return currentCards.some(card => card.value === "ACE");
        }

        function hasInitialAce () {
            return initialCards.some(card => card.value === "ACE")
        }
        function numOfInitialAces(params) {
            
                return initialCards.reduce((acc,{value}) => {
                    if (value === 'ACE'){
                        acc++
                    }
                    return acc;
                } ,0) 
        }
        function tagAnAce () {
            let nextAce = currentCards.find(card => card.value === 'ACE')
            if (nextAce) nextAce.found = true;            
        }
        function untagAnAce () {
            let nextAce = currentCards.find(card => card.value === 'ACE')
            if (nextAce) nextAce.found = false;  
        }
        function numOfUntaggedAces () {
            if (numOfAces() === numOfInitialAces()){ // if state has actually updated
                if (currentCards.some(card => card.value === "ACE" && !card.found)){
                    return currentCards.reduce((acc,{value, found}) => {
                        if (value === 'ACE' && !found){
                            acc++
                        }
                        return acc;
                    } ,0)
                }
            } else {
                if ( initialCards.some(card => card.value === "ACE" && !card.found) || currentCards.some(card => card.value === "ACE" && !card.found)){
                    let current = currentCards.reduce((acc,{value, found}) => {
                        if (value === 'ACE' && !found){
                            acc++
                        }
                        return acc;
                    } ,0)
                    let initial = initialCards.reduce((acc,{value, found}) => {
                        if (value === 'ACE' && !found){
                            acc++
                        }
                        return acc;
                    } ,0)
                    return current + initial;
                }
            }
            return 0;
        }

    }


    const loadCards = useCallback(() => {
        let val = initialCards.reduce((a,c) => a + parseCardValue(c.value),0)
        setDealerValue(val)
        setCurrentCards(initialCards)
    },[])
    useEffect(() => {
        loadCards()
        setLoadedCards(true)
    },[])

    
    // if playervalue changes, check for player win condition
    // if they win, call a function which draws until dealer hits their value condition
    // when there is a final dealer value, then compare playerValue and DealeraValue to handle final win and payouts
    // useEffect(() => {
    //     //TODO: disable user actions on win or bust
    //     checkWin(finalPlayerValue)
    //     function checkWin (playerValue) {
    //         if (playerValue > 21){
    //             alert('You busted!')
    //             console.log('busted!')
    //             handleHit()
                
    //         } else if (playerValue === 21) {
    //             alert('21!')
    //             console.log('21!')
    //             handlehit()
    //         } else {
    //             handleHit()
    //         }
    //     }
        
    // },[finalPlayerValue])
    // if a dealer value is under 17 then we hit 
    // const handleFinal = useCallback(async() => {
    //     console.log(dealerValue,'dealerValue in Dealerhand')
    //     checkDealer(dealerValue)
    //     function checkDealer(dealerValue){
    //         if(dealerValue && dealerValue < 17){
    //         handleHit()
    //         }
    //     }
    // },[])
    // have a flipped state in the game component 
    // when the final player value is set (when the player stays or busts)
    // we flip that state and then that use effect runs ,the flip state flips over the card
    // then it evaluates and this logic can run
    
    useEffect(() => {
     
           if (finalPlayerValue && dealerValue){
            checkDealer(dealerValue)
            console.log('dealerHand: ',dealerValue)
            if(dealerValue >= 17) {
                setFlippedStatus(true)
                trackDealerValue(dealerValue)
                console.log('dealerHand >= 17')
            }

            function checkDealer(dealerValue){
                if(dealerValue && dealerValue < 17){
                handleHit()
                }
            }
            } 
        
        
    }, [dealerValue, finalPlayerValue])


    return (
        !loadedCards ? 
        <p>Loading</p>
        :
        <div>
            {/* <p>Dealer Score</p>
            <p>Dealer Value : {dealerValue}</p> */}
            {/* <button onClick={handleHit}>Hit Dealer</button> */}
             {(!flipped) ?
                <div>
                    <h2>Dealer</h2> 
                    <Card key={currentCards[0].code} cardName={currentCards[0].code} cardImg={currentCards[0].image}/>
                    <Card key={currentCards[1].code} cardName={currentCards[1].code} cardImg={'https://res.cloudinary.com/ashsheran1/image/upload/c_scale,q_auto:good,w_250/v1627977292/red_back_card_hgc2wk.png'}/>
                </div>
                :
                currentCards.map((card) => {
                    return <Card key={card.code} cardName={card.code} cardImg={card.image}/>
                })
             }
            
            
        </div>
    )
}

export default DealerHand