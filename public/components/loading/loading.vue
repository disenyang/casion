<template>
    <div class="block">
        <div class="loading">

            <div class="yii-icon">
                <img class="loading-img" src="http://rongyi.b0.upaiyun.com/commodity/text/201512081450544586.png"><span>&nbsp;加载中...</span>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'loading',
        props: {
        },
        data(){

            return {
                // zIndex: 0,
                // maskOpacity: 0,
                text: '',
                customClass: '',
                modalShow: false
            };
        },

        destroyed(){

        }
    }


</script>

<style>
    @import '../../styles/var.css';

    .block{
        left: 0px;
        top: 0px;
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.1);
        @b loading{
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate3d(-50%, -50%, 0);
            display: flex;
            justify-content: center;
            align-items: center;
            width: 230px;
            height: 80px;
            background-color: rgba(0,0,0,1);
            & .yii-icon{
                display: inline-block;
                margin-left: 10px;
                color: #fff;
                vertical-align: middle;
                font-size: 12px;
                .loading-img{
                    vertical-align: middle;
                    -webkit-animation: rotate .8s linear 0s infinite;
                }
                span{
                    padding-left: 5px;
                    font-size: 12px;
                }
            }

        }
    }
</style>