import API from '../../utils/API'

import {SHOW_MESSAGE} from './types'

export const getAllUsers = () => async(dispatch) => {
    try {
        const res = await API.get("/users");
        return res;

    } catch (error) {
        dispatch({
            type: SHOW_MESSAGE,
            payload: {
                title: `Failed`,
                message:
                    error?.response?.data?.message
                        ? error?.response?.data?.message
                        : ` failed`,
                severity: "error",
                statusCode: error?.response?.status
            },
        });
    }
};

export const getUserByID = ({ userId}) => async (dispatch) => {
    try {
        const res = await API.get(`/user/${userId}`)
        return res;
    } catch (error) {
        dispatch({
            type: SHOW_MESSAGE,
            payload: {
                title: `Failed`,
                message:
                    error?.response?.data?.errors?.message
                        ? error?.response?.data?.errors?.message
                        : ` failed`,
                severity: "error",
                statusCode: error?.response?.status
            },
        });
    }
}




