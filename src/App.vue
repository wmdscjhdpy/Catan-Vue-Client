<template>
  <div id="app">
    <div v-if="gamemap!=null">
      <hexagon @myClick="hexagonHandle" v-for="(hexa,index) in gamemap.hexagon" :key="hexa.label" :P="hexa.Pos" :rollnum="hexa.number" :kind="hexa.kind" :index="index"/>
      <node @myClick="nodeHandle"  v-for="(nod,index) in gamemap.node" :key="nod.label" :P1="nod.Pos[0]" :P2="nod.Pos[1]" :P3="nod.Pos[2]" :belongto="nod.belongto" :building="nod.building" :index="index"/>
      <road @myClick="roadHandle"  v-for="(roa,index) in gamemap.road" :key="roa.label" :P1="roa.Pos[0]" :P2="roa.Pos[1]" :belongto="roa.belongto" :index="index"/>
      <roll @myClick="rollHandle" :num="roll" style="position:absolute;left:1000px;top:50px"/>
      <span v-if="myturn" style="position:absolute;left:1050px;top:650px;width:200px;font-size:30px">轮到你了！</span>
    </div>
    <div v-if="gamemap==null">
      <img :src="backgroundimg" width="900" height="900" style="position:absolute;left:100px;top:20px;"/>
    </div>
    <div style="position:absolute;left:1300px;top:10px">
      <room ref="room" @gameDataHandle="gameDataHandle" :map="gamemap"/>
      <div v-if="gamemap!=null && mydata!=null">
        <privateboard @myClick="changeRes" :robflag="robflag" :resources="mydata['resources']" style="position:absolute;left:0px;top:700px"/>
        <button  @click="getCard()" style="resize:none;font-size:16px;">我要抽卡！</button>
        <button @click="endturn()" style="resize:none;font-size:16px;">结束建设</button>
        <button @click="test()">测试</button>
      </div>
    </div>
  </div>
</template>

<script>
import background from './assets/background.jpg'

import hexagon from './components/hexagon.vue'
import node from './components/node.vue'
import road from './components/road.vue'
import gamecalc from './components/gamecalc.js'
import room from './components/room.vue'
import roll from './components/roll.vue'
import privateboard from './components/privateboard'

