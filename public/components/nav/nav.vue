<template>
	<div class="yi-nav" :class="[direction]" >
		<!-- 一级 -->
	    <div class="item"  v-for="(item,index) in navs">
	        <div class="item-wrapper" @click="clickItem(item)" :class="{selected:item==selectedItem}">
		        <div class="icon"><img :src="item.icon"></div>
		        <div class="name">{{item.name}}</div>
		        <div class="item-expand-icon" v-show="item.children && item.children.length!=0" :class="{action:item.showChildren}"></div>
	        </div>
	        <div class="item-children" :style="{height:(item.children&& item.showChildren?item.children.length*60:0)+'px'}" >
	        	<!-- 二级 -->
	        	<div class="item"  v-for="(item2,index) in item.children">
			        <div class="item-wrapper" @click="clickItem(item2)" :class="{selected:item2==selectedItem}">
				        <div class="icon"><img :src="item2.icon"></div>
				        <div class="name">{{item2.name}}</div>
			        </div>
			        <div class="item2-children" :style="{height:(item2.children&& item2.showChildren?item2.children.length*60:0)+'px'}">
			        	<!-- 三级 -->
			        	<div class="item"  v-for="(item3,index) in item2.children">
					        <div class="item-wrapper" @click="clickItem(item3)" :class="{selected:item3==selectedItem}">
						        <div class="icon"><img :src="item3.icon"></div>
						        <div class="name">{{item3.name}}</div>
					        </div>
					        <div class="item-children" :style="{height:(item3.children&& item3.showChildren?item3.children.length*60:0)+'px'}">
					        	
					        </div>
					    </div>
			        </div>
			    </div>
	        </div>
	    </div>
	</div>
</template>

<script>
    import nav from "./nav";
    export default nav;
</script>

<style src="./nav.css"></style>