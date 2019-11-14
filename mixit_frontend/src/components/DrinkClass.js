import React, {Component} from 'react'
import { connect } from 'react-redux';
import {BACKEND_URL} from '../constants'

class Drink extends Component{

    state = {drink: {
                    name: "", alcohols: [],
                     flavors: [],
                     types: [],
                     color: "",
                     picture_url:"",
                     picture_credit: "",
                     recipe: "",
                     recipe_url:""}}

                     

    ifNotUndefinedReturnData = (data, datatype) =>{
        if (data !== undefined){
            return data
        } else{
                switch (datatype){
                    case "array":
                        return []
                    case "object":
                        return {}
                    case "string":
                        return ""
                    case "number":
                        return 0
                    case "boolean":
                        return false
                }

            }
        }
    
    idFromLocation = () => {
        let url = window.location+""
        let lastSlash = url.lastIndexOf("/")
        let id = url.substring(lastSlash+1)
        return id
    }

    
    // USING URL TO GET THE DRINK WITH FETCH
    //EASIER BUT SLOWER, NOT GREAT WAY OF TRANSFERRING DATA THROUGHOUT APP
    componentDidMount() {
        fetch(BACKEND_URL+'/drinks/'+this.idFromLocation())
        .then(res => res.json())
        .then(json => {
            console.log(json)
            this.setState({drink: json.data.attributes})
        })
    }

    render(){
        console.log("DrinkClass props BETTER HAVE DRINK TO SHOW",this.props)
        console.log("L",window.location.href)
    return (
            <div className="col s12 m7">
                <h2 className="header">{this.state.drink.name}</h2>
                
                <div className="card horizontal" style={{height:"auto",border:"5px solid yellow",paddingBottom:"5%"}}>
                    <div className="card-image">
                        <img src={this.state.drink.picture_url} style={{float: "left",marginTop:"2em",position: "absolute",border:"1px solid black",height:"25em",width:"25em",overflow:"visible"}}></img>
                        {/* <caption style={{clear:"right",border:"1px solid black",display:"inline"}}>loooooooooo</caption> */}
                    </div>

                    <div className="card-stacked" style={{border:"1px solid black",minHeight:"27em"}}>
                        {/* <h1 style={{marginTop:"-1em"}}>BITCH</h1> */}
                        <div className="card-content" >
                            <ul style={{border:"1px solid red",marginLeft:"16em",position:"absolute",fontSize:"1.5em",textAlign:"left"}}>
                                <li><span style={{fontWeight:"bolder"}}>Name: </span>{this.state.drink.name}</li>
                                
                                <li><span style={{fontWeight:"bolder"}}>Alcohols: </span>{this.state.drink.alcohols.join(", ")}</li>

                                <li><span style={{fontWeight:"bolder"}}>Flavors: </span>{this.state.drink.flavors.join(", ")}</li>

                                <li><span style={{fontWeight:"bolder"}}>Types: </span>{this.state.drink.types.join(", ")}</li>

                                <li><span style={{fontWeight:"bolder"}}>Color: </span>{this.state.drink.color}</li>

                                <li><span style={{fontWeight:"bolder"}}>Ingredients: </span><ul>{this.state.drink.recipe.split(",").map( ingred => <li style={{fontSize:"0.7em"}}>{ingred}</li>)}</ul></li>

                                <li><span style={{fontWeight:"bolder"}}>Recipe Link: </span><a href={this.state.drink.recipe_url}style={{color:"blue"}} target="_blank">Click Here!</a></li>
                                <li><span style={{fontWeight:"bolder"}}>Additional Notes: </span>{this.state.drink.additional_notes}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        
    )
}

}
function mapStateToProps(state){
    return {drinkToShow: state.drinkToLoad}
  }
  
  export default connect(mapStateToProps)(Drink);

// export default Drink;

// {/* {console.log("Drink props",props)} */}
//  {/* <p>Drink Class</p>
//             <h1>{this.state.drink.name}</h1>
//             <img src={this.state.drink.picture_url} alt={this.state.drink.name}></img>
//             <p>Image credit: {this.state.drink.picture_credit}</p>
//             <p>Alcohols: {this.ifNotUndefinedReturnData(this.state.drink.alcohols,"array").join(", ")}</p>
//             <p>Color:{this.state.drink.color}</p>
//             <p>Types: {this.ifNotUndefinedReturnData(this.state.drink.types,"array").join(", ")}</p>
//             <p>Flavors: {this.ifNotUndefinedReturnData(this.state.drink.flavors,"array").join(", ")}</p>
//             <p>Recipe: {this.state.drink.recipe}</p> {/*WORK ON THIS */}
//             {/* <span>Recipe Link: </span><a target="_blank" href={this.state.drink.recipe_url}>{this.state.drink.recipe_url}</a>
//             <p>Additional Notes: {this.state.drink.additional_notes}</p> */}
//         {/* <button onClick={() => console.log("Drink props",this.props)}>Console.log props (Drink)</button>
//         </div> */}