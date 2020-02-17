<template>
    <div :style="selfstyle">
    <span>{{nickname}}</span>
    <span>准备状态:{{readystate}}</span>
    </div>
</template>

<script>
//计分板
export default {
    props:['x','y','index'],
    data() {
        return {
            nickname:'空位',
            readystate:0,
            selfstyle:{
                position:'absolute',
                left:'0px',
                top:'0px',
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