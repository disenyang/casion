<template>
  <div class="p-home">
	  <div class="col1">
		<div class="my-project">
		  <div class="title">
			  我的项目
			  <div class="btns">
				<div class="add-pro-btn" @click="createProject()">
				  +创建项目
				</div>
			  </div>
		  </div>
		  <div class="content">
			<div class="project" v-for="(project,index) in projectList" @click="goProject(project)">
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
		<div class="my-dongtai">
		  <div class="title">
			  动态
		  </div>
		  <div class="content">
			<div class="tabbar">
			  <div class="tab" :class="{selected:item.selected}" v-for="(item,index) in dongtaiTabs">{{item.lab}}</div>
			</div>
		  </div>
		</div>
		
	  </div>
	  <div class="col2">
	  	<div class="my-sign">
		  <div class="title">
			  签到
			  <div class="score">
			  	积分{{userinfo.score}}
			  </div>
		  </div>
		  <div class="content">
		  		<div class="sign-btn" :class="{'is-sign':isSign}" @click="sign">
		  			{{isSign?'已签到':'签到'}}
		  		</div>
		  </div>
		</div>  
		<div class="my-task">
		  <div class="title">
			  团队任务
		  </div>
		  <div class="content">
		  	<div class="requirement" v-for="(requirement,index) in requirements" @click="goProject(project)">
				<div class="developername">
					{{requirement.developername}}
				</div>
				<div class="req-content">
					{{requirement.name}}
				</div>
				<div class="req-status">
					{{requirement.status | getReqStatusText}}
				</div>
			</div>
		  </div>
		</div>
	  </div>
  </div>
</template>

<script>
  import stores from 'stores';
  import Utils from 'utils'
  export default{
  	mixins:[Utils.mixins],
	data(){
	  return {
		stores,
		dongtaiTabs:[
		  {lab:"我的项目",selected:true},
		  {lab:"关注的项目",selected:false},
		  {lab:"关注的人",selected:false}
		],
		projectList:[],
		defaultProjectimg:stores.defaultProjectimg,
		pages:{
            total:0,
            pageSize:15,
            currentPage:1
        },
        requirements:[],
        isSign:true,
        signing:false
	  }
	},
	props: {
	  crumbs: {
		type: Array,
		default: _ => []
	  }
	},
	computed:{
		userinfo:function(){
			return this.$store.state.userinfo;
		}
	},
	components: {

	},
	created(){
	  	
	},
	mounted() {
		this.getList();
		this.getTask();
		this.getSign();
		this.reloadUserinfo();
	},
	filters:{
		getReqStatusText:function(status){
            switch(status){
            	case 0:return "新建";
            	case 1:return "正在开发中";
            	case 2:return "完成开发";
            	case 3:return "正在联调中";
            	case 4:return "完成联调";
            	case 5:return "正在测试中";
            	case 6:return "完成测试";
            	case 7:return "已上线";
            }
		}
	},
	methods: {
		getList(){
			let params = Object.assign({}, this.params, {
                currentPage: this.pages.currentPage,
                pageSize: this.pages.pageSize,
                userid:userinfo.id
            });
            this.$http.post("/casion/project/queryTeam", params)
                .then((response) => {
                    this.projectList = response.data.data.data ? response.data.data.data : [];
                    this.pages.total = response.data.data.page.totalCount;
            });
        },
        getTask(){
            this.$http.post("/casion/requirement/queryTeamUsers", {userid:userinfo.id})
                .then((response) => {
                    this.requirements = response.data.data.data ? response.data.data.data : [];
            });
        },
        getSign(){
            this.$http.post("/casion/scoredetail/isSign", {user:userinfo.id})
                .then((response) => {
                    this.isSign = response.data.data.isSign;
            });
        },
        sign(){
        	if(!this.isSign && !this.signing){
        		this.signing = true;
        		this.$http.post("/casion/scoredetail/add", {user:userinfo.id,type:1})
	                .then((response) => {
	                	this.userinfo.score = this.userinfo.score+response.data.data.score;
	                    this.isSign = true;

	            });
        	}
        },
        goProject(project){
        	console.log("project===",project);
            this.$router.push({name:"project-detail",params:{id:project.id}});
        },
	  	createProject(com){
			this.$router.push({name: 'project-setting'});
	  	}
	}
  }
