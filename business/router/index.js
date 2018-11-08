export default function(Vue){return [
    {
        "name":"home",
        "path":"home",
        "meta":{
            "title":"首页"
        },
        "component":resolve => require(['business/home/index.vue'], resolve)
    },
    {
        "name":"model",
        "path":"model",
        "meta":{
            "title":"数据模型"
        },
        "redirect":{
            "name":"model-list"
        },
        "component":Vue.extend({
                "template": '<router-view transition="fade" transition-mode="out-in"></router-view>'
            })
        ,
        "children":[
            {
                "name":"model-list",
                "path":"list",
                "meta":{
                    "title":"列表"
                },
                "component":resolve => require(['business/model/list/list.vue'], resolve)
            },
            {
                "name":"model-setting",
                "path":"setting/:dbid",
                "meta":{
                    "title":"新建"
                },
                "component":resolve => require(['business/model/setting/setting.vue'], resolve)
            },
            {
                "name":"model-modify",
                "path":"modify/:id",
                "meta":{
                    "title":"保存"
                },
                "component":resolve => require(['business/model/setting/setting.vue'], resolve)
            },
            {
                "name":"model-detail",
                "path":"detail/:id",
                "meta":{
                    "title":"详情"
                },
                "component":resolve => require(['business/model/detail/detail.vue'], resolve)
            }
        ]
    },
    {
        "name":"db",
        "path":"db",
        "meta":{
            "title":"数据库"
        },
        "redirect":{
            "name":"db-list"
        },
        "component":Vue.extend({
                "template": '<router-view transition="fade" transition-mode="out-in"></router-view>'
            })
        ,
        "children":[
            {
                "name":"db-list",
                "path":"list",
                "meta":{
                    "title":"列表"
                },
                "component":resolve => require(['business/db/list/list.vue'], resolve)
            },
            {
                "name":"db-setting",
                "path":"setting",
                "meta":{
                    "title":"新建"
                },
                "component":resolve => require(['business/db/setting/setting.vue'], resolve)
            },
            {
                "name":"db-modify",
                "path":"modify/:id",
                "meta":{
                    "title":"保存"
                },
                "component":resolve => require(['business/db/setting/setting.vue'], resolve)
            },
            {
                "name":"db-detail",
                "path":"detail/:id",
                "meta":{
                    "title":"详情"
                },
                "component":resolve => require(['business/db/detail/detail.vue'], resolve)
            }
        ]
    },
    {
        "name":"pagefolder",
        "path":"pagefolder",
        "meta":{
            "title":"项目文件夹"
        },
        "redirect":{
            "name":"pagefolder-list"
        },
        "component":Vue.extend({
                "template": '<router-view transition="fade" transition-mode="out-in"></router-view>'
            })
        ,
        "children":[
            {
                "name":"pagefolder-list",
                "path":"list/:projectid",
                "meta":{
                    "title":"项目目录"
                },
                "component":resolve => require(['business/pagefolder/list/list.vue'], resolve),
                children:[]
            },
            {
                "name":"pagefolder-setting",
                "path":"setting",
                "meta":{
                    "title":"新建"
                },
                "component":resolve => require(['business/pagefolder/setting/setting.vue'], resolve)
            },
            {
                "name":"pagefolder-modify",
                "path":"modify/:id",
                "meta":{
                    "title":"保存"
                },
                "component":resolve => require(['business/pagefolder/setting/setting.vue'], resolve)
            },
            {
                "name":"pagefolder-detail",
                "path":"detail/:id",
                "meta":{
                    "title":"详情"
                },
                "component":resolve => require(['business/pagefolder/detail/detail.vue'], resolve)
            }
        ]
    },
    {
        "name":"page",
        "path":"page",
        "meta":{
            "title":"页面"
        },
        "component":Vue.extend({
                "template": '<router-view transition="fade" transition-mode="out-in"></router-view>'
            })
        ,
        "children":[
            {
                "name":"page-edit",
                "path":"edit/:id",
                "meta":{
                    "title":"编辑页面"
                },
                "component":resolve => require(['business/page/edit/edit.vue'], resolve)
            }
        ]
    },
    {
        "name":"basiccomco",
        "path":"basiccomco",
        "meta":{
            "title":"基础组件库"
        },
        "redirect":{
            "name":"basiccomco-list"
        },
        "component":Vue.extend({
                "template": '<router-view transition="fade" transition-mode="out-in"></router-view>'
            })
        ,
        "children":[
            {
                "name":"basiccomco-list",
                "path":"list",
                "meta":{
                    "title":"列表"
                },
                "component":resolve => require(['business/com/basiccomco/list/list.vue'], resolve)
            },
            {
                "name":"basiccomco-setting",
                "path":"setting",
                "meta":{
                    "title":"新建"
                },
                "component":resolve => require(['business/com/basiccomco/setting/setting.vue'], resolve)
            },
            {
                "name":"basiccomco-modify",
                "path":"modify/:id",
                "meta":{
                    "title":"保存"
                },
                "component":resolve => require(['business/com/basiccomco/setting/setting.vue'], resolve)
            },
            {
                "name":"basiccomco-detail",
                "path":"detail/:id",
                "meta":{
                    "title":"组件库详情"
                },
                "component":resolve => require(['business/com/basiccomco/detail/detail.vue'], resolve)
            }
        ]
    },
    {
        "name":"basiccom",
        "path":"basiccom",
        "meta":{
            "title":"基础组件"
        },
        "redirect":{
            "name":"basiccom-list"
        },
        "component":Vue.extend({
                "template": '<router-view transition="fade" transition-mode="out-in"></router-view>'
            })
        ,
        "children":[
            {
                "name":"basiccom-list",
                "path":"list",
                "meta":{
                    "title":"列表"
                },
                "component":resolve => require(['business/com/basiccom/list/list.vue'], resolve)
            },
            {
                "name":"basiccom-setting",
                "path":"setting/:coid",
                "meta":{
                    "title":"新建"
                },
                "component":resolve => require(['business/com/basiccom/setting/setting.vue'], resolve)
            },
            {
                "name":"basiccom-modify",
                "path":"modify/:id",
                "meta":{
                    "title":"保存"
                },
                "component":resolve => require(['business/com/basiccom/setting/setting.vue'], resolve)
            },
            {
                "name":"basiccom-detail",
                "path":"detail/:id",
                "meta":{
                    "title":"组件详情"
                },
                "component":resolve => require(['business/com/basiccom/detail/detail.vue'], resolve)
            },
            {
                "name":"basiccom-readme",
                "path":"readme/:id",
                "meta":{
                    "title":"组件文档"
                },
                "component":resolve => require(['business/com/basiccom/readme/readme.vue'], resolve)
            }
        ]
    },
    {
        "name":"bizcom",
        "path":"bizcom",
        "meta":{
            "title":"业务组件"
        },
        "redirect":{
            "name":"bizcom-list"
        },
        "component":Vue.extend({
                "template": '<router-view transition="fade" transition-mode="out-in"></router-view>'
            })
        ,
        "children":[
            {
                "name":"bizcom-list",
                "path":"list",
                "meta":{
                    "title":"列表"
                },
                "component":resolve => require(['business/com/bizcom/list/list.vue'], resolve)
            },
            {
                "name":"bizcom-setting",
                "path":"setting/:coid",
                "meta":{
                    "title":"新建业务组件"
                },
                "component":resolve => require(['business/com/bizcom/setting/setting.vue'], resolve)
            },
            {
                "name":"bizcom-modify",
                "path":"modify/:id",
                "meta":{
                    "title":"保存"
                },
                "component":resolve => require(['business/com/bizcom/setting/setting.vue'], resolve)
            },
            {
                "name":"bizcom-detail",
                "path":"detail/:id",
                "meta":{
                    "title":"组件详情"
                },
                "component":resolve => require(['business/com/bizcom/detail/detail.vue'], resolve)
            },
            {
                "name":"bizcom-readme",
                "path":"readme/:id",
                "meta":{
                    "title":"组件文档"
                },
                "component":resolve => require(['business/com/bizcom/readme/readme.vue'], resolve)
            }
        ]
    },
    {
        "name":"jstool",
        "path":"jstool",
        "meta":{
            "title":"js工具"
        },
        "redirect":{
            "name":"jstool-list"
        },
        "component":Vue.extend({
                "template": '<router-view transition="fade" transition-mode="out-in"></router-view>'
        }),
        "children":[
            {
                "name":"jstool-setting",
                "path":"setting/:coid",
                "meta":{
                    "title":"新建"
                },
                "component":resolve => require(['business/com/jstool/setting/setting.vue'], resolve)
            },
            {
                "name":"jstool-modify",
                "path":"modify/:id",
                "meta":{
                    "title":"保存"
                },
                "component":resolve => require(['business/com/jstool/setting/setting.vue'], resolve)
            },
            {
                "name":"jstool-detail",
                "path":"detail/:id",
                "meta":{
                    "title":"组件详情"
                },
                "component":resolve => require(['business/com/jstool/detail/detail.vue'], resolve)
            }
        ]
    },
    {
        "name":"template",
        "path":"template",
        "meta":{
            "title":"模版"
        },
        "redirect":{
            "name":"template-list"
        },
        "component":Vue.extend({
                "template": '<router-view transition="fade" transition-mode="out-in"></router-view>'
        }),
        "children":[
            {
                "name":"template-setting",
                "path":"setting/:coid",
                "meta":{
                    "title":"新建"
                },
                "component":resolve => require(['business/com/template/setting/setting.vue'], resolve)
            },
            {
                "name":"template-modify",
                "path":"modify/:id",
                "meta":{
                    "title":"保存"
                },
                "component":resolve => require(['business/com/template/setting/setting.vue'], resolve)
            },
            {
                "name":"template-detail",
                "path":"detail/:id",
                "meta":{
                    "title":"模版详情"
                },
                "component":resolve => require(['business/com/template/detail/detail.vue'], resolve)
            }
        ]
    },
    {
        "name":"module",
        "path":"module",
        "meta":{
            "title":"功能模块"
        },
        "redirect":{
            "name":"module-list"
        },
        "component":Vue.extend({
                "template": '<router-view transition="fade" transition-mode="out-in"></router-view>'
        }),
        "children":[
            {
                "name":"module-setting",
                "path":"setting/:coid",
                "meta":{
                    "title":"新建功能模块"
                },
                "component":resolve => require(['business/com/module/setting/setting.vue'], resolve)
            },
            {
                "name":"module-modify",
                "path":"modify/:id",
                "meta":{
                    "title":"修改功能模块"
                },
                "component":resolve => require(['business/com/module/setting/setting.vue'], resolve)
            },
            {
                "name":"module-detail",
                "path":"detail/:id",
                "meta":{
                    "title":"功能模块详情"
                },
                "component":resolve => require(['business/com/module/detail/detail.vue'], resolve)
            }
        ]
    },
    {
        "name":"editor-test",
        "path":"editor",
        "meta":{
            "title":"编辑器测试"
        },
        "component":resolve => require(['business/editor/test/test.vue'], resolve)
    },
    {
        "name":"test",
        "path":"test",
        "meta":{ 
            "title":"编辑器测试"
        },
        "component":resolve => require(['business/test/test.vue'], resolve)
    },
    {
        "name":"project",
        "path":"project",
        "meta":{
            "title":"项目"
        },
        "redirect":{
            "name":"project-list"
        },
        "component":Vue.extend({
                "template": '<router-view transition="fade" transition-mode="out-in"></router-view>'
            })
        ,
        "children":[
            {
                "name":"project-list",
                "path":"list",
                "meta":{
                    "title":"项目列表"
                },
                "component":resolve => require(['business/project/list/list.vue'], resolve)
            },
            {
                "name":"project-setting",
                "path":"setting",
                "meta":{
                    "title":"添加项目"
                },
                "component":resolve => require(['business/project/setting/setting.vue'], resolve)
            },
            {
                "name":"project-deploy",
                "path":"deploy/:id",
                "meta":{
                    "title":"发布项目"
                },
                "component":resolve => require(['business/project/deploy/deploy.vue'], resolve)
            },
            {
                "name":"project-modify",
                "path":"modify/:id",
                "meta":{
                    "title":"保存"
                },
                "component":resolve => require(['business/project/setting/setting.vue'], resolve)
            },
            {
                "name":"project-detail",
                "path":"detail/:id",
                "meta":{
                    "title":"项目空间"
                },
                "component":resolve => require(['business/project/detail/detail.vue'], resolve)
            }
        ]
    },
    {
        "name":"requirement",
        "path":"requirement",
        "meta":{
            "title":"需求功能"
        },
        "redirect":{
            "name":"requirement-list"
        },
        "component":Vue.extend({
                "template": '<router-view transition="fade" transition-mode="out-in"></router-view>'
            })
        ,
        "children":[
            {
                "name":"requirement-list",
                "path":"list",
                "meta":{
                    "title":"需求功能列表"
                },
                "component":resolve => require(['business/requirement/list/list.vue'], resolve)
            },
            {
                "name":"requirement-setting",
                "path":"setting",
                "meta":{
                    "title":"添加需求功能"
                },
                "component":resolve => require(['business/requirement/setting/setting.vue'], resolve)
            },
            {
                "name":"requirement-modify",
                "path":"modify/:id",
                "meta":{
                    "title":"保存需求功能"
                },
                "component":resolve => require(['business/requirement/setting/setting.vue'], resolve)
            },
            {
                "name":"requirement-detail",
                "path":"detail/:id",
                "meta":{
                    "title":"需求功能明细"
                },
                "component":resolve => require(['business/requirement/detail/detail.vue'], resolve)
            }
        ]
    },
    {
        "name":"company",
        "path":"company",
        "meta":{
            "title":"公司"
        },
        "redirect":{
            "name":"company-list"
        },
        "component":Vue.extend({
                "template": '<router-view transition="fade" transition-mode="out-in"></router-view>'
            })
        ,
        "children":[
            {
                "name":"company-list",
                "path":"list",
                "meta":{
                    "title":"公司功能列表"
                },
                "component":resolve => require(['business/company/list/list.vue'], resolve)
            },
            {
                "name":"company-setting",
                "path":"setting",
                "meta":{
                    "title":"添加公司"
                },
                "component":resolve => require(['business/company/setting/setting.vue'], resolve)
            },
            {
                "name":"company-modify",
                "path":"modify/:id",
                "meta":{
                    "title":"保存公司"
                },
                "component":resolve => require(['business/company/setting/setting.vue'], resolve)
            },
            {
                "name":"company-detail",
                "path":"detail/:id",
                "meta":{
                    "title":"公司明细"
                },
                "component":resolve => require(['business/company/detail/detail.vue'], resolve)
            }
        ]
    },
    {
        "name":"team",
        "path":"team",
        "meta":{
            "title":"团队"
        },
        "redirect":{
            "name":"team-list"
        },
        "component":Vue.extend({
                "template": '<router-view transition="fade" transition-mode="out-in"></router-view>'
            })
        ,
        "children":[
            {
                "name":"team-list",
                "path":"list",
                "meta":{
                    "title":"团队列表"
                },
                "component":resolve => require(['business/team/list/list.vue'], resolve)
            },
            {
                "name":"team-setting",
                "path":"setting/:company",
                "meta":{
                    "title":"添加团队"
                },
                "component":resolve => require(['business/team/setting/setting.vue'], resolve)
            },
            {
                "name":"team-modify",
                "path":"modify/:id",
                "meta":{
                    "title":"保存团队"
                },
                "component":resolve => require(['business/team/setting/setting.vue'], resolve)
            },
            {
                "name":"team-detail",
                "path":"detail/:id",
                "meta":{
                    "title":"团队明细"
                },
                "component":resolve => require(['business/team/detail/detail.vue'], resolve)
            }
        ]
    },
    {
        "name":"userprojectconfig",
        "path":"userprojectconfig",
        "meta":{
            "title":"用户项目配置"
        },
        "redirect":{
            "name":"userprojectconfig-list"
        },
        "component":Vue.extend({
                "template": '<router-view transition="fade" transition-mode="out-in"></router-view>'
            })
        ,
        "children":[
            {
                "name":"userprojectconfig-list",
                "path":"list",
                "meta":{
                    "title":"列表"
                },
                "component":resolve => require(['business/userprojectconfig/list/list.vue'], resolve)
            },
            {
                "name":"userprojectconfig-setting",
                "path":"setting",
                "meta":{
                    "title":"新建"
                },
                "component":resolve => require(['business/userprojectconfig/setting/setting.vue'], resolve)
            },
            {
                "name":"userprojectconfig-modify",
                "path":"modify/:id",
                "meta":{
                    "title":"保存"
                },
                "component":resolve => require(['business/userprojectconfig/setting/setting.vue'], resolve)
            },
            {
                "name":"userprojectconfig-detail",
                "path":"detail/:id",
                "meta":{
                    "title":"详情"
                },
                "component":resolve => require(['business/userprojectconfig/detail/detail.vue'], resolve)
            }
        ]
    },
    {
        "name":"environment",
        "path":"environment",
        "meta":{
            "title":"环境配置"
        },
        "redirect":{
            "name":"environment-list"
        },
        "component":Vue.extend({
                "template": '<router-view transition="fade" transition-mode="out-in"></router-view>'
            })
        ,
        "children":[
            {
                "name":"environment-list",
                "path":"list",
                "meta":{
                    "title":"列表"
                },
                "component":resolve => require(['business/environment/list/list.vue'], resolve)
            },
            {
                "name":"environment-setting",
                "path":"setting",
                "meta":{
                    "title":"新建"
                },
                "component":resolve => require(['business/environment/setting/setting.vue'], resolve)
            },
            {
                "name":"environment-modify",
                "path":"modify/:id",
                "meta":{
                    "title":"保存"
                },
                "component":resolve => require(['business/environment/setting/setting.vue'], resolve)
            },
            {
                "name":"environment-detail",
                "path":"detail/:id",
                "meta":{
                    "title":"详情"
                },
                "component":resolve => require(['business/environment/detail/detail.vue'], resolve)
            }
        ]
    },
    {
        "name":"workrecord",
        "path":"workrecord",
        "meta":{
            "title":"日报"
        },
        "redirect":{
            "name":"workrecord-home"
        },
        "component":Vue.extend({
            "template": '<router-view transition="fade" transition-mode="out-in"></router-view>'
        })
        ,
        "children":[
            {
                "name":"workrecord-home",
                "path":"home",
                "meta":{
                    "title":"首页"
                },
                "component":resolve => require(['business/workrecord/home/home.vue'], resolve)
            },
            {
                "name":"workrecord-list",
                "path":"list/:userid",
                "meta":{
                    "title":"列表"
                },
                "component":resolve => require(['business/workrecord/list/list.vue'], resolve)
            },
            {
                "name":"workrecord-setting",
                "path":"setting",
                "meta":{
                    "title":"新建"
                },
                "component":resolve => require(['business/workrecord/setting/setting.vue'], resolve)
            },
            {
                "name":"workrecord-modify",
                "path":"modify/:id",
                "meta":{
                    "title":"保存"
                },
                "component":resolve => require(['business/workrecord/setting/setting.vue'], resolve)
            },
            {
                "name":"workrecord-detail",
                "path":"detail/:id",
                "meta":{
                    "title":"详情"
                },
                "component":resolve => require(['business/workrecord/detail/detail.vue'], resolve)
            }
        ]
    },
    {
        "name":"tutor",
        "path":"tutor",
        "meta":{
            "title":"导师"
        },
        "redirect":{
            "name":"tutor-home"
        },
        "component":Vue.extend({
            "template": '<router-view transition="fade" transition-mode="out-in"></router-view>'
        })
        ,
        "children":[
            {
                "name":"tutor-home",
                "path":"home",
                "meta":{
                    "title":"首页"
                },
                "component":resolve => require(['business/tutor/home/home.vue'], resolve)
            },
            {
                "name":"tutor-list",
                "path":"list",
                "meta":{
                    "title":"列表"
                },
                "component":resolve => require(['business/tutor/list/list.vue'], resolve)
            },
            {
                "name":"tutor-setting",
                "path":"setting",
                "meta":{
                    "title":"新建"
                },
                "component":resolve => require(['business/tutor/setting/setting.vue'], resolve)
            },
            {
                "name":"tutor-modify",
                "path":"modify/:id",
                "meta":{
                    "title":"保存"
                },
                "component":resolve => require(['business/tutor/setting/setting.vue'], resolve)
            },
            {
                "name":"tutor-detail",
                "path":"detail/:id",
                "meta":{
                    "title":"详情"
                },
                "component":resolve => require(['business/tutor/detail/detail.vue'], resolve)
            }
        ]
    },
    {
        "name":"tutortask",
        "path":"tutortask",
        "meta":{
            "title":"导师任务"
        },
        "redirect":{
            "name":"tutortask-home"
        },
        "component":Vue.extend({
            "template": '<router-view transition="fade" transition-mode="out-in"></router-view>'
        })
        ,
        "children":[
            {
                "name":"tutortask-list",
                "path":"list",
                "meta":{
                    "title":"列表"
                },
                "component":resolve => require(['business/tutortask/list/list.vue'], resolve)
            },
            {
                "name":"tutortask-setting",
                "path":"setting",
                "meta":{
                    "title":"新建"
                },
                "component":resolve => require(['business/tutortask/setting/setting.vue'], resolve)
            },
            {
                "name":"tutortask-modify",
                "path":"modify/:id",
                "meta":{
                    "title":"保存"
                },
                "component":resolve => require(['business/tutortask/setting/setting.vue'], resolve)
            },
            {
                "name":"tutortask-detail",
                "path":"detail/:id",
                "meta":{
                    "title":"详情"
                },
                "component":resolve => require(['business/tutortask/detail/detail.vue'], resolve)
            }
        ]
    },
    {
        "name":"plan",
        "path":"plan",
        "meta":{
            "title":"计划"
        },
        "redirect":{
            "name":"plan-list"
        },
        "component":Vue.extend({
            "template": '<router-view transition="fade" transition-mode="out-in"></router-view>'
        })
        ,
        "children":[
            {
                "name":"plan-list",
                "path":"list",
                "meta":{
                    "title":"列表"
                },
                "component":resolve => require(['business/plan/list/list.vue'], resolve)
            },
            {
                "name":"plan-setting",
                "path":"setting",
                "meta":{
                    "title":"新建"
                },
                "component":resolve => require(['business/plan/setting/setting.vue'], resolve)
            },
            {
                "name":"plan-modify",
                "path":"modify/:id",
                "meta":{
                    "title":"保存"
                }, 
                "component":resolve => require(['business/plan/setting/setting.vue'], resolve)
            },
            {
                "name":"plan-detail",
                "path":"detail/:id",
                "meta":{
                    "title":"详情"
                },
                "component":resolve => require(['business/plan/detail/detail.vue'], resolve)
            }
        ]
    },
    {
        "name":"plandetail",
        "path":"plandetail",
        "meta":{
            "title":"计划"
        },
        "redirect":{
            "name":"plandetail-home"
        },
        "component":Vue.extend({
            "template": '<router-view transition="fade" transition-mode="out-in"></router-view>'
        })
        ,
        "children":[
            {
                "name":"plandetail-list",
                "path":"list",
                "meta":{
                    "title":"列表"
                },
                "component":resolve => require(['business/plandetail/list/list.vue'], resolve)
            },
            {
                "name":"plandetail-setting",
                "path":"setting/:planid",
                "meta":{
                    "title":"新建"
                },
                "component":resolve => require(['business/plandetail/setting/setting.vue'], resolve)
            },
            {
                "name":"plandetail-modify",
                "path":"modify/:id",
                "meta":{
                    "title":"保存"
                },
                "component":resolve => require(['business/plandetail/setting/setting.vue'], resolve)
            },
            {
                "name":"plandetail-detail",
                "path":"detail/:id",
                "meta":{
                    "title":"详情"
                },
                "component":resolve => require(['business/plandetail/detail/detail.vue'], resolve)
            }
        ]
    },
    {
        "name":"personal",
        "path":"personal",
        "meta":{
            "title":"个人主页"
        },
        "redirect":{
            "name":"personal-home"
        },
        "component":Vue.extend({
            "template": '<router-view transition="fade" transition-mode="out-in"></router-view>'
        })
        ,
        "children":[
            {
                "name":"personal-home",
                "path":"home/:userid",
                "meta":{
                    "title":"个人主页"
                },
                "component":resolve => require(['business/personal/personal.vue'], resolve)
            }
        ]
    }
]
;}