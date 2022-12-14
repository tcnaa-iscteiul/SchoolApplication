import { useState, useEffect, useCallback } from 'react'
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import api from '../services/api'

const useAxios = (axiosParams: AxiosRequestConfig) => {
  const [response, setResponse] = useState<AxiosResponse>()
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const fetchData = useCallback(async (params: AxiosRequestConfig) => {
    setLoading(true)
    try {
      const result = await api.request(params)
      setResponse(result)
      if (result.statusText !== 'OK') {
        const { response } = result.data
        setError(response.errorMessage)
      }
      console.log(result.data)
    } catch (error) {
      setLoading(false)
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          setError(error.response.data.message)
        } else {
          setError(error.message)
        }
      }
    } finally {
      setLoading(false)
    }
  }, [])

  const sendData = () => {
    fetchData(axiosParams)
  }

  useEffect(() => {
    if (axiosParams.method === 'GET' || axiosParams.method === 'get') {
      fetchData(axiosParams)
    }
  }, [axiosParams, fetchData])

  return {
    response,
    error,
    loading,
    sendData,
  }
}

export default useAxios
