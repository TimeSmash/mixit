import React from 'react'
import { connect } from 'react-redux';

function ExampleFunctionalComponent (props) {
    // props: 
    // sentenceForEFC ="I got this sentence from App" src="App"
    console.log("Store from ExFC", props.store.getState())
    return (
        <div>
            <h1>I am a functional component</h1>
            <button onClick={() => console.log(props)}>Console.log props</button>
            {/* <p>Here are my props: <em>{props.sentenceForEFC}</em></p> */}
        </div>
    )
}

function mapStateToProps(state){
    return {allDrinks: state.allDrinks}
  }
  export default connect(mapStateToProps)(ExampleFunctionalComponent);

// export default ExampleFunctionalComponent;