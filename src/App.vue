<template>
  <div id="app">
    <div v-if="gamemap!=null">
      <hexagon @myClick="hexagonHandle" v-for="(hexa,index) in gamemap.hexagon" :key="hexa.label" :P="hexa.Pos" :rollnum="hexa.number" :kind="hexa.kind" :index="index" :robber="hexa.robber"/>
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
        <privateboard @myClick="resHandle" @useCard="useCard" :myturn="myturn" :extra="gamemap['status']['extra']" :resources="mydata['resources']" style="position:absolute;left:0px;top:700px"/>
        <button  @click="getCard()" style="resize:none;font-size:16px;">我要抽卡</button>
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
    hexagonHandle(index){//hexagon事件代理函数
      //仅强盗时按键有效
      if(this.gamemap['status']['extra']==2
      && this.myturn
      && this.gamemap['hexagon'][index]['robber']!=true)
      {
        if(confirm("就决定放在这个位置了吗？"))
        {
          var send={};
          send['head']='moverob';
          send['index']=index;
          this.$refs.room.webSocket.send(JSON.stringify(send));
        }
      }
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
        }else if(this.gamemap['status']['extra']==3 && this.myturn)//extra事件在判定时要在最前面
        {//处于强盗指定抽牌状态
            if(this.gamemap['node'][index]['belongto']!=this.$refs.room.myseat)
            {
              if(this.gamemap['node'][index]['belongto']==-1
              && !confirm('你选的位置属于无人区，你确定要放弃抽取其他玩家一张牌吗？'))
              {
                return;
              }
              var send={};
              send['head']='robacard';
              send['index']=this.gamemap['node'][index]['belongto'];
              this.$refs.room.webSocket.send(JSON.stringify(send));
            }else{
              alert('不能选择抽自己的牌！');
            }
        }else if(this.gamemap['status']['process']==4)//处于建设状态
        {
          if(this.gamemap['node'][index]['belongto']==this.$refs.room.myseat && this.gamemap['node'][index]['building']=='home')
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
    resHandle(data){
      var send={};
      switch(this.gamemap['status']['extra'])
      {
        case 0://交换资源用
          var index=gamecalc.G.reslist.indexOf(data.input);
          if(this.myturn && this.gamemap['status']['process']==4)
          {
            if(this.mydata['resources'][data.input]<4)
            {
              alert("你的"+gamecalc.G.reslistCN[index]+"不足以进行这次交换！");
              return;
            }
            send['head']='change';
            send['input']=data.input;
            send['output']=data.output;
            this.$refs.room.webSocket.send(JSON.stringify(send));
          }else{
            alert('现在还不是你的建设阶段，无法进行交换！');
          }
        break;
        case 1://强盗扔牌
          send['head']='discard';
          for(var i=0;i<5;i++)
          {
            send[i]=data[i];
          }
          this.$refs.room.webSocket.send(JSON.stringify(send));
          //为了不重复上缴，去除boardflag标志
          this.gamemap['status']['extra']=0;
        break;
        case 6://丰收之年
          send['head']='cardevent';
          for(i=0;i<5;i++)
          {
            send[i]=data[i];
          }
          this.$refs.room.webSocket.send(JSON.stringify(send));
        break;
        case 7://垄断
          send['head']='cardevent';
          send['index']=data;
          this.$refs.room.webSocket.send(JSON.stringify(send));
        break;

      }
      
    },
    getCard()
    {
      if(this.mydata['resources']['grass']>=1
      && this.mydata['resources']['wheat']>=1
      && this.mydata['resources']['stone']>=1
      && this.myturn
      && this.gamemap['status']['process']==4)
      {
        var send={};
        send['head']='getcard';
        this.$refs.room.webSocket.send(JSON.stringify(send));
      }else{
        alert('现在不能抽抽乐啦！可能是资源不够或不在建设阶段。需要：1羊毛1稻草1石头');
      }
    },
    useCard(cardindex)
    {
      if(this.mydata['resources'][gamecalc.G.reslist[cardindex]]>=1
      && this.myturn
      && this.gamemap['status']['process']==4)
      {
        var send={};
        send['head']='usecard';
        send['index']=cardindex;
        this.$refs.room.webSocket.send(JSON.stringify(send));
      }else{
        alert("你暂时没有拥有这张卡片或不在你的回合，请稍后再使用");
      }
    },
    endturn(){
      if(this.myturn)
      {
        var send={};
        send['head']='endturn';
        this.$refs.room.webSocket.send(JSON.stringify(send));
      }
    },
    test(){
      console.log(this.gamemap);
      console.log(this.mydata);
    }
  },
}
</script>


