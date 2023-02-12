import React  from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at


export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
constructor(props){
  super(props)
  this.state ={
    message: '',
    moves: 0,
    x: 2,
    y: 2,
    indy: 4,
    email: ''
  
  }

}
  // You will need this to update the value of the input    
onChangeL = ()=> {
  // You will need this to update the value of the input    
if (this.state.indy >= 1){
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
      this.setState({moves: this.state.moves+1})
      this.setState({indy: this.state.indy -1})
  
  }
  }
else {
  this.setState({message: "You can't go left"})
this.setState({x: 1})
this.setState({y:1})

}
}
onChangeR = ()=> {
  // You will need this to update the value of the input    
if (this.state.indy <8){
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
    this.setState({moves: this.state.moves+1})
    this.setState({indy: this.state.indy +1})

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
  this.setState({indy: this.state.indy -3})
this.setState({x: this.state.x})
this.setState({y: this.state.y-1})
this.setState({moves: this.state.moves + 1})

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
  this.setState({indy: this.state.indy +3})
this.setState({x: this.state.x})
this.setState({y: this.state.y+1})
this.setState({moves: this.state.moves + 1})

}
else {
  this.setState.message({message:"You can't go down"})
this.setState({x:this.state.x})
this.setState({y:3})
}
}
reset = ()=> {
  // You will need this to update the value of the input
    
if (this.state.indy >= 1){
  this.setState({message: ''})
  this.setState({indy: 4})
this.setState({x: 2})
this.setState({y: 2})
this.setState({moves: 0})
}
}
 submit = ()=> event => {
  event.preventDefault();
  this.setState({email: event.target.email.value})
  const emails = event.target.email.value;
  if (emails == ''){
    this.setState({message: "Ouch: email is required"})
  }else {
console.log('kjhgfd')
  const newOrder = { "x": this.state.x, "y": this.state.y, "steps": this.state.moves, "email": emails }
  console.log(newOrder)
  this.setState({moves: 0})
   this.setState({indy:4}) // the index the "B" is at
   this.setState({x:2})
   this.setState({y:2})
  axios.post('http://localhost:9000/api/result', newOrder)   
  .then(res => {
    
    
})
  .catch(err => {
    
  })
}
 }




  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">({this.state.x}, {this.state.y})</h3>
          <h3 id="steps">You moved {this.state.moves} times</h3>
          <h3 id="message">{this.state.message}</h3>

        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.indy ? ' active' : ''}`}>
                {idx === this.state.indy ? 'B' : null}
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
          <input id="email" type="email" placeholder="type email" required></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}