import { createContext, useEffect, useState } from "react";
import { app } from "../Firebase/firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile,} from "firebase/auth";
import  useAxiosPublic   from '../Components/Hooks/useAxiosPublic';


export const AuthContext = createContext(null);
const auth = getAuth  (app)
const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()
    const axiosPublic = useAxiosPublic()

    const createUser = (email,password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth,googleProvider)
    }

    const signIn = (email,password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }
    const updateUserProfile = (name,photo) => {
        return updateProfile(auth.currentUser, {
             displayName: name, photoURL: photo
           })
     }

    useEffect(() => {
     const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if(currentUser){
            // get token and store client
            const userInfo = {email: currentUser.email};
              axiosPublic.post('/jwt', userInfo)
              .then(res => {
                if(res.data.token){
                    localStorage.setItem('access-token',res.data.token)
                    setLoading(false)
                }
              })
            }
            else{
                    //  TODO: remove token (If token stored in the client local storage, catching, memory)
                    localStorage.removeItem('access-token')
                    setLoading(false)
            }
            
         });
         return () => {
            return unsubscribe();
         }
    }, [axiosPublic])

    const authInfo = {
        user,
        loading,
        googleSignIn,
        createUser,
        signIn,
        logOut,
        updateUserProfile
        
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;