import React, {Component} from 'react'

class SignUp extends Component {
    state = { name: "",
              password: "",
              email: "",
              date: {} }

    changeHandler = (event) =>{
        // sets state.key's value to whatever is in input immediately
        this.setState({[event.target.name]: event.target.value})
    }
    render() {
        // console.log("SignUp props", this.props)
        return (
            //  
            <form onSubmit={(e) => {this.props.submitHandler(e, this.state)}}>
                <p>Thanks for signing up!</p>
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
                    <input type="submit" value="Sign Up"></input>
                </label>

            </form>
        );
    }
}

export default SignUp;