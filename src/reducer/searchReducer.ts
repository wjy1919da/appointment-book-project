interface Action {
    type: string;
}
const searchReducer = (state: boolean, action: Action) => {
    switch(action.type) {
        case 'CLOSE_DROPDOWN':
            return false;
        case 'TOGGLE_DROPDOWN':
            return !state;
        default:
            return state;
    }
};
export default searchReducer;