import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom';


// ACTIONS


// COMPONENTS
import AllDrinks from './AllDrinks';
import DrinkClass from './DrinkClass';
import FourOFour from './FourOFour';
 
// OTHER
// import {showProps} from '../constants'

class DrinksContainer extends Component {
    

    render() {
        // console.log("DC props", this.props)
        // console.log("DC says store is", this.props.store.getState())
        
        return (
            <div>
                {/* <h1>DrinksContainer</h1> */}
            <Switch>
                {/* <Route path ='/drinks/all_drinks' render={()=><AllDrinks/>}/> */}
                <Route exact path ='/drinks/all_drinks/:page(\d+)' render={()=><AllDrinks startingPage={parseInt(window.location.href.substring(window.location.href.lastIndexOf('/')+1))}/>}/>
                {/* Use regex d+ to only include number routes */}
                <Route path ='/drinks/:id(\d+)' render={()=><DrinkClass />}/> 
                <Route path ='/drinks/random_drink' render={()=><DrinkClass/>}/> 
                
                <Route exact path='/drinks/' render={() =><AllDrinks startingPage={1}/>}/>
                <Route path = '/bad_drink' component={FourOFour}/>
                <Route component={FourOFour}/>
            </Switch>
            {/* <button onClick={() => showProps(this)}>Console.log props (DrinksContainer)</button> */}
            {/* <h1>End of DrinksContainer</h1> */}
            </div>
        );
    }
}

export default DrinksContainer;
