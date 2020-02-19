<template>
	<div :style="selfstyle">
		<img :src="this.kindimg[this.kind]" :usemap="'#'+this.hexagonid+'map'">
		<div v-if="rollnum!=7" style="position:absolute;left:70px;top:70px;width:60px;height:60px;background:#ffffcc;border-radius:30px"/>
		<span v-if="rollnum!=7" style="position:absolute;left:86px;top:67px;"><font size ="20">{{rollnum}}</font></span>
		<map :name="this.hexagonid+'map'">
			<area shape="circle" coords="100,100,80" href="javascript:void(0);" :onclick="'alert(`this is a area   '+'x:'+this.P.x+'  y:'+this.P.y+'`)'">
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
		props:['P','rollnum','kind'],
		//坐标定义方式，以最中间的为原点，按照数学方法建立坐标系
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
				selfstyle:{							//用于改变样式
					position:'absolute',
					left:0+'px',
					top:0+'px',
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
			}

			/*
			testfunction(x1,y1){
				var label,next;
				for(var i=1;i<100;i++)
				{
					v_forToAddDOM(x1,y1,label);//在这里渲染一个DOM ref为label的值
					next=this.$refs.label.calcNext();//使用刚刚渲染的label的方法进行迭代
					//得到下一个DOM的参数
					x1=next.x1;
					y1=next.y1;
					label=next.label;
				}
			}
			*/
		}
	}
</script>

<style>
</style>
