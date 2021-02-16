import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from  "components/InterviewerListItem.js";




// { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },


export default function InterviewerList(props){
  const interviewers = props.interviewers.map((interviewerObj) =>{
    return <InterviewerListItem
    key={interviewerObj.id}
    name={interviewerObj.name}
    avatar={interviewerObj.avatar}
    selected={interviewerObj.id === props.value}
    setInterviewer = {event =>props.setInterviewer(interviewerObj.id)}
    />
     
  })
  
  return (

<section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewers</h4>
  <ul className="interviewers__list">{interviewers}</ul>
</section>
  )
}