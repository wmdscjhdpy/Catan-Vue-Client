<template>
  <div id="app">
    <hexagon v-for="Pos in this.gamemap.hexagon" :key="Pos.label" :P="Pos"/>
    <node v-for="Pos in this.gamemap.node" :key="Pos.label" :P1="Pos.N0" :P2="Pos.N1" :P3="Pos.N2"/>
    <road v-for="Pos in this.gamemap.road" :key="Pos.label" :P1="Pos.N0" :P2="Pos.N1"/>

    <scoreboard ref="sb0" x="1300" y="10" index="0"/>
    <scoreboard ref="sb1" x="1300" y="100" index="1"/>
    <scoreboard ref="sb2" x="1300" y="190" index="2"/>
    <scoreboard ref="sb3" x="1300" y="280" index="3"/>
    <textarea rows="10" cols="50" readonly style="position:absolute;left:1300px;top:500px;resize:none;font-size:16px;" v-model="this.showmsg"/>
    <input type="text" v-model="login.mynickname" name="nickname" style="position:absolute;left:1300px;top:450px;resize:none;font-size:16px;">    
    <input type="text" v-model="login.roomnum" name="nickname" style="position:absolute;left:1500px;top:450px;resize:none;font-size:16px;">
    <button @click="doLogin()" style="position:absolute;left:1700px;top:448px;resize:none;font-size:16px;">进入房间</button>
  
    
  </div>
</template>

<script>
import hexagon from './components/hexagon.vue'
import node from './components/node.vue'
import road from './components/road.vue'
import gamecalc from './components/gamecalc.js'
import scoreboard from './components/scoreboard.vue'

export default {
  name: 'App',
  components: {
    hexagon,
    node,
    road,
    scoreboard
  },
  data:function(){
    return{
      gamemap:0,
      webSocket:0,
      showmsg:"卡坦岛内测版0.1\n",//用于显示游戏界面文字提示
      login:{
        roomnum:'001',
        myseat:-1,//座位号
        mynickname:'wmd',
        priviliege:0,            //是否是房主
      }
    }
  },
  beforeMount(){

    /*
    // 打开websocket
;  


    */
    this.gamemap=gamecalc.initMap();
  },
  mounted(){
    this.webSocket = new WebSocket("ws://localhost:2333");
      this.webSocket.onopen = (event)=>{
      this.showmsg+="已成功和服务器建立连接\n";
      return true;
    };
    this.webSocket.onerror =(event)=>{
      this.showmsg+="无法获得与服务器的连接，请联系管理员？\n";
    };
    //监听消息
    this.webSocket.onmessage =(event)=>{
      this.recv_handle(event.data);
      return true;
    };
    this.webSocket.onclose =(event)=>{
      this.showmsg+="您与服务器已断开连接？\n";
    }
  },
  methods: {
    doLogin(){
      var send={};
      var json;
      send['head']='enter';
      send['room']=this.login.roomnum;
      send['nickname']=this.login.mynickname;
      this.webSocket.send(JSON.stringify(send));
    },
    recv_handle(rawdata)
    {
      var data;
      data=JSON.parse(rawdata);
      console.log(data);
      switch (data.head) {
        case 'priviliege':
            this.priviliege=1;
          break;
        case 'enter':
          if(data.nickname==this.mynickname)
          {//这个人是自己
            this.myseat=Number(data.index);
          }
          this.$refs['sb'+data.index].nickname=data.nickname;
          break;
        case 'ready':
          this.$refs['sb'+data.index].readystate=data.flag;
          break;
        case 'error':
          break;
        default:
          console.log('接收超出case判断范围请确认');
          break;
      }
      this.showmsg+=data['showmsg'];
    }
  },
}
</script>


