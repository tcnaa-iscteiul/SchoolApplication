import { useState, useCallback } from 'react';

const useHttp = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const sendRequest = useCallback(async (requestConfig:any, applyData:any) => {
        setIsLoading(true);
        setError('');
        try {
            const response: Response = await fetch(requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : 'GET',
                headers: requestConfig.headers ? requestConfig.headers : {},
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
            });

            if (!response.ok) {
                throw new Error('Request failed!');
            }

            const data: Response = await response.json();

            applyData(data);

        } catch (err: any) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    }, []);
    return {
        isLoading: isLoading,
        error: error,
        sendRequest: sendRequest
    };
};
export default useHttp;