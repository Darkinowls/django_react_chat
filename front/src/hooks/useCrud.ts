import useAxios from "../helpers/jwt_interceptor.ts";
import {useState} from "react";

interface IUseCrud<T> {
    data: T[],
    fetchCallback: () => Promise<void>,
    error: Error | null,
    loading: boolean,
}


const useCrud = <T>(initial: T[] = [], resource: string): IUseCrud<T> => {
    const client = useAxios()
    const [data, setData] = useState<T[]>(initial)
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const fetchCallback = async (): Promise<void> => {
        setLoading(true)
        try {
            const {data} = await client.get(resource)
            setData(data)
        } catch (e) {
            console.log(e)
            setError(new Error("Error fetching CRUD data"))
        } finally {
            setLoading(false)
        }
    }
    return {
        data, fetchCallback, error, loading
    }
}
export default useCrud;