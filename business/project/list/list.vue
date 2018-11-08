<!-- Created by gaoyang 项目列表页面-->
<template>
    <div class="project-list-wrapper">
        <div class="col1">
            <div class="my-project">
              <div class="title">
                  <div class="tabs">
                    <div class="tab" v-for="(tab,index) in tabs" :class="{selected:tab.selected}" @click="clickTab(tab)">
                      {{tab.lab}}
                    </div>
                  </div>
                  <div class="btns">
                    
                    <div class="add-pro-btn" @click="createProject()">
                        +创建项目
                    </div>
                  </div>
              </div>
              <div class="content">
                <div class="project" v-for="(project,index) in dataList" @click="goProject(project)">
                    <div class="icon">
                        <img :src="project.icon?project.icon:defaultProjectimg">
                    </div>
                    <div class="caption">
                        {{project.name}}
                    </div>
                </div>
                <div class="add-btn" @click="createProject()">
                  <div class="icon">
                  </div>
                  <div class="caption">
                    创建新项目
                  </div>
                </div>
              </div>
            </div>
            
        </div>
    </div>
</template>

<script>
    import list from "./list";
    export default list;
</script>

<style src="./list.css"></style>