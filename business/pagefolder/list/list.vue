<!-- Created by gaoyang 页面文件夹列表页面-->
<template>
    <div class="pagefolder-list-wrapper" @click="click()">
        <div class="model-left">
            <!-- <div class="title">
                <div class="new-model" @click="newFolder()">+新建</div>
            </div> -->
          <!--   <yii-button @click="test">测试</yii-button> -->
            <div class="tabbar">
                <div class="tab" :class="{selected:tabSelectIndex==1}" @click="tabSelectIndex=1">
                    页面管理
                </div>
                <div class="tab" :class="{selected:tabSelectIndex==2}" @click="tabSelectIndex=2">
                    组件
                </div>
            </div>

            <div class="list" v-show="tabSelectIndex==1">
                <folder :folders="folders" v-on:clickNode="clickNode" v-on:addFolder="addFolder">
                </folder>
                <div class="configs">
                    <div class="config" @click="clickConfig(1)" :class="{selected:selectedConfig==1}">项目配置</div>
                    <div class="config" @click="clickConfig(2)" :class="{selected:selectedConfig==2}">样式配置</div>
                    <div class="config" @click="clickConfig(3)" :class="{selected:selectedConfig==3}">路由配置</div>
                </div>
            </div>
            <div class="coms-wrapper" v-show="tabSelectIndex==2">
              <div class="coms-tabbar">
                  <div class="tab" :class="{selected:comTabSelectIndex==1}" @click="comTabSelectIndex=1">
                      基本组件
                  </div>
                  <div class="tab" :class="{selected:comTabSelectIndex==2}" @click="comTabSelectIndex=2">
                      业务组件
                  </div>
                  <div class="tab" :class="{selected:comTabSelectIndex==3}" @click="comTabSelectIndex=3">
                      模版
                  </div>
              </div>
              <div class="components" v-show="comTabSelectIndex==1">
                    <div :class="['com']" v-for="(com,index) in basiccoms"   @dblclick="dblclickCom(com)" :cid="com.id" draggable="true">
                        <div class="icon"><img :src="com.icon||defaultComImg"></div>
                        <div class="name">{{com.name}}</div>
                    </div>
              </div>
              <div class="biz-components" v-show="comTabSelectIndex==2">
                    <div :class="['biz-com']" v-for="(bizcom,index) in project.bizcoms" @dblclick="dblclickCom(bizcom)" :cid="bizcom.id" draggable="true">
                      <div class="icon"><img :src="bizcom.icon||defaultComImg"></div>
                      <div class="name">{{bizcom.name}}</div>
                    </div> 
              </div>
            </div>
        </div>
        <div class="model-right" id="modelRight">
            <div id="projectconfig" v-if="selectedConfig==1">
                <codemirror
                  :value="projectconfig"
                  :options="projectconfigOption"
                  ref="projectconfigEditor"
                  @change="projectconfigChange">
                </codemirror>
            </div>
            <div id="cssconfig" v-if="selectedConfig==2">
                <codemirror
                  :value="cssconfig"
                  :options="cssconfigOption"
                  ref="cssconfigEditor"
                  @change="cssconfigChange">
                </codemirror>
            </div>
            <div id="routerconfig" v-if="selectedConfig==3">
                <codemirror
                  :value="routerconfig"
                  :options="routerconfigOption"
                  ref="routerconfigEditor"
                  @change="routerconfigChange">
                </codemirror>
            </div>
            <page-editor :pageid="pageid" :pagename="pagename" :allcoms="project.allcoms" :basiccoms="project.basiccoms" :bizcoms="project.bizcoms" :basiccomcos="project.basiccomcos" v-if="selectedConfig==0 && pageid"></page-editor>
        </div>

    </div>
</template>

<script>
    import list from "./list";
    export default list;
</script>

<style src="./list.css"></style>