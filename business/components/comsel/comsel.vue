<template>
    <yii-modal class="yii-comsel-wrapper"
        v-model="modalShow"
        :auto-size="true"
        :size="size"
        :height="panelHeight"
        :appendToBody="false"
        v-on:after-leave="destroyElement">

        <template slot="title">添加组件</template>
        <div class="com-sel-wrapper">
            <div class="cos">
                <div class="title">
                    组件库列表
                </div>
                <div class="content">
                    <div class="co" :class="{selected:co.selected}" v-for="(co,index) in cos" @click="clickCo(co)" >
                        <div class="check">
                            <div class="checkbox" :class="{checked:co.checked}" @click="checkCo(co,$event)">
                            </div>
                        </div>
                       <!--  <img :src="co.images"> -->
                       <span class="name">{{co.name}}</span>
                       <span class="count">共({{co.count}})个组件</span>
                    </div>
                </div>
            </div>
            <div class="coms">
                <div class="title">
                    <div class="name">组件列表</div>
                    <!-- <div class="checkall" @click="checkAll()"><i class="checkbox" :class="{checked:checkedAll}"></i><span>全选</span></div> -->
                </div>
                <div class="content">
                    <div class="com" :class="{selected:com.selected}" v-for="(com,index) in coms" @click="clickCom(com)" >
                        
                        <div class="icon"><img :src="com.icon || defaultComImg"></div>
                        <div class="name">{{com.name}}</div>
                        <!-- <div class="check">
                            <div class="checkbox" :class="{checked:com.selected}" @click="com.selected=!com.selected">
                            </div>
                        </div> -->
                    </div>
                </div>
                <div class="btns">
                    <button @click="confirm">确定</button>
                    <button @click="close">关闭</button>
                </div>
            </div>
        </div>
        
    </yii-modal>
</template>

<script>
    import comsel from "./comsel";
    export default comsel;
</script>

<style src="./comsel.css">
</style>