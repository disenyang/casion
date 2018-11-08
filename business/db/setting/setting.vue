<!-- Created by gaoyang 数据库新建/修改页面-->
<template>
    <div class="db-setting-wrapper">
        <yii-form class="form" ref="form" :model="formModel" :rules="formRules" label-span="4" content-span="15" label-position="right">
            <yii-form-item prop="name" label="名称" required>
                <yii-input v-model="formModel.name"  maxlength="36" counter ime placeholder="请输入名称"></yii-input>
            </yii-form-item>
            <yii-form-item prop="database" label="数据库" required>
                <yii-input v-model="formModel.database"  maxlength="36" counter ime placeholder="请输入数据库"></yii-input>
            </yii-form-item>
            <yii-form-item prop="ip" label="ip地址" required>
                <yii-input v-model="formModel.ip"  maxlength="36" counter ime placeholder="请输入ip地址"></yii-input>
            </yii-form-item>
            <yii-form-item prop="port" label="端口" required>
                <yii-input v-model="formModel.port"  maxlength="36" counter ime placeholder="请输入端口"></yii-input>
            </yii-form-item>
            <yii-form-item prop="username" label="用户名" required>
                <yii-input v-model="formModel.username"  maxlength="36" counter ime placeholder="请输入用户名"></yii-input>
            </yii-form-item>
            <yii-form-item prop="password" label="密码" required>
                <yii-input v-model="formModel.password"  maxlength="36" counter ime placeholder="请输入密码"></yii-input>
            </yii-form-item>
            <yii-form-item prop="project" label="项目">
                <yii-select v-model="formModel.project">
                    <yii-select-option v-for="(project,index) in projectList" :key="index" :label="project.name" :value="project.id"></yii-select-option>
                </yii-select>
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

<style src="./setting.css">
    
</style>