import React, {Component} from 'react'
import  {Link} from 'react-router-dom';
import FormHeader from './FormHeader'

// import {showProps} from '../constants'

import '../css/Login.css'

class Login extends Component {
    state = { name: "",
              password: "" }
 
    changeHandler = (event) =>{
        // sets state.key's value to whatever is in input immediately
        this.setState({[event.target.name]: event.target.value})
    }

    // componentDidMount(){    //A change in state does not mean componentDidMount fires aagin
    //     console.log("Login mounted")
    // }

    render() {
        // console.log("render occurring") A rerender occurs every time state is changed
        return (
            <div id="login-container">
                <FormHeader/>
                <h1>Welcome! Please sign in.</h1>
                <form id="login" onSubmit={(e) => {this.props.submitHandler(e, this.state)}}>
                    <label>
                        Username<span> </span> 
                        <input name="name" value={this.state.name} onChange={(event) => this.changeHandler(event)}></input>
                    </label>
                    <br></br>
                    <label>
                        Password <span> </span>
                        <input name="password" type="password" value={this.state.password} onChange={(event) => this.changeHandler(event)}></input>
                    </label>
                    <br></br>
                    <input type="submit" value="Submit"></input>
                <h5>
                    Not a member?  
                <Link id='to-signup' to='/signup' >Sign Up!</Link>
                </h5>
                </form>
                {/* <button onClick={() => showProps(this)}>Console.log props</button> */}
                
                
            </div>
        );
    }
}



export default Login;