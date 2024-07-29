const CustomerReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_POSTCODE_DATA":
            return Object.assign({}, state, {
                postCodedata: action.data,
            });
        case "CHECK_PAN_VALID":
            return Object.assign({}, state, {
                isPanValid: action.data,
            });
        default:
            return state;
    }
};

export default CustomerReducer;