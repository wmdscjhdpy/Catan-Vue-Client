<template>
	<div :style="selfstyle">
		<img :src="this.kindimg[this.kind]" :usemap="'#hexagon'+String(this.x)+String(this.y)+'map'">
		<map :name="'hexagon'+String(this.x)+String(this.y)+'map'">
			<area shape="circle" coords="100,100,80" href="javascript:void(0);" :onclick="'alert(`'+'x:'+this.x+'  y:'+this.y+'`)'">
		</map>
	</div>
</template>

<script>
	import img_stone from '../assets/CATAN/stone.png';
	import img_desert from '../assets/CATAN/desert.png';
	import img_forest from '../assets/CATAN/forest.png';
	import img_wheat from '../assets/CATAN/wheat.png';
	import img_iron from '../assets/CATAN/iron.png';
	import img_grass from '../assets/CATAN/grass.png';
	export default{
		props:['x','y','kind'],
		//坐标定义方式，以最中间的为原点，按照数学方法建立坐标系
		data:function(){
			return{
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
			this.calcXYPosition();
		},
		methods:{
			calcXYPosition() {
				var posY,posX;
				posX=700+190*this.x;
				if(this.y%2)//需要偏移的情况 x正负影响偏移正负
				{
					if(this.x>0)posX-=95;
					else posX+=95;
				}
				posY=700-168*this.y;
				this.selfstyle.left=posX+'px';
				this.selfstyle.top=posY+'px';
			}
		}
	}
</script>

<style>
</style>
