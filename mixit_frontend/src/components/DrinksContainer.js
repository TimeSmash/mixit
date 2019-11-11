import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';

import {getAllDrinks} from "../actions/drink-actions";

// COMPONENT IMPORTS
import AllDrinks from './AllDrinks';
import Drink from './Drink';
import FourOFour from './FourOFour';
 
class DrinksContainer extends Component {
    state = {  }

    // componentDidMount(){
    //     if(!!this.props.allDrinks.length) {
    //         // Don't do anything
    //     } else {

    //         fetch(this.props.BACKEND_URL+"/all_drinks")
    //         .then(res=> res.json())
    //         //     .then(json=> console.log("drinks received", json.data)) 
    //         .then(json=> this.setState({allDrinks: json.data}))
    //         .then(data=> this.props.getAllDrinks(data))
    //     }
    // } 

    render() {
        console.log("DC props", this.props)
        return (
            <div>
                <h1>DrinksContainer</h1>
            <Switch>
                <Route path ='/drinks/all_drinks' render={()=><AllDrinks/>}/>
                <Route path ='/drinks/:id' render={()=><Drink 
                showProps={this.props.showProps}/>}/> 
                <Route component={FourOFour}/>
                {/* <Route path ='/' render={()=><FourOFour/>}/> */}
            </Switch>
            <button onClick={() => this.props.showProps(this)}>Console.log props (DrinksContainer)</button>
            <h1>End of DrinksContainer</h1>
            </div>
        );
    }
}


function mapStateToProps(state){
    return {showProps: state.showProps, allDrinks: state.allDrinks}
  }

//   import your action creators, give them to component as props
  function mapDispatchToProps(dispatch) { 	   
    return{				
        // when turnRed is called, dispatch the turnRed action to the store?
        getAllDrinks: () => { dispatch(getAllDrinks()) },
         //When this.props.getAllDrinks is called, we dispatch the getAllDrinks action to the store?
    }								   
}


export default connect(mapStateToProps,mapDispatchToProps)(DrinksContainer);
// export default DrinksContainer;