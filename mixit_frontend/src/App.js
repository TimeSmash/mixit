import React from 'react';
import './css/App.css';
import {Route, Switch, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
 

// COMPONENTS //
import Login from './components/Login';
import SignUp from './components/SignUp';
import FourOFour from './components/FourOFour';
import ExampleFunctionalComponent from './components/ExampleFunctionalComponent';
import DrinksContainer from './components/DrinksContainer';
import DrinkClass from './components/DrinkClass';
import About from './components/About';
import NavBar from './components/NavBar';

// Note: Reasoning for .js on Welcome
// For whatever reason, got error (Unhandled Rejection (InvalidCharacterError): Failed to execute 'createElement' on 'Document': The tag name provided is not a valid name)
// Adding .js for the extension remedies this issue for whatever reason
import Welcome from './components/Welcome.js';

// REDUX ACTION CREATORS

import {setDrinkIdRanges} from './actions/drink-actions'

// CONSTANTS

import {BACKEND_URL} from './constants.js'

class App extends React.Component {

  state = {user: "",
              formValid: true,
              formErrors: {} }

  // userLoggedIn = (AppStateUser) =>{
  //   if (Object.keys(AppStateUser).length>=1){
  //     console.log("logged in")
  //     }
  //   else { console.log("not logged in")
  //          }
  // }

exampleProps = "I got this sentence from App"

  signUp = (e, userObj) => {
    e.preventDefault()
    console.log("user stats", userObj)
    // debugger
    fetch(BACKEND_URL+"/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(
        {
          user: {
            name: userObj.name,
            password: userObj.password,
            email: userObj.email,
            birthday: userObj.birthday
          }
        }
      )
    })
    .then(res => res.json())
    .then(data => {
      console.log("data rec'd from Signup fetch", data)
      if (data.error_messages) {
        // alert("SOMETHING BAD IN FORM")
        console.log("Errors", Object.values(data.error_messages))
        this.setState({formValid: false, formErrors: data.error_messages})
      } else {
        
        localStorage.setItem("token", data.token);
        this.setState({user: data.user});
        this.props.history.push('/welcome')
        // return <Redirect to='/welcome'/>
      }
      // debugger
    })
  }

  login = (e, credentials) => {
    e.preventDefault()
    console.log("login credentials", credentials)
    fetch(BACKEND_URL+'/login', {
      method: "POST",
      headers: {"Content-Type": "application/json",
      "Accepts": "application/json"
      },
      body: JSON.stringify({
        name: credentials.name, //params[:name]: credentials.name
        password: credentials.password
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log("login retrieve", data)
      if (data.user){
        localStorage.setItem("token", data.token)
        this.setState({user: data.user})
        // REDIRECT SOMEWHERE LIKE WELCOME PAGE
      } else {
        // CAN DEFF BE MODIFIED
        // Redirect to Login but showing message?
        // Could have showInvalidMessage be boolean in state of App, pass as prosp to Login
        alert(data.invalid_message)
      }
    })
  }
  
  //DELETE IF NO WORK
  getRangeOfDrinkIdsIfNotInStore = () => {
    //use Object.keys.length because store.drinkIdRange may start off as {} (truthy)
    //BUT {} has no keys => length of keys is 0 => zero is falsy => activate
    // When app initializes, will start off as {} initially, so fire this in cDM to get immediately and have forever (persisted Redux)
    if (this.props.drinkIdRange && Object.keys(this.props.drinkIdRange).length) {
      // if we already have the range, no one cares
      return null
    } else {
      console.log("Retrieveing drink id range")
      //if we don't have it, get it from backend and dispatch to store
      fetch(BACKEND_URL+'/get_id_ranges')
      .then(res => res.json())
      .then(range=>{
        console.log("Drink id range retrieved: ",range)
        // should be {lowestId: #, highestId: # }
        this.props.dispatch(setDrinkIdRanges(range))
      })
    }
  }

  componentDidMount(){
    
    // Keep the user logged in!
    let token = localStorage.getItem("token")

    if (token && token!=="undefined"){
      fetch(BACKEND_URL+"/retrieve_user",{
        headers: {"Authorization": token}
      })
      .then(res => res.json())
      .then(data => {
        this.setState({user: data.user}) //name of user is given from backend
        console.log("App state after cDM", this.state)
        // this.props.history.push('/welcome')
      })
      //Then check if drinkIdRange is filled in using below fxn
      this.getRangeOfDrinkIdsIfNotInStore()
    } else {
      console.log("No token, MAKE REDIRECT FUNCTION TO LOGIN PAGE")
      // remove this later, using now for testing purposes
      this.getRangeOfDrinkIdsIfNotInStore()
    }
  }

  

  render(){
    // console.log("Store",this.props.store.getState())
    return (
      <div className="App">
        {localStorage.getItem("token")? <NavBar username={this.state.user}/> : null}
        <Switch>
          <Route path='/login' render={() => <Login 
              submitHandler={this.login}
              />
              }
          />
          
          <Route path='/signup' render={() => <SignUp submitHandler={this.signUp} formValid={this.state.formValid} formErrors={this.state.formErrors}/>}/>
          <Route path ='/welcome' render={() => <Welcome
            />}/>
          
            <Route path ='/drinks' render={() => <DrinksContainer
            store={this.props.store}/>
              }
            />
            <Route path ='/random_drink' render={() => <DrinkClass
            />}/>
            <Route path ='/about' render={() => <About
            />}/>

          <Route path ='/examplefunctionalcomponent' render={() => <ExampleFunctionalComponent 
            sentenceForEFC={this.exampleProps}
            store={this.props.store}
            />
            }
          />


            <Route component={FourOFour}/>
        </Switch>
      </div>
    )
    
  }
}

//remmeber this also bestows dispatch functionality
function mapStateToProps(state){
  return {drinkIdRange: state.drinkIdRange}
}

// function mapDispatchToProps(dispatch) { 	   
//   return{				
//       // when turnRed is called, dispatch the turnRed action to the store?
//       turnRed: () => { dispatch(turnRed()) },
//       turnBlue: () => { dispatch(turnBlue()) },
//       turnGreen: () => { dispatch(turnGreen()) }  
//   }								   
// }
export default connect(mapStateToProps)(withRouter(App));
// export default App;
