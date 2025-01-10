export function roomId(state = null,action){
    switch(action.type){
        case 'set':{
            return state = action.setValue
        }
        default:{
            return state
        }
    }
}

export function sections(state = null,action){
    switch(action.type){
        case 'setSections':{
            
            return state = action.setValue
        }
        case 'setList':{
            let a = state.map(function(el,index){
                if (index === action.selected){
                    return {...el,list : action.setValue}
                }
                return el
            })
            return a;
        }
        default:{
            return state
        }
    }
}