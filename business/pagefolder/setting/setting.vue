<!-- Created by gaoyang 页面文件夹新建/修改页面-->
<template>
    <div class="pagefolder-setting-wrapper">
        <yii-form class="form" ref="form" :model="formModel" :rules="formRules" label-span="4" content-span="8" label-position="right">
            <yii-form-item prop="name" label="名称" required>
                <yii-input v-model="formModel.name"  maxlength="36" counter ime placeholder="请输入名称"></yii-input>
            </yii-form-item>
            <yii-form-item prop="showname" label="显示名称" required>
                <yii-input v-model="formModel.showname"  maxlength="36" counter ime placeholder="请输入显示名称"></yii-input>
            </yii-form-item>
            <yii-form-item prop="parentid" label="父文件夹" required>
                <yii-input v-model="formModel.parentid"  maxlength="36" counter ime placeholder="请输入父文件夹"></yii-input>
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