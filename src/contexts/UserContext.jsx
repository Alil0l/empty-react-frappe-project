import { useState, createContext, useContext, useEffect } from 'react'
import { socket } from './../socket'
import { useAppContext } from './AppContext'

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { setIsLoading } = useAppContext();
  const [isLoggdedIn, setIsLoggdedIn] = useState(true);
  const [currUser, setCurrUser] = useState('')
  const [newNotification, setNewNotification] = useState(false)
  let cookiesUser = null;
  if(document.cookie){
    document.cookie.split(';').forEach(e => {
      e.includes('Guest') ? cookiesUser = true : null
    })
  }

  useEffect(() => {
    setIsLoading(false);

    if (cookiesUser) {
      setIsLoggdedIn(false)
      return
    }
    async function getCurrUser() {
      try {
        setIsLoading(true);
        const res = await fetch('/api/method/frappe.auth.get_logged_user');
        const data = await res.json();
        if (data.message) {
          const fullResponse = await fetch(`/api/resource/User/${data.message}`);
          const userData = await fullResponse.json();
          if(userData.data){
            setCurrUser(userData.data);
            setIsLoading(false);
            setIsLoggdedIn(true);
          socket.on(userData.data.email,()=>{
            setNewNotification(true)
          })
        }
        } else {
          setIsLoggdedIn(false);
          setIsLoading(false);
        }
      } catch (e) {
        console.log(e)
      } finally {
        setIsLoading(false);
      }
    }
    getCurrUser();
  }, [isLoggdedIn])

  return (
    <UserContext.Provider value={{ 
    currUser, setCurrUser,
    isLoggdedIn, setIsLoggdedIn,
    newNotification, setNewNotification }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => {
  return useContext(UserContext);
}