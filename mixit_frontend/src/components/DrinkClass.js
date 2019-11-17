import React, {Component} from 'react'
import { connect } from 'react-redux';
import {BACKEND_URL} from '../constants'
import DrinkCard from './DrinkCard'

class Drink extends Component{


    // by saying al the components of drink in state, I can avoid use of ifNotUndefinedReturnData
    state = {drink: this.props.drinkToShow,
             similarGeneralDrinks: [],
             similarAlcoholDrinks: [],
             similarFlavorDrinks: [],
             similarTypeDrinks: []
            }

                     

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

    ingId = 1

    getAllSimilarDrinkArrays = () =>{
        if (this.idFromLocation() === this.props.drinkToShow.id){
            fetch(BACKEND_URL+'/similar_drinks/'+this.idFromLocation())
            .then(res => res.json())
            .then(json => {
                console.log(json)
                this.setState({similarAlcoholDrinks: json.drinks_with_same_alc,
                    similarFlavorDrinks: json.drinks_with_same_flav,
                    similarTypeDrinks: json.drinks_with_same_type,
                    similarGeneralDrinks: json.similar_drinks
                })
            })
        } else {
        fetch(BACKEND_URL+'/similar_drinks/'+this.props.drinkToShow.id)
            .then(res => res.json())
            .then(json => {
                console.log(json)
                this.setState({similarAlcoholDrinks: json.drinks_with_same_alc,
                    similarFlavorDrinks: json.drinks_with_same_flav,
                    similarTypeDrinks: json.drinks_with_same_type,
                    similarGeneralDrinks: json.similar_drinks
                })
            })
        }   
    }

    // USING URL TO GET THE DRINK WITH FETCH
    //EASIER BUT SLOWER, NOT GREAT WAY OF TRANSFERRING DATA THROUGHOUT APP
    componentDidMount() {
        // covers url and storw.drinkToShow id discrepancies (see render for more info)
        
        //if url endpath is same as Redux's store id
        if (this.idFromLocation() === this.props.drinkToShow.id){
            //Then the data being presented is correct, only get the similar drink recommendations
            
            return this.getAllSimilarDrinkArrays()
        } else if (typeof this.idFromLocation() === "number"){
            // Then fetch the right drink that matches with the url, and also get drink recommendations based off that
            fetch(BACKEND_URL+'/drinks/'+this.idFromLocation())
            .then(res => res.json())
            .then(json => {
                console.log("cDM",json)
                this.setState({drink: json.data.attributes})
            })
            this.getAllSimilarDrinkArrays()
        } else {
            console.log("Else")
        }
        
    }



    //could also have localStorage.setItem({drinkId: drink's id}) or ({drink: drink}) as onClick in DrinkCard
    //Then here we could localStorage.getState and either cdM with id or setState with whole drink obj

    // getDrinksWithSameFlavor = () =>{
    //     fetch(BACKEND_URL+'/drinks_with_same_flav/'+this.idFromLocation())
    //     .then(res => res.json())
    //     .then(json => {
    //         console.log("Drinks with same flav",json)
    //         this.setState({flavDrinks: json})
    //     })
    // }

    makeDrinkCardsWithSame = (quality) =>{
        switch(quality){
            case "alcohol":
                return this.state.similarAlcoholDrinks.map(drink => <DrinkCard drink={drink}/>)
            case "flavor":
                return this.state.similarFlavorDrinks.map(drink => <DrinkCard drink={drink}/>)
            case "type":
                return this.state.similarTypeDrinks.map(drink => <DrinkCard drink={drink}/>)
            case "generalities":
                return this.state.similarGeneralDrinks.map(drink => <DrinkCard drink={drink}/>)
        }
    }

    reRenderIfStateDifferentThanStore = () => {
        if (this.state.drink.name !== this.props.drinkToShow.name){
            // console.log("No match, state drink", this.state.drink)
            // console.log("No match, store drink", this.props.drinkToShow)
            this.getAllSimilarDrinkArrays(this.props.drinkToShow.id)
            this.setState({drink: this.props.drinkToShow})
        } else{
            // console.log("DrinkClass.state and store.drink match")
        }
    }
    
