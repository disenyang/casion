<!-- Created by gaoyang 计划新建/修改页面-->
<template>
    <div class="plan-setting-wrapper">
        <yii-form class="form" ref="form" :model="formModel" :rules="formRules" label-span="6" content-span="16" label-position="right">
            <yii-form-item prop="name" label="名称" required>
                <yii-input v-model="formModel.name"  maxlength="36" counter ime placeholder="请输入名称"></yii-input>
            </yii-form-item>
            <yii-form-item prop="remark" label="计划描述" required>
                <yii-textarea v-model="formModel.remark"  maxlength="200" counter ime placeholder="请输入描述"></yii-textarea>
            </yii-form-item>
            
            <yii-form-item prop="starttime" label="开始时间" required>
                <yii-date-picker v-model="formModel.starttime"  maxlength="36" counter ime placeholder="请输入开始时间"></yii-date-picker>
            </yii-form-item>
            <yii-form-item prop="endtime" label="结束时间" required>
                <yii-date-picker v-model="formModel.endtime"  maxlength="36" counter ime placeholder="请输入结束时间"></yii-date-picker>
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