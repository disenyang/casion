<!-- Created by gaoyang 环境详情页面-->
<template>
    <div class="environment-detail-wrapper">
        <yii-row>
            <yii-col span="3">名称</yii-col>
            <yii-col span="5">
                {{environment.name}}
            </yii-col>
        </yii-row>
        <yii-row>
            <yii-col span="3">描述</yii-col>
            <yii-col span="5">
                {{environment.remark}}
            </yii-col>
        </yii-row>
        <yii-row>
            <yii-col span="3">ftp主机</yii-col>
            <yii-col span="5">
                {{environment.ftphost}}
            </yii-col>
        </yii-row>
        <yii-row>
            <yii-col span="3">ftp端口</yii-col>
            <yii-col span="5">
                {{environment.ftpport}}
            </yii-col>
        </yii-row>
        <yii-row>
            <yii-col span="3">ftp用户名</yii-col>
            <yii-col span="5">
                {{environment.ftpusername}}
            </yii-col>
        </yii-row>
        <yii-row>
            <yii-col span="3">ftp密码</yii-col>
            <yii-col span="5">
                {{environment.ftppassword}}
            </yii-col>
        </yii-row>
        <yii-row>
            <yii-col span="3">上传目录</yii-col>
            <yii-col span="5">
                {{environment.remotePath}}
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