interface Action {
    type: string;
}
const modalReducer = (state: boolean, action: Action) => {
    switch(action.type) {
        case 'OPEN_MODEL':
            return true;
        case 'CLOSE_MODEL':
            return false;
        case 'SUBMIT':
            // Always open the modal upon SUBMIT
            return true;
        default:
            return state;
    }
};

export default modalReducer;

