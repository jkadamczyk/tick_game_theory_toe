import { combineReducers } from "redux";
import ActionTypes from "../actions/ActionTypes";
import { CommonUtil } from "../common/util/CommonUtil";

const initialGameReducerState = CommonUtil.initializeEmptyGameArray();

export const gameState = (state = initialGameReducerState, action) => {
  switch (action.type) {
    case ActionTypes.SET_CELL:
      return state.map((row, rowIndex) => {
        if (rowIndex !== action.x) {
          return row;
        }
        return row.map((val, colIndex) => {
          if (colIndex !== action.y) {
            return val;
          }
          return action.value;
        })
      });
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  gameState,
});

export default rootReducer;
