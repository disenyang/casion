
import {DateFormate,DateTimeFormate, TimeFormate} from './dateformate.js';


DateFormate.install = Vue => {
  Vue.filter("date", DateFormate);
  Vue.filter("datetime", DateTimeFormate);
  Vue.filter("time", TimeFormate);
};


export default DateFormate;
