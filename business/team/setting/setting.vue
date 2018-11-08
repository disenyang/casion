<!-- Created by gaoyang 团队新建/修改页面-->
<template>
    <div class="team-setting-wrapper">
        <yii-form class="form" ref="form" :model="formModel" :rules="formRules" label-span="4" content-span="18" label-position="right">
            <yii-form-item prop="name" label="团队名称" required>
                <yii-input v-model="formModel.name"  maxlength="36" counter ime placeholder="请输入名称"></yii-input>
            </yii-form-item>
            <yii-form-item prop="remark" label="描述" required>
                <yii-textarea v-model="formModel.remark"  maxlength="200" counter ime placeholder="请输入描述"></yii-textarea>
            </yii-form-item>
            
            <yii-form-item prop="users" label="选择用户" required>
                <div class="select-users">
                    <div class="user" v-for="(user,index) in users">
                        <img :src="user.headimg||defaultHeadimg"><span>{{user.name || user.nickname }}</span>
                        <div class="del-btn" @click="delUser(index)"></div>
                    </div>
                </div>
                <yii-button icon="plus" @click="chooseUser()" type="stroke"></yii-button>
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