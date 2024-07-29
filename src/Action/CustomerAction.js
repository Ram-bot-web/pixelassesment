import axios from "axios";
import { API } from "../Helpers/EndpointService";
import { warningAlert } from "../Common/Alert";

export const postalCodeAPI = (data) => {
    let apiUrl = API.POSTAL_CODE_API;
    return async (dispatch) => {
        await axios({
            method: "POST",
            url: apiUrl,
            data: { "postcode": data },
        })
            .then((response) => {
                if (response?.status === 200) {
                    dispatch({ type: "GET_POSTCODE_DATA", data: response.data })
                } else {
                }
            })
            .catch((error) => {
                dispatch({ type: "LOADER_DATA", data: false })
                warningAlert("Something went wrong. Please try again.");
            });
    };
};

export const panCheckAPI = (data) => {
    let apiUrl = API.PAN_VALID_API;
    return async (dispatch) => {
        await axios({
            method: "POST",
            url: apiUrl,
            data: { "panNumber": data },
        })
            .then((response) => {
                if (response?.status === 200) {
                    dispatch({ type: "CHECK_PAN_VALID", data: response.data?.isValid })
                } else {
                }
            })
            .catch((error) => {
                warningAlert("Something went wrong. Please try again.");
            });
    };
};