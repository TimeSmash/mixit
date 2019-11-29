import React from 'react';
import githubLogo from "../images/github-logo.png"
import emailLogo from "../images/email-logo.png"
import mediumLogo from "../images/medium-logo.png"
import linkedInLogo from "../images/linked-in-logo.jpeg"
import "../css/Contact.css"

function Contact() {
    return (
        <div id="contact-container">
            <div id="contact-inner">
            <h1 id="contact-heading">Contact</h1>
            <h3>Thank you for visiting. For more information:</h3>

            <table className="contact-table">
                <tbody>
                    <tr>
                        <th><a href = "https://github.com/TimeSmash/mixit" target="_blank" rel="noopener noreferrer"><img  src ={githubLogo} alt="github-link" ></img></a></th>
                        <th>Visit this repo on Github</th> 
                    </tr>
                    <tr>
                        <th><a href = "https://www.linkedin.com/in/matthew-cummings-nyc/" target="_blank" rel="noopener noreferrer"><img  src ={linkedInLogo} alt="github-link" ></img></a></th>
                        <th>View my LinkedIn profile</th> 
                    </tr>
                    <tr>
                        <th><a href = "mailto:mcumm64@gmail.com" target="_blank" rel="noopener noreferrer"><img src ={emailLogo} alt="github-link" ></img></a></th>
                        <th>Email me at mcumm64@gmail.com</th> 
                    </tr>
                    <tr>
                        <th><a href = "https://medium.com/@mc999" target="_blank" rel="noopener noreferrer"><img id= "medium-logo" src ={mediumLogo} alt="github-link" ></img></a></th>
                        <th>Read my posts on Medium</th> 
                    </tr>
                </tbody>
            </table>
        </div>
     </div>
    )
}

export default Contact;