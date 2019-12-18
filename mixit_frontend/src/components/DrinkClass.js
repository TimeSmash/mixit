import React, {Component} from 'react'
import { connect } from 'react-redux';
import {BACKEND_URL} from '../constants'
import {withRouter} from 'react-router-dom'
import DrinkCard from './DrinkCard'
import InteractionBar from './InteractionBar'
import Loader from './Loader' 

import {setDrinkToShow} from '../actions/drink-actions'
import {setDrinkSuggestions} from '../actions/drink-actions'

import "../css/DrinkClass.css"



class Drink extends Component{
    //THIS DOES NOT RERENDER OR REMOUNT UPON HITTING BACK/FORWARD IN BROWSER

    // by saying al the components of drink in state, I can avoid use of ifNotUndefinedReturnData
    state = {drink: {},
             similarGeneralDrinks:[],
             similarAlcoholDrinks:[],
             similarFlavorDrinks:[],
             similarTypeDrinks:[],
             loading: true
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
                    default:
                        return null
                }

            }
        }
    
    idFromLocation = () => {
        let url = window.location+""
        let lastSlash = url.lastIndexOf("/")
        let id = parseInt(url.substring(lastSlash+1))
        if (typeof id === "number" && (id+"" !== "NaN")){
            return id
        } else {
            return id + ""
        }
    }

    ingId = 1

    
    
    // componentWillMount(){
    //     console.log("DrinkClass component about to mount")
    // }


 
    // componentWillUnmount() {
    //     console.log("DrinkClass component will unmount soon")
    // }

    // componentWillUpdate(){
    //     console.log("DrinkClass component going to update")
    // }

    //Problem: Drink loads fine from Drink Card under related drinks arrays,
    // BUT when go back, drink info stays the same

    //could also have localStorage.setItem({drinkId: drink's id}) or ({drink: drink}) as onClick in DrinkCard
    //Then here we could localStorage.getState and either cdM with id or setState with whole drink obj

    

   

    makeDrinkCardsWithSame = (quality) =>{
        switch(quality){
            case "alcohol":
                if (this.props.drinkSuggestions.drinks_with_same_alc.length === 0) {
                    return <p>Nothing in our database matches yet. Stay tuned!</p>
                } else {
                    return this.props.drinkSuggestions.drinks_with_same_alc.map(drink => <DrinkCard key={drink.id} drink={drink}/>)
                }
            case "flavor":
                if (this.props.drinkSuggestions.drinks_with_same_flav.length === 0) {
                    return <p>Nothing in our database matches yet. Stay tuned!</p>
                } else {
                    return this.props.drinkSuggestions.drinks_with_same_flav.map(drink => <DrinkCard key={drink.id} drink={drink}/>)
                }
            case "type":
                if (this.props.drinkSuggestions.drinks_with_same_type.length === 0) {
                    return <p>Nothing in our database matches yet. Stay tuned!</p>
                } else {
                    return this.props.drinkSuggestions.drinks_with_same_type.map(drink => <DrinkCard key={drink.id} drink={drink}/>)
                }
            case "generalities":
                if (this.props.drinkSuggestions.similar_drinks.length === 0) {
                    return <p>Nothing in our database matches yet. Stay tuned!</p>
                } else {
                    return this.props.drinkSuggestions.similar_drinks.map(drink => <DrinkCard key={drink.id} drink={drink}/>)
                }
            default:
                return null
        }
    }

   

    reRenderIfStateDifferentThanStore = () => {
        
        
        if (this.idFromLocation() !== parseInt(this.props.drinkToShow.id)){
            //If the ID from url does not match store.drinkToShow.id, then get the drink/suggestions using id in fetch
            //This part covers if someone tries to get a drink by typing in its id in url
            console.log("No match, id of url drink", this.idFromLocation())
            console.log("No match, store drink", parseInt(this.props.drinkToShow.id))
            console.log("reRender fxn triggered, drink url and store no match (get drink and suggestions)")
            

             fetch(BACKEND_URL+'/get_drink_and_suggestions/'+this.idFromLocation())
            .then(res => res.json())
            .then(json => {
                
                console.log("Fetched data (drink/arrays) using url ID",json)
                if(json.status === undefined) {

                    console.log("fetched drink", JSON.parse(json.drink).data)
                    
                    this.props.dispatch(setDrinkToShow(JSON.parse(json.drink).data.attributes))
                    this.props.dispatch(setDrinkSuggestions(json.drink_suggestions))
                    return this.state.loading ? this.setState({loading:false}) : null
                } else {
                    //If you're hitting this, json.status="404" or something, then it means there was a 404, so redirect to 404
                    return this.props.history.push(`/drinks/bad_drink`)
                }
                
            })
            
            
        }  else if (this.idFromLocation() === parseInt(this.props.drinkToShow.id) && this.props.drinkSuggestions){
            console.log("URL ID and drinkToShow.id match")
            return this.state.loading ? this.setState({loading:false}) : null   
        }

        //  else if (this.state.similarTypeDrinks.length === 0) {
        //     //if they match, get check to see if drink suggestions are populated
        //     //ONLY set state (again) if the types array is 0 (at least 1 item in this array for all drinks as checked in backend)
            
        //     // this.getDrinkArrays(this.props.drinkToShow.id)
            
        //         console.log("Url and  and store.drink match")
        //         console.log("similarTypes length = 0, get suggestions and put in store and state")
        //         fetch(BACKEND_URL+'/get_drink_and_suggestions/'+this.idFromLocation())
        //     .then(res => res.json())
        //     .then(json => {
        //         console.log("Fetched data (drink/arrays) using url ID (typeLength = 0)",json)

        //         // this.props.dispatch(setDrinkToShow(JSON.parse(json.drink).data))
        //         this.props.dispatch(setDrinkSuggestions(json.drink_suggestions))
                
        //         this.setState({
        //             similarAlcoholDrinks: json.drink_suggestions.drinks_with_same_alc,
        //             similarTypeDrinks: json.drink_suggestions.drinks_with_same_type,
        //             similarFlavorDrinks: json.drink_suggestions.drinks_with_same_flav,
        //             similarGeneralDrinks: json.drink_suggestions.similar_drinks
        //         })
        //         // this.getDrinkArrays(this.idFromLocation())
        //     })
        //     } else if (//any suggestions include drink name
        //         this.state.drink.id !== this.props.drinkToShow.id
        //         || 
        //         this.state.similarTypeDrinks[0].name === this.props.drinkSuggestions.drinks_with_same_type[0].name
        //         ) {
        //             console.log("Url and store id matched, look at names in state and type")
        //             console.log(this.state.similarTypeDrinks[0].name)
        //             console.log(this.props.drinkSuggestions.drinks_with_same_type[0].name)
        //             alert("HEY")
        //             // this.setState({drink: this.props.drinkToShow})
        //             this.props.dispatch(setDrinkSuggestions(this.props.drinkToShow))
        //     } else {
        //         console.log("URL ID and store.drinkToShow ID match", this.idFromLocation() === parseInt(this.props.drinkToShow.id) )
        //         console.log("this.state.similarTypeDrinks is not empty", !!this.state.similarTypeDrinks)

        //         alert("HELLO")
        //     }}
    }

    
    render(){
        console.log("New DrinksClass RENDER at " +  (new Date()).getHours() + ":" + (new Date()).getMinutes() + ":" + (new Date()).getSeconds())
        console.log( this.idFromLocation() === null ? console.log(window.location.href) : "DrinkClass Rendering, id of url is", this.idFromLocation()
            )
            //Match is responsible for second rerender, due to https://github.com/ReactTraining/react-router/issues/5099
        // console.log("MATCH",this.props.match)
        // debugger
        // console.log("DrinkClass props DRINK TO SHOW",this.props.drinkToShow)
        // console.log("DrinkClass props DRINK SUGGESTIONS",this.props.drinkSuggestions)
        
        // console.log("DrinkClass state",this.state)
        window.scrollTo(0, 0)
        
        this.reRenderIfStateDifferentThanStore()
        
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
        <div id="wrapper">
            <div className="col s12 m7"style={{fontFamily:"Josefin Sans"}}>
               {this.state.loading ? 
                    <Loader/> :  
                // {/* Use ternary to check if id in url is same as one in store.drinkToShow.
                // If not, fetch the drink. The additional fetch should really only activate in the
                // case user did not click DrinkCard to get to DrinkClass (e.g. typed url in) */}
                
                // {/* //Clicking on link changes store's drinkToShow */}


                // {/* // Drink is fetched, set in state instead  */}
                <div>
                <h2 className="header">{this.props.drinkToShow.name}</h2>
                
                <div  id="card-horiz" className="card horizontal" style={{paddingBottom:"2%"}}>
                        
                    
                    <div className="card-image">
                        
                        <img src={this.props.drinkToShow.picture_url} 
                        style={{float: "left",borderRadius:"10px",marginLeft:"1em",marginTop:"3em",position: "absolute",borderTop:"1px solid lightgrey",height:"25em",width:"25em",overflow:"visible",boxShadow:"0 20px 10px rgba(0, 0, 0, 0.3), 0px 0px 0px rgba(0, 0, 0, 0.1) inset"}}
                        alt={this.props.drinkToShow.name}
                        ></img>
                        {/* <caption style={{clear:"right",border:"1px solid black",display:"inline"}}>loooooooooo</caption> */}
                    </div>

                    <div className="card-stacked" style={{minHeight:"27em"}}>
                        
                        <div className="card-content" >
                            <ul style={{marginLeft:"17em",marginTop:"1em",position:"relative",fontSize:"1.5em",textAlign:"left"}}>
                                <li key={1}><span style={{fontWeight:"bolder"}}>Name: </span>{this.props.drinkToShow.name}</li>
                                
                                <li key={2}><span style={{fontWeight:"bolder"}}>Alcohols: </span>{this.ifNotUndefinedReturnData(this.props.drinkToShow.alcohols,"array").join(", ")}</li>

                                <li key={3}><span style={{fontWeight:"bolder"}}>Flavors: </span>{this.ifNotUndefinedReturnData(this.props.drinkToShow.flavors,"array").join(", ")}</li>

                                <li key={4}><span style={{fontWeight:"bolder"}}>Types: </span>{this.ifNotUndefinedReturnData(this.props.drinkToShow.types,"array").join(", ")}</li>

                                <li key={5}><span style={{fontWeight:"bolder"}}>Color: </span>{this.props.drinkToShow.color}</li>

                                <li key={6}><span style={{fontWeight:"bolder"}}>Ingredients: </span>
                                    <ul>{this.ifNotUndefinedReturnData(this.props.drinkToShow.recipe,"string").split(",").map( ingred => <li key={"ing"+this.ingId++} style={{fontSize:"0.7em"}}>{ingred}</li>)}</ul></li>

                                <li key={7}><span style={{fontWeight:"bolder"}}>Recipe Link: </span><a href={this.props.drinkToShow.recipe_url}style={{color:"blue"}} target="_blank"rel="noopener noreferrer" >Click Here!</a></li>
                                <li key={8}><span style={{fontWeight:"bolder"}}>Additional Notes: </span>{this.props.drinkToShow.additional_notes}</li>
                            </ul>
                            <InteractionBar drink={this.props.drinkToShow}/>
                        </div> {/* end card-content */}
                    </div> {/* end card-stacked */}
                </div>{/* end card-horizontal (the whole card) */}
                
                {/* Consider making DRYer */}
                <div style={{display:"inline",textAlign:"left",clear:"both"}}>
                    <h1 style={{clear:"both"}}>If you like this, check out these drinks:</h1>
                    {this.makeDrinkCardsWithSame("generalities")}
                </div>
                <div style={{display:"inline",textAlign:"left",clear:"both"}}>
                    <h1 style={{clear:"both"}}>Other Drinks With {this.ifNotUndefinedReturnData(this.props.drinkToShow.alcohols,"array")[0]}</h1>
                    {this.makeDrinkCardsWithSame("alcohol")}
                </div>
                <div style={{display:"inline",textAlign:"left",clear:"both"}}>
                    <h1 style={{clear:"both"}}>Other {this.ifNotUndefinedReturnData(this.props.drinkToShow.flavors,"array")[0]} Drinks </h1>
                    {this.makeDrinkCardsWithSame("flavor")}
                </div>
                <div style={{display:"inline",textAlign:"left",clear:"both"}}>
                    <h1 style={{clear:"both"}}>Other {this.ifNotUndefinedReturnData(this.props.drinkToShow.types,"array")[0]} Drinks</h1>
                    {this.makeDrinkCardsWithSame("type")}
                </div>
                </div>
               }
            </div>
            </div>
        
    )
}

}
function mapStateToProps(state){
    return {drinkToShow: state.drinkToLoad, drinkSuggestions: state.drinkSuggestions}
  }
  
  export default connect(mapStateToProps)(withRouter(Drink));

