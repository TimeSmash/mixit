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
                        <p>
                            We also have an in progress alcohol section, where you can learn more about the alcohols that make up each drink. 
                        </p>
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
                        
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>Proin sagittis nisl rhoncus mattictetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat s eget nunc lobortis mattis. Bibendum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <br></br>
                </div>
                <div id="utilized-software" className="about-chunk" >
                    <h3>Utilized Software</h3>
                        <p>
                            This application utilizes the following:
                        </p>
                        
                        <br></br>
                            <ul>
                                <li>React</li>
                                <li>Redux (with persist)</li>
                                <li>will_paginate</li>
                                <li>aginate</li><li>aginate</li>
                            </ul>
                </div>
            </div>
        );
    }
}

export default About;