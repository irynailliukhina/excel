import {defaultStyles, tableName} from "../constants";
import {getDate} from "../core/utils";

const defaultState = {
    rowState: {},
    colState: {},
    stylesState: {},
    dataState: {},
    tableName: tableName,
    currentText: '',
    currentStyles: defaultStyles,
    date: ''
}
const normilize = state => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: ''
})

export function normalizeInitialState(state){
    return state ? normilize(state) : defaultState
}