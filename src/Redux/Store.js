import { createStore } from 'redux'
import { combineReducers } from 'redux'
import { roomId, sections } from './Reducers/roomIdRE'

const tree = combineReducers({
    roomId: roomId,
    sections: sections,
})
export const Store = createStore(tree)