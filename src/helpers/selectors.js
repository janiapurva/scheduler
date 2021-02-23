
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

  const day = state.days.find(day => day.name === dayName);
  if(!day) return [];
  const interviewers = day.interviewers;
  return interviewers.map(id => state.interviewers[id])
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
