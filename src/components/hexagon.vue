<template>
	<div :style="selfstyle">
		<img :src="this.kindimg[this.kind]" :usemap="'#hexagon'+this.globalId+'map'">
		<map :name="'hexagon'+this.globalId+'map'">
			<area shape="circle" coords="100,100,80" href="javascript:void(0);" :onclick="'alert('+this.globalId+')'">
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
		//坐标定义方式，从左到右最左边的为x=1的格子，从上到下最上面的为y=1的格子
		data:function(){
			return{
				globalId:this.y*10+this.x*1,			//用于辨识的六边形id
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
				posX=200+95*this.x;
				if(this.x%2)//不需要偏移的情况
				{
					if(this.x==1 || this.x==9)posY=194+336;
					else posY=194+336*(this.y-1);
				}else{//需要偏移的情况
					posY=194+168+336*(this.y-1);
				}
				this.selfstyle.left=posX+'px';
				this.selfstyle.top=posY+'px';
			}
		}
	}
</script>

<style>
</style>
