'use client';

import { useState, useEffect} from 'react'
import { useAuthState, useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '../firebase/config'
import { useRouter } from 'next/navigation'

export default function LogUpPage() {

  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [createUserWithEmailAndPassword, signUpUser, signUpLoading, signUpError] = useCreateUserWithEmailAndPassword(auth);
  const [signUpAlert, setSignUpAlert] = useState('')
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter()

  const signUpFormSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await createUserWithEmailAndPassword(signupEmail, signupPassword)
      setSignupEmail('')
      setSignupPassword('')
      if (res) {
        router.push('/')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
  <div className=" flex items-center justify-center h-screen">
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-xl font-bold mb-4">Sign In</h1>
        <form onSubmit={signUpFormSubmitHandler}>
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" className="mt-1 p-2 w-full border rounded-md" placeholder="you@example.com" onChange={(e) => setSignupEmail(e.target.value)} required />
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" id="password" className="mt-1 p-2 w-full border rounded-md" onChange={(e) => setSignupPassword(e.target.value)} required />
            </div>
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Sign Up</button>
        </form>
    </div>
  </div>
  )
}