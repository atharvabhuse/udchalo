import { AxiosResponse } from "axios";
import { getRequest } from "./network/api";
import { apiUrls } from "./network/api-endpoints";

export const getSearchRequest = async(sessionId: string) => {
    const res: AxiosResponse = await getRequest(`${apiUrls.getSearchRequest}${sessionId}`);
    return res;
}
