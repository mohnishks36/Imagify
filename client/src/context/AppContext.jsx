import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [credit, setCredit] = useState(0);

    const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;




    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    const loadCreditsData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
                headers: {
                    token: token,
                },
            });

            if (data.success) {
                setCredit(data.credits);
                setUser(data.user);
            } else {
                toast.error(data.message || "Failed to load user data");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || "Something went wrong");
        }
    };

    const generateImage = async (prompt) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/image/generate-image`,
                { prompt },
                { headers: { token } }
            );

            if (data.success) {
                loadCreditsData();
                toast.success(data.message);
                return data.resultImage;
            } else {
                if (data.creditBalance === 0) {
                    toast.error("No credit balance. Redirecting...");
                    navigate("/buy");
                } else {
                    toast.error(data.message || "Image generation failed");
                }
            }
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || "Something went wrong");

            const creditBalance = err.response?.data?.creditBalance;
            if (creditBalance === 0) {
                navigate("/buy");
            }
        }
    };

    useEffect(() => {
        if (token) {
            loadCreditsData();
        }
    }, [token]);

    const value = {
        user, setUser,
        showLogin, setShowLogin,
        backendUrl,
        token, setToken,
        credit, setCredit,
        loadCreditsData,
        logout,
        generateImage,
    };

    useEffect(() => {
    console.log("VITE_BACKEND_URL loaded:", backendUrl);
}, []);

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
