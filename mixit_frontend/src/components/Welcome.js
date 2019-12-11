import React, {Component} from 'react'
import Top3 from './Top3'
import Loader from './Loader'
import { BACKEND_URL } from '../constants'

import '../css/welcome.css'
class Welcome extends Component {
    state = { totalUsers: "",
              totalDrinks: "",
              top3Favorited: {},
              top3Made: {},
              top3Interested: {},
              loading1: true,
              loading2: true }

    BACKEND_URL = "http://localhost:3005"
        
        getStats = () => {
            fetch(BACKEND_URL+'/stats')
            .then(res => res.json())
            .then(json => this.setState({totalUsers: json.user_count, totalDrinks: json.drink_count, loading1: false}))
        }

        getTopDrinks = () => {
            fetch(BACKEND_URL+'/top_drinks')
            .then(res => res.json())
            .then(json => this.setState({top3Favorited: json.top_favorited, top3Made: json.top_made, top3Int: json.top_interested, loading2: false }))
        }

        componentDidMount(){
            this.getStats()
            this.getTopDrinks()
        }

        render() {
            console.log("Welcome props", this.props)
            console.log("Welcome state",this.state)
            window.scrollTo(0,0);
        return (
            <div className="welcome">
                
                <div className="welcome-chunk">
                {this.state.loading1 === false && this.state.loading2 === false ? 
                <div>
                    <h1>Welcome to <span style={{fontFamily:"Leckerli One"}}>Mixit</span>, {localStorage.getItem("user")}!</h1>
                    <h4>Welcome! Here are some of the most recent statistics for Mixit:</h4>                    
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
                                <div className="statbox" id="stat-logo">
                                    <h3 className="stats"><em><span style={{fontFamily:"Leckerli One"}}>Mixit</span> Stats</em></h3>
                                    
                                </div></td>
                        </tr>
                        <tr className="second-row">
                            <td>
                                <div className="statbox">
                            {Object.keys(this.state.top3Favorited).length ? <Top3 type={"Favorited"} top3Drinks={this.state.top3Favorited}/> : null}
                            </div></td>
                            <td>
                                <div className="statbox">
                            {Object.keys(this.state.top3Favorited).length ? <Top3 type={"Made"} top3Drinks={this.state.top3Made}/> : null}
                            </div></td>
                            <td>
                                <div className="statbox">
                            {Object.keys(this.state.top3Favorited).length ? <Top3 type={"Interested"} top3Drinks={this.state.top3Int}/> : null}
                            </div></td>
                        </tr>
                        {/* <tr>
                            <td>3</td>
                            <td>3</td>
                            <td>3</td>
                        </tr> */}
                        </tbody>
                    </table>
                    </div>
        : <Loader/>}
                </div>
            </div>
        );
    }
}

export default Welcome;