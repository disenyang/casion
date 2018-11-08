<!-- Created by gaoyang 数据模型详情页面-->
<template>
    <div class="model-detail-wrapper">
        <yii-row>
            <yii-col span="3">名称</yii-col>
            <yii-col span="5">
                {{model.name}}
            </yii-col>
        </yii-row>
        <yii-row>
            <yii-col span="3">显示名称</yii-col>
            <yii-col span="5">
                {{model.showname}}
            </yii-col>
        </yii-row>
        <yii-row>
            <yii-col span="3">数据库名称</yii-col>
            <yii-col span="5">
                {{model.dbname}}
            </yii-col>
        </yii-row>
        <yii-row>
            <yii-col span="3">模块</yii-col>
            <yii-col span="5">
                {{model.moduleid}}
            </yii-col>
        </yii-row>
        <yii-row>
            <yii-col span="3">描述</yii-col>
            <yii-col span="5">
                {{model.remark}}
            </yii-col>
        </yii-row>
        <yii-row>
        </yii-row>
        <yii-row>
            <yii-button type="stroke" @click="back()">返回</yii-button>
        </yii-row>
    </div>
</template>

<script>
    import detail from "./detail";
    export default detail;
</script>

<style src="./detail.css"></style>