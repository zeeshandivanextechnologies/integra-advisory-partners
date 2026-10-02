/*
 * Read the entry ids of an existing Google Form.
 * Use this when a form was created by hand instead of with create-google-forms.gs.
 *
 * Usage:
 *   node scripts/google-form-ids.mjs "https://docs.google.com/forms/d/e/FORM_ID/viewform"
 *
 * The form must be public (not restricted to one organization) for this to work.
 */

const url = process.argv[2]

if (!url || !url.includes('docs.google.com/forms')) {
  console.error('Usage: node scripts/google-form-ids.mjs "<Google Form viewform URL>"')
  process.exit(1)
}

const viewUrl = url.replace(/\/(edit|formResponse|prefill).*$/, '/viewform')
const response = await fetch(viewUrl)

if (!response.ok) {
  console.error(`Could not open the form (HTTP ${response.status}). Is it public?`)
  process.exit(1)
}

const html = await response.text()
const match = html.match(/FB_PUBLIC_LOAD_DATA_\s*=\s*(\[[\s\S]*?\]);\s*<\/script>/)

if (!match) {
  console.error('Could not find the form data on the page. The form may require sign-in.')
  process.exit(1)
}

const data = JSON.parse(match[1])
const items = data?.[1]?.[1] ?? []

console.log(`\nForm: ${data?.[1]?.[8] || data?.[3] || 'Untitled'}`)
console.log(`action: ${viewUrl.replace(/\/viewform.*$/, '/formResponse')}\n`)

for (const item of items) {
  const title = item[1]
  const inputs = item[4]
  if (!Array.isArray(inputs)) continue

  for (const input of inputs) {
    const entryId = input[0]
    const options = Array.isArray(input[1])
      ? input[1].map((option) => option[0]).filter(Boolean)
      : []
    console.log(`entry.${entryId}  ${title}`)
    if (options.length) console.log(`    options: ${options.join(' | ')}`)
  }
}

console.log('\nCopy each entry id into the matching field in src/constants/siteConfig.js.\n')
