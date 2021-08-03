import axios from "axios";

class DeckAPI {
    constructor (deckId){
        this._deckId = deckId
    }
    get deckId () {
        return this._deckId;
    }
    static async fetchDeck(numDecks=1){
        const res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        this._deckId = res.data.deck_id;
        return res.data.deck_id;
    }
    static async drawCard(deckId,numOfCards=1){
            try {
                const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${numOfCards}`)
                console.log(res.data.cards)
            return res.data  
            } catch (err) {
                console.error(err)
            }                    
    }
    static async drawOne(deckId){
        try {
            
            const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
            console.log(res.data.cards[0])
            if (res){
                return res.data.cards[0]
            } else {
                const deckId = this.fetchDeck()
                return deckId;
            }
        } catch (err) {
            console.error(err)
        }
        
    }
    
    
}

export default DeckAPI;