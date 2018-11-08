
let EnumFormate = (value, target, valueKey = 'value', labelKey = 'label') =>{

  if(value === undefined || value === null || !target) return value;

  if(Array.isArray(target)){

    if(valueKey && labelKey){
      return target.find(item => item[valueKey] === value)[labelKey];
    }else if(labelKey){
      return target[value][labelKey];
    }else{
      return value;
    }

  }else if(Object.prototype.toString.call(target) == "[object Object]"){

    return key == undefined ? target[value] : target[value][key];

  }else{

    return value;

  }
};


EnumFormate.install = Vue => {
  Vue.filter("enum", EnumFormate);
};

export default EnumFormate;
