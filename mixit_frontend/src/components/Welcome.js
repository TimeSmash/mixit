import React, {Component} from 'react'

import '../css/welcome.css'
import { BACKEND_URL } from '../constants'
class Welcome extends Component {
    state = { }

    BACKEND_URL = "http://localhost:3005"
        
        getStats = () => {
            fetch(BACKEND_URL+'/stats')
            .then(res => res.json())
            .then(json => this.setState({totalUsers: json.user_count, totalDrinks: json.drink_count}))
        }

        
        componentDidMount(){
            this.getStats()
        }

        render() {
            // console.log("Welcome props", this.props)
        return (
            <div className="welcome">
                <div className="welcome-chunk">
                    <h1>Welcome to <span style={{fontFamily:"Leckerli One"}}>Mixit</span>, {localStorage.getItem("user")}!</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>                    
                    <table>
                        <tbody>
                        <tr className="first-row">
                            <td>
                                <div className="statbox">
        <p className="big-number">{this.state.totalUsers}</p>
                                    <p className="total">total users</p>
                                </div>
                            </td>
                            <td><div className="statbox"><p className="big-number">{this.state.totalDrinks}</p>
                                    <p className="total">total drinks</p></div></td>
                            <td><div className="statbox"><p className="big-number">50</p>
                                    <p className="total">total users</p></div></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>2</td>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>3</td>
                            <td>3</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Welcome;