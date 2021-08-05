import React, {useState, useEffect, useContext} from 'react'
import { Link, Redirect } from 'react-router-dom'
import { HashLink as LinkHash } from 'react-router-hash-link';
import '../App.css'
import axios from 'axios'
import { UserContext } from '../Context/UserContext'


const styles = {
    landing: {
        // backgroundColor: `rgba(242,240,231, 1)`,
        backgroundColor: `aliceblue`,
        display: `flex`,
        flexDirection: `row`,
        flexFlow: 'row wrap',
    },
    smallDiv:{
        width: `30%`,
        padding: '4.209rem'
    },
    largeDiv:{
        display: 'flex',
        flexDirection: 'column',
        width: `70%`,
        padding: '4.209rem',
        minHeight: '100vh',
    },
    crewDiv:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: `stretch`,
        justifyContent: `space-between`,
        width: `70%`,
        padding: '4.209rem',
        // minHeight: '100vh',
    },
    hero:{
        minHeight: '75vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: `100%`,
        padding: '1.777rem'
    },
    buttonsDiv: {
        display: 'flex',
        flexDirection: 'row'
    },
    ul: {
        display: 'flex',
        marginTop: '1.777rem',
        justifyContent: 'center'
    },
    nav: {
        backgroundColor: `aliceblue`,
        width: '100%',
        padding:'1.777rem',
        position: 'sticky',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    marginTop: {
        marginTop: '4rem'
    },
    marginTopMid: {
        marginTop: '1.333rem'
    },
    marginTopSmall: {
        marginTop: '.5rem'
    },
    padding: {
        padding: '1.777rem'
    },
    aboutDiv: {
        width: `70%`,
        textAlign: 'center'
    },
    crewCard: {
        width: `30%`,
        padding: '2.369rem',
        textAlign: `center`,
        backgroundColor: `rgba(255,255,255, .7)`,
        borderRadius: '1rem'
        // border: `solid 1px black`

    },
    pics: {
        width: `85%`,
        borderRadius: `100%`
    },
    socials: {
        borderTop: 'solid 1px rgba(242,240,231, 1)',
        padding: `1.333rem`,
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '1.333rem'
    },
    marginRight: {
        marginRight: `1.777rem`
    }
}

