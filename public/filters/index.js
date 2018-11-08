
import DateFormate from './dateformate';
import EnumFormate from './enumformate';

let Filters = [
  DateFormate,
  EnumFormate
];

let install = Vue => {

  if (install.installed) return;

  Object.keys(Filters).forEach(key => Filters[key].install(Vue));

  install.installed = true;
};

export default {
  install,
  ...Filters
};