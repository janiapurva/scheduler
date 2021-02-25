import React from "react";
import "components/InterviewerListItem.scss";
let classNames = require("classnames");

export default function InterviewerListItem(props) {
  let interviewClass = classNames("interviewers__item-image", {
    "interviewers__item--selected": props.selected,
  });

  return (
    <li
      className={interviewClass}
      onClick={props.setInterviewer}
      key={props.id}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
