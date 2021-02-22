
// Helper function to get appointmnet for day
export function getAppointmentsForDay(state, day) {
  const rightDays = state.days.map(day => day.name);
  if (!day || !rightDays.includes(day)) return [];

  return state.days
    .filter(appointment => appointment.name === day)[0]
    .appointments.map(apptId => state.appointments[apptId]);
}


// Gets the interviewers for a specific day
export function getInterviewersForDay(state, dayName) {
  const validDayNames = state.days.map(dayObj => dayObj.name);
  if (!dayName || !validDayNames.includes(dayName)) return [];

  const todayObj = state.days.filter(dayObj => dayObj.name === dayName)[0];
  const interviewersObj = todayObj.interviewers.map(
    interId => state.interviewers[interId]
  );
  return interviewersObj;
}

// Gets an interview 
export function getInterview(state, interview) {
  if (!interview) return null;
  const interviewObj = {
    student: interview.student
  };

  interviewObj.interviewer = state.interviewers[interview.interviewer];
  return interviewObj;
}
