import React from 'react'
import { connect } from 'react-redux';


function Drink (props) {
    return (
        <div>
        {/* {console.log("Drink props",props)} */}
            <p>DEEEDEDEDDEDAADDDO</p>
        {/* <button onClick={() => console.log("Drink props", props)}>Console.log props (Drink)</button> */}
        </div>
    )
}

function mapStateToProps(state){
    return {allDrinks: state.allDrinks, showProps: state.showProps}
  }
  export default connect(mapStateToProps)(Drink);

// export default Drink;