export default {
  name: 'App',
  components: {
    hexagon,
    node,
    road,
    room,
    roll,
    privateboard
  },
  data:function(){
    return{
      gamemap:null,               //存放游戏地图
      mydata:null,                //存放个人私有数据
      backgroundimg:background,   //背景图
      roll:Array(0,0),            //骰子数据
    }
  },
  computed:{
    myturn:function(){
      if(this.$refs.room.myseat==this.gamemap['status']['turn'])return 1;
      else return 0;
    },
    robflag:function(){//判断是否需要丢牌的标志位
      console.log(this.$refs.room.myseat);
      if(this.gamemap['player'][this.$refs.room.myseat]['resources']>=7
      && this.gamemap['status']['extra']==1)return true;
      else return false;
    }
  },
  mounted(){

  },
  methods: {
    gameDataHandle(data){//游戏接收到的数据总管
      switch(data.head)
      {   
      case 'leavesuccess':
        this.gamemap=null;
      break;
      //上面的case为房间维护相关 和游戏无关
      case 'startgame':
        this.gamemap=data;
        //这里会存在一个很难受的问题，gamemap不可避免的引入了通讯数据头以及showmsg之类的消息，而且还有private类型消息在内 JS就不能给我开放原始操作吗
      break;
      case 'update':
        var pointer;
        var i;
        if(data['type']=='public')pointer=this.gamemap;
        else if(data['type']=='private')pointer=this.mydata;
        else console.log(data);//不应该运行到这里
        if(data['key']==null)
        {
          this.mydata=data['data'];
        }else{
          for(i=0;i<data['key'].length-1;i++)
          {
            pointer=pointer[data['key'][i]];
          }
          pointer[data['key'][i]]=data['data'];
        }
      break;
      case 'roll':
        this.roll=data['roll'];
      break;
      case 'msg':
        //纯消息，不处理
      break;
      }
    },
    hexagonHandle(P){//hexagon事件代理函数

    },
    nodeHandle(index){//node事件代理函数
      var ret={};
      if(this.myturn)//确认是自己的回合
      {
        if(this.gamemap['status']['process']==1 && this.gamemap['node'][index]['belongto']==-1)//处于初始放村状态
        {
          if(confirm('就决定是这里是你的初始村吗？')==true)
          {
            ret['head']='buildhome';
            ret['index']=index;
            this.$refs.room.webSocket.send(JSON.stringify(ret));
          }
        }else if(this.gamemap['status']['process']==4)//处于建设状态
        {
          if(this.gamemap['node'][index]['belongto']==this.$refs.room.myseat && this.gamemap['node']['building']=='home')
          {//判断为建城            
            if(this.mydata['resources']['wheat']>=2
            && this.mydata['resources']['stone']>=3)
            {
              if(confirm('就决定是这里是你的新城镇吗？')==true)
              {
                ret['head']='buildcity';
                ret['index']=index;
                this.$refs.room.webSocket.send(JSON.stringify(ret));
              }
            }else{
              alert('您的建城资源不足！需要：2稻草3石头');
            }
          }else if(this.gamemap['node'][index]['belongto']==-1)
          {//判断为建村
            if(this.mydata['resources']['forest']>=1
            && this.mydata['resources']['iron']>=1
            && this.mydata['resources']['grass']>=1
            && this.mydata['resources']['wheat']>=1)
            {
              if(confirm('就决定是这里是你的新村吗？')==true)
              {
                ret['head']='buildhome';
                ret['index']=index;
                this.$refs.room.webSocket.send(JSON.stringify(ret));
              }
            }else{
              alert('资源不足！请确认您的建村资源：1木头1铁1羊毛1稻草');
            }
          }
        }else if(this.gamemap['status']['extra']==2)//处于强盗指定抽牌状态
        {
          //TODO:强盗抽牌逻辑
        }
      }
    },
    roadHandle(index){//road事件代理函数
      var ret={};
      if(this.myturn)//确认是自己的回合
      {
        if(this.gamemap['status']['process']==2 && this.gamemap['road'][index]['belongto']==-1)//处于初始放路状态
        {
          if(confirm('就决定是这里是你的附带道路吗？')==true)
          {
            ret['head']='buildroad';
            ret['index']=index;
            this.$refs.room.webSocket.send(JSON.stringify(ret));
          }
        }else if(this.gamemap['status']['process']==4 && this.gamemap['road'][index]['belongto']==-1)//处于建设状态
        {
            if(this.mydata['resources']['forest']>=1
            && this.mydata['resources']['iron']>=1)
            {
              if(confirm('就决定是这里是你的新路吗？')==true)
              {
                ret['head']='buildroad';
                ret['index']=index;
                this.$refs.room.webSocket.send(JSON.stringify(ret));
              }
            }else{
              alert('资源不足！请确认你的修路资源：1铁1木头');
            }
        }
      }
    },
    rollHandle(){
      if(this.gamemap['status']['process']==3 && this.myturn)//是自己扔骰子的回合
      {
        var send={};
        send['head']='roll';
        this.$refs.room.webSocket.send(JSON.stringify(send));
      }else{
        alert('现在还不是你丢骰子的时候！');
      }
    },
    changeRes(input,output){
      var send={};
      var index=gamecalc.G.reslist.indexOf(input);
      if(this.myturn && this.gamemap['status']['process']==4)
      {
        if(this.mydata['resources'][input]<4)
        {
          alert("你的"+gamecalc.G.reslistCN[index]+"不足以进行这次交换！");
          return;
        }
        send['head']='change';
        send['input']=input;
        send['output']=output;
        this.$refs.room.webSocket.send(JSON.stringify(send));
      }else{
        alert('现在还不是你的建设阶段，无法进行交换！');
      }
    },
    getCard()
    {

    },
    endturn(){
      var send={};
      send['head']='endturn';
      this.$refs.room.webSocket.send(JSON.stringify(send));
    },
    test(){
      console.log(this.gamemap);
      console.log(this.mydata);
    }
  },
}
</script>


