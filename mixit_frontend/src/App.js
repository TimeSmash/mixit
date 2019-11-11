import React from 'react';
import './css/App.css';
import {Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
 

// COMPONENTS //
import Welcome from './components/Welcome.js';
import Login from './components/Login';
import SignUp from './components/SignUp';
import FourOFour from './components/FourOFour';
import ExampleFunctionalComponent from './components/ExampleFunctionalComponent';
import DrinksContainer from './components/DrinksContainer';

// OTHER

import {BACKEND_URL} from './constants.js'

class App extends React.Component {

  state = {user: {}}

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
      debugger
      localStorage.setItem("token", data.token);
      this.setState({user: data.user});
      // this.props.history.push('/welcome')
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
        // REDIRECT SOMEWHERE
      } else {
        // CAN DEFF BE MODIFIED
        // Redirect to Login but showing message?
        // Could have showInvalidMessage be boolean in state of App, pass as prosp to Login
        alert(data.invalid_message)
      }
    })
  }
  
  

  componentDidMount(){
    // Keep the user logged in!
    let token = localStorage.getItem("token")

    if (token){
      fetch(BACKEND_URL+"/retrieve_user",{
        headers: {"Authorization": token}
      })
      .then(res => res.json())
      .then(data => {
        this.setState({user: data.user}) //name of user is given from backend
        console.log("App state after cDM", this.state)
        // this.props.history.push('/welcome')
      })
    }
  }

  

  render(){
    // console.log("Store",this.props.store.getState())
    return (
      <div className="App">
        <Switch>
          <Route path='/login' render={() => <Login 
              submitHandler={this.login}
              />
              }
          />
          
          <Route path='/signup' render={() => <SignUp submitHandler={this.signUp}/>}/>
            {/* <Login submitHandler={this.login}/> */}
            {/* <SignUp submitHandler={this.signUp}/> */}
          
            <Route path ='/drinks' render={() => <DrinksContainer
            store={this.props.store}/>
              }
            />

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

function mapStateToProps(state){
  return {}
}

// function mapDispatchToProps(dispatch) { 	   
//   return{				
//       // when turnRed is called, dispatch the turnRed action to the store?
//       turnRed: () => { dispatch(turnRed()) },
//       turnBlue: () => { dispatch(turnBlue()) },
//       turnGreen: () => { dispatch(turnGreen()) }  
//   }								   
// }
export default connect(mapStateToProps)(App);
// export default App;
