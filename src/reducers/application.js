export const SET_DAY = 'SET_DAY';
export const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
export const SET_INTERVIEW = 'SET_INTERVIEW';

 
// implmenting updating days regarding booking days
function getSpotsLeftForDay(day, appointments) {
  let spotsForThisDay = day.appointments;
  let freeSpots = 0;
  for (const spot of spotsForThisDay) {
    if (appointments[spot].interview === null) {
      freeSpots++;
    }
  }
  return freeSpots;
}


function decoDaysWithSpots(days, appointments) {
  const decoratedDays = days.map(day => ({
    ...day,
    spots: getSpotsLeftForDay(day, appointments)
  }));
  return decoratedDays;
}


// Reducer function
export default function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {
        ...state,
        day: action.day
      };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      };
    case SET_INTERVIEW: {
      const appointments = {
        ...state.appointments,
        [action.id]: {
          ...state.appointments[action.id],
          interview: action.interview === null ? null : { ...action.interview }
        }
      };
      const days = decoDaysWithSpots(state.days, appointments);

      return {
        ...state,
        days,
        appointments
      };
    }

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}