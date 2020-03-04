<template>
    <div>
        <div style="position:absolute;left:0px;top:0px;text-align: center">
            <img :src="ico[0]" width="80" height="64"/>
            <br>
            <span class="shownum">{{resources[list[0]]}}</span>
        </div>
        <div style="position:absolute;left:80px;top:0px;text-align: center">
            <img :src="ico[1]" width="80" height="64"/>
            <br>
            <span class="shownum">{{resources[list[1]]}}</span>
        </div>
        <div style="position:absolute;left:160px;top:0px;text-align: center">
            <img :src="ico[2]" width="80" height="64"/>
            <br>
            <span class="shownum">{{resources[list[2]]}}</span>
        </div>
        <div style="position:absolute;left:240px;top:0px;text-align: center">
            <img :src="ico[3]" width="80" height="64"/>
            <br>
            <span class="shownum">{{resources[list[3]]}}</span>
        </div>
        <div style="position:absolute;left:320px;top:0px;text-align: center">
            <img :src="ico[4]" width="80" height="64"/>
            <br>
            <span class="shownum">{{resources[list[4]]}}</span>
        </div>
    </div>
</template>
<script>
import forestico from '../assets/icon/forest.png'
import wheatico from '../assets/icon/wheat.png'
import ironico from '../assets/icon/iron.png'
import stoneico from '../assets/icon/stone.png'
import grassico from '../assets/icon/grass.png'
export default {
    props:['resources'],
    data() {
        return {
            ico:Array(forestico,ironico,grassico,wheatico,stoneico),
            list:Array('forest','iron','grass','wheat','stone','solders','harvest','monopoly','roadbuilding','winpoint')
        }
    },
}
</script>
<style>
.shownum{
    font-size:24px;
}
</style>