const state = {
    treeData:[]
}

// get the inital tree from SQL or wherever, or hard code for development
function getTreeData(){
    return [
        {
            id: 1,
            name: 'first header',
            isChecked: true,
            parentID: 0,
            content: null,
            isExpanded: true,
        },
        {
            id: 2,
            name: 'first child',
            isChecked: true,
            parentID: 1,
            content: '',
            isExpanded: true,
        },
        {
            id: 3,
            name: 'second header',
            isChecked: false,
            parentID: 0,
            content: null,
            isExpanded: true,
        },
        {
            id: 4,
            name: 'second child - legend-all',
            isChecked: false,
            parentID: 3,
            content: 'legend-all.png',
            isExpanded: false,
        },
        {
            id: 5,
            name: 'first grandchild - sample legend',
            isChecked: true,
            parentID: 2,
            content: 'samplelegend.png',
            isExpanded: false,
        },
    ]
}

// creates an array of children using the child's parentID
function getChildren(parentID, tree){
    var children = []
    tree.forEach(branch => {
        if (branch.parentID == parentID){
            children.push(branch.id)
        }
    })
    return children
}

// adds in the children as an array so that it doesn't have to be
//  calculated every time a checkbox is clicked
function getAndFormatTreeData(){
    var treeData = getTreeData()
    treeData.forEach(branch => {
        branch['children'] = getChildren(branch.id, treeData)
    })
    console.log(treeData)
    return treeData
}

// updates down the tree, recurses through the nodes
function updateTreeBranches(startID, newVal, tree){
    tree[startID].isChecked = newVal
    tree[startID].children.forEach(child => {
        tree[child].isChecked = newVal
        if (tree[child].children.length > 0){
            tree = updateTreeBranches(child, newVal, tree)
        }
    })
    return tree
}

// updates up the tree, recurses through parents
function updateTreeTrunk(startID, newVal, tree){
    var parent = tree[startID].parentID
    if (parent > 0){
        tree[parent].isChecked = newVal
        tree = updateTreeTrunk(parent, newVal, tree)
    }
    return tree
}

const actions = {
    // action to calculate the tree data initially,
    //  should only be called once,
    //  don't know if there is a better way to do this
    createNewTreeData({commit}){
        var newTreeData = {}
        var treeData = getAndFormatTreeData()
        treeData.forEach(branch => {
            newTreeData[branch.id] = branch
        })
        commit('setTreeData', newTreeData)
    },
    // updates the isExpanded for the row when the ± buttons are clicked
    toggleExpanded({commit}, itemID){
        state.treeData[itemID].isExpanded = !state.treeData[itemID].isExpanded
        commit('setTreeData', state.treeData)
    },
    // update the checked values when one checkbox is clicked
    updateIsChecked({commit}, itemID){
        var newCheckValue = state.treeData[itemID].isChecked
        if (newCheckValue){
            // setting isChecked true only goes up the tree so that the parents are visible
            commit('setTreeData', updateTreeTrunk(itemID, newCheckValue, state.treeData))
        } else {
            // turning off layers only goes down the tree, don't hide parents if a child is toggled off
            commit('setTreeData', updateTreeBranches(itemID, newCheckValue, state.treeData))
        }
    },
}

const mutations = {
    // sets the tree to a new value
    setTreeData (state, tree){
        state.treeData = tree
    }
};

const getters = {
    // just want an array of the values to use for the structure
    //  the object is only for update function speed
    getTreeDataValues(state){
        return Object.values(state.treeData)
    }
}

const namespaced = true

export const layers = {
    namespaced,
    state,
    actions,
    mutations,
    getters
};
