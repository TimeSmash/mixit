import React from 'react'
import {capitalize} from '../constants.js'

function ErrorMessage(props) {
    
    let showHeading = (errorName) => {
        if (errorName === "name"){
            return "Username"
        } else {
            return capitalize(errorName)
        }
    }
    console.log("Error message props", props)
    return <div>
                <h5 className="error-message">
                    {showHeading(props.errorName)} 
                </h5>
                {/* //eslint-disable-next-line */}
                <ul>{props.errorList.map(error=> <li key={props.errorName}>{error}</li>)}</ul>
            </div>
}

export default ErrorMessage;