
export default function removeNull(obj){

  if(!obj) return obj;

  if(Object.prototype.toString.call(obj) !== "[object Object]") return obj;

  Object.keys(obj).forEach((key)=>{
    // console.info(obj[key] === undefined, obj[key] === '');
    obj.propertyIsEnumerable(key) && obj[key] !== null && obj[key] !== undefined && obj[key] !== '' || (delete obj[key]);
  });
  return obj;
}

