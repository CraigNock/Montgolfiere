
import produce from 'immer';



const initialState = {
  "windSum": 16.93,
  "windBearing": 338,
};

//sample of state
  //  {
  //   "time": 1584816805, -->sort local time conversion in server using moment
  //   "summary": "Clear",
  //   "icon": "clear-day", --> sort out icon display skycons
  //   "nearestStormDistance": 375,
  //   "nearestStormBearing": 147,
  //   "precipIntensity": 0,
  //   "precipProbability": 0,
  //   "temperature": -3.41,
  //   "apparentTemperature": -8.28, --> 'feels like'
  //   "dewPoint": -15.53,
  //   "humidity": 0.39,
  //   "pressure": 1032.6,
  //   "windSpeed": 13.53, kph (si)<-this or m/s (ca)
  //   "windGust": 20.32, kph
  ////   "windSum": 16.93, ////windSum = (windGust-windSpeed)/2 + windSpeed ADD
  //   "windBearing": 338,
  //   "cloudCover": 0.05, -->ie 5%
  //   "uvIndex": 3,
  //   "visibility": 16.093, -->(km)
  //   "ozone": 405.9
  //  }


const conditionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE-CURRENT-CONDITIONS': {
      console.log('action.conditions', action.conditions);
      return produce(state, draftState => {
        draftState = action.conditions;//NO WORK WHY
      });
    };
  
    default:
      return state ;
  }
};



export default conditionsReducer;