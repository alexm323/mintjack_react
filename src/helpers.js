function parseCardValue(val){
    const faceCards = ['KING','QUEEN','JACK']
    const Ace = ['ACE']
    if (faceCards.includes(val)){
        return 10
    }else if(Ace.includes(val)){
        return 11
    }else{
        return parseInt(val)
    }

}
function initializeCardData(cards,playerCount){
    let playerCards = []
    let dealerCards = []
    for (let i = 0; i < cards.length/2; i++) {
        if(i === playerCount){
            dealerCards.push(cards[i])
            dealerCards.push(cards[cards.length - 1] )
        }else{
            let pCards = []
            pCards.push(cards[i])
            pCards.push(cards[i + cards.length/2])
            playerCards.push(pCards)
        }
        
    }
    return [dealerCards,playerCards]

}
module.exports = {
    parseCardValue,
    initializeCardData
}