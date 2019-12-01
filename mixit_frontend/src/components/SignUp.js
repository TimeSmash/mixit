import React, {Component} from 'react'
import FormErrors from './FormErrors'
import  {Link} from 'react-router-dom';
import FormHeader from './FormHeader'

import '../css/Signup.css'

class SignUp extends Component {
    state = { name: "",
              password: "",
              email: "",
              date: {}
            } 

    changeHandler = (event) =>{
        // sets state.key's value to whatever is in input immediately
        this.setState({[event.target.name]: event.target.value})
    }
    render() {
        const { formValid, formErrors, submitHandler} = this.props;
        // console.log("SignUp props", this.props)
        return (
            //  
            <div id="signup-container">
                <form id="signup" onSubmit={(e) => {submitHandler(e, this.state)}}>
                    <FormHeader/>
                {formValid ? null
                // <p>Form Valid is true</p>
                : <FormErrors errors={formErrors} fromSignup={true}/>}
                    <h5>Thanks for signing up!</h5>
                    <h5>Please fill out the following information.</h5>
                    <label>
                        Username
                        <input name ="name" type="text" placeholder="Username" onChange={(event) => this.changeHandler(event)}></input>
                    </label>
                    <br></br>

                    <label>
                        Password
                        <input name ="password" type="password" placeholder="Password" onChange={(event) => this.changeHandler(event)}></input>
                    </label>
                    <br></br>

                    <label>
                        Email
                        <input name ="email" type="email" placeholder="Email" onChange={(event) => this.changeHandler(event)}></input>
                    </label>
                    <br></br>

                    <label>
                        Birthday
                        <input name ="birthday" type="date" onChange={(event) => this.changeHandler(event)}></input>
                    </label>
                    <br></br>

                    <label>
                        <input id="signup-submit" type="submit" value="Sign Up"></input>
                    </label>
                    <h5>
                        Already a member?<Link id='to-login' to='/login' >Log in!</Link>
                    </h5>
                </form>
            </div>
        );
    }
}

export default SignUp;