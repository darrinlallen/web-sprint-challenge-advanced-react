import React  from 'react'
import axios from 'axios'
import * as yup from 'yup'
// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at
let schema = yup.object().shape({
  email: yup.string().email().required("Ouch: email is required")
})
let msg = ''
export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
constructor(props){
  super(props)
  this.state ={
    message: '',
    steps: 0,
    x: 2,
    y: 2,
    index: 4,
    email: '',
    mailman: ''
  
  }
  this.submit = this.submit.bind(this)

}
  // You will need this to update the value of the input    
onChangeL = ()=> {
  // You will need this to update the value of the input    
if (this.state.index >= 1){
  this.setState({message: ''})

  if  (this.state.x ==1 && this.state.y ==3){
    this.setState({x: 1})
    this.setState({y: 3})
    this.setState({message: "You can't go left"})

  }
  else if (this.state.x==1 && this.state.y==2){
    this.setState({x: 1})
this.setState({y: 2})
this.setState({message: "You can't go left"})

  }

  else {
      this.setState({x: this.state.x-1})
      this.setState({y: this.state.y})
      this.setState({steps: this.state.steps+1})
      this.setState({index: this.state.index -1})
  
  }
  }
else {
  this.setState({message: "You can't go left"})
//this.setState({x: 1})
//this.setState({y:1})
}
}
onChangeR = ()=> {
  // You will need this to update the value of the input    
if (this.state.index <8){
  this.setState({message: ''})


  if (this.state.x==3 && this.state.y==1){

  this.setState({x: 3})
this.setState({y: 1})
this.setState({message: "You can't go right"})

  }
  else if(this.state.x==3 && this.state.y==2){
    this.setState({x: 3})
this.setState({y: 2})
this.setState({message: "You can't go right"})

  }

  else {
    this.setState({x: this.state.x+1})
    this.setState({y: this.state.y})
    this.setState({steps: this.state.steps+1})
    this.setState({index: this.state.index +1})

}
}
else {
  this.setState({message: "You can't go right"})
this.setState({x: 3})
this.setState({y:3})

}
  
}
onChangeU = ()=> {
  // You will need this to update the value of the input    
if (this.state.y > 1){
  this.setState({message: ''})
  this.setState({index: this.state.index -3})
this.setState({x: this.state.x})
this.setState({y: this.state.y-1})
this.setState({steps: this.state.steps + 1})

}
else {
  this.setState({message: "You can't go up"})
this.setState({x: this.state.x})
this.setState({y: 1})
}
}
onChangeD = ()=> {
  // You will need this to update the value of the input    
if (this.state.y <3){
  this.setState({message: ''})
  this.setState({index: this.state.index +3})
this.setState({x: this.state.x})
this.setState({y: this.state.y+1})
this.setState({steps: this.state.steps + 1})

}
else {
  this.setState({message:"You can't go down"})
this.setState({x:this.state.x})
this.setState({y:3})
}
}
reset = ()=> {
  // You will need this to update the value of the input
    
if (this.state.index >= 0){
  this.setState({message: ''})
  this.setState({index: 4})
this.setState({x: 2})
this.setState({y: 2})
this.setState({steps: 0})
   msg =''
}}

handle = (msg) =>{
return this.setState({message: msg})
}
 submit = (event) => {
  event.preventDefault();
  const emails = this.state.mailman;
    const code = (((this.state.x + 1) * (this.state.y + 2)) * (this.state.steps + 1)) + emails.length
   
    msg = `${emails.split('@')[0]} win #${code}`
    this.handle(msg)
  
    console.log(this.state.message)
    console.log("mmmmmmm")
  const newOrder = { "x": this.state.x, "y": this.state.y, "steps": this.state.steps, "email": emails }
  console.log(newOrder)
 
  schema
  .validate({
    email: emails,
  })
  .catch((err) => {
    console.log(err.name); // ValidationError
    console.log(err.errors); // ['Not a proper email']
    this.setState({message: "Ouch: email must be a valid email"})
    ;})
  if (emails == 'foo@bar.baz'){
    this.setState({message:`${emails} failure #${code}`})

  }
  else if ( emails == ''){
    this.setState({message: `Ouch: email is required`})


  }
  else {
    axios.post('http://localhost:9000/api/result', newOrder)   
      .then(res => {
        this.setState({message: msg})
      
   
    })
      .catch(err => {
        
      })
    }
    this.setState({mailman: ''})

 }




  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
        <h3 id="coordinates">Coordinates ({this.state.x}, {this.state.y})</h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>

        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
        <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={this.onChangeL} id="left">LEFT</button>
          <button onClick={this.onChangeU} id="up">UP</button>
          <button onClick={this.onChangeR} id="right">RIGHT</button>
          <button onClick={this.onChangeD} id="down">DOWN</button>
          <button onClick={this.reset} id="reset">reset</button>
        </div>
        <form onSubmit={this.submit}>
          <input  onChange={(event) => this.setState({mailman: event.target.value})} value={this.state.mailman} id="email" type="email" placeholder="type email" ></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
