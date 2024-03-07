import { useEffect, useState } from "react";

const useCustomHook = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    return { loading, setLoading };
}

export default useCustomHook;