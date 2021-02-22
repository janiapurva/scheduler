import React,{ useState } from "react";
import Button from  "components/Button";
import InterviewerList from  "components/InterviewerList";


export default function Form(props){
const [name, setName] = useState(props.name || "");
const [interviewer, setInterviewer] = useState(props.value || null)
const [error, setError] = useState('');


//Helper function to clear all fields
const reset = () => {
  setName("")
  setError('');
  setInterviewer(null)
}

// cancel function when user click cancel button
function cancel () {
  // props.onCancel;
  reset();
  props.onCancel()
}

//form validator

function validate() {
  if (name === '') {
    setError('Student name cannot be blank');
    return;
  }
  if (!interviewer) {
    setError('Please select an interviewer');
    return;
  }

  setError('');
  props.onSave(name, interviewer);
}
  return(
  <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value = {name}
        onChange ={event => setName(event.target.value)}
        /*
          
          This must be a controlled component
        */
      />
    <section className="appointment__validation">{error}</section>
    </form>
    <InterviewerList 
    interviewers={props.interviewers} 
    value={interviewer}  
    setInterviewer= {setInterviewer} 
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick= {cancel} >Cancel</Button>
      <Button confirm  onClick ={validate}>Save</Button>
    </section>
  </section>
</main>

  )
}