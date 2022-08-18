import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import api from '../services/api';

const useAxios = (axiosParams: AxiosRequestConfig) => {
    const [response, setResponse] = useState<AxiosResponse>();
    const [error, setError] = useState<AxiosError>();
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async (params: AxiosRequestConfig) => {
        setLoading(true);
        try {
            const result = await api.request(params);
            setResponse(result);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const sendData = () => {
        fetchData(axiosParams);
    }

    useEffect(() => {
        if (axiosParams.method === "GET" || axiosParams.method === "get") {
            fetchData(axiosParams);
        }
    }, [axiosParams, fetchData]);


    return { response, error, loading, sendData };
}

export default useAxios;
