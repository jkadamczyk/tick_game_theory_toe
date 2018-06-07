import ActionTypes from "./ActionTypes";

class ActionCreators {
    public static setCell = (x, y, value) => ({
        type: ActionTypes.SET_CELL,
        x,
        y,
        value
    });

    public static moveBoardUp = () => ({
        type: ActionTypes.MOVE_BOARD_UP
    });

    public static moveBoardDown = () => ({
        type: ActionTypes.MOVE_BOARD_DOWN
    });

    public static moveBoardLeft = () => ({
        type: ActionTypes.MOVE_BOARD_LEFT
    });

    public static moveBoardRight = () => ({
        type: ActionTypes.MOVE_BOARD_RIGHT
    });
}

export default ActionCreators;