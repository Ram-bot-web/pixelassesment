const CommonReducer = (state = {}, action) => {
    switch (action.type) {
        case "LOADER_DATA":
            return Object.assign({}, state, {
                isLoader: action.data,
            });
        default:
            return state;
    }
};

export default CommonReducer;