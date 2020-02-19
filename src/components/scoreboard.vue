<template>
    <div :style="selfstyle">
    <span>{{nickname}}</span>
    <br>
    <span v-if="readystate">已准备！</span>
    <span v-if="!readystate">未准备</span>
    </div>
</template>

<script>
//计分板
//如果游戏需要什么与玩家相关的信息可以在这里显示
export default {
    props:['index'],
    data() {
        return {
            nickname:'空位',
            readystate:0,
            selfstyle:{
                width:'420px',
                height:'80px',
                border:'2px solid',
                'border-color':'#ff00ff'
            }
        }
    },
    beforeMount() {
        //定义0-3为 蓝绿红黄
        //this.index=Number(this.index);
        var colorarray=new Array('#0000ff','#00ff00','#ff0000','ffff00');
        this.selfstyle.left=this.x+'px';
        this.selfstyle.top=this.y+'px';
        this.selfstyle['border-color']=colorarray[this.index];
    },
    methods: {
        
    },
}
</script>