const Landing = () => {

    const {loggedInUserContext, setLoggedInUserContext} = useContext(UserContext)

    useEffect(()=>{
        axios.get('https://blackjackmint.herokuapp.com/loggedInUser', {withCredentials: true})
        .then(res => {
            console.log(res.data)
            if(Object.keys(res.data).length > 0){
                setLoggedInUserContext(true)
            }
        })
    }, [])

    const logout = () => {        
                axios.get(`https://blackjackmint.herokuapp.com/logout`)
                .then(res => {
                    setLoggedInUserContext(false)
                  })
                .catch(() => console.log('failed to fetch from url'))
    }
    if(loggedInUserContext){
       return(
            <Redirect to='/table' />   
        )
    } else {

        return (
            <div style={styles.landing}>
                
                <nav style={styles.nav}>
                    <LinkHash to='/#rules'>
                            <button className='navBtns'>Learn the rules</button>
                    </LinkHash>
                </nav>
                <div style={styles.hero}>
                    <h1 style={styles.h1}>Welcome to MintJack!</h1>
                    <div style={styles.aboutDiv}>
                        <h1>{loggedInUserContext}</h1>
                        <p>The most refreshing blackjack game on the internet! </p>
                        
                        <ul style={styles.ul}>
                        
                            <li>               
                                <Link to='/login'>
                                    <a href='/login' className='navBtns' style={styles.marginRight}>Login</a>
                                </Link>
                            </li>
                            <li>
                                <Link to='/signup'>
                                    <a href='/signup' className='navBtns' style={styles.marginRight}>Create Account</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
    
                <div style={styles.smallDiv}>
                    <a id='rules'></a>
                    <h3 style={styles.marginTop}>Rules</h3>
                </div>
                <div style={styles.largeDiv}>
                    <div>
                        <h2 style={styles.marginTop}>HOW TO PLAY</h2>
                        <p>{`Equally well known as Twenty-One. The rules are simple, the play is thrilling, and there is opportunity for high strategy. In fact, for the expert player who mathematically plays a perfect game and is able to count cards, the odds are sometimes in that player's favor to win.
        
                        But even for the casual participant who plays a reasonably good game, the casino odds are less, making Blackjack one of the most attractive casino games for the player. While the popularity of Blackjack dates from World War I, its roots go back to the 1760s in France, where it is called Vingt-et-Un (French for 21). Today, Blackjack is the one card game that can be found in every American casino. As a popular home game, it is played with slightly different rules. In the casino version, the house is the dealer (a "permanent bank"). In casino play, the dealer remains standing, and the players are seated. The dealer is in charge of running all aspects of the game, from shuffling and dealing the cards to handling all bets. In the home game, all of the players have the opportunity to be the dealer (a "changing bank").`}</p>
                    </div>
                    <div>
                        <h2 style={styles.marginTop}>THE PACK</h2>
                        <p>{`The standard 52-card pack is used, but in most casinos several decks of cards are shuffled together. The six-deck game (312 cards) is the most popular. In addition, the dealer uses a blank plastic card, which is never dealt, but is placed toward the bottom of the pack to indicate when it will be time for the cards to be reshuffled. When four or more decks are used, they are dealt from a shoe (a box that allows the dealer to remove cards one at a time, face down, without actually holding one or more packs).`}</p>
                    </div>
                    <div>
                        <h2 style={styles.marginTop}>OBJECT OF THE GAME</h2>
                        <p>{`Each participant attempts to beat the dealer by getting a count as close to 21 as possible, without going over 21.`}</p>
                    </div>
                    <div>
                        <h2 style={styles.marginTop}>CARD VALUES/SCORING</h2>
                        <p>{`It is up to each individual player if an ace is worth 1 or 11. Face cards are 10 and any other card is its pip value.`}</p>
                    </div>
                    <div>
                        <h2 style={styles.marginTop}>BETTING</h2>
                        <p>{`Before the deal begins, each player places a bet, in chips, in front of them in the designated area. Minimum and maximum limits are established on the betting, and the general limits are from $2 to $500.`}</p>
                    </div>
                    <div>
                        <h2 style={styles.marginTop}>THE SHUFFLE AND CUT</h2>
                        <p>{`The dealer thoroughly shuffles portions of the pack until all the cards have been mixed and combined. The dealer designates one of the players to cut, and the plastic insert card is placed so that the last 60 to 75 cards or so will not be used. (Not dealing to the bottom of all the cards makes it more difficult for professional card counters to operate effectively.)`}</p>
                    </div>
                    <div>
                        <h2 style={styles.marginTop}>THE DEAL</h2>
                        <p>{`When all the players have placed their bets, the dealer gives one card face up to each player in rotation clockwise, and then one card face up to themselves. Another round of cards is then dealt face up to each player, but the dealer takes the second card face down. Thus, each player except the dealer receives two cards face up, and the dealer receives one card face up and one card face down. (In some games, played with only one deck, the players' cards are dealt face down and they get to hold them. Today, however, virtually all Blackjack games feature the players' cards dealt face up on the condition that no player may touch any cards.)`}</p>
                    </div>
                    <div>
                        <h2 style={styles.marginTop}>NATURALS</h2>
                        <p>{`If a player's first two cards are an ace and a "ten-card" (a picture card or 10), giving a count of 21 in two cards, this is a natural or "blackjack." If any player has a natural and the dealer does not, the dealer immediately pays that player one and a half times the amount of their bet. If the dealer has a natural, they immediately collect the bets of all players who do not have naturals, (but no additional amount). If the dealer and another player both have naturals, the bet of that player is a stand-off (a tie), and the player takes back his chips.`}
                        </p>
                        <p style={styles.marginTopSmall}>{`If the dealer's face-up card is a ten-card or an ace, they look at their face-down card to see if the two cards make a natural. If the face-up card is not a ten-card or an ace, they do not look at the face-down card until it is the dealer's turn to play.`}</p>
                    </div>
                    <div>
                        <h2 style={styles.marginTop}>THE PLAY</h2>
                        <p>{`The player to the left goes first and must decide whether to "stand" (not ask for another card) or "hit" (ask for another card in an attempt to get closer to a count of 21, or even hit 21 exactly). Thus, a player may stand on the two cards originally dealt to them, or they may ask the dealer for additional cards, one at a time, until deciding to stand on the total (if it is 21 or under), or goes "bust" (if it is over 21). In the latter case, the player loses and the dealer collects the bet wagered. The dealer then turns to the next player to their left and serves them in the same manner.`}
                        </p>
                        <p style={styles.marginTopSmall}>{`The combination of an ace with a card other than a ten-card is known as a "soft hand," because the player can count the ace as a 1 or 11, and either draw cards or not. For example with a "soft 17" (an ace and a 6), the total is 7 or 17. While a count of 17 is a good hand, the player may wish to draw for a higher total. If the draw creates a bust hand by counting the ace as an 11, the player simply counts the ace as a 1 and continues playing by standing or "hitting" (asking the dealer for additional cards, one at a time).`}</p>
                    </div>
                    <div>
                        <h2 style={styles.marginTop}>THE DEALER'S PLAY</h2>
                        <p>{`When the dealer has served every player, the dealers face-down card is turned up. If the total is 17 or more, it must stand. If the total is 16 or under, they must take a card. The dealer must continue to take cards until the total is 17 or more, at which point the dealer must stand. If the dealer has an ace, and counting it as 11 would bring the total to 17 or more (but not over 21), the dealer must count the ace as 11 and stand. The dealer's decisions, then, are automatic on all plays, whereas the player always has the option of taking one or more cards.`}
                        </p>
                    </div>
                    <div>
                        <h2 style={styles.marginTop}>SIGNALING INTENTIONS</h2>
                        <p>{`When a player's turn comes, they can say "Hit" or can signal for a card by scratching the table with a finger or two in a motion toward themselves, or they can wave their hand in the same motion that would say to someone "Come here!" When the player decides to stand, they can say "Stand" or "No more," or can signal this intention by moving their hand sideways, palm down and just above the table.`}
                        </p>
                    </div>
                    <div>
                        <h2 style={styles.marginTop}>SPLITTING PAIRS</h2>
                        <p>{`If a player's first two cards are of the same denomination, such as two jacks or two sixes, they may choose to treat them as two separate hands when their turn comes around. The amount of the original bet then goes on one of the cards, and an equal amount must be placed as a bet on the other card. The player first plays the hand to their left by standing or hitting one or more times; only then is the hand to the right played. The two hands are thus treated separately, and the dealer settles with each on its own merits. With a pair of aces, the player is given one card for each ace and may not draw again. Also, if a ten-card is dealt to one of these aces, the payoff is equal to the bet (not one and one-half to one, as with a blackjack at any other time).`}
                        </p>
                    </div>
                    <div>
                        <h2 style={styles.marginTop}>DOUBLING DOWN</h2>
                        <p>{`Another option open to the player is doubling their bet when the original two cards dealt total 9, 10, or 11. When the player's turn comes, they place a bet equal to the original bet, and the dealer gives the player just one card, which is placed face down and is not turned up until the bets are settled at the end of the hand. With two fives, the player may split a pair, double down, or just play the hand in the regular way. Note that the dealer does not have the option of splitting or doubling down.`}
                        </p>
                    </div>
                    <div>
                        <h2 style={styles.marginTop}>INSURANCE</h2>
                        <p>{`When the dealer's face-up card is an ace, any of the players may make a side bet of up to half the original bet that the dealer's face-down card is a ten-card, and thus a blackjack for the house. Once all such side bets are placed, the dealer looks at the hole card. If it is a ten-card, it is turned up, and those players who have made the insurance bet win and are paid double the amount of their half-bet - a 2 to 1 payoff. When a blackjack occurs for the dealer, of course, the hand is over, and the players' main bets are collected - unless a player also has blackjack, in which case it is a stand-off. Insurance is invariably not a good proposition for the player, unless they are quite sure that there are an unusually high number of ten-cards still left undealt.`}
                        </p>
                    </div>
                    <div>
                        <h2 style={styles.marginTop}>SETTLEMENT</h2>
                        <p>{`A bet once paid and collected is never returned. Thus, one key advantage to the dealer is that the player goes first. If the player goes bust, they have already lost their wager, even if the dealer goes bust as well. If the dealer goes over 21, the dealer pays each player who has stood the amount of that player's bet. If the dealer stands at 21 or less, the dealer pays the bet of any player having a higher total (not exceeding 21) and collects the bet of any player having a lower total. If there is a stand-off (a player having the same total as the dealer), no chips are paid out or collected.`}
                        </p>
                    </div>
                    <div>
                        <h2 style={styles.marginTop}>RESHUFFLING</h2>
                        <p>{`When each player's bet is settled, the dealer gathers in that player's cards and places them face up at the side against a clear plastic L-shaped shield. The dealer continues to deal from the shoe until coming to the plastic insert card, which indicates that it is time to reshuffle. Once that round of play is over, the dealer shuffles all the cards, prepares them for the cut, places the cards in the shoe, and the game continues.`}
                        </p>
                    </div>
                    <div>
                        <h2 style={styles.marginTop}>BASIC STRATEGY</h2>
                        <p>{`Winning tactics in Blackjack require that the player play each hand in the optimum way, and such strategy always takes into account what the dealer's upcard is. When the dealer's upcard is a good one, a 7, 8, 9, 10-card, or ace for example, the player should not stop drawing until a total of 17 or more is reached. When the dealer's upcard is a poor one, 4, 5, or 6, the player should stop drawing as soon as he gets a total of 12 or higher. The strategy here is never to take a card if there is any chance of going bust. The desire with this poor holding is to let the dealer hit and hopefully go over 21. Finally, when the dealer's up card is a fair one, 2 or 3, the player should stop with a total of 13 or higher.`}
                        </p>
                        <p style={styles.marginTopSmall}>
                            {`With a soft hand, the general strategy is to keep hitting until a total of at least 18 is reached. Thus, with an ace and a six (7 or 17), the player would not stop at 17, but would hit.`}
                        </p>
                        <p style={styles.marginTopSmall}>
                            {`The basic strategy for doubling down is as follows: With a total of 11, the player should always double down. With a total of 10, he should double down unless the dealer shows a ten-card or an ace. With a total of 9, the player should double down only if the dealer's card is fair or poor (2 through 6).`}
                        </p>
                        <p style={styles.marginTopSmall}>
                            {`For splitting, the player should always split a pair of aces or 8s; identical ten-cards should not be split, and neither should a pair of 5s, since two 5s are a total of 10, which can be used more effectively in doubling down. A pair of 4s should not be split either, as a total of 8 is a good number to draw to. Generally, 2s, 3s, or 7s can be split unless the dealer has an 8, 9, ten-card, or ace. Finally, 6s should not be split unless the dealer's card is poor (2 through 6).`}
                        </p>
                    </div>
                </div>
                <div style={styles.smallDiv}>
                    <h3 style={styles.marginTop}>Meet the Crew:</h3>
                </div>
                <div style={styles.crewDiv}>
                    <div style={styles.crewCard}>
                        <img style={styles.pics} src='https://res.cloudinary.com/drs4pvb1e/image/upload/v1627931075/MintJack/linkedIn_profile_image_smaller_jpeg_-_ALEX_ozbwns.jpg' alt='profile'>
                        </img>
                        <h4  style={styles.marginTopMid}>Alex Martinez</h4>
                        <p style={styles.marginTopMid}>Los Angeles, California</p>
                        <div style={styles.socials}>
                            <a  href='https://github.com/alexm323' 
                                target='_blank' rel="noreferrer">
                                    <i class="fab fa-github-alt"></i>
                            </a>
                            <a  href='https://twitter.com/DevWentDownToCA'
                                target='_blank' rel="noreferrer">
                                    <i class="fab fa-twitter"></i>
                            </a>
                            <a  href='https://www.linkedin.com/in/alejandro-martinez-jr/'
                                target='_blank' rel="noreferrer">
                                    <i class="fab fa-linkedin"></i>
                            </a>
                        </div>
                    </div>
                    <div style={styles.crewCard}>
                        <img style={styles.pics} src='https://res.cloudinary.com/drs4pvb1e/image/upload/v1627930554/MintJack/headShot_sq_600px_qucvqz.jpg' alt='profile'>
                        </img>
                        <h4  style={styles.marginTopMid}>Mario De Los Santos</h4>
                        <p style={styles.marginTopMid}>Miami, Florida</p>
                        <div style={styles.socials}>
                        <a  href='https://github.com/TelescopeThieves' 
                                target='_blank' rel="noreferrer">
                                    <i class="fab fa-github-alt"></i>
                            </a>
                            <a  href='https://twitter.com/TelescpeThieves'
                                target='_blank' rel="noreferrer">
                                    <i class="fab fa-twitter"></i>
                            </a>
                            <a  href='https://www.linkedin.com/in/mario-de-los-santos-dev/'
                                target='_blank' rel="noreferrer">
                                    <i class="fab fa-linkedin"></i>
                            </a>
                        </div>    
                    </div>
                    <div style={styles.crewCard}>
                        <img style={styles.pics} src='https://res.cloudinary.com/drs4pvb1e/image/upload/v1627930522/MintJack/ash-thumb_ba6619.png' alt='profile'>
                        </img>
                        <h4 style={styles.marginTopMid}> Ashtar Paniagua</h4>
                        <p style={styles.marginTopMid}>New York, NY</p>
                        <div style={styles.socials}>
                        <a  href='https://github.com/ashtarcodes' 
                                target='_blank' rel="noreferrer">
                                    <i class="fab fa-github-alt"></i>
                            </a>
                            <a  href='https://twitter.com/ashtarcodes'
                                target='_blank' rel="noreferrer">
                                    <i class="fab fa-twitter"></i>
                            </a>
                            <a  href='https://linkedin.com/in/ashtar-paniagua'
                                target='_blank' rel="noreferrer">
                                    <i class="fab fa-linkedin"></i>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}



export default Landing
