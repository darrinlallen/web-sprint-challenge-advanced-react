import { useState} from "react"
import React  from 'react'
import axios from 'axios'
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
  const [email, setemail] = useState('')  
  function reset() {
    // Use this helper to reset all states to their initial values.
   initialMessage = ''
  initialEmail = ''
  
   setmoves(0)
     setindy(4) // the index the "B" is at
     setx(2)
     sety(2)
     setemail('')
      }

  function onChangeL() {
    // You will need this to update the value of the input    

    if (indy >= 1){
    setmessage('')

 if  (x ==1 && y ==3){
  setx(1)
  sety(3)
  setmessage("You cant move left")
  
}
else if (x==1 && y==2){
  setx(1)
  sety(2)
setmessage("You can't move left")

}


else{
  setx(x-1)
  sety(y)
setindy(indy-1)
  setmoves(moves+1)

  }

}
  else {
    setmessage ("You can't go left")
  setx(1)
  sety(1)

  }         


  }
  function onChangeR() {
  
    // You will need this to update the value of the input    
  if (indy < 8){
    setmessage('')
 
  
    if (x==3 && y==1){
    setx(3)
    sety(1)


    setmessage("You can't move right")
  
    }
    else if(x==3 && y==2){
      setx(3)
      sety(2)
  
      setmessage("You can't move right")


    }
    else{
      setx(x+1)
      sety(y)
      setindy(indy+1)
      setmoves(moves+1)
      }
    }
  else {
    setmessage("You can't go right")
    setx(3)
    sety(3)

  }


  }
  function onChangeU() {
    
    // You will need this to update the value of the input    
 if (y > 1){

  setmessage('')
    setindy(indy -3)
  sety(y-1)
  setx(x)
 setmoves(moves+1)

 } 
 
  else {
    setmessage("You can't go up")
    setx(x)
    sety(y)
    
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
  setmoves(moves+1)

  }
  else {
    setmessage("You can't go down")
    sety(y)
    setx(x)
    
  }

  }
  const submit = event => {
    event.preventDefault();
    setemail(event.target.email.value)
    const emails = event.target.email.value;
    const newOrder = { "x": x, "y": y, "steps": moves, "email": emails }
    console.log(newOrder)
    setmoves(0)
     setindy(4) // the index the "B" is at
     setx(2)
     sety(2)
     setemail('')
    axios.post('http://localhost:9000/api/result', newOrder)   
    .then(res => {
      
      
  })
    .catch(err => {
      
    })
  
  }

  

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">({x},{y})</h3>
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
      <form onSubmit={submit}>
        <input id="email" type="email" placeholder="type email" required></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}

