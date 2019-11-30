import React, {Component} from 'react'
import { ToggleLayer, Arrow, useHover, Transition } from "react-laag";

// ToggleLayer - the most important component which takes care of all the heavy lifting (positioning)
// Arrow - as the name suggests, a small component that renders an arrow for our tooltip
// useHover - takes care of the logic of when to show the tooltip
// Transition - an utility component that takes care of transitioning the tooltip in and out

function Tooltip({ children, text }) {
    const [isOpen, hoverProps] = useHover();
    
    return (
      // here comes our implementation
    );
  }