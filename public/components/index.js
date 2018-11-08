import sidebar from "./sidebar/sidebar.vue"
import pagination from "./pagination/pagination.vue"
import loading from "./loading/index"
import input from "./input/input.vue"
import label from "./label/label.vue"
import button from "./button/button.vue"
import page from "./page/page.vue"
import table from "./table/table.vue"
import column from "./table/column/column.vue"
import tableCell from "./table/cell/cell.vue"
import tip from "./tip/tip.vue"
import nav from "./nav/nav.vue"

import editor from "./editor/editor.vue"

import tree from "./tree/tree.vue"
import treenode from "./tree/treenode/treenode.vue"
import comTree from "./comTree/comTree.vue"
import comTreenode from "./comTree/comTreenode/comTreenode.vue"
import editComTree from "./editComTree/editComTree.vue"
import editComTreenode from "./editComTree/editComTreenode/editComTreenode.vue"

const Components={
	sidebar,
	pagination,
	loading,
	input,
	label,
	button,
	page,
	table,
	column,
	tableCell,
	tip,
	editor,
	tree,
	treenode,
	comTree,
	comTreenode,
	editComTree,
	editComTreenode,
	nav
}
export default {
	install:(Vue) => {
		Object.keys(Components).forEach(key =>{
			let component = Components[key];
			if(key==="loading"){
				Object.assign(Vue.prototype, {loading: loading})
			}else{
				console.log("//////////////",component.name);
				Vue.component(component.name, component);
			}
		});
	}
};
