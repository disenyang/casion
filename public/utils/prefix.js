
export default function prefix(path=''){

  if(ENV == 'online' || ENV == 'pre_online'){
    return `/${MODULE_NAME}${path}`;
    
    if(path){
      return path;
    }else{
      return "/";
    }
  }else{
    return `/${MODULE_NAME}${path}`;
  }

};