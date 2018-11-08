<!-- Created by gaoyang 基础组件库详情页面-->
<template>
    <div class="basiccomco-detail-wrapper">
        <div class="basiccomco">
            <div class="top">
                <div class="wrapper1">
                    <div class="name">{{basiccomco.name}}</div>
                    <div class="username">创建人：{{basiccomco.createusername}}</div>
                    <div class="updatetime">创建时间：{{basiccomco.createtime?basiccomco.createtime.split(" ")[0]:""}}</div>
                </div>
                <div class="wrapper2">
                    <div class="remark">简介：{{basiccomco.remark}}</div>
                </div>
                 <div class="framework">技术框架：{{basiccomco.framework}}</div>
            </div>
            
            <div class="center">
                <img class="image" :src="basiccomco.images">
            </div>
            <div class="tail">
               
            </div>
            <div class="row">
                <yii-tooltip content="编辑" placement="top">
                    <div class="edit-btn" @click="edit()" >
                   
                    </div>
                </yii-tooltip>
            </div>
        </div>
        <div class="basiccomco-content">
            <div class="com">
                <div class="com-title">
                    基本组件列表
                </div>
                <div class="coms">
                    <div class="add-btn" @click="goAdd">
                    </div>
                    <div class="com-wrapper" v-for="(com,index) in basiccomco.coms" @click="goCom(com)">
                        <div class="icon">
                            <img :src="com.icon || defaultComImg">
                        </div>
                        <div class="name">
                            {{com.name}}
                        </div>
                    </div>
                </div>
            </div>

            <div class="biz-com">
                <div class="biz-com-title">
                    业务组件列表(团队成员可见)
                    <yii-tooltip content="创建业务组件"  placement="top" effect="black">
                        <yii-button icon="plus"  type="stroke" @click="goAddBiz"></yii-button>
                    </yii-tooltip>
                </div>
                <div class="biz-coms">
                    <div class="biz-wrapper" v-for="(bizcom,index) in basiccomco.bizcoms" @click="goBizcom(bizcom)">
                        <div class="name">{{bizcom.name}}</div>
                        <div class="createusername">{{bizcom.createusername}}</div>
                        <div class="createtime">{{bizcom.createtime}}</div>
                    </div>
                </div>
            </div>
                
            <div class="jstools">
                <div class="jstools-title">
                    js工具
                </div>
                <div class="jstools-wrapper">
                    <div class="add-btn" @click="goAddJstool">
                    </div>
                    <div class="jstool-wrapper" v-for="(jstool,index) in basiccomco.jstools" @click="goJstool(jstool)">
                        <div class="name">
                            {{jstool.name}}
                        </div>
                    </div>
                </div>
            </div>


            <div class="templates">
                <div class="templates-title">
                    模版列表
                </div>
                <div class="templates-wrapper">
                    <div class="add-btn" @click="goAddTemplate">
                    </div>
                    <div class="template-wrapper" v-for="(template,index) in basiccomco.templates" @click="goTemplate(template)">
                        
                        <div class="font">
                            <div class="name">{{template.name}}</div>
                            <div class="createusername">创建人：{{template.createusername}}</div>
                            <div class="createtime">{{template.createtime}}</div>
                        </div>
                        <div class="icon">
                            <img :src="template.image">
                        </div>
                    </div>
                </div>
            </div>

            <div class="modules">
                <div class="modules-title">
                    功能模块列表
                </div>
                <div class="modules-wrapper">
                    <div class="add-btn" @click="goAddModule">
                    </div>
                    <div class="module-wrapper" v-for="(module,index) in basiccomco.modules" @click="goModule(module)">
                        <div class="font">
                            <div class="name">{{module.name}}</div>
                            <div class="createusername">创建人：{{module.createusername}}</div>
                            <div class="createtime">{{module.createtime}}</div>
                        </div>
                        <div class="icon">
                            <img :src="module.image">
                        </div>
                    </div>
                </div>
            </div>

            <div class="csscontent">
                <div class="csscontent-title">
                    css样式定义
                </div>
                <div class="csscontent-wrapper">
                    <codemirror
                        :value="basiccomco.csscontent"
                        :options="csscontentEditorOption"
                        ref="csscontentEditor"
                        @change="csscontentChange">
                    </codemirror>
                </div>
            </div>

        </div>
        
    </div>
</template>

<script>
    require('codemirror/mode/css/css')
    require('codemirror/mode/javascript/javascript')
    require('codemirror/mode/htmlmixed/htmlmixed')
    require('codemirror/mode/xml/xml')

    require('codemirror/addon/hint/show-hint.js')
    require('codemirror/addon/hint/show-hint.css')
    require('codemirror/addon/hint/javascript-hint.js')

    require('codemirror/addon/hint/xml-hint.js')
    require('codemirror/addon/hint/html-hint.js')
    require('codemirror/addon/hint/css-hint.js')
    require('codemirror/keymap/sublime.js')

    require('codemirror/theme/dracula.css');

    import detail from "./detail";
    export default detail;
</script>

<style src="./detail.css"></style>