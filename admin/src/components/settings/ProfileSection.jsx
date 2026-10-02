import { useState } from 'react'
import { FiAlertCircle, FiEye, FiEyeOff, FiKey, FiSave } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/AuthContext.jsx'
import { changePassword, updateProfile } from '../../services/auth.js'
import '../../styles/Profile.css'

const toastOptions = { position: 'top-right', autoClose: 3000, theme: 'colored' }

// "Integra Admin" or "admin@integra.com" -> "IA" / "AD"
const initialsOf = (text) => {
  const words = text.split(/[\s@._-]+/).filter(Boolean)
  const letters = words.length > 1 ? words[0][0] + words[1][0] : (words[0] || 'A').slice(0, 2)
  return letters.toUpperCase()
}

function PasswordInput({ id, label, value, onChange, autoComplete, hint }) {
  const [visible, setVisible] = useState(false)
  return (
    <div className="custom-frm-bx pe-field">
      <label htmlFor={id}>{label}</label>
      <div className="prf-password">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          className="form-control"
          autoComplete={autoComplete}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        <button
          type="button"
          className="prf-eye"
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          onClick={() => setVisible((current) => !current)}
        >
          {visible ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>
      {hint && <p className="pe-hint">{hint}</p>}
    </div>
  )
}

// The signed-in admin's own profile: name, login email, and password.
// Saved straight away with its own buttons, separate from the website settings below.
function ProfileSection() {
  const { admin, updateAdmin } = useAuth()

  const [profile, setProfile] = useState({ name: admin?.name || '', email: admin?.email || '' })
  const [savingProfile, setSavingProfile] = useState(false)
  const [profileError, setProfileError] = useState('')

  const emptyPasswords = { currentPassword: '', newPassword: '', confirmPassword: '' }
  const [passwords, setPasswords] = useState(emptyPasswords)
  const [savingPassword, setSavingPassword] = useState(false)
  const [passwordError, setPasswordError] = useState('')

  const profileChanged =
    profile.name.trim() !== (admin?.name || '') || profile.email.trim() !== (admin?.email || '')

  const handleProfileSave = async (event) => {
    event.preventDefault()
    const email = profile.email.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setProfileError('Enter a valid email address.')
      return
    }

    setSavingProfile(true)
    setProfileError('')
    try {
      const result = await updateProfile({ name: profile.name.trim(), email })
      updateAdmin({ ...admin, ...result.admin })
      setProfile({ name: result.admin.name || '', email: result.admin.email })
      toast.success('Profile saved successfully!', toastOptions)
    } catch (error) {
      setProfileError(error.message || 'Could not save your profile.')
    } finally {
      setSavingProfile(false)
    }
  }

  const handlePasswordSave = async (event) => {
    event.preventDefault()
    if (!passwords.currentPassword) {
      setPasswordError('Enter your current password.')
      return
    }
    if (passwords.newPassword.length < 8) {
      setPasswordError('The new password needs at least 8 characters.')
      return
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswordError('The new passwords do not match.')
      return
    }

    setSavingPassword(true)
    setPasswordError('')
    try {
      await changePassword({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      })
      setPasswords(emptyPasswords)
      toast.success('Password changed successfully!', toastOptions)
    } catch (error) {
      setPasswordError(error.message || 'Could not change your password.')
    } finally {
      setSavingPassword(false)
    }
  }

  const setPassword = (changes) => {
    setPasswords((current) => ({ ...current, ...changes }))
    setPasswordError('')
  }

  const displayName = admin?.name || admin?.email || 'Admin'

  return (
    <section id="profile" className="pe-section">
      <div className="pe-section-head">
        <span className="prf-avatar" aria-hidden="true">
          {initialsOf(displayName)}
        </span>
        <div className="pe-section-info">
          <span className="pe-section-number">Your profile</span>
          <h3 className="pe-section-title">{displayName}</h3>
          <span className="prf-role">
            {admin?.role === 'admin' ? 'Super Admin' : admin?.role || 'Admin'}
          </span>
        </div>
      </div>

      <div className="pe-section-body">
        <div className="row">
          {/* name + email */}
          <div className="col-lg-6 mb-3 mb-lg-0">
            <form className="pe-group prf-form" onSubmit={handleProfileSave} noValidate>
              <span className="pe-group-label">Profile details</span>
              <div className="custom-frm-bx pe-field">
                <label htmlFor="profile-name">Name</label>
                <input
                  id="profile-name"
                  type="text"
                  className="form-control"
                  autoComplete="name"
                  placeholder="Your name"
                  value={profile.name}
                  onChange={(event) => {
                    setProfile((current) => ({ ...current, name: event.target.value }))
                    setProfileError('')
                  }}
                />
                <p className="pe-hint">Shown in the top bar of the admin.</p>
              </div>
              <div className="custom-frm-bx pe-field">
                <label htmlFor="profile-email">Login email</label>
                <input
                  id="profile-email"
                  type="email"
                  className="form-control"
                  autoComplete="email"
                  value={profile.email}
                  onChange={(event) => {
                    setProfile((current) => ({ ...current, email: event.target.value }))
                    setProfileError('')
                  }}
                />
                <p className="pe-hint">Use this email the next time you sign in.</p>
              </div>
              <div className="prf-actions">
                <button
                  type="submit"
                  className="pe-btn primary"
                  disabled={savingProfile || !profileChanged}
                >
                  <FiSave />
                  {savingProfile ? 'Saving...' : 'Save Profile'}
                </button>
                {profileError && (
                  <p className="prf-error" role="alert">
                    <FiAlertCircle />
                    {profileError}
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* password */}
          <div className="col-lg-6">
            <form className="pe-group prf-form" onSubmit={handlePasswordSave} noValidate>
              <span className="pe-group-label">Change password</span>
              <PasswordInput
                id="profile-current-password"
                label="Current password"
                autoComplete="current-password"
                value={passwords.currentPassword}
                onChange={(currentPassword) => setPassword({ currentPassword })}
              />
              <PasswordInput
                id="profile-new-password"
                label="New password"
                autoComplete="new-password"
                hint="At least 8 characters."
                value={passwords.newPassword}
                onChange={(newPassword) => setPassword({ newPassword })}
              />
              <PasswordInput
                id="profile-confirm-password"
                label="Confirm new password"
                autoComplete="new-password"
                value={passwords.confirmPassword}
                onChange={(confirmPassword) => setPassword({ confirmPassword })}
              />
              <div className="prf-actions">
                <button type="submit" className="pe-btn primary" disabled={savingPassword}>
                  <FiKey />
                  {savingPassword ? 'Updating...' : 'Update Password'}
                </button>
                {passwordError && (
                  <p className="prf-error" role="alert">
                    <FiAlertCircle />
                    {passwordError}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfileSection
