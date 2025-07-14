import React from 'react'
import { useForm } from 'react-hook-form'
import Validations from '@/Validations/RulesForm'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { supabase } from '../../../lib/supabaseClient'

export default function LoginForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const onSubmit = async (formData) => {
    const { email, password } = formData

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      console.error('Login error:', error.message)
      alert('ایمیل یا رمز عبور اشتباه است')
      return
    }

    // منتظر میمونیم تا سشن ست بشه (auth-helpers کوکی رو ست میکنه)
    const session = await supabase.auth.getSession()
    if (session.data.session) {
      try {
        await router.push('/')
        console.log('✅ route changed to /')
        console.log('✅ session:', session.data.session)
        console.log('✅ user:', session.data.session.user)
      } catch (err) {
        console.error('❌ Failed to navigate:', err)
      }
    } else {
      alert('مشکلی پیش آمده، دوباره تلاش کنید')
    }
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-gray-100 '>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full max-w-md bg-white p-4 rounded-xl shadow-lg space-y-2'
      >
        <div className='flex flex-col'>
          <label className='text-md text-gray-600 mb-1'>Email</label>
          <input
            {...register('email', Validations.email)}
            type='email'
            placeholder='Email'
            className='p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50 text-md'
          />
          {errors.email && (
            <p className='text-xs text-red-500 h-2 mt-1'>
              {errors.email.message}
            </p>
          )}
        </div>

        <div className='flex flex-col'>
          <label className='text-md text-gray-600 mb-1'>Password</label>
          <input
            {...register('password', Validations.password)}
            type='password'
            placeholder='Password'
            className='p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50 text-md'
          />
          {errors.password && (
            <p className='text-xs text-red-500 h-2 mt-1'>
              {errors.password.message}
            </p>
          )}
        </div>

        <div className='flex justify-center'>
          <button className='w-56 mt-3 cursor-pointer bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out'>
            Login
          </button>
        </div>

        <div className='flex items-center justify-center space-x-2'>
          <span className='text-gray-600 text-md'>Create new account</span>
          <Link
            className='text-blue-600 hover:text-blue-800 underline'
            href='/signup'
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  )
}