// export default Drink;

// { this.idFromLocation() === this.props.drinkToShow.id ?
                
//     <div>
//     <h2 className="header">{this.props.drinkToShow.name}</h2>
    
//     <div className="card horizontal" style={{height:"auto",border:"5px solid yellow",paddingBottom:"5%"}}>

//         <div className="card-image">
//             <img src={this.props.drinkToShow.picture_url} style={{float: "left",borderRadius:"10px",marginLeft:"1em",marginTop:"3em",position: "absolute",borderTop:"1px solid lightgrey",height:"25em",width:"25em",overflow:"visible",boxShadow:"0 20px 10px rgba(0, 0, 0, 0.3), 0px 0px 0px rgba(0, 0, 0, 0.1) inset"}}></img>
//             {/* <caption style={{clear:"right",border:"1px solid black",display:"inline"}}>loooooooooo</caption> */}
//         </div>

//         <div className="card-stacked" style={{minHeight:"27em"}}>

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

//         <div className="card-image">
//             <img src={this.state.drink.picture_url} style={{float: "left",borderRadius:"10px",marginLeft:"1em",marginTop:"3em",position: "absolute",borderTop:"1px solid lightgrey",height:"25em",width:"25em",overflow:"visible",boxShadow:"0 20px 10px rgba(0, 0, 0, 0.3), 0px 0px 0px rgba(0, 0, 0, 0.1) inset"}}></img>
//             {/* <caption style={{clear:"right",border:"1px solid black",display:"inline"}}>loooooooooo</caption> */}
//         </div>

