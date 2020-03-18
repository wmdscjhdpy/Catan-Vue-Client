<template>
    <div>
    <playerboard ref="sb0" index="0" :map="map"/>
    <playerboard ref="sb1" index="1" :map="map"/>
    <playerboard ref="sb2" index="2" :map="map"/>
    <playerboard ref="sb3" index="3" :map="map"/>
    <textarea id="messagewindow" rows="10" cols="50" readonly  style="resize:none;font-size:16px;overflow:auto;height:350px;" v-model="this.showmsg"/>
    <br>
    <span>你的游戏名字:</span>
    <input type="text" v-model="mynickname" name="nickname" style="width:100px;resize:none;font-size:16px;">
    <span>房间号:</span>
    <input type="text" v-model="roomnum" name="roomnum" style="width:50px;resize:none;font-size:16px;">
    <button v-if="!inroom" @click="doEnter()" style="resize:none;font-size:16px;">进入房间</button>
    <button v-if="inroom" @click="doLeave()" style="resize:none;font-size:16px;">离开房间</button>
    <br>
    <button v-if="!gamestate && !myreadystate && !mypriviliege && inroom" @click="changeReadyState(1)" style="resize:none;font-size:16px;">准备！！</button>
    <button v-if="!gamestate && myreadystate && !mypriviliege && inroom" @click="changeReadyState(0)" style="resize:none;font-size:16px;">取消准备</button>
    <button v-if="!gamestate && mypriviliege && inroom" @click="startGame()" style="resize:none;font-size:16px;">开始游戏</button>
    <br>

    </div>
</template>

<script>
import playerboard from './playerboard.vue'; //导入计分板零件
import gamecalc from './gamecalc';
export default {
    components:{
        playerboard
    },
    props:['map'],
    data:function(){
        return{
            online:0,//标记当前客户端在线状态
            inroom:0,//标记当前客户端在房间内还是房间外
            webSocket:null,
            showmsg:"欢迎来到卡坦岛内测版0.4.5\n",//用于显示游戏界面文字提示
            roomnum:'001',
            myseat:-1,//座位号
            mynickname:'wmd',
            myreadystate:0,
            priviliege:0,            //房主的索引号
            gamestate:0,             //游戏状态，0代表没开始 1代表开始了
        }
    },
    mounted(){
        this.connectServer();
    },
    computed: {
        mypriviliege(){
            if(this.priviliege==this.myseat)return true;
            return false;
        }
    },
    methods:{
        connectServer(){
            this.webSocket = new WebSocket("wss://www.wmd-dj.top/wss");
            //this.webSocket = new WebSocket("ws://192.168.2.4:2333");
            this.webSocket.onopen = (event)=>{
                this.showmsg+="【系统提示】已成功和服务器建立连接\n";
                this.online=1;
                return true;
            };
            this.webSocket.onerror =(event)=>{
                this.showmsg+="【系统提示】无法获得与服务器的连接，快！把bug报给我！\n";
                this.online=0;
            };
            //监听消息
            this.webSocket.onmessage =(event)=>{
                this.recv_handle(event.data);
                return true;
            };
            this.webSocket.onclose =(event)=>{
                this.showmsg+="【系统提示】您主动与服务器断开连接 请刷新重试\n";
                this.online=0;
            }
        },
        doEnter(){
            this.mynickname.replace(/\s*/g,"");
            if(this.mynickname.length<=10)
            {
                if(this.mynickname)
                var send={};
                send['head']='enter';
                send['room']=this.roomnum;
                send['nickname']=this.mynickname;
                this.webSocket.send(JSON.stringify(send));
            }else{
                alert('你的名字有点太长了吧？');
            }
        },
        doLeave(){
            var send={};
            send['head']='leave';
            this.webSocket.send(JSON.stringify(send));
        },
        startGame(){
            var send={};
            send['head']='gameon';
            this.gamestate=1;//防止重复提交
            this.webSocket.send(JSON.stringify(send));
            //交由服务器验证
        },
        changeReadyState(flag)
        {
            var send={};
            var json;
            send['head']='ready';
            send['flag']=flag;
            this.myreadystate=flag;
            this.webSocket.send(JSON.stringify(send));
        },
        recv_handle(rawdata)
        {
            var data;
            data=JSON.parse(rawdata);
            console.log(data);
            switch (data.head) {
                case 'priviliege':
                    if(this.myseat==-1)
                    {
                        this.priviliege=0;
                        this.$refs['sb0'].priviliege=true;
                    }else{
                        this.priviliege=this.myseat;
                        this.$refs['sb'+this.myseat].priviliege=true;
                    }
                break;
                case 'enter':
                    if(data.nickname==this.mynickname)
                    {//这个人是自己
                        this.myseat=Number(data.index);
                        this.inroom=1;
                    }
                    this.$refs['sb'+data.index].nickname=data.nickname;
                break;
                case 'info':
                    for(var i=0;i<4;i++)
                    {
                        if(data[i]!=undefined)
                        {
                            this.$refs['sb'+i].readystate=data[i].readystate;
                            this.$refs['sb'+i].nickname=data[i].nickname;
                        }
                    }
                    this.priviliege=data.priviliege;
                    this.$refs['sb'+data.priviliege].priviliege=true;
                break;
                case 'ready':
                    this.$refs['sb'+data.index].readystate=data.flag;
                break;
                case 'leave':
                    //清空房间信息
                    this.$refs['sb'+data.index].nickname=null;
                    this.$refs['sb'+data.index].readystate=0;
                break;
                case 'leavesuccess':
                    for(i=0;i<4;i++)
                    {
                        this.$refs['sb'+i].nickname=null;
                        this.$refs['sb'+i].readystate=0;
                        this.$refs['sb'+i].priviliege=0;
                    }
                    this.inroom=0;
                    this.priviliege=-1;
                    this.myseat=-1;
                    this.showmsg+="【系统提示】你回到了大厅\n";
                break;
                case 'error':
                    alert(data.showmsg);
                    data.showmsg=undefined;
                break;
            }
            //下面放的是游戏自身的数据处理逻辑
            this.$emit('gameDataHandle',data);//调用父函数来处理游戏数据 需要自己定义该函数
            if(data['showmsg']!=undefined)
            {
                this.showmsg+=data['showmsg'];
                let mymsg=document.getElementById('messagewindow');
                mymsg.scrollTop = mymsg.scrollHeight;
            }
        }
    }
}
</script>