</script>
<style>
.p-home{
  text-align: center;
  height: 100%;
  position: relative;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  .col1{
	flex: 2;
	height: 100%;
	display: flex;
	margin-right: 20px;
	flex-direction: column;
	.my-project{
	  padding: 10px;
	  height: 300px;
	  display: flex;
	  background-color: #fff;
	  flex-direction: column;
	  .btns{
		float: right;
		.add-pro-btn{
		  cursor: pointer;
		  line-height: 40px;
		  margin-right: 10px;
		  font-size: 15px;
		  color: #222;
		}
	  }
	  .content{
		padding: 10px;
		flex: 1;
		display: flex;
		color: #888;
		.project{
        	width: 100px;
          	height: 130px;
          	margin-right: 40px;
          	.icon{
	            background-color: #fff;
	            cursor: pointer;
	            position: relative;
	            width: 100px;
	            height: 100px;
	            margin-right: 10px;
	            img{
	            	width: 100%;
	            	height: 100%;
	            	border-radius:5px;
	            }
        	}
        	.caption{
	            line-height: 30px;
	            text-align: center;
	        }
        }
		.add-btn{
		  width: 100px;
		  height: 130px;
		  .icon{
			background-color: #fff;
			cursor: pointer;
			position: relative;
			width: 100px;
			height: 100px;
			margin-right: 10px;
			border: 1px dashed #ddd;
			&:before{
			  content:"";
			  position:absolute;
			  left: 20px;
			  top: 49px;
			  width: 60px;
			  height: 2px;
			  background-color: #666;
			}
			&:after{
			  content:"";
			  position:absolute;
			  left: 49px;
			  top: 20px;
			  width: 2px;
			  height: 60px;
			  background-color: #666;
			}
		  }
		  .caption{
			line-height: 30px;
		  }
		}
	  }
	}

	.my-dongtai{
	  margin-top: 20px;
	  padding: 10px;
	  flex: 1;
	  background-color: #fff;
	  .content{
		padding: 10px;
		.tabbar{
		  display: flex;
		  .tab{
			cursor: pointer;
			line-height: 30px;
			margin-right: 20px;
			&.selected{
			  color: #333;
			  font-weight: bold;
			}
		  }
		}
	  }
	}


  }
  .col2{
	flex: 1;
	display: flex;
	flex-direction: column;
	.my-sign{
		height: 150px;
		background-color: #fff;
		cursor: pointer;
		.title{
			.score{
				float: right;
				padding-right: 20px;
				color: #ff3090;
			}
		}
		.content{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			.sign-btn{
				margin-top: 10px;
				width: 80px;
				height: 80px;
				background-color: #ff3090;
				border-radius: 40px;
				color: #fff;
				font-size: 16px;
				line-height: 80px;
			}
			.is-sign{
				background-color: #ff9030;
			}
		}
	}
	.my-task{
	  padding: 10px;
	  flex: 1;
	  margin-top: 20px;
	  background-color: #fff;
	  .content{
	  	.requirement{
	  		padding-left: 10px;
	  		display: flex;
	  		flex-direction: row;
	  		font-size: 14px;
	  		line-height: 30px;
	  		.developername{
	  			color: #555;
	  		}
	  		.req-content{
	  			flex: 1;
	  			text-align: left;
	  			color: #555;
	  			padding-left: 10px;
	  		}
	  		.req-status{
	  			width: 100px;
	  			text-align: right;
	  			color: #555;
	  		}
	  	}
	  }
	}
  }
  .title{
	  font-size: 18px;
	  line-height: 40px;
	  text-align: left;
	  padding-left: 10px;
	  border-bottom:1px solid #eee;
  }
} 
</style>