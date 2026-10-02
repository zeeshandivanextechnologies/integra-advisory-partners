import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext.jsx'
import {
  FiAlertCircle,
  FiArrowRight,
  FiCheck,
  FiEye,
  FiEyeOff,
  FiInfo,
  FiLock,
  FiMail,
} from 'react-icons/fi'
import logoWhite from '../assets/logos/primary-gold-white.svg'
import logoNavy from '../assets/logos/primary-navy.svg'
import markGold from '../assets/logos/mark-gold.svg'
import '../styles/Login.css'

const features = [
  'Edit the text and images on every website page',
  'Follow up on inquiries and intake forms',
  'Manage events, packages, and payments',
]

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validate = ({ email, password }) => {
  const errors = {}
  if (!email.trim()) errors.email = 'Enter your email address.'
  else if (!emailPattern.test(email.trim())) errors.email = 'Enter a valid email address.'
  if (!password) errors.password = 'Enter your password.'
  return errors
}

const year = new Date().getFullYear()

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { signIn, isAuthenticated } = useAuth()
  const [values, setValues] = useState({ email: '', password: '', remember: true })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [signingIn, setSigningIn] = useState(false)
  const [showResetNote, setShowResetNote] = useState(false)
  const [formError, setFormError] = useState('')

  const redirectTo = location.state?.from?.pathname || '/'

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTo, { replace: true })
    }
  }, [isAuthenticated, navigate, redirectTo])

  const setValue = (name, value) => {
    const next = { ...values, [name]: value }
    setValues(next)
    setFormError('')
    // after the first submit, re-check as the user types
    if (submitted) setErrors(validate(next))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitted(true)
    setFormError('')

    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    setSigningIn(true)
    try {
      const result = await signIn({
        email: values.email.trim(),
        password: values.password,
      })
      const name = result?.admin?.name || result?.admin?.email || 'there'
      toast.success(`Welcome back, ${name}! You are signed in.`, {
        position: 'top-right',
        autoClose: 3000,
        // solid green toast with a white icon (react-toastify's built-in style)
        theme: 'colored',
      })
      navigate(redirectTo, { replace: true })
    } catch (error) {
      const message =
        error?.message === 'Invalid credentials'
          ? 'Invalid email or password.'
          : error?.message || 'Unable to sign in. Please try again.'
      toast.error(message, {
        position: 'top-right',
        autoClose: 4000,
      })
      setFormError(message)
    } finally {
      setSigningIn(false)
    }
  }

  return (
    <div className="login">
      <div className="row g-0 min-vh-100">
        {/* ---------- brand panel (desktop only) ---------- */}
        <div className="col-lg-6 ">
          <aside className="login-brand">
            <img src={markGold} alt="" className="login-brand-mark" aria-hidden="true" />

            <img src={logoWhite} alt="Integra Advisory Partners" className="login-brand-logo" />

            <div className="login-brand-body">
              <span className="login-brand-eyebrow">Admin Panel</span>
              <h1 className="login-brand-title">
                Manage the Integra website from one place.
              </h1>
              <ul className="login-features">
                {features.map((feature) => (
                  <li key={feature}>
                    <span className="login-feature-icon">
                      <FiCheck />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <p className="login-brand-foot">
              &copy; {year} Integra Advisory Partners. Doha, Qatar.
            </p>
          </aside>
        </div>

        {/* ---------- sign-in form ---------- */}
        <div className="col-lg-6">
          <main className="login-main">
            <div className="login-card">
              <img
                src={logoNavy}
                alt="Integra Advisory Partners"
                className="login-mobile-logo d-lg-none"
              />

              <span className="login-icon" aria-hidden="true">
                <FiLock />
              </span>
              <h2 className="login-title">Welcome back</h2>
              <p className="login-text">Sign in to the Integra admin panel.</p>

              <form className="login-form" onSubmit={handleSubmit} noValidate>
                <div className="custom-frm-bx ">
                  <label htmlFor="login-email">Email address</label>
                  <div className={`login-input ${errors.email ? 'invalid' : ''}`}>
                    <FiMail className="login-input-icon" aria-hidden="true" />
                    <input
                      id="login-email"
                      type="email"
                      className="form-control"
                      placeholder="you@integraadvisory.com"
                      autoComplete="username"
                      value={values.email}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'login-email-error' : undefined}
                      onChange={(event) => setValue('email', event.target.value)}
                    />
                  </div>
                  {errors.email && (
                    <p className="login-error" id="login-email-error">
                      <FiAlertCircle />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="custom-frm-bx ">
                    <label htmlFor="login-password">Password</label>
                
                  <div className={`login-input ${errors.password ? 'invalid' : ''}`}>
                    <FiLock className="login-input-icon" aria-hidden="true" />
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      className="form-control"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      value={values.password}
                      aria-invalid={Boolean(errors.password)}
                      aria-describedby={errors.password ? 'login-password-error' : undefined}
                      onChange={(event) => setValue('password', event.target.value)}
                    />
                    <button
                      type="button"
                      className="login-eye"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      aria-pressed={showPassword}
                      onClick={() => setShowPassword((value) => !value)}
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>

                 

                  {errors.password && (
                    <p className="login-error" id="login-password-error">
                      <FiAlertCircle />
                      {errors.password}
                    </p>
                  )}
                </div>

                   {/* <div className="login-label-row justify-content-end ">

                     <button
                      type="button"
                      className="login-link"
                      onClick={() => setShowResetNote((value) => !value)}
                    >
                      Forgot password?
                    </button>
                   
                  </div> */}


                {showResetNote && (
                  <p className="login-note" role="status">
                    <FiInfo />
                    Ask a Super Admin to reset your password. Email reset links
                    will be available once the backend is connected.
                  </p>
                )}

                {formError && (
                  <p className="login-error" role="alert">
                    <FiAlertCircle />
                    {formError}
                  </p>
                )}

                <label className="login-remember">
                  <input
                    type="checkbox"
                    checked={values.remember}
                    onChange={(event) => setValue('remember', event.target.checked)}
                  />
                  <span className="login-check" aria-hidden="true">
                    <FiCheck />
                  </span>
                  Keep me signed in
                </label>

                <button type="submit" className="login-btn" disabled={signingIn}>
                  {signingIn ? (
                    <>
                      <span className="login-spinner" aria-hidden="true"></span>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <FiArrowRight />
                    </>
                  )}
                </button>
              </form>

              <p className="login-help">
                Access is limited to Integra team members.
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Login
