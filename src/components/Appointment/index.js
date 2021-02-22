import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error"
import useVisualMode from "hooks/useVisualMode"




const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDITING = "EDITING";
const CONFIRMING = "CONFIRMING"
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';



export default function Appointment(props){

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function edit() {
    transition(EDITING);
  }

  function confirmation() {
    transition(CONFIRMING);
  }

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props
      .bookInterview(props.id, interview)
      .then(response => {
        transition(SHOW);
      })
      .catch(error => transition(ERROR_SAVE, true));
  }

  function deleting() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(error => transition(ERROR_DELETE, true));
  }

  return(
    <article  data-testid="appointment" className="appointment">
      <Header time = {props.time} />
{mode === EMPTY && (
        <Empty
          onAdd={() => {
            return transition(CREATE);
          }}
        />
      )}
      
{mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => confirmation()}
          onEdit={() => {
            edit();
          }}
        />
      )} 

{mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
{mode === SAVING && <Status message="Saving" />}
{mode === DELETING && <Status message="Deleting" />}
{mode === CONFIRMING && (
        <Confirm
          onConfirm={() => deleting()}
          onCancel={() => back()}
          message="Are you sure you want to delete?"
        />
      )}
{mode === EDITING && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}

{mode === ERROR_SAVE && (
        <Error
          message="There was an error saving your appointment"
          onClose={back}
        />
      )}
{mode === ERROR_DELETE && (
        <Error
          message="There was an error deleting your appointment"
          onClose={back}
        />
      )}

    </article>

  )
}