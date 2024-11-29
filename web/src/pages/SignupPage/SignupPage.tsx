import { useEffect, useRef } from 'react'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  FieldError,
  Submit,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import FormContainer from 'src/components/forms/FormContainer/FormContainer'

const SignupPage = () => {
  const { isAuthenticated, signUp } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  // focus on email box on page load
  const emailRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  const onSubmit = async (data: Record<string, string>) => {
    const response = await signUp({
      username: data.email,
      password: data.password,
    })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      // user is signed in automatically
      toast.success('Welcome!')
    }
  }

  return (
    <>
      <Metadata title="Signup" />

      <FormContainer>
        <div className="bg-base-900 flex w-full items-center justify-center p-6">
          <header className="">
            <h2 className="text-2xl font-semibold ">Signup</h2>
          </header>
        </div>

        <div className="flex flex-col gap-10 px-10 py-12">
          <div>
            <Form
              onSubmit={onSubmit}
              className="flex  min-w-[300px] flex-col gap-4"
            >
              <div>
                <Label
                  name="email"
                  className="ml-2 text-sm opacity-80"
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
                  className="ml-2 text-sm opacity-80"
                  // errorClassName="rw-label rw-label-error"
                >
                  Password
                </Label>
                <PasswordField
                  name="password"
                  className="form-input bg-base-700"
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
              <Submit className="btn-primary w-full font-semibold">
                Sign Up
              </Submit>
            </Form>
          </div>
          <div className="text-center text-sm">
            <span className="font-thin opacity-80">
              Already have an account?
            </span>{' '}
            <Link
              to={routes.login()}
              className="font-semibold text-sky-500 hover:underline"
            >
              Log in!
            </Link>
          </div>
        </div>
      </FormContainer>
    </>
  )
}

export default SignupPage