//         <div className="card-stacked" style={{minHeight:"27em"}}>
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
    // USING URL TO GET THE DRINK WITH FETCH
    //EASIER BUT SLOWER, NOT GREAT WAY OF TRANSFERRING DATA THROUGHOUT APP
    // componentDidMount() {
    //     // covers url and storw.drinkToShow id discrepancies (see render for more info)
    //     console.log("ComponentDidMount about to take action \n \n")
        
    //     //if url endpath is same as Redux's store id
    //     if (this.idFromLocation() === this.props.drinkToShow.id){
    //         //Then the data being presented is correct, only get the similar drink recommendations
    //         console.log("Url endpoint matches store.drinkToShow.id")
    //         return this.getAllSimilarDrinkArrays()
    //     } else if (this.idFromLocation() !== this.props.drinkToShow.id && typeof this.idFromLocation() === "number"){
    //         // Then fetch the right drink that matches with the url, and also get drink recommendations based off that
    //         console.log("Url doesn't match store.drinkToShow.id. URL ID",this.idFromLocation())
    //         fetch(BACKEND_URL+'/drinks/'+this.idFromLocation())
    //         .then(res => res.json())
    //         .then(json => {
    //             console.log("cDM",json)
    //             this.setState({drink: json.data.attributes})
    //         })
    //         this.getAllSimilarDrinkArrays()
    //     } else {
    //         console.log("CDM NO-SELL HIT")
    //         debugger
    //         this.getAllSimilarDrinkArrays()
    //     }
    //     console.log("componentDidMount finished")
    // }

    //
// When typing in URL:
// First realizes id != url
// triggers first dispatch -> rerender
// First dispatch not done even though component is rendering, so another rerender occurs because id and url still no match
// Correct Drink/id gotten, suggestions still wrong, now do second dispatch -> rerender
// 
//
//