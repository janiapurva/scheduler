
//Helper functon for get appointment for day

function getAppointmentsForDay(state,day){
  const dayAppointment = state.days.map(item => item.name === day)
  return dayAppointment;

}