    render(){
        console.log("DrinkClass props DRINK TO SHOW",this.props.drinkToShow)
        console.log("DrinkClass state",this.state)
        {this.reRenderIfStateDifferentThanStore()}
        window.scrollTo(0, 0)
        // console.log("L",window.location.href)
        // if (this.idFromLocation() === this.props.drinkToShow.id){
        //     return null
        // } else {
        //     fetch(BACKEND_URL+'/drinks/'+this.idFromLocation())
        //     .then(res => res.json())
        //     .then(json => {
        //         console.log(json)
        //         this.setState({drink: json.data})
        //     })
        // }
        
    return (
            <div className="col s12 m7"style={{fontFamily:"Josefin Sans"}}>
                {/* Use ternary to check if id in url is same as one in store.drinkToShow.
                If not, fetch the drink. The additional fetch should really only activate in the
                case user did not click DrinkCard to get to DrinkClass (e.g. typed url in) */}
                
                {/* //Clicking on link changes store's drinkToShow */}


                {/* // Drink is fetched, set in state instead  */}
                <div>
                <h2 className="header">{this.props.drinkToShow.name}</h2>
                
                <div className="card horizontal" style={{fontFamily:"Josefin Sans",height:"auto",border:"5px solid yellow",paddingBottom:"5%"}}>
                    <div>FUCKING HELLO</div>
                    <div className="card-image">
                        <img src={this.props.drinkToShow.picture_url} style={{float: "left",borderRadius:"10px",marginLeft:"1em",marginTop:"3em",position: "absolute",borderTop:"1px solid lightgrey",height:"25em",width:"25em",overflow:"visible",boxShadow:"0 20px 10px rgba(0, 0, 0, 0.3), 0px 0px 0px rgba(0, 0, 0, 0.1) inset"}}></img>
                        {/* <caption style={{clear:"right",border:"1px solid black",display:"inline"}}>loooooooooo</caption> */}
                    </div>

                    <div className="card-stacked" style={{minHeight:"27em"}}>
                        {/* <h1 style={{marginTop:"-1em"}}>BITCH</h1> */}
                        <div className="card-content" >
                            <ul style={{marginLeft:"17em",marginTop:"1em",position:"relative",fontSize:"1.5em",textAlign:"left"}}>
                                <li><span style={{fontWeight:"bolder"}}>Name: </span>{this.props.drinkToShow.name}</li>
                                
                                <li><span style={{fontWeight:"bolder"}}>Alcohols: </span>{this.ifNotUndefinedReturnData(this.props.drinkToShow.alcohols,"array").join(", ")}</li>

                                <li><span style={{fontWeight:"bolder"}}>Flavors: </span>{this.ifNotUndefinedReturnData(this.props.drinkToShow.flavors,"array").join(", ")}</li>

                                <li><span style={{fontWeight:"bolder"}}>Types: </span>{this.ifNotUndefinedReturnData(this.props.drinkToShow.types,"array").join(", ")}</li>

                                <li><span style={{fontWeight:"bolder"}}>Color: </span>{this.props.drinkToShow.color}</li>

                                <li><span style={{fontWeight:"bolder"}}>Ingredients: </span><ul>{this.ifNotUndefinedReturnData(this.props.drinkToShow.recipe,"string").split(",").map( ingred => <li key={"ingredient-"+this.ingId++} style={{fontSize:"0.7em"}}>{ingred}</li>)}</ul></li>

                                <li><span style={{fontWeight:"bolder"}}>Recipe Link: </span><a href={this.props.drinkToShow.recipe_url}style={{color:"blue"}} target="_blank">Click Here!</a></li>
                                <li><span style={{fontWeight:"bolder"}}>Additional Notes: </span>{this.props.drinkToShow.additional_notes}</li>
                            </ul>
                        </div> {/* end card-content */}
                    </div> {/* end card-stacked */}
                </div>{/* end card-horizontal (the whole card) */}
                <div style={{display:"inline",textAlign:"left",clear:"both"}}>
                    <h1 style={{clear:"both"}}>If you like this, check out these drinks:</h1>
                    {this.makeDrinkCardsWithSame("generalities")}
                </div>
                <div style={{display:"inline",textAlign:"left",clear:"both"}}>
                    <h1 style={{clear:"both"}}>Other Drinks With {this.props.drinkToShow.alcohols[0]}</h1>
                    {this.makeDrinkCardsWithSame("alcohol")}
                </div>
                <div style={{display:"inline",textAlign:"left",clear:"both"}}>
                    <h1 style={{clear:"both"}}>Other {this.props.drinkToShow.flavors[0]} Drinks </h1>
                    {this.makeDrinkCardsWithSame("flavor")}
                </div>
                <div style={{display:"inline",textAlign:"left",clear:"both"}}>
                    <h1 style={{clear:"both"}}>Other {this.props.drinkToShow.types[0]} Drinks</h1>
                    {this.makeDrinkCardsWithSame("type")}
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

// { this.idFromLocation() === this.props.drinkToShow.id ?
                
//     <div>
//     <h2 className="header">{this.props.drinkToShow.name}</h2>
    
//     <div className="card horizontal" style={{height:"auto",border:"5px solid yellow",paddingBottom:"5%"}}>
//         <div>FUCKING HELLO</div>
//         <div className="card-image">
//             <img src={this.props.drinkToShow.picture_url} style={{float: "left",borderRadius:"10px",marginLeft:"1em",marginTop:"3em",position: "absolute",borderTop:"1px solid lightgrey",height:"25em",width:"25em",overflow:"visible",boxShadow:"0 20px 10px rgba(0, 0, 0, 0.3), 0px 0px 0px rgba(0, 0, 0, 0.1) inset"}}></img>
//             {/* <caption style={{clear:"right",border:"1px solid black",display:"inline"}}>loooooooooo</caption> */}
//         </div>

//         <div className="card-stacked" style={{minHeight:"27em"}}>
//             {/* <h1 style={{marginTop:"-1em"}}>BITCH</h1> */}
//             <div className="card-content" >
//                 <ul style={{marginLeft:"17em",marginTop:"1em",position:"relative",fontSize:"1.5em",textAlign:"left"}}>
//                     <li><span key={this.ingId++} style={{fontWeight:"bolder"}}>Name: </span>{this.props.drinkToShow.name}</li>
                    
//                     <li><span key={this.ingId++} style={{fontWeight:"bolder"}}>Alcohols: </span>{this.props.drinkToShow.alcohols.join(", ")}</li>

//                     <li><span key={this.ingId++} style={{fontWeight:"bolder"}}>Flavors: </span>{this.props.drinkToShow.flavors.join(", ")}</li>

//                     <li><span key={this.ingId++} style={{fontWeight:"bolder"}}>Types: </span>{this.props.drinkToShow.types.join(", ")}</li>

//                     <li><span key={this.ingId++} style={{fontWeight:"bolder"}}>Color: </span>{this.props.drinkToShow.color}</li>

//                     <li><span key={this.ingId++} style={{fontWeight:"bolder"}}>Ingredients: </span>
//                         <ul>{this.props.drinkToShow.recipe.split(",").map( ingred => <li key={"ingredient-"+this.ingId++} style={{fontSize:"0.7em"}}>{ingred}</li>)}
//                     </ul></li>

//                     <li><span key={this.ingId++} style={{fontWeight:"bolder"}}>Recipe Link: </span><a href={this.props.drinkToShow.recipe_url}style={{color:"blue"}} target="_blank">Click Here!</a></li>
//                     <li><span key={this.ingId++} style={{fontWeight:"bolder"}}>Additional Notes: </span>{this.props.drinkToShow.additional_notes}</li>
//                 </ul>
//             </div> {/* end card-content */}
//         </div> {/* end card-stacked */}
//     </div>{/* end card-horizontal (the whole card) */}
//     <div style={{display:"inline"}}>
//         {/* <p>Testing Text</p> */}
//         {this.makeDrinkCardsWithSame("alcohol")}
//     </div>
//     <div style={{display:"inline"}}>
//         {/* <p>Flavorng Text</p> */}
//         {this.flavorCardsWithSame("alcohol")}
//     </div>
//     <div style={{display:"inline"}}>
//         {/* <p>Testing TextTypep> */}
//         {this.type("alcohol")}
//     </div>
//     </div>
//     :
//     // Drink is fetched, set in state instead 
//     <div>
//     <h2 className="header">{this.state.drink.name}</h2>
    
//     <div className="card horizontal" style={{fontFamily:"Josefin Sans",height:"auto",border:"5px solid yellow",paddingBottom:"5%"}}>
//         <div>FUCKING HELLO</div>
//         <div className="card-image">
//             <img src={this.state.drink.picture_url} style={{float: "left",borderRadius:"10px",marginLeft:"1em",marginTop:"3em",position: "absolute",borderTop:"1px solid lightgrey",height:"25em",width:"25em",overflow:"visible",boxShadow:"0 20px 10px rgba(0, 0, 0, 0.3), 0px 0px 0px rgba(0, 0, 0, 0.1) inset"}}></img>
//             {/* <caption style={{clear:"right",border:"1px solid black",display:"inline"}}>loooooooooo</caption> */}
//         </div>

//         <div className="card-stacked" style={{minHeight:"27em"}}>
//             {/* <h1 style={{marginTop:"-1em"}}>BITCH</h1> */}
//             <div className="card-content" >
//                 <ul style={{marginLeft:"17em",marginTop:"1em",position:"relative",fontSize:"1.5em",textAlign:"left"}}>
//                     <li><span style={{fontWeight:"bolder"}}>Name: </span>{this.state.drink.name}</li>
                    
//                     <li><span style={{fontWeight:"bolder"}}>Alcohols: </span>{this.ifNotUndefinedReturnData(this.state.drink.alcohols,"array").join(", ")}</li>

//                     <li><span style={{fontWeight:"bolder"}}>Flavors: </span>{this.ifNotUndefinedReturnData(this.state.drink.flavors,"array").join(", ")}</li>

//                     <li><span style={{fontWeight:"bolder"}}>Types: </span>{this.ifNotUndefinedReturnData(this.state.drink.types,"array").join(", ")}</li>

//                     <li><span style={{fontWeight:"bolder"}}>Color: </span>{this.state.drink.color}</li>

//                     <li><span style={{fontWeight:"bolder"}}>Ingredients: </span><ul>{this.ifNotUndefinedReturnData(this.state.drink.recipe,"string").split(",").map( ingred => <li key={"ingredient-"+this.ingId++} style={{fontSize:"0.7em"}}>{ingred}</li>)}</ul></li>

//                     <li><span style={{fontWeight:"bolder"}}>Recipe Link: </span><a href={this.state.drink.recipe_url}style={{color:"blue"}} target="_blank">Click Here!</a></li>
//                     <li><span style={{fontWeight:"bolder"}}>Additional Notes: </span>{this.state.drink.additional_notes}</li>
//                 </ul>
//             </div> {/* end card-content */}
//         </div> {/* end card-stacked */}
//     </div>{/* end card-horizontal (the whole card) */}
//     <div style={{display:"inline",textAlign:"left"}}>
//         <h1>Drinks With Same Primary Alcohol</h1>
//         {this.makeDrinkCardsWithSame("alcohol")}
//     </div>
//     <div style={{display:"inline",textAlign:"left"}}>
//         <h1>Drinks With Same Primary Flavor</h1>
//         {this.makeDrinkCardsWithSame("flavor")}
//     </div>
//     <div style={{display:"inline",textAlign:"left"}}>
//         <h1>Drinks With Same Primary Type</h1>
//         {this.makeDrinkCardsWithSame("type")}
//     </div>
//     </div>
//     }
// </div>
