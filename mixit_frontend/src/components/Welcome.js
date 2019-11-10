import React, {Component} from 'react'

class Welcome extends Component {
    state = { }

    BACKEND_URL = "http://localhost:3005"
        
         classyDrinks = () => {
            fetch(`${this.BACKEND_URL}/classy_drinks`)
            .then(res => res.json())
            .then(json => {
                console.log("returned from backend",json)
            })
        }

        
        
        render() {
            console.log("Welcome props", this.props)
        return (
            <div>
                {/* <h1>Welcome, ${this.props.user}</h1> */}
                <h1>Welcome!</h1>
            </div>
        );
    }
}

export default Welcome;