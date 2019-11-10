import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom';
import AllDrinks from './AllDrinks';

class DrinksContainer extends Component {
    state = {  }
    render() {
        return (
            <div>
                {/* <h1>DrinksContainer</h1> */}
            <Switch>
                
                {/* <Route path ='drinks/:id' render={()=><Drink prop={}/>}/>  */}
                <Route path ='/drinks/all_drinks' render={()=><AllDrinks/>}/>
            </Switch>
            {/* <h1>End of DrinksContainer</h1> */}
            </div>
        );
    }
}

export default DrinksContainer;