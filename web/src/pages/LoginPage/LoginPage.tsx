import { useEffect, useRef } from 'react'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { Link, navigate, Redirect, routes, useParams } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import AuthFormContainer from 'src/components/forms/AuthFormContainer/AuthFormContainer'

const LoginPage = () => {
  const { isAuthenticated, logIn, loading } = useAuth()
  const emailRef = useRef<HTMLInputElement>(null)

  const { redirectTo } = useParams()
  console.log('redirectTo', redirectTo)

  useEffect(() => {
    if (isAuthenticated) {
      if (redirectTo) {
        navigate(redirectTo)
      } else {
        navigate(routes.home())
      }
    }
  }, [isAuthenticated, redirectTo])

  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (isAuthenticated) {
    return <Redirect to={routes.home()} />
  }

  const onSubmit = async (data: Record<string, string>) => {
    const response = await logIn({
      username: data.email,
      password: data.password,
    })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Welcome back!')
      navigate(routes.home())
    }
  }

  return (
    <>
      <Metadata title="Login" />

      <AuthFormContainer title="Login">
        <div className="flex flex-grow flex-col justify-center gap-10 px-24 py-12 sm:px-12 md:flex-grow-0">
          <div className="">
            <Form
              onSubmit={onSubmit}
              className="flex  min-w-[300px] flex-col gap-4"
            >
              <div>
                <Label
                  name="email"
                  className="form-label"
                  // errorClassName="rw-label-error"
                >
                  Email
                </Label>
                <TextField
                  name="email"
                  className="form-input bg-base-700"
                  // errorClassName="rw-input rw-input-error"
                  ref={emailRef}
                  validation={{
                    required: {
                      value: true,
                      message: 'Email is required',
                    },
                  }}
                />
                <FieldError name="email" className="rw-field-error ml-2" />
              </div>

              <div>
                <Label
                  name="password"
                  className="form-label"
                  // errorClassName="rw-label rw-label-error"
                >
                  Password
                </Label>
                <PasswordField
                  name="password"
                  className="form-input bg-base-700 "
                  // errorClassName="rw-input rw-input-error"
                  autoComplete="current-password"
                  validation={{
                    required: {
                      value: true,
                      message: 'Password is required',
                    },
                  }}
                />
                <FieldError name="password" className="rw-field-error ml-2" />
              </div>

              <Submit className="btn-primary w-full rounded-base-small text-lg font-semibold">
                Login
              </Submit>
            </Form>
          </div>
          <div className="flex flex-col gap-2 text-center">
            <p className="r text-sm">
              <span className="font-thin opacity-80">
                Don&apos;t have an account?
              </span>{' '}
              <Link
                to={routes.signUp()}
                className="font-semibold text-sky-500 hover:underline"
              >
                Sign Up!
              </Link>
            </p>
            <Link
              to={routes.forgotPassword()}
              className="text-center text-sm font-thin opacity-80 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </AuthFormContainer>
    </>
  )
}

export default LoginPage
