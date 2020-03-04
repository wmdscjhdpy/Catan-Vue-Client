<template>
	<div :style="selfstyle">
		<img :src="this.kindimg[this.kind]" :usemap="'#'+this.hexagonid+'map'">
		<div v-if="rollnum!=7 && !robber" style="position:absolute;left:70px;top:70px;width:60px;height:60px;background:#ffffcc;border-radius:30px"/>
		<div v-if="robber" style="position:absolute;left:70px;top:70px;width:60px;height:60px;background:black;border-radius:30px"/>
		<span v-if="rollnum!=7 && rollnum<10" style="position:absolute;left:86px;top:67px;"><font size ="20">{{rollnum}}</font></span>
		<span v-if="rollnum!=7 && rollnum>=10" style="position:absolute;left:70px;top:68px;"><font size ="16">{{rollnum}}</font></span>
		<map :name="this.hexagonid+'map'">
			<area shape="circle" coords="100,100,80" :style="activestyle[0]" href="javascript:void(0);" @click="$emit('myClick',P)">
		</map>
	</div>
</template>

<script>
	import img_stone from '../assets/block/stone.png';
	import img_desert from '../assets/block/desert.png';
	import img_forest from '../assets/block/forest.png';
	import img_wheat from '../assets/block/wheat.png';
	import img_iron from '../assets/block/iron.png';
	import img_grass from '../assets/block/grass.png';
	import gamecalc from '../components/gamecalc.js'
	export default{
		props:['P','rollnum','kind','robber','index'],
		//P为坐标，坐标定义方式，以最中间的为原点，按照数学方法建立坐标系
		//rollnum 区块的骰子数
		//kind 地域类型
		//robber 是否被强盗占领
		//active 是否给用户点击操作
		data:function(){
			return{
				hexagonid:0,
				kindimg:{							//地块图片集
					stone:img_stone,
					desert:img_desert,
					forest:img_forest,	
					wheat:img_wheat,
					iron:img_iron,
					grass:img_grass
				},
				selfstyle:{							//用于改变六边形定位
					position:'absolute',
					left:0+'px',
					top:0+'px',
				},
				activestyle:{
					0:{
						cursor:'default'
					},
					1:{
						cursor:'pointer'
					}
				}
			}
		},
		beforeMount(){
			this.P.x=Number(this.P.x);
			this.P.y=Number(this.P.y);
			this.ref=String(this.P);
			this.hexagonid=gamecalc.calcHexagonId(this.P);
			this.calcHexagonPosition();
		},
		methods:{
			calcHexagonPosition() {
				var posY,posX;
				posX=gamecalc.G.middleX+(gamecalc.G.hexagonhigh+gamecalc.G.roadside)*this.P.x;
				if(this.P.y%2)//需要偏移的情况 x正负影响偏移正负
				{
					if(this.P.x>0)posX-=(gamecalc.G.hexagonhigh+gamecalc.G.roadside)/2;
					else posX+=(gamecalc.G.hexagonhigh+gamecalc.G.roadside)/2;
				}
				posY=gamecalc.G.middleY-(gamecalc.G.hexagonside/2*3+gamecalc.G.roadside)*this.P.y;
				this.selfstyle.left=posX+'px';
				this.selfstyle.top=posY+'px';
			},
			post(){//产生提交触发事件
				var send=[];
				this.$refs.room.webSocket.send(JSON.stringify(send));
			}
		}
	}
</script>

<style>
</style>
