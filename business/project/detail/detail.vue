<!-- Created by gaoyang 项目详情页面-->
<template>
    <div class="project-detail-wrapper">
        
        <div class="col1">
            <div class="project-detail">
                <div class="title">
                    {{project.name}}-项目空间
                    <yii-tooltip content="删除" placement="top">
                        <div class="del-btn" @click="delProject()" >
                        </div>
                    </yii-tooltip>
                    <yii-tooltip content="发布" placement="top">
                        <div class="deploy-btn" @click="deployProject()">
                        </div>
                    </yii-tooltip>
                    <yii-tooltip content="编辑" placement="top">
                        <div class="edit-btn" @click="editProject()" >
                        </div>
                    </yii-tooltip>
                    <yii-tooltip content="打开" placement="top">
                        <div class="open-btn" @click="openProject()">
                        </div>
                    </yii-tooltip>
                </div>
            </div>
            <div class="my-project">
                <div class="title">
                  组件列表
                    <!-- <div class="add-btn" @click="createProject()">
                       
                    </div> -->
                </div>
                <div class="content">
                    <div class="coms-wrapper">
                        <div class="com" :class="{selected:com.selected}" v-for="(com,index) in project.basiccoms" @click="clickCom(com)">
                            <div class="icon"><img :src="com.icon||defaultComImg"></div>
                            <div class="name">{{com.name}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="my-dongtai">
                <div class="title">
                    项目动态
                </div>
                <div class="content">
                    <table>
                        <tr class="row" v-for="(row,index) in project.dongtais">
                            <td style="width: 40px;">
                                <img class="headimg" @click="gotoUser(row.createuser)" :src="row.headimg?row.headimg:defaultHeadimg">
                            </td>
                            <td>
                                <span class="user-nickname" @click="gotoUser(row.createuser)">{{row.createusername}}</span>
                            {{row.title}}
                            </td>
                            <td style="width: 130px">
                                <span class="createtime">{{row.createtime}}</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
          </div>
          <div class="col2">
            <div class="my-task">
                <div class="title">
                  我的任务
                </div>
                <div class="content">
                </div>
            </div>
            <div class="my-users">
                <div class="title">
                  成员列表
                </div>
                <div class="content">
                    <table>
                        <tr class="row" v-for="(row,index) in project.users">
                            
                            <td style="width: 40px;" class="pointer" @click="gotoUser(row.id)">
                                <img class="headimg" :src="row.headimg?row.headimg:defaultHeadimg">
                            </td>
                            <td @click="gotoUser(row.id)" class="pointer">
                                {{row.nickname}}
                            </td>
                            <td style="width: 130px">
                                <span class="createtime">{{row.createtime}}</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
          </div>
      </div>
    </div>
</template>

<script>
    import detail from "./detail";
    export default detail;
</script>

<style src="./detail.css"></style>