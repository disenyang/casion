<!-- Created by gaoyang 项目新建/修改页面-->
<template>
    <div class="project-setting-wrapper">
        <div class="content-wrapper">
            <yii-row>
                <yii-col span="4" text-alig="right">*项目名称</yii-col>
                <yii-col span="20">
                    <yii-input v-model="params.name"  maxlength="36" counter  placeholder="项目名称"></yii-input>
                    <yi-tip :msg="checkParams.name.msg" v-show="checkParams.name.error"></yi-tip>
                </yii-col>
            </yii-row>
            <yii-row class="row">
                <yii-col span="4">*英文名称</yii-col>
                <yii-col span="20">
                    <yii-input v-model="params.enname" placeholder="英文名称"></yii-input>
                    <yi-tip :msg="checkParams.enname.msg" v-show="checkParams.enname.error"></yi-tip>
                </yii-col>
            </yii-row>
            <yii-row class="row">
                <yii-col span="4">*项目类型</yii-col>
                <yii-col span="20">
                    <div class="project-type">
                        <div class="pc-btn">
                            <div class="radio" :class="{checked:params.type=='pc'}" @click="params.type='pc'"></div>
                            <div class="span">pc端</div>
                        </div>
                        <div class="mobile-btn">
                            <div class="radio" :class="{checked:params.type=='mobile'}"@click="params.type='mobile'"></div>
                            <div class="span">手机mobile</div>
                        </div>
                        <div class="weixin-btn">
                            <div class="radio" :class="{checked:params.type=='weixin'}"@click="params.type='weixin'"></div>
                            <div class="span">微信h5</div>
                        </div>
                    </div>
                </yii-col>
            </yii-row>

            <yii-row class="row">
                <yii-col span="4">项目描述</yii-col>
                <yii-col span="20">
                    <yii-textarea  v-model="params.remark" placeholder="项目描述"></yii-textarea>
                    <yi-tip :msg="checkParams.remark.msg" v-show="checkParams.remark.error"></yi-tip>
                </yii-col>
            </yii-row>
            <yii-row class="row">
                <yii-col span="4">后端开发语言</yii-col>
                <yii-col span="20">
                    <yii-select v-model="params.backendlanguage" placeholder="请选择后端开发语言">
                        <yii-select-option label="nodejs" value="nodejs"></yii-select-option>
                        <yii-select-option label="java" value="java"></yii-select-option>
                    </yii-select>
                </yii-col>
            </yii-row>
            <yii-row class="row">
                <yii-col span="4">java基本包</yii-col>
                <yii-col span="20">
                    <yii-input v-model="params.javabasepackage" v-if="params.backendlanguage==='java'">
                        
                    </yii-input>
                </yii-col>
            </yii-row>
            <yii-row class="row">
                <yii-col span="4">前端项目地址</yii-col>
                <yii-col span="20">
                    <yii-input  v-model="params.fepath" placeholder="前端项目地址"></yii-input>
                    <yi-tip :msg="checkParams.remark.msg" v-show="checkParams.remark.error"></yi-tip>
                </yii-col>
            </yii-row>
            <yii-row class="row">
                <yii-col span="4">后端项目地址</yii-col>
                <yii-col span="20">
                    <yii-input  v-model="params.backendpath" placeholder="后端项目地址"></yii-input>
                    <yi-tip :msg="checkParams.remark.msg" v-show="checkParams.remark.error"></yi-tip>
                </yii-col>
            </yii-row>
            <yii-row class="row">
                <yii-col span="4">ios项目地址</yii-col>
                <yii-col span="20">
                    <yii-input  v-model="params.iosprojectpath" placeholder="后端项目地址"></yii-input>
                </yii-col>
            </yii-row>
            <yii-row class="row">
                <yii-col span="4">安卓项目地址</yii-col>
                <yii-col span="20">
                    <yii-input  v-model="params.androidprojectpath" placeholder="android项目地址"></yii-input>
                </yii-col>
            </yii-row>
            <div class="row">
                <div class="pp">
                    <div class="private-btn">
                        <div class="radio" :class="{checked:params.private==1}" @click="params.private=1"></div>
                        <div class="span">私有</div>
                    </div>
                    <div class="public-btn">
                        <div class="radio" :class="{checked:params.private==2}" @click="params.private=2"></div>
                        <div class="span">公开</div>
                    </div>
                </div>
                <div class="desc" v-if="params.private==1">
                    项目仅对成员可见，拥有创建、修改、删除视图权限
                </div>
                <div class="desc" v-if="params.private==2">
                    项目对所有访客可见，只能查看，并不能修改
                </div>
            </div>
            <div class="row coms">
                <div class="title">组件
                    <div class="add-btn" @click="popAddCom">
                    </div>
                </div>
                <div class="content">
                    <div class="cos" v-if="cos&&cos.length>0">
                        <div class="co-title">
                            组件库
                        </div>
                        <div class="cos-wrapper">
                            <div class="co" :class="{selected:co.selected}" v-for="(co,index) in cos" @click="clickCo(co)" >
                                <div class="icon"><img :src="co.images"></div>
                                <div class="name">{{co.name}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="coms"  v-if="coms&&coms.length>0">
                        <div class="com-title">
                            组件
                        </div>
                        <div class="coms-wrapper">
                            <div class="com" :class="{selected:com.selected}" v-for="(com,index) in coms" @click="clickCom(com)" >
                                <div class="icon"><img :src="com.icon || defaultComImg"></div>
                                <div class="name">{{com.name}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row users">
                <div class="title">成员
                    <div class="add-btn" @click="popAddUser">
                    </div>
                </div>
                <div class="content">
                    
                    <table>
                        <tr class="row" v-for="(row,index) in users">
                            
                            <td style="width: 50px;">
                                <img class="headimg" :src="row.headimg?row.headimg:defaultHeadimg">
                            </td>
                            <td>
                                {{row.name || row.nickname}}
                            </td>
                            
                        </tr>
                    </table>
                </div>
            </div>
            <div class="btns">
                <div class="save-pro-btn" @click="save()">保存</div>
            </div>
        </div>
    </div>
</template>

<script>
    import setting from "./setting";
    export default setting;
</script>

<style src="./setting.css"></style>