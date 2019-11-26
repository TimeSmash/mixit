import React from 'react'


function MetaButton (props) {
    // will receive >=2 of the following props:
    // pCompName = Name of parent component
    // pCompProps = Props of the parent component
    // pCompState = state of the parent component

    let showPropsOrState = () =>{
        
        if (!props.pCompName){
            //If parentcomponentName isn't defined NOPE
            alert("Warning! You never specified a name for pCompName. Please give MetaButton the parent component's name to continue. ")
            return null
        } else if (props.pCompName && props.pCompProps === undefined && props.pCompState === undefined){
            //If pcomponentName is there but pProps and pState aren't, NOPE
            alert("Warning! You never gave MetaButton the parent component's state or props. Please give MetaButton the parent component's props, state, or both to continue. ")
        } else if (props.pCompName && (props.pCompProps || props.pCompState)){
            //If pcomponentName is there and one of the two is there okay            
                
            
                if (props.pCompProps && props.pCompState){
                        console.log(`${props.pCompName} props`, props.pCompProps )
                        console.log(`${props.pCompName} state`, props.pCompState )
                } else if (props.pCompProps){
                    console.log(`${props.pCompName} props`, props.pCompProps )
                } else if (props.pCompState){
                    console.log(`${props.pCompName} state`, props.pCompState )
                }
            }
            
        }
      

    
    
    return (
            <button onClick={() => showPropsOrState()}>Console.log props/state for {props.pCompName}</button>
           
        
    )
}

export default MetaButton;