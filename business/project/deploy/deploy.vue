<!-- Created by gaoyang 项目列表页面-->
<template>
    <div class="project-deploy-wrapper">
        <div class="content">
          <div class="form">
            <yii-row>
              <yii-col span="5">项目名称：</yii-col>
              <yii-col span="10">{{project.name}}</yii-col>
            </yii-row>
            <yii-row>
              <yii-col span="5">发布环境：</yii-col>
              <yii-col span="15">
                <yii-select v-model="params.envid" placeholder="请选择环境">
                  <yii-select-option v-for="(item, index) in envs" 
                    :key="index" :value="item.id" :label="item.remark"></yii-select-option>
                </yii-select>
              </yii-col>
            </yii-row>
            <yii-row>
              <yii-col span="5">版本号：</yii-col>
              <yii-col span="15">
                <yii-input v-model="params.version" placeholder="请输入版本号">
                </yii-input>
              </yii-col>
            </yii-row>
            <yii-row>
              <yii-col span="5">发布说明：</yii-col>
              <yii-col span="15">
                <yii-textarea v-model="params.remark" placeholder="发布说明">
                </yii-textarea>
              </yii-col>
            </yii-row>
            <div class="btns">
                <div class="save-pro-btn" @click="deploy()">发布</div>
                <div class="save-pro-btn" @click="exportProject()">导出</div>
            </div>
          </div>
          <div class="details">
            <div class="title">部署历史信息</div>
            <div class="tabs">
              <div class="tab" v-for="(item, index) in envs" @click="clickTab(item)" :class="{selected:item.selected}">
              {{item.remark}}
              </div>
            </div>
            <div class="list">
              <div class="deploydetail" v-for="(row, index) in deploydetails" >
                <div class="left">
                  <span class="version">{{row.version}}</span>
                  <span class="username">{{row.createusername}}</span>
                </div>
                <div class="right">{{row.createtime}}</div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
    import deploy from "./deploy";
    export default deploy;
</script>

<style src="./deploy.css"></style>