import { useCallback, useEffect, useState } from "react";
import { AuthContextProvider } from "./authContext";
import api from "../../api/api.js";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [auth, setAuth] = useState(null);

    const reload = useCallback(async () => {
        const res = await api.get('/users/me');
        if (res?.data) {
            setUser(res.data);
            setAuth(true);
        } else {
            setUser(null);
            setAuth(false);
        }
    }, []);

    useEffect(() => { reload() }, [reload]);

    return (
        <AuthContextProvider.Provider value={{ user, auth, reload }}>
            {children}
        </AuthContextProvider.Provider>
    );
}