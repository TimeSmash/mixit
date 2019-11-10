import React from 'react'

function ExampleFunctionalComponent (props) {
    // props: 
    // sentenceForEFC ="I got this sentence from App" src="App"
    return (
        <div>
            <h1>I am a functional component</h1>
            <p>Here are my props: <em>{props.sentenceForEFC}</em></p>
        </div>
    )
}

export default ExampleFunctionalComponent;