import axios from "axios"
import { ApiResponseHandler } from "../ApiResponseHandler"
import { BASE_URL } from "../Urls"
export const getRequest = async <T>(url : string): Promise<ApiResponseHandler<T>> => {
    let response: ApiResponseHandler<T> = {
        message : "",
        data : null,
        resultCode : 0
    }
    const urlForApiCall = url
    let apiRequest   = await axios.get(urlForApiCall).catch((error) => {
        console.log(error)
        response = {
            message: error,
            data: null,
            resultCode : 1
        }
    })
    if (apiRequest.data) {
        response.data = await apiRequest.data
    }
    return  response
}