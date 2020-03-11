<template>
    <div :style="selfstyle">
    <span v-if="nickname">玩家:{{nickname}}</span>
    <span v-if="!nickname">这是一个空位</span>
    <span v-if="readystate && nickname">已准备！</span>
    <span v-if="!readystate && nickname">未准备</span>
    <!--游戏开始时计分板加入游戏玩家参数-->
    <div v-if="map!=null && map.player[index]['status']!=null">
        <span>{{map.player[index]['resources']}}张牌 {{map.player[index]['card']}}张发展卡 出了{{map.player[index]['soldier']}}次兵</span>
    </div>
    </div>
</template>

<script>
//计分板
//如果游戏需要什么与玩家相关的信息可以在这里显示
export default {
    props:['index','map'],
    data() {
        return {
            nickname:undefined,
            readystate:0,
            selfstyle:{
                width:'400px',
                height:'60px',
                border:'2px solid',
                'border-color':'#ff00ff',
                float:'left'
            }
        }
    },
    beforeMount() {
        //定义0-3为 蓝绿红黄
        //this.index=Number(this.index);
        var colorarray=new Array('#0000ff','#00ff00','#ff0000','#ffff00');
        this.selfstyle.left=this.x+'px';
        this.selfstyle.top=this.y+'px';
        this.selfstyle['border-color']=colorarray[this.index];
    },
    updated(){
        console.log(this.map);
    },
    methods: {
        
    },
}
</script>