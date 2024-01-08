import { useState, useEffect } from 'react'
import axios from 'axios'

export enum FetchState {
    Initial,
    Loading,
    Success,
    Error
}

const useGetItems = () => {
    const [data, setData] = useState<any[]>([])
    const [fetchState, setFetchState] = useState<FetchState>(FetchState.Initial)

    const url = "http://localhost:8800/api/essi/"

    useEffect(() => {
        const fetchData = async () => {
            setFetchState(FetchState.Loading)
            try {
                const res = await axios.get(url)
                setData(res.data || [])
                setFetchState(FetchState.Success)
            } catch(err) {
                console.log(err)
                setData([])
                setFetchState(FetchState.Error)
            }
        }
        fetchData()

        const intervalId = setInterval(fetchData, 10000) // fetch data every 60 seconds

        return () => clearInterval(intervalId) // clear interval on component unmount
    }, [])

    return { data, fetchState }
}

export default useGetItems