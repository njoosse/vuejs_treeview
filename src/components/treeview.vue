<template>
        <ul class="tocList">
            <li v-for="(item, idx) in treeItems"
                :key="idx"
                >
                <div class="tocRow">
                    <span v-hide="item.children.length == 0" class="parent">
                        <button 
                            class="expandToggleBtn"
                            @click="toggleExpanded(item.id)">
                            <span v-if="item.isExpanded">-</span>
                            <span v-else>+</span>
                        </button>
                    </span>
                    <img-node 
                        :row="item"/>
                </div>
                <tree-view 
                    v-if="item.children.length > 0" 
                    v-show="item.isExpanded" 
                    :treeParent="item.id"/>
            </li>
        </ul>
</template>

<script>
import Vue from "vue"

// eslint-disable-next-line no-unused-vars
import {mapState, mapActions, mapGetters} from 'vuex'
import imgNode from './imgNode.vue'

Vue.directive('hide', function(el, binding) {
    el.style.visibility = !binding.value ? 'visible' : 'hidden';
});

export default {
    name: 'TreeView',
    components:{
        imgNode,
    },
    props:{
        treeParent:{
            required: false,
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
        }
    },
    mounted: function (){
        this.createNewTreeData()
    },
    methods:{
        ...mapActions('layers', [
            'createNewTreeData',
            'toggleExpanded'
        ]),
        logMessage(){
            console.log('click')
        },
        checked(e){
            console.log(e)
        }
    },
    computed:{
        ...mapGetters('layers',{
            treeData: 'getTreeDataValues'
        }),
        treeItems : function () {
            return this.treeData.filter(treeItem =>
                treeItem.parentID == this.treeParent
            )
        }
    },
}
</script>

<style>
 /* Remove default bullets */
ul, #myUL {
  list-style-type: none;
}

/* Remove margins and padding from the parent ul */
#myUL {
  margin: 0;
  padding: 0;
}

.parent{
    left: -5px;
}

.tocList{
    padding-left: 15px;
}

.tocRow{
    display: flex;
}

.box {
  cursor: pointer;
  -webkit-user-select: none; /* Safari 3.1+ */
  -moz-user-select: none; /* Firefox 2+ */
  -ms-user-select: none; /* IE 10+ */
  user-select: none;
}

.box::before {
  content: "\2610";
  color: black;
  display: inline-block;
  margin-right: 6px;
}

.check-box::before {
  content: "\2611"; 
  color: dodgerblue;
}

/* Style the caret/arrow */
.caret {
  cursor: pointer;
  user-select: none; /* Prevent text selection */
}

/* Create the caret/arrow with a unicode, and style it */
.caret::before {
  content: "\25B6";
  color: black;
  display: inline-block;
  margin-right: 6px;
}

/* Rotate the caret/arrow icon when clicked on (using JavaScript) */
.caret-down::before {
  transform: rotate(90deg);
}

/* Hide the nested list */
.nested {
  display: none;
}

/* Show the nested list when the user clicks on the caret/arrow (with JavaScript) */
.active {
  display: block;
} 

.expandToggleBtn{
    width: 21px;
    height: 21px;
    display: inline-flexbox;
    align-items: center;
    justify-items: center;
}

</style>