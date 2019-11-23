import React, {Component} from 'react'

// COMPONENTS //


// IMAGES //
import HeartButton from '../images/HeartButton.png'
import HeartButtonActive from '../images/HeartButtonActive.png'
import MadeButton from '../images/MadeButton.png'
import MadeButtonActive from '../images/MadeButtonActive.png'
import InterestedButton from '../images/InterestedButton.png'
import InterestedButtonActive from '../images/InterestedButtonActive.png'

import {BACKEND_URL} from '../constants.js'

import '../css/InteractionBar.css'
class InteractionBar extends Component {
    state = { favorited: false,
              made: false,
              interested:false,
              }

    toggleStatusOf = (quality) => {
        fetch(BACKEND_URL+`/${quality}_toggle`+this.props.drink.id)
        .then(res => res.json)
        .then(json => console.log(json))
    }

    // showProperIconFor = (quality) => {
    //     switch 
    // }

    render() {
        console.log("InteractionBar props",this.props)
        return (
            <div className="interactive-container">
                <img className="interact-button" 
                    src={HeartButton} 
                    onClick={()=>{this.toggleStatusOf("favorite")}}
                ></img>
                <img className="interact-button" src={MadeButton} onClick={()=>{this.setState({heartImg: "Heart2"})}} ></img>
                <img className="interact-button" src={InterestedButton} onClick={()=>{this.setState({heartImg: "Heart2"})}} ></img>
            </div>
        );
    }
}

export default InteractionBar;