import React, {Component} from 'react'
import { connect } from 'react-redux';
import {BACKEND_URL} from '../constants'
import DrinkCard from './DrinkCard'

import {setDrinkToShow} from '../actions/drink-actions'

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
        let id = parseInt(url.substring(lastSlash+1))
        if (typeof id === "number" && (id+"" !== "NaN")){
            return id
        } else {
            return id + ""
        }
    }

    ingId = 1

    getAllSimilarDrinkArrays = () =>{
        //if the url's drink id doesn't match the store.drinkToShowId, favor the url
        if (this.idFromLocation() !== this.props.drinkToShow.id){
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

    getDrinkArrays = (id) =>{
        fetch(BACKEND_URL+'/similar_drinks/'+id)
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

    componentWillMount(){
        console.log("component about to mount")
    }

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

    componentWillUnmount() {
        console.log("component will unmount soon")
    }

    componentWillUpdate(){
        console.log("component going to update")
    }

    //could also have localStorage.setItem({drinkId: drink's id}) or ({drink: drink}) as onClick in DrinkCard
    //Then here we could localStorage.getState and either cdM with id or setState with whole drink obj

    

    makeDrinkCardsWithSame = (quality) =>{
        switch(quality){
            case "alcohol":
                return this.state.similarAlcoholDrinks.map(drink => <DrinkCard key={drink.id} drink={drink}/>)
            case "flavor":
                return this.state.similarFlavorDrinks.map(drink => <DrinkCard key={drink.id} drink={drink}/>)
            case "type":
                return this.state.similarTypeDrinks.map(drink => <DrinkCard key={drink.id} drink={drink}/>)
            case "generalities":
                return this.state.similarGeneralDrinks.map(drink => <DrinkCard key={drink.id} drink={drink}/>)
            default:
                return null
        }
    }

    reRenderIfStateDifferentThanStore = () => {
        
        // if (this.idFromLocation() !== this.props.drinkToShow.id) {
            
        //     console.log("store id", this.props.drinkToShow.id)
        //     console.log("url id", this.idFromLocation())
        //     // this.props.history.push('/'+this)
        //     fetch(BACKEND_URL+'/drinks/'+this.idFromLocation())
        //     .then(res => res.json())
        //     .then(json => {
        //         console.log("cDM",json)
        //         this.props.dispatch(setDrinkToShow(json.data.attributes))
        //         this.setState({drink: json.data.attributes})
        //     })
            

        //  } else 
        if (this.idFromLocation() !== this.props.drinkToShow.id){
            console.log("No match, id of url drink", this.idFromLocation())
            console.log("No match, store drink", this.props.drinkToShow)
            console.log("reRender fxn triggered, drink url and store no match")
            
            //get and set the right drink based on url
            fetch(BACKEND_URL+'/drinks/'+this.idFromLocation())
            .then(res => res.json())
            .then(json => {
                console.log("cDM",json)
                this.props.dispatch(setDrinkToShow(json.data.attributes))
                this.getDrinkArrays(this.idFromLocation())
            })
            // this.setState({drink: this.props.drinkToShow})
        } else{
            //if they match, get from store.drinkToShow
            console.log("Url and  and store.drink match")
            //ONLY set state (again) if the types array is 0 (at least 1 item in this array for all drinks as checked in backend)
            if (this.state.similarTypeDrinks.length ===0) {
                console.log("YOU SHOULD ONLY SEE THIS RERENDER ONCE \n")
                this.getDrinkArrays(this.props.drinkToShow.id)
            }
        }
    }
    
    render(){
        console.log("New RENDER at " +  (new Date()).getHours() + ":" + (new Date()).getMinutes() + ":" + (new Date()).getSeconds())
        console.log( this.idFromLocation() === null ? console.log(window.location.href) : "Rendering, id of url is", this.idFromLocation()
            )
        // debugger
        console.log("DrinkClass props DRINK TO SHOW",this.props.drinkToShow)
        // console.log("DrinkClass state",this.state)
        window.scrollTo(0, 0)
        if (window.scrollY === 0) {

        }
        {this.reRenderIfStateDifferentThanStore()}
        
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
                        
                        <div className="card-content" >
                            <ul style={{marginLeft:"17em",marginTop:"1em",position:"relative",fontSize:"1.5em",textAlign:"left"}}>
                                <li key={1}><span style={{fontWeight:"bolder"}}>Name: </span>{this.props.drinkToShow.name}</li>
                                
                                <li key={2}><span style={{fontWeight:"bolder"}}>Alcohols: </span>{this.ifNotUndefinedReturnData(this.props.drinkToShow.alcohols,"array").join(", ")}</li>

                                <li key={3}><span style={{fontWeight:"bolder"}}>Flavors: </span>{this.ifNotUndefinedReturnData(this.props.drinkToShow.flavors,"array").join(", ")}</li>

                                <li key={4}><span style={{fontWeight:"bolder"}}>Types: </span>{this.ifNotUndefinedReturnData(this.props.drinkToShow.types,"array").join(", ")}</li>

                                <li key={5}><span style={{fontWeight:"bolder"}}>Color: </span>{this.props.drinkToShow.color}</li>

                                <li key={6}><span style={{fontWeight:"bolder"}}>Ingredients: </span>
                                    <ul>{this.ifNotUndefinedReturnData(this.props.drinkToShow.recipe,"string").split(",").map( ingred => <li key={"ing"+this.ingId++} style={{fontSize:"0.7em"}}>{ingred}</li>)}</ul></li>

                                <li key={7}><span style={{fontWeight:"bolder"}}>Recipe Link: </span><a href={this.props.drinkToShow.recipe_url}style={{color:"blue"}} target="_blank">Click Here!</a></li>
                                <li key={8}><span style={{fontWeight:"bolder"}}>Additional Notes: </span>{this.props.drinkToShow.additional_notes}</li>
                            </ul>
                        </div> {/* end card-content */}
                    </div> {/* end card-stacked */}
                </div>{/* end card-horizontal (the whole card) */}
                {/* Consider making DRYer */}
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
