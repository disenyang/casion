<!-- Created by gaoyang 数据库详情页面-->
<template>
    <div class="db-detail-wrapper">
        <yii-row>
            <yii-col span="3">名称</yii-col>
            <yii-col span="5">
                {{db.name}}
            </yii-col>
        </yii-row>
        <yii-row>
            <yii-col span="3">数据库</yii-col>
            <yii-col span="5">
                {{db.database}}
            </yii-col>
        </yii-row>
        <yii-row>
            <yii-col span="3">ip地址</yii-col>
            <yii-col span="5">
                {{db.ip}}
            </yii-col>
        </yii-row>
        <yii-row>
            <yii-col span="3">端口</yii-col>
            <yii-col span="5">
                {{db.port}}
            </yii-col>
        </yii-row>
        <yii-row>
            <yii-col span="3">用户名</yii-col>
            <yii-col span="5">
                {{db.username}}
            </yii-col>
        </yii-row>
        <yii-row>
            <yii-col span="3">密码</yii-col>
            <yii-col span="5">
                {{db.password}}
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

<style>
    @import detail.css;
</style>