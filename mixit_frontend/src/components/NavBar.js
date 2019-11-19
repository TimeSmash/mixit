import React, {Component} from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {setDrinkToShow} from '../actions/drink-actions'
import "../css/NavBar.css"

import {BACKEND_URL} from '../constants'

class NavBar extends Component {

    state = { randomId: 0 }

    // getRandomDrink = () => {
    //     fetch(BACKEND_URL+'/random_drink')
    //     .then(res => res.json())
    //     .then(randomDrink => {
    //         console.log("random drink", randomDrink)
    //         this.props.history.push('/drinks/'+randomDrink.id)
    //         this.props.dispatch(setDrinkToShow(randomDrink))
    //     })
    // }

    goToRandomDrink = () => {
            // window.location.href="http://localhost:3008/drinks/"+this.state.randomId
            this.props.history.push('/drinks/'+this.state.randomId)
           
    }

    getRandomDrinkId = () =>{
        //Round down to a whole number, retrieve a number between the id range

        //This is straight from MDN, but I'm not going to have code in here I don't understand so:
        // First, take the loewst num in drinkIdRange and set as min
        let min = this.props.drinkIdRange.lowestId;
        // Next set highest num in drinkIdRange to max
        let max = this.props.drinkIdRange.highestId;
        //Use Math.floor to take decimals produced by interacting with Math.random() and round to lowest whole num
        // Multiply Math.random() by the difference of max and min BUT add 1 to min
        // Min has one added to it so we can actually get max number (if no +1 would get close to higest ID but never hit id cause round down) 
        
        //ex. range is 383+1-425 -> diff is 43 -> Math.random()*43 is ~28.816 -> 28.816+383 = 411.816 -floor-> 411
        // Now we use 41 as random Id
        let randomNum =  Math.floor(Math.random() * (max - min + 1)) + min;
        this.setState({randomId: randomNum})
    }
    
    //Get id ranges when App initializes, store in Redux store then get radnom num from store
    componentDidMount(){
        console.log("NavBar mounted")
        this.getRandomDrinkId()
    }

    render() {
        console.log("NavBar rendering, random id is "+this.state.randomId)
        return (
            <div className="NavBar">
                <span>HomePage Icon</span>
                <span>About</span>
                <NavLink className="nav-link" to="/drinks/all_drinks/1">All Drinks</NavLink>
                <NavLink className="nav-link" to="/alcohols">Alcohols</NavLink>
                {/* <NavLink className="nav-link" to="/random_drink" onClick={()=>{this.getRandomDrink()}}>Random Drink</NavLink> */}
                <NavLink className="nav-link" to={`/drinks/${this.state.randomId}`}
                onClick={()=>{this.goToRandomDrink()}}
                >Random Drink</NavLink>
                
                {/* Search Bar */}
                {/* Profile Crap */}
            </div>
        );
    }
}
function mapStateToProps(state){
    return {drinkToShow: state.drinkToShow, drinkIdRange: state.drinkIdRange}
  }

export default connect(mapStateToProps)(withRouter(NavBar));