<template>
    <div>
        <input type="checkbox" v-model="row.isChecked" @change="updateIsChecked(row.id)">
        <span v-if="showLabel">{{row.name}}</span>
        <div v-if="row.children.length == 0" class="imgDiv"><img :src="getImgURL(row.content)"></div>
    </div>
</template>

<script>
import { mapActions } from "vuex"
export default {
    name: 'imgNode',
    props:{
        // want the object with the data that is being rendered
        row:{
            required: true,
            type: Object,
        },
        // whether or not to show the label for an item, can set false to hide labels
        showLabel:{
            required: false,
            type: Boolean,
            default: true,
        }
    },
    methods:{
        ...mapActions('layers',[
            'updateIsChecked'
        ]),
        // loads the image
        //  https://stackoverflow.com/a/47480286/8061390
        getImgURL(path){
            return require('../assets/'+path)
        },
    },
}
</script>

<style>
.imgDiv{
    padding-left: 15px;
}
</style>