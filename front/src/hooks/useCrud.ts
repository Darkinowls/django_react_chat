import useAxios from "../helpers/AxiosHelper.ts";
import {useState} from "react";

interface IUseCrud<T> {
    prevData: T[],
    fetchCallback: () => Promise<T[]>,
    error: Error | null,
    loading: boolean,
}


const useCrud = <T>(initial: T[] = [], resource: string): IUseCrud<T> => {
    const client = useAxios()
    const [prevData, setPrevData] = useState<T[]>(initial)
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const fetchCallback = async (): Promise<T[]> => {
        setLoading(true)
        try {
            const {data} = await client.get(resource)
            setPrevData(data)
            return data as T[]
        } catch (e) {
            console.log(e)
            setError(new Error("Error fetching CRUD data"))
            return []
        } finally {
            setLoading(false)

        }
    }
    return {
        prevData: prevData, fetchCallback, error, loading
    }
}
export default useCrud;