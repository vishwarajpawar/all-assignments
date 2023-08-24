import {atom} from 'recoil';


export const todoState=atom({
    key:'todoState',
    default:{
        isEditing: false,
        todo: null
    }
})