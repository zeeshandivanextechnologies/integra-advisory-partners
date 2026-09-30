/*
 * Send a website form to a Google Form without a backend.
 * Google does not return a readable response (no-cors), so a resolved
 * promise means the request was sent.
 */

export function isGoogleFormReady(form) {
  return Boolean(form?.action) && Object.values(form.fields).some(Boolean)
}

export async function submitToGoogleForm(form, formElement) {
  const data = new FormData(formElement)
  const body = new URLSearchParams()

  Object.entries(form.fields).forEach(([name, entryId]) => {
    if (!entryId) return
    const values = data.getAll(name)
    values.forEach((value) => body.append(entryId, value))
  })

  await fetch(form.action, {
    method: 'POST',
    mode: 'no-cors',
    body,
  })
}
