import { createContext, useState, useEffect } from 'react'
import { jwtDecode } from "jwt-decode";
import { postDataToApi } from "../utils/api";
import { toast } from "react-toastify";

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true);

    let registerUser = async (formData)=> {
        const response = await postDataToApi("api/register/", formData);
        let data = response;
        
        if(response){
            toast.success("Account Created!");
        }else{
            alert('Something went wrong!')
            toast.success("Error Logged In!");
        }
    }

    let loginUser = async (formData)=> {
        const response = await postDataToApi("api/token/", formData);
        let data = response;
        
        if(response){
            console.log('response is good')
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            toast.success("Logged In");
        }else{
            alert('Something went wrong!')
            toast.success("Error Logged In!");
        }
    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        toast.success("Logout");
    }

    let updateToken = async ()=> {

        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })

        let data = await response.json()
        
        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else{
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }

    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
        registerUser: registerUser,
    }

    useEffect(()=> {

        if(loading){
            updateToken()
        }

        let oneDay = 1000 * 60 * 60 * 24

        let interval =  setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        }, oneDay)
        return ()=> clearInterval(interval)

    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}