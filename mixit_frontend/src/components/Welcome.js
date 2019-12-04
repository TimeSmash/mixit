import React, {Component} from 'react'
import Top3 from './Top3'
import '../css/welcome.css'
import { BACKEND_URL } from '../constants'

class Welcome extends Component {
    state = { totalUsers: "",
              totalDrinks: "",
              top3Favorited: {}, }

    BACKEND_URL = "http://localhost:3005"
        
        getStats = () => {
            fetch(BACKEND_URL+'/stats')
            .then(res => res.json())
            .then(json => this.setState({totalUsers: json.user_count, totalDrinks: json.drink_count}))
        }

        getTopDrinks = () => {
            fetch(BACKEND_URL+'/top_drinks')
            .then(res => res.json())
            .then(json => this.setState({top3Favorited: json.top_favorited, top3Made: json.top_made, top3Int: json.top_interested }))
        }

        componentDidMount(){
            this.getStats()
            this.getTopDrinks()
        }

        render() {
            console.log("Welcome props", this.props)
            console.log("Welcome state",this.state)
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
                            <td><div className="statbox">
                                    <p className="big-number">{this.state.totalDrinks}</p>
                                    <p className="total">total drinks</p></div>
                            </td>
                            <td>
                                <div className="statbox">
                                    <p className="big-number">50</p>
                                    <p className="total">total users</p>
                                </div></td>
                        </tr>
                        <tr className="second-row">
                            <td>
                                <div className="statbox">
                            {Object.keys(this.state.top3Favorited).length ? <Top3 top3Drinks={this.state.top3Favorited}/> : null}
                            </div></td>
                            <td>
                                <div className="statbox">
                            {Object.keys(this.state.top3Favorited).length ? <Top3 top3Drinks={this.state.top3Favorited}/> : null}
                            </div></td>
                            <td>
                                <div className="statbox">
                            {Object.keys(this.state.top3Favorited).length ? <Top3 top3Drinks={this.state.top3Favorited}/> : null}
                            </div></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>3</td>
                            <td>3</td>
                        </tr>
                        </tbody>
                    </table>
                    <p>HEY</p>
                    <div className="statbox">
                            {Object.keys(this.state.top3Favorited).length ? <Top3 top3Drinks={this.state.top3Favorited}/> : null}
                            </div>
                </div>
            </div>
        );
    }
}

export default Welcome;