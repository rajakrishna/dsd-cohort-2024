'use client'
import { useState } from 'react'
import {useAuthState, useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {auth} from '../firebase/config'
import { useRouter } from 'next/navigation'

export default function AdminSignInAndSignUp() {

  const [signinEmail, setSigninEmail] = useState('')
  const [signinPassword, setSigninPassword] = useState('')
  const [signInWithEmailAndPassword, signInUser, signInLoading, signInError] = useSignInWithEmailAndPassword(auth);
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [createUserWithEmailAndPassword, signUpUser, signUpLoading, signUpError] = useCreateUserWithEmailAndPassword(auth);
  const [signInAlert, setSignInAlert] = useState(false)
  const [signUpAlert, setSignUpAlert] = useState(false)
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter()

  if (loading) {
    return (
    <div className="flex items-center justify-center min-h-screen">
      <span className="loading loading-bars loading-lg"></span>
    </div>
  )
};
  console.log('user', user)
  const signInFormSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await signInWithEmailAndPassword(signinEmail, signinPassword)
      console.log('res', res)
      setSigninEmail('')
      setSigninPassword('')
      if (res) {
        router.push('/admin/dashboard')
      } else {
        setSignInAlert(true)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const signUpFormSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await createUserWithEmailAndPassword(signupEmail, signupPassword)
      console.log('res', res)
      setSignupEmail('')
      setSignupPassword('')
      if (res){
        router.push('/admin/dashboard')
      } else {
        setSignUpAlert(true)
      }

    } catch (error) {
      console.log('error', error)
    }
  }

  if (user) {
    router.push('/admin/dashboard')
  } else {

  return (
  <div className='flex items-center justify-center min-h-screen'>
    <div className='flex min-h-screen'>
      <form className='w-1/3 flex flex-col justify-center p-5' onSubmit={signInFormSubmitHandler}>
        <h1 className="text-center mb-4">Admin SignIn</h1>
        <label className="input input-bordered flex items-center gap-2 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
          <input type="email" className="grow" placeholder="Email" onChange={(e)=>setSigninEmail(e.target.value)} onFocus={()=>setSignInAlert(false)} value={signinEmail} required/>
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
          <input type="password" className="grow" placeholder="Password" onChange={(e)=>setSigninPassword(e.target.value)} onFocus={()=>setSignInAlert(false)} value={signinPassword} minLength='6' required/>
        </label>
        <p className={`text-red-500 text-xs ${signInAlert ? 'visible' : 'invisible'}`}>Either email or password is incorrect</p>
        <button type='submit' className="btn btn-primary my-10">Sign in</button>
      </form>
      <div className="w-px bg-gray-200 my-auto h-80 mx-4 sm:mx-6 md:mx-10 lg:mx-20 xl:mx-40"></div>
        <form className='w-1/3 flex flex-col justify-center p-5 border-gray-200' onSubmit={signUpFormSubmitHandler}>
          <h1 className="text-center mb-4">Admin SignUp</h1>
          <label className="input input-bordered flex items-center gap-2 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
            <input type="email" className="grow" placeholder="Email" onChange={(e)=>setSignupEmail(e.target.value)} value={signupEmail} required/>
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
            <input type="password" className="grow" placeholder="Password" onChange={(e)=>setSignupPassword(e.target.value)} value={signupPassword} minLength='6' required/>
          </label>
          <p className={`text-white text-xs ${signUpLoading ? 'visible' : 'invisible'}`}>please wait while signing you up ...</p>
          <button type='submit' className="btn btn-primary my-10 ">Sign Up</button>
        </form>
    </div>
  </div>
  )
}
}