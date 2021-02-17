import React,{ useState,useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList.js"
import  "components/Appointment";
import Appointment from "components/Appointment";
const axios = require('axios');




const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];

const appointment =appointments.map((eachAppointment)=> {
  return(
    <Appointment key = {eachAppointment.id}{...eachAppointment} />
     
  )
})



export default function Application() {
  const [days,setDays] = useState([]);
  const [day,setDay] = useState(null)
  //making request for Api
useEffect(()=>{
  axios.get('/api/days').then((response)=>{
    console.log([response.data])
    
    setDays(response.data)
    
    
  }
  )

},[])

  return (
    <main className="layout">
      <section className="sidebar">
        <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
<DayList
  days={days}
  day={day}
  setDay={setDay} />
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
      {appointment}
        
      <Appointment key="last" time="5pm" />  
    </section>
    </main>
  );
}
