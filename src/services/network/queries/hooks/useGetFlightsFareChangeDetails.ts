import { useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import { apiUrls } from '../../api-endpoints';
import { getRequest } from '../../api';

const getFareChange = async(sessionId: string): Promise<any> =>{
    const response: AxiosResponse = await getRequest(`${apiUrls.getFareChange}/${sessionId}`);
    return response && response?.data; 
}

// const QUERY_KEY = ['GetFareChange'];

export const useGetFlightsFareChangeDetails = (sessionId: string,config:any ={}) =>
    useQuery({
        queryKey: ['GetFareChange',sessionId],
        queryFn: () => getFareChange(sessionId),
        staleTime: Infinity,
        ...config,
    });



