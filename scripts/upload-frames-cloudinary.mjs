// Uploads every frame in public/frames to Cloudinary under FOLDER.
// Usage: node scripts/upload-frames-cloudinary.mjs
// Reads CLOUDINARY_CLOUD_NAME / API_KEY / API_SECRET from .env.local, then .env.
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const framesDir = path.join(root, 'public/frames')
const FOLDER = 'ambot365/frames'
const CONCURRENCY = 6

function loadEnv() {
  const env = {}
  for (const file of ['.env', '.env.local']) {
    const p = path.join(root, file)
    if (!fs.existsSync(p)) continue
    for (const line of fs.readFileSync(p, 'utf8').split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/)
      if (m && !line.trim().startsWith('#')) env[m[1]] = m[2].replace(/^["']|["']$/g, '')
    }
  }
  return env
}

const env = loadEnv()
const cloudName = env.CLOUDINARY_CLOUD_NAME
const apiKey = env.CLOUDINARY_API_KEY
const apiSecret = env.CLOUDINARY_API_SECRET

if (!cloudName || !apiKey || !apiSecret) {
  console.error('Missing CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET in .env or .env.local')
  process.exit(1)
}

function sign(params) {
  const toSign = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join('&')
  return crypto.createHash('sha1').update(toSign + apiSecret).digest('hex')
}

async function uploadOne(file, attempt = 1) {
  const publicId = path.basename(file, path.extname(file))
  const params = {
    folder: FOLDER,
    public_id: publicId,
    overwrite: 'true',
    invalidate: 'true',
    timestamp: String(Math.floor(Date.now() / 1000)),
  }
  const form = new FormData()
  for (const [k, v] of Object.entries(params)) form.append(k, v)
  form.append('api_key', apiKey)
  form.append('signature', sign(params))
  form.append('file', new Blob([fs.readFileSync(path.join(framesDir, file))], { type: 'image/webp' }), file)

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: 'POST', body: form })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) {
    if (attempt < 3) {
      await new Promise((r) => setTimeout(r, 1000 * attempt))
      return uploadOne(file, attempt + 1)
    }
    throw new Error(`${file}: HTTP ${res.status} ${body?.error?.message ?? ''}`)
  }
  return body
}

async function main() {
  const files = fs.readdirSync(framesDir).filter((f) => f.endsWith('.webp')).sort()
  console.log(`Uploading ${files.length} frames to ${cloudName}/${FOLDER} ...`)

  let done = 0
  let bytes = 0
  const failed = []
  const queue = [...files]

  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (queue.length) {
        const file = queue.shift()
        try {
          const r = await uploadOne(file)
          bytes += r.bytes ?? 0
          done++
          if (done % 10 === 0 || done === files.length) console.log(`  ${done}/${files.length}  (${r.public_id})`)
        } catch (err) {
          failed.push(file)
          console.error('  FAILED', err.message)
        }
      }
    }),
  )

  console.log(`Done. ${done} uploaded (${(bytes / 1024 / 1024).toFixed(2)} MB), ${failed.length} failed.`)
  if (failed.length) {
    console.error('Failed files:', failed.join(', '))
    process.exit(1)
  }
  console.log(`Example URL: https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${FOLDER}/frame-0001`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
