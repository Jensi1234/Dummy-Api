import { useCallback, useEffect, useState } from "react";

const useFetchData = (fetchFunction, params) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const res = await fetchFunction(params);
                setData(res);
            } catch (e) {
                setError(e?.message || 'Error in fetching data');
            }

            setLoading(false);
        }

        fetchData();
    }, [fetchFunction, params]);

    const deleteData = useCallback(() => {

    }, []);

    return { loading, error, data, deleteData ,setData};
}

export default useFetchData;