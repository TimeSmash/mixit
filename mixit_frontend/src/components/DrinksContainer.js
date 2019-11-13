import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom';


// ACTIONS


// COMPONENTS
import AllDrinks from './AllDrinks';
import Drink from './Drink';
import FourOFour from './FourOFour';
 
// OTHER
import {showProps} from '../constants'

class DrinksContainer extends Component {
    state = {  }

    render() {
        // console.log("DC props", this.props)
        // console.log("DC says store is", this.props.store.getState())
        
        return (
            <div>
                <h1>DrinksContainer</h1>
            <Switch>
                <Route path ='/drinks/all_drinks' render={()=><AllDrinks/>}/>
                <Route path ='/drinks/:id' render={()=><Drink/>}/> 
                <Route component={FourOFour}/>
            </Switch>
            <button onClick={() => showProps(this)}>Console.log props (DrinksContainer)</button>
            <h1>End of DrinksContainer</h1>
            </div>
        );
    }
}

export default DrinksContainer;
