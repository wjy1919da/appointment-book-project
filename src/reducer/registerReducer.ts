export enum RegisterState {
    SIGN_UP = 1,
    OPEN_REGISTER = 1,
    CLOSE_REGISTER = 0,
    SIGN_IN = 2,
    GENDER = 3,
    BIRTHDAY = 4,
    INTEREST = 5,
    SIGN_UP_SUCCESS = 6,
    VERIFY_EMAIL = 7
}
interface Action {
    type: keyof typeof RegisterState;
}
const registerReducer = (state: RegisterState, action: Action): RegisterState => {
    switch (action.type) {
        case 'SIGN_UP':
            return RegisterState.SIGN_UP;
        case 'OPEN_REGISTER':
            return RegisterState.OPEN_REGISTER;
        case 'SIGN_IN':
            return RegisterState.SIGN_IN;
        case 'GENDER':
            return RegisterState.GENDER;
        case 'BIRTHDAY':
            return RegisterState.BIRTHDAY;
        case 'INTEREST':
            return RegisterState.INTEREST;
        case 'SIGN_UP_SUCCESS':
            return RegisterState.SIGN_UP_SUCCESS;
        case 'VERIFY_EMAIL':
            return RegisterState.VERIFY_EMAIL;
        case 'CLOSE_REGISTER':
            return RegisterState.CLOSE_REGISTER;
        default:
            return state;
    }
};
export default registerReducer;
