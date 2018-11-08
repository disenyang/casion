
const Components={
	
}
export default {
	install:(Vue) => {
		Object.keys(Components).forEach(key =>{
			let component = Components[key];
			Vue.component(component.name, component);
		});
	}
};