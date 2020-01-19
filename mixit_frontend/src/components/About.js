import React, {Component} from 'react'
import '../css/About.css'

class About extends Component {
    //TURN THIS INTO SLC?

    render() {
        window.scroll(0,0)
        return (
            <div className="about">
                <div className="about-links-container">
                    <span className="about-link-separator">■</span>
                    <h3 className="about-link"><a href="#overview">Overview</a></h3>
                    <span className="about-link-separator">■</span>
                    <h3 className="about-link"><a href="#explore">Exploring a Drink</a></h3>
                    <span className="about-link-separator">■</span>
                    <h3 className="about-link"><a href="#utilized-software">Utilized Software</a></h3>
                    <span className="about-link-separator">■</span>
                </div>

                <div id="overview" className="about-chunk" >
                    <h3>Overview</h3>
                        <p>
                            Welcome to Mixit! This application is for those interested in the field of mixology. 
                            Feel free to peruse through the library of all of our drinks, or simply hit the Random Drink link
                            to load one of the drinks in our database with ease. 
                        </p>
                        <br></br>
                        <p>
                            Using this application, you can favorite a drink, mark a drink as having been made. 
                            You can also choose to review a drink as well.
                        </p>
                        <br></br>
                        {/* <p>
                            We also have an in progress alcohol section, where you can learn more about the alcohols that make up each drink. 
                        </p> */}
                        <br></br>
                        <p>
                            We hope that by using this application, your interest in mixology will grow and you will have dozens of new alcoholic experiences ahead of you. 
                        </p>
                </div>

                <div id="explore" className="about-chunk" >
                    <h3>Exploring a Drink</h3>
                        <p>
                            In this section, we will discuss the various aspects of a drink's page.
                        </p>
                        <p>
                            Each drink has various aspects to it. They are:
                        </p>
                        <ul>    
                            <li><span className="about-stat">Name</span>: The drink's name.</li>
                            <li><span className="about-stat">Alcohols</span>: The alcohols used to make the drink. Listed with the alcohol of the highest volume first. (In the event there is no prominent alcohol, a random one is listed first).</li>
                            <li><span className="about-stat">Flavors</span>: The flavors of the drink, to get a feel of the taste.</li>
                            <li><span className="about-stat">Types</span>: Various qualities that relate to the drink in some way. For example, difficulty in making, whether it should be served before or after a meal, etc.</li>
                            <li><span className="about-stat">Color</span>: The color of the drink.</li>
                            <li><span className="about-stat"></span></li>
                            <li><span className="about-stat"></span></li>
                            <li><span className="about-stat"></span></li>
                        </ul>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>Proin sagittis nisl rhoncus mattictetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat s eget nunc lobortis mattis. Bibendum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <br></br>
                </div>
                <div id="utilized-software" className="about-chunk" >
                    <h3>Utilized Software</h3>
                        <p>
                            This application utilizes the following:
                        </p>
                        
                        <h4 className="list-header">Frontend</h4>
                            <ul className="method-list">
                                <li><span>-</span>React</li>
                                <li><span>-</span>React-paginate: frontend pagination bar to display paginated data</li>
                                <li><span>-</span>Redux (with persist)</li>
                                <li><span>-</span>React Auth (with JWT)</li>
                            </ul>
                            <h4 className="list-header">Backend</h4>
                            <ul className="method-list">
                                <li><span>-</span>Ruby on Rails</li>
                                <li><span>-</span>Ruby gem: will_paginate to paginate backend data</li>
                                <li><span>-</span>Use of environmental variables to provide secret key to JWT</li>
                                <li><span>-</span>Sorting algorithm to obtain top 3 drinks, accounting for ties on each level.</li>
                            </ul>
                </div>
            </div>
        );  
    }
}

export default About;




