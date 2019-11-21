import React from 'react'
import ErrorMessage from './ErrorMessage'
import '../css/FormErrors.css'

function FormErrors(props) {
    let errors = props.errors
    return <div id='form-errors'>
        <h5><strong>Account creation failed. <br></br>Please remedy the following errors:</strong></h5>
        {console.log("FormError recevied these errors: ", props)}
        {/* {password: Array(1), email: Array(1), birthday: Array(1), name: Array(1)} */}
        {Object.keys(errors).map(errorType => {
                // make Error messages based on the type of error present
                //console.log("Error of " + errorType +" present")
                return <ErrorMessage key={errorType} errorName={errorType} errorList={errors[errorType]}/>
        }
        ) }
    </div>
}

export default FormErrors;