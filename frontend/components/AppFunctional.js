import { useState, useEffect } from "react"
import React  from 'react'

// Suggested initial states
let initialMessage = ''
let initialEmail = ''
let initialSteps = 0
let initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const  [moves, setmoves] = useState(0)
  const [message, setmessage] = useState(initialMessage)
  const [x, setx] = useState(2)
  const [y, sety] = useState(2)
  const [indy, setindy] = useState(initialIndex)
  const [coordinates, setcoordinates] = useState('(2,2)')
  const [steps, setsteps] = useState('You moved 0 times')
  function reset() {
    // Use this helper to reset all states to their initial values.
   initialMessage = ''
  initialEmail = ''
  
   setmoves(0)
   setsteps(0)
     setindy(4) // the index the "B" is at
     setx(2)
     sety(2)
     setcoordinates(`(${x},${y})`)
      }

  function onChangeL(async) {
    // You will need this to update the value of the input    

    if (indy >= 1){
    setmessage('')
    setindy(indy -1)

 if  (x ==1 && y ==3){
  setx(3)
  sety(2)
  setmoves(moves+1)
  setsteps(`You moved ${moves} times`)
  setcoordinates(`(${x},${y})`)

 
setsteps(`You moved ${moves} times`)
}
else if (x==1 && y==2){
  setx(3)
  sety(1)
  setcoordinates(`(${x},${y})`)
  setmoves(moves+1)
  setsteps(`You moved ${moves} times`)


}
else if (x==3 && y==1){
setx(1)
sety(2)
setcoordinates(`(${x},${y})`)

setmoves(moves+1)
setsteps(`You moved ${moves} times`)


}
else if(x==3 && y==2){
  setx(1)
  sety(3)
  setcoordinates(`(${x},${y})`)
  setmoves(moves+1)
  setsteps(`You moved ${moves} times`)


}
else{
  setx(x-1)
  sety(y)
  setcoordinates(`(${x},${y})`)
  setmoves(moves+1)


  setsteps(`You moved ${moves} times`)

  }

}
  else {
    setmessage ("You can't go left")
  setx(1)
  sety(1)
  setcoordinates(`(${x},${y})`)

  }         


  }
  function onChangeR() {
  
    // You will need this to update the value of the input    
  if (indy < 8){
    setmessage('')
    setindy(indy +1)
 
  
    if (x==3 && y==1){
    setx(1)
    sety(2)
    setcoordinates(`(${x},${y})`)

    setmoves(moves+1)
    setsteps(`You moved ${moves} times`)

    }
    else if(x==3 && y==2){
      setx(1)
      sety(3)
      setcoordinates(`(${x},${y})`)

      setmoves(moves+1)

      setsteps(`You moved ${moves} times`)

    }
    else{
      setx(x+1)
      sety(y)
      setcoordinates(`(${x},${y})`)

      setmoves(moves+1)

      setsteps(`You moved ${moves} times`)

      }
    }
  else {
    setmessage("You can't go right")
    setx(3)
    sety(3)
    setcoordinates(`(${x},${y})`)

  }


  }
  function onChangeU() {
    
    // You will need this to update the value of the input    
 if (y > 1){

  setmessage('')
    setindy(indy -3)
  sety(y-1)
  setx(x)
  setcoordinates(`(${x},${y})`)

 setmoves(moves+1)

useEffect(()=> {setsteps(`You moved ${indy} times`)},[indy])
 } 
 
  else {
    setmessage("You can't go up")
    setx(x)
    sety(y)
    setcoordinates(`(${x},${y})`)

    setindy(indy)
  }
  }

  
  function onChangeD() {
    // You will need this to update the value of the input    
    
  if (y < 3){
    setmessage('')
    setindy(indy + 3)
  sety(y+1)
  setx(x)
  setcoordinates(`(${x},${y})`)

  setmoves(moves+1)

  setsteps(`You moved ${moves} times`)
  }
  else {
    setmessage("You can't go down")
    sety(y)
    setx(x)
    setcoordinates(`(${x},${y})`)

  }

  }


  

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates {x},{y}</h3>
        <h3 id="steps">`You moved {moves} times</h3>
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
      <h3 id="message">{message} </h3>

      </div>
      <div id="keypad">
        <button onClick={onChangeL} id="left">LEFT</button>
        <button  onClick={onChangeU} id="up">UP</button>
        <button onClick={onChangeR} id="right">RIGHT</button>
        <button onClick={onChangeD} id="down">DOWN</button>
        <button onClick={reset} id="reset">reset</button>
      </div>
      <form >
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}

