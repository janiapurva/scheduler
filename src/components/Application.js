import React,{ useState,useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList.js"
import  "components/Appointment";
import Appointment from "components/Appointment";
import{getAppointmentsForDay,getInterview} from "../helpers/selectors"
const axios = require('axios');



export default function Application() {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{}
  });

  
  const setDay = day => setState(prev => ({ ...prev, day }));
  //making request for Api
useEffect(()=>{
  Promise.all([
    axios.get('/api/days'),
    axios.get('/api/appointments'),
    axios.get('/api/interviewers')
  ]).then(response => {
    setState(prev=>({
      ...prev,
      days:response[0].data,
      appointments:response[1].data,
      interviewers:response[2].data
    }))
  })
},[])

const appointments = getAppointmentsForDay(state,state.day);
const schedule =appointments.map(appointment => {
  const interview = getInterview(state,appointment.interview);
  return (
    <Appointment 
    key ={appointment.id}
    id ={appointment.id}
    time ={appointment.time}
    interview ={interview}
    />
  );
});

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
  days={state.days}
  day={state.day}
  setDay={setDay} />
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {schedule}
      <Appointment key="last" time="5pm" />  
    </section>
    </main>
  );
}
