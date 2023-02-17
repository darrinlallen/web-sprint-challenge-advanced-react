import { useEffect, useRef, useState} from "react"
import React  from 'react'
import axios from 'axios'
import * as yup from 'yup'
// Suggested initial states
let initialMessage = ''
let initialEmail = ''
let initialSteps = 0
let msg ='hbbhhinhnhi'
let initialIndex = 4 // the index the "B" is at
let schema = yup.object().shape({
  email: yup.string().email().required("Ouch: email is required")
})


export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const  [steps, setsteps] = useState(0)
  const [message, setmessage] = useState(initialMessage)
  const [x, setx] = useState(2)
  const [y, sety] = useState(2)
  const [index, setindex] = useState(initialIndex)
  const [email, setemail] = useState('')  
  const [mailman, setmailman] = useState('')
  function reset() {
    // Use this helper to reset all states to their initial values.
   
   setsteps(0)
     setindex(4) // the index the "B" is at
     setx(2)
     sety(2)
     setmessage('')
     setmailman('')
     setsteps(0)
    
      }

  function onChangeL() {
    // You will need this to update the value of the input    

    if (index >= 0){
    setmessage('')

 if  (x ==1 && y ==3){
  setx(1)
  sety(3)
  setmessage("You can't go left")
  
}
else if (x==1 && y==2){
  setx(1)
  sety(2)
setmessage("You can't go left")

}




  else if(x==1 && y==1) {
    setmessage ("You can't go left")
  setx(1)
  sety(1)

  }         
  
  else{
    setx(x-1)
    sety(y)
  setindex(index-1)
    setsteps(steps+1)
  
    }
  }
}
  function onChangeR() {
  
    // You will need this to update the value of the input    
  if (index <= 8){
    setmessage('')
 
  
    if (x==3 && y==1){
    setx(3)
    sety(1)


    setmessage("You can't go right")
  
    }
    else if(x==3 && y==2){
      setx(3)
      sety(2)
  
      setmessage("You can't go right")


    }
 
    
  else if(x==3 && y==3) {
    setmessage("You can't go right")
    setx(3)
    sety(3)

  }

  else{
    setx(x+1)
    sety(y)
    setindex(index+1)
    setsteps(steps+1)
    }
  }
  }
  function onChangeU() {
    
    // You will need this to update the value of the input    
 if (y > 1){

  setmessage('')
    setindex(index -3)
  sety(y-1)
  setx(x)
 setsteps(steps+1)

 } 
 
  else {
    setmessage("You can't go up")
    setx(x)
    sety(y)
    
    setindex(index)
  }
}
  

  
  function onChangeD() {
    // You will need this to update the value of the input    
        
  if (y < 3){
    setmessage('')
    setindex(index + 3)
  sety(y+1)
  setx(x)
  setsteps(steps+1)
  console.log(steps)
  }
  else {
    setmessage("You can't go down")
    sety(y)
    setx(x)
    
  }
  

  }
 

function submit  (event) {
//    const [message, setmessage] =useState('')
event.preventDefault()
console.log(message)   
const emails = mailman;
console.log(mailman)
    const code = (((x + 1) * (y + 2)) * (steps + 1)) + emails.length
    const newOrder = { "x": x, "y": y, "steps": steps, "email": emails }
    console.log(newOrder)
  
    msg = `${emails.split('@')[0]} win #${code}`
  
    console.log(message)
   
    schema
    .validate({
      email: emails,
    })
    .then(() =>  {
    })
    .catch((err) => {
      console.log(err.name); // ValidationError
      console.log(err.errors); // ['Not a proper email']
      setmessage("Ouch: email must be a valid email")
    });
    if (emails == 'foo@bar.baz'){
      setmessage(`${emails} failure #${code}`)
  
    }
    else if ( emails == ''){
      setmessage(`Ouch: email is required`)
  
  
    }
    else {
      axios.post('http://localhost:9000/api/result', newOrder)   
        .then(res => {
          setmessage(msg)
        
      })
        .catch(err => {
          
        })
      }
  setmailman('')  
  } 

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({x}, {y})</h3>
        <h3 id="steps">You moved {steps} {steps==1 ? "time" : "times"}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
      <h3 id="message">{message}</h3>

      </div>
      <div id="keypad">
        <button onClick={onChangeL} id="left">LEFT</button>
        <button  onClick={onChangeU} id="up">UP</button>
        <button onClick={onChangeR} id="right">RIGHT</button>
        <button onClick={onChangeD} id="down">DOWN</button>
        <button onClick={reset} id="reset">reset</button>
      </div>
      <form  onSubmit={submit}>
        <input  onChange={(event) => setmailman(event.target.value)} value={mailman}id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}