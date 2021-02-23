import React from "react";

import { render, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom';
import "@testing-library/jest-dom/extend-expect"

import Form from "components/Appointment/Form";

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png",
    },
  ];

  // const { getByPlaceholderText, getByTestId } = render(
  //   <Form interviewers={interviewers} name="Lydia Miller-Jones" />
  // );

  const { getByPlaceholderText, getByTestId } = render(
    <Form interviewers={interviewers} name="Lydia Miller-Jones" />
  );

  it("renders without student name if not provided", () => {
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });
});
