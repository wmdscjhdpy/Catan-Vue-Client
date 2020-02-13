<template>
	<div :style="selfstyle">
		<img :src="this.kindimg[this.kind]" :usemap="'#hexagon'+String(this.x)+String(this.y)+'map'">
		<map :name="'hexagon'+String(this.x)+String(this.y)+'map'">
			<area shape="circle" coords="100,100,80" href="javascript:void(0);" :onclick="'alert(`this is a area   '+'x:'+this.x+'  y:'+this.y+'`)'">
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
	export default{
		props:['x','y'],
		//坐标定义方式，以最中间的为原点，按照数学方法建立坐标系
		data:function(){
			return{
				kind:"desert",
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
			this.x=Number(this.x);
			this.y=Number(this.y);
			this.calcXYPosition();
		},
		methods:{
			calcXYPosition() {
				var posY,posX;
				posX=this.G.middleX+(this.G.hexagonhigh+this.G.roadside)*this.x;
				if(this.y%2)//需要偏移的情况 x正负影响偏移正负
				{
					if(this.x>0)posX-=(this.G.hexagonhigh+this.G.roadside)/2;
					else posX+=(this.G.hexagonhigh+this.G.roadside)/2;
				}
				posY=this.G.middleY-(this.G.hexagonside/2*3+this.G.roadside)*this.y;
				this.selfstyle.left=posX+'px';
				this.selfstyle.top=posY+'px';
			},
			getNearPosition(deg){//获取临近六边形坐标
				var newX=this.x,newY=this.y;
				while(deg<0)deg+=360;
				switch(deg%360)
				{
					case 0:
						newX=this.x+1;
						if(newX==0 && (Math.abs(this.y%2)))newX+=1;
					break;
					case 180:
						newX=this.x-1;
						if(newX==0 && (Math.abs(this.y%2)))newX-=1;
					break;
					case 60:
						newY+=1;
						if((!(Math.abs(this.y%2)))&& (this.x>=0))newX+=1;
						if((Math.abs(this.y%2))&& (this.x<0))newX+=1;
					break;
					case 120:
						newY+=1;
						if((!(Math.abs(this.y%2)))&& (this.x>=0))newX-=1;
						if((Math.abs(this.y%2))&& (this.x<0))newX-=1;
					break;
					case 240:
						newY-=1;
						if((!(Math.abs(this.y%2)))&& (this.x>=0))newX-=1;
						if((Math.abs(this.y%2))&& (this.x<0))newX-=1;
					break;
					case 300:
						newY-=1;
						if((!(Math.abs(this.y%2)))&& (this.x>=0))newX+=1;
						if((Math.abs(this.y%2))&& (this.x<0))newX+=1;
					break;
				}
				return {
					x:newX,
					y:newY
				}
			},
			getAllNodeNearby()//获取和这个六边形相邻的所有节点
			{
				var retval=new Array();
				var N0={x:this.x,y:this.y};
				for(var i=0;i<360;i+=60)
				{
					var N1=this.getNearPosition(i);
					var N2=this.getNearPosition(i+60);
					retval.push({N0,N1,N2});
				}
				return retval;
			},
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
