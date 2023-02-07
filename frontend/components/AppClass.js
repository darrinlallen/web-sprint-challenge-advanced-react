import { useState } from "react"
import React  from 'react'


// Suggested initial states



export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  constructor(props){
  super(props)
  let initialMessage = ''
  let initialEmail = ''
  let initialSteps = 0
  let initialIndex = 4 // the index the "B" is at
  
  const [moves, setmoves] = useState(0)
    const [message, setmessage] = useState(initialMessage)
    const [x, setx] = useState(2)
    const [y, sety] = useState(2)
    const [indy, setindy] = useState(initialIndex)
  
    }
    // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
    // You can delete them and build your own logic from scratch.

    
     reset = () => {
      // Use this helper to reset all states to their initial values.
     initialMessage = ''
    initialEmail = ''
     setmoves(0)
       setindy(4) // the index the "B" is at
       setx(2)
       sety(2)
        }
    
    onChangeL = ()=> {
      // You will need this to update the value of the input    
    if (indy >= 1){
      setmessage('')
      setindy(indy -1)
    setx(x-1)
    sety(y)
    setmoves(moves+1)
    }
    else {
      setmessage ("You can't go left")
    setx(x)
    sety(y)
    }
    }
     onChangeR = () => {
      // You will need this to update the value of the input    
    if (indy < 8){
      setmessage('')
      setindy(indy +1)
    setx(x+1)
    sety(y)
    setmoves(moves+1)}
    else {
      setmessage("You can't go right")
      setx(x)
      sety(y)
    }
    }
     onChangeU = () => {
      // You will need this to update the value of the input    
    if (y > 1){
    setmessage('')
      setindy(indy -3)
    sety(y-1)
    setx(x)
    setmoves(moves+1)}
    else {
      setmessage("You can't go up")
      setx(x)
      sety(y)
      setindy(indy)
    }
    }
    onChangeD = () => {
      // You will need this to update the value of the input    
    if (y < 3){
      setmessage('')
      setindy(indy + 3)
    sety(y+1)
    setx(x)
    setmoves(moves+1)}
    else {
      setmessage("You can't go down")
      sety(y)
      setx(x)
    }
    } 

  render() {
    const { className } = this.props

    return (
      <div id="wrapper" className={className}>
        {console.log(className)}
        <div className="info">
          <h3 id="coordinates">Coordinates ({x}, {y})</h3>
          <h3 id="steps">You moved {moves} times</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === indy ? ' active' : ''}`}>
                {idx === indy ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button onClick={onChangeL} id="left">LEFT</button>
          <button onClick={onChangeU} id="up">UP</button>
          <button onClick={onChangeR} id="right">RIGHT</button>
          <button onClick= {onChangeD} id="down">DOWN</button>
          <button onClick ={reset} id="reset">reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email" required ></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
        }

}