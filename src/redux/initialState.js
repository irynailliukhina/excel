import {storage} from "../core/utils";
import {defaultStyles, tableName} from "../constants";

const defaultState = {
    rowState: {},
    colState: {},
    stylesState: {},
    dataState: {},
    tableName: tableName,
    currentText: '',
    currentStyles: defaultStyles
}
const normilize = state => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: ''
})


export const initialState = storage('excel-state')
    ? normilize(storage('excel-state'))
    : defaultState