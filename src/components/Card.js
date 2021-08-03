import React from 'react'
const styles = {
    card:{
        height:'200px',
        width:'125px'
    }
}
function Card({cardImg,cardName}) {
    return (
            <img 
            style={styles.card}
            src={cardImg} 
            alt={cardName} />
    )
}

export default Card
