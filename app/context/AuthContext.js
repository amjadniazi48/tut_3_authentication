// context/AuthContext.js
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { NEXT_URL } from '@/config/index';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error,setError]=useState(null);
  const [message,setMessage]=useState(null);
  const router = useRouter();

  //useEffect(() => checkUserLoggedIn(), [])

  const login = async (identifier, password) => {
   // console.log("this is ",identifier);
 //   return false;
    try {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifier, password }),
    });
    const data = await res.json();
    //console.log("this is the data",data)
    if (data.jwt && data.user) {
        setUser(data.user);
        router.push('/products');
      } else {
        console.log(data.error)
        setError(data.error);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred');
    }
  };

 
const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: 'POST',
    })

    if (res.ok) {
      setUser(null)
      router.push('/login')
    }
  }

const signup = async (username, email, password) => {
    try {
      const res = await fetch(`${NEXT_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
  
    
      const data = await res.json();
  
      if (data.jwt && data.user) {
        setUser(data.user);
        setMessage("Registration complete! You can now log in")
        logout();
        router.push('/login');
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('An unexpected error occurred');
    }
  };
    // Check if user is logged in
    // const checkUserLoggedIn = async (user) => {
    //     const res = await fetch(`${API_URL}/api/user`)
    //     const data = await res.json()
    
    //     if (res.ok) {
    //       setUser(data.user)
    //     } else {
    //       setUser(null)
    //     }
    //   }

  return (
    <AuthContext.Provider value={{ user,error,message,login,logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);