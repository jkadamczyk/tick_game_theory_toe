import ActionTypes from "./ActionTypes";

export const setCell = (x, y, value) => ({
    type: ActionTypes.SET_CELL,
    x,
    y,
    value
});
