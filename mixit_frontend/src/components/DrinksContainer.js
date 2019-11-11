import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';

// ACTIONS
import {getAllDrinks} from "../actions/drink-actions";

// COMPONENTS
import AllDrinks from './AllDrinks';
import Drink from './Drink';
import FourOFour from './FourOFour';
import TestingInfinite from './TestingInfinite';
 
// OTHER
import {BACKEND_URL} from '../constants'
import {showProps} from '../constants'

class DrinksContainer extends Component {
    state = {  }

    hasAllDrinksArrayInStore = () =>{
        return !!this.props.allDrinks.length
    }

    // This is assuming it's fine to hold your whole database in state...
    // In the event that it isn't, modify cDM here, use the commented code in AllDrinks 
    componentDidMount(){
        if(this.hasAllDrinksArrayInStore()) {
            // If allDrinks already populated, Don't do anything
            return null
        } else {

            fetch(  BACKEND_URL+"/all_drinks")
            .then(res=> res.json())
            //     .then(json=> console.log("drinks received", json.data)) 
            // .then(json=> this.setState({allDrinks: json.data}))
            .then(json=> this.props.dispatch(getAllDrinks(json.data)))
        }
    } 

    render() {
        console.log("DC props", this.props)
        console.log("DC says store is", this.props.store.getState())
        
        return (
            <div>
                <h1>DrinksContainer</h1>
            <Switch>
                <Route path ='/drinks/all_drinks' render={()=><AllDrinks/>}/>
                <Route path ='/drinks/testing_infinite' render={()=><TestingInfinite/>}/>
                <Route path ='/drinks/:id' render={()=><Drink/>}/> 
                <Route component={FourOFour}/>
            </Switch>
            <button onClick={() => showProps(this)}>Console.log props (DrinksContainer)</button>
            <h1>End of DrinksContainer</h1>
            </div>
        );
    }
}


function mapStateToProps(state){
    return {allDrinks: state.allDrinks}
  }

//   import your action creators, give them to component as props
//   function mapDispatchToProps(dispatch) { 	   
//     return{				
//         // when turnRed is called, dispatch the turnRed action to the store?
//         getAllDrinks: () => { dispatch(getAllDrinks()) },
//          //When this.props.getAllDrinks is called, we dispatch the getAllDrinks action to the store?
//     }								   
// }


export default connect(mapStateToProps)(DrinksContainer);
// export default DrinksContainer;