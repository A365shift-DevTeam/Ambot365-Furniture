// Single source of truth for frame image URLs.
// With VITE_USE_CLOUDINARY=true (default when a cloud name is set) frames are
// served from Cloudinary's CDN with automatic format/quality and optional
// width. Otherwise they fall back to the local copies in public/frames.

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const useCloudinary = Boolean(cloudName) && import.meta.env.VITE_USE_CLOUDINARY !== 'false'

export const FRAME_FOLDER = 'ambot365/frames'
export const CLOUDINARY_HOST = 'https://res.cloudinary.com'

/** "frame-0024.webp" | "frame-0024" | "/frames/frame-0024.webp" -> "frame-0024" */
function baseName(name) {
  return name.split('/').pop().replace(/\.webp$/i, '')
}

/**
 * URL for a frame by file name.
 * @param {string} name  e.g. "frame-0024.webp"
 * @param {{ width?: number }} [opts]  max delivered width (Cloudinary only)
 */
export function frameSrc(name, { width } = {}) {
  const base = baseName(name)
  if (!useCloudinary) return `/frames/${base}.webp`

  const transforms = ['f_auto', 'q_auto']
  if (width) transforms.push(`w_${width}`, 'c_limit')

  return `${CLOUDINARY_HOST}/${cloudName}/image/upload/${transforms.join(',')}/${FRAME_FOLDER}/${base}`
}

/** URL for the scroll-sequence frame at zero-based index. */
export function frameUrl(index, opts) {
  return frameSrc(`frame-${String(index + 1).padStart(4, '0')}`, opts)
}
