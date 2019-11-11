import React, {Component} from 'react'
import  {Link} from 'react-router-dom';

import {showProps} from '../constants'
class Login extends Component {
    state = { name: "",
              password: "" }
 
    changeHandler = (event) =>{
        // sets state.key's value to whatever is in input immediately
        this.setState({[event.target.name]: event.target.value})
    }

    render() {
        return (
            <div>
                <h1>Welcome! Please sign in.</h1>
                <form onSubmit={(e) => {this.props.submitHandler(e, this.state)}}>
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
                </form>
                <button onClick={() => showProps(this)}>Console.log props</button>
                <p>
                    Not a member? 
                <Link id='to-signup' to='/signup' style={{"textDecoration": "none"}}> Sign Up!</Link>
                </p>
                
                
            </div>
        );
    }
}



export default Login;