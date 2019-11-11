import React, {Component} from 'react'
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

import DrinkCard from './DrinkCard' 

import {showProps} from '../constants'

class AllDrinks extends Component {
    state = { allDrinks: []  }
    


    // Use this if storing drinks database in store is not okay
    // If doing above, then change line 27 from this.props.allDrinks to this.state.allDrinks

    // componentDidMount(){
    //     fetch(this.props.BACKEND_URL+"/all_drinks")
    // .then(res=> res.json())
    // .then(json=> this.setState({allDrinks: json.data}))
    // //     .then(json=> console.log("thing", json.data)) 

        

    render() {
        // console.log(this.state.allDrinks)
        
        return (
                <div>
                <h1>All Drinks--</h1>

            <div className="card-deck">
                
                {this.props.allDrinks.map(drinkObj => <DrinkCard 
                key={drinkObj.id}
                drinkId={drinkObj.id}
                imgUrl={drinkObj.attributes.picture_url}
                name={drinkObj.attributes.name}
                />)}
            </div>
            <button onClick={() => showProps(this)}>Console.log props (AllDrinks)</button>
                </div>
        );
    }
}

function mapStateToProps(state){
    return {allDrinks: state.allDrinks}
  }
  export default connect(mapStateToProps)(AllDrinks);

// export default AllDrinks;