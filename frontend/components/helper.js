import AppFunctional from "./AppFunctional";
import { useState} from "react"
import React  from 'react'
import axios from 'axios'
export function submit  (event) {
    //    const [message, setmessage] =useState('')
    event.preventDefault()
        const emails = "s@gmail.com";
        const x = 3
        const y =2
        const moves = 5
        const code = (((x + 1) * (y + 2)) * (moves + 1)) + emails.length
        const newOrder = { "x": x, "y": y, "steps": moves, "email": emails }
        const [message, setmessage] = useState('')
        console.log(newOrder)
        event.target.email.value = ''
      
        setmessage(`${emails.split('@')[0]} win #${code}`)
    console.log({message})
      
      axios.post('http://localhost:9000/api/result', newOrder)   
        .then(res => {
        
              })
              return (<>
              <p></p>
              </>
              )
                  }
            
    
                                    