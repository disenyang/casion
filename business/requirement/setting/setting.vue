<!-- Created by gaoyang 需求新建/修改页面-->
<template>
    <div class="requirement-setting-wrapper">
        <yii-form class="form" ref="form" :model="formModel" :rules="formRules" label-span="6" content-span="16" label-position="right">
            <yii-form-item prop="name" label="需求名称" required>
                <yii-textarea v-model="formModel.name"  maxlength="36" counter ime placeholder="请输入需求名称"></yii-textarea>
            </yii-form-item>
            <yii-form-item prop="developer" label="开发者" required>
                <yii-select v-model="formModel.developer"  v-if="users && users.length!=0"  width="50px;">
                    <yii-select-option v-for="(user,index) in users" :key="index" :label="user.name" :value="user.id"></yii-select-option>    
                </yii-select>
            </yii-form-item>
            <yii-form-item prop="dev_start_date" label="开发开始时间" required>
                <yii-date-picker v-model="formModel.dev_start_date" placeholder="请输入开发开始时间"></yii-date-picker>
            </yii-form-item>
            <yii-form-item prop="dev_end_date" label="开发结束时间" required>
                <yii-date-picker v-model="formModel.dev_end_date" placeholder="请输入开发结束时间"></yii-date-picker>
            </yii-form-item>
            <yii-form-item prop="couplet_start_date" label="联调开始时间" required>
                <yii-date-picker v-model="formModel.couplet_start_date"  maxlength="36" counter ime placeholder="请输入联调开始时间"></yii-date-picker>
            </yii-form-item>
            <yii-form-item prop="couplet_end_date" label="联调结束时间" required>
                <yii-date-picker v-model="formModel.couplet_end_date" placeholder="请输入联调结束时间"></yii-date-picker>
            </yii-form-item>
            <yii-form-item prop="test_start_date" label="测试开始时间" required>
                <yii-date-picker v-model="formModel.test_start_date" placeholder="请输入测试开始时间"></yii-date-picker>
            </yii-form-item>
            <yii-form-item prop="test_end_date" label="测试结束时间" required>
                <yii-date-picker v-model="formModel.test_end_date" placeholder="请输入测试结束时间"></yii-date-picker>
            </yii-form-item>
            <yii-form-item prop="online_date" label="上线时间" required>
                <yii-date-picker v-model="formModel.online_date" placeholder="请输入上线时间"></yii-date-picker>
            </yii-form-item>
            <!-- <yii-form-item prop="maxreqbugnum" label="最大需求bug量" required>
                <yii-input v-model="formModel.maxreqbugnum" num-type="Integer" class="num-bug" placeholder="请输入需求名称"></yii-input>
            </yii-form-item> -->
            <yii-form-item prop="maxcodebugnum" label="最大代码bug量" required>
                <yii-input v-model="formModel.maxcodebugnum" num-type="Integer" class="num-bug" placeholder=""></yii-input>
            </yii-form-item>
            <yii-form-item prop="codebugnum" label="实际代码bug量" required>
                <yii-input v-model="formModel.codebugnum"  class="num-bug" placeholder=""></yii-input>
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