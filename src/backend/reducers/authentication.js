export const authenticationDefaultState = {
    email:null
};

export default (state = authenticationDefaultState, action) => {
    console.log('[Authentication] In reducer');
    console.log(action)
    switch (action.type) {
        case 'SET_AUTH':
            console.log('in reducer: set authentication', action.data);
            return {
                email: action.data.email
            }
        default:
            return state;
    }
};