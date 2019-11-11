import React, {Component} from 'react'
import { connect } from 'react-redux';
import DrinkCard from './DrinkCard' 
class AllDrinks extends Component {
    state = { allDrinks: []  }
    
    
    // componentDidMount(){
    //     fetch(this.props.BACKEND_URL+"/all_drinks")
    // .then(res=> res.json())
    // .then(json=> this.setState({allDrinks: json.data}))
    // //     fetch(this.props.BACKEND_URL+"/all_drinks")
    // //     .then(res=> res.json())
    // //     .then(json=> console.log("thing", json.data)) 
    // } 
        
    render() {
        console.log(this.state.allDrinks)

        return (
                <div>
                <h1>All Drinks--</h1>

            <div className="card-deck">
                {this.state.allDrinks.map(drinkObj => <DrinkCard 
                key={drinkObj.id}
                drinkId={drinkObj.id}
                imgUrl={drinkObj.attributes.picture_url}
                name={drinkObj.attributes.name}
                />)}
            </div>
                </div>
        );
    }
}

function mapStateToProps(state){
    return {BACKEND_URL: state.BACKEND_URL}
  }
  export default connect(mapStateToProps)(AllDrinks);

// export default AllDrinks;