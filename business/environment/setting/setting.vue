<!-- Created by gaoyang 环境新建/修改页面-->
<template>
    <div class="environment-setting-wrapper">
        <yii-form class="form" ref="form" :model="formModel" :rules="formRules" label-span="4" content-span="18" label-position="right">
            <yii-form-item prop="name" label="名称" required>
                <yii-input v-model="formModel.name"  maxlength="36" counter ime placeholder="请输入名称"></yii-input>
            </yii-form-item>
            <yii-form-item prop="remark" label="描述" required>
                <yii-input v-model="formModel.remark"  maxlength="36" counter ime placeholder="请输入描述"></yii-input>
            </yii-form-item>
            <yii-form-item prop="ftphost" label="ftp主机" required>
                <yii-input v-model="formModel.ftphost"  maxlength="36" counter ime placeholder="请输入ftp主机"></yii-input>
            </yii-form-item>
            <yii-form-item prop="ftpport" label="ftp端口" required>
                <yii-input v-model="formModel.ftpport"  maxlength="36" counter ime placeholder="请输入ftp端口"></yii-input>
            </yii-form-item>
            <yii-form-item prop="ftpusername" label="ftp用户名" required>
                <yii-input v-model="formModel.ftpusername"  maxlength="36" counter ime placeholder="请输入ftp用户名"></yii-input>
            </yii-form-item>
            <yii-form-item prop="ftppassword" label="ftp密码" required>
                <yii-input v-model="formModel.ftppassword" input-type="password"  maxlength="36" counter ime placeholder="请输入ftp密码"></yii-input>
            </yii-form-item>
            <yii-form-item prop="remotePath" label="上传目录" required>
                <yii-input v-model="formModel.remotePath"  maxlength="36" counter ime placeholder="请输入上传目录"></yii-input>
            </yii-form-item>
            <yii-form-item>
                <yii-button type="stroke" @click="back()">返回</yii-button>
                <yii-button @click="save()">保存</yii-button>
            </yii-form-item>
        </yii-form>
    </div>
</template>

<script>
    import setting from "./setting";
    export default setting;
</script>

<style src="./setting.css"></style>