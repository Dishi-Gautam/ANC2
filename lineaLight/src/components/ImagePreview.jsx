import { useState, useEffect, useCallback } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import './ImagePreview.css'
import { PreviewContext } from './PreviewContext'

const DOCK_BOUNCE = {
  type: 'spring',
  stiffness: 400,
  damping: 22,
  mass: 0.9,
  restDelta: 0.001,
}

export function ImagePreviewProvider({ children }) {
  const [preview, setPreview] = useState(null)

  const openPreview = useCallback((src, label = '') => {
    setPreview({ src, label })
  }, [])

  const closePreview = useCallback(() => {
    setPreview(null)
  }, [])

  useEffect(() => {
    if (!preview) return
    const onKey = (e) => e.key === 'Escape' && closePreview()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [preview, closePreview])

  useEffect(() => {
    if (preview) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [preview])

  return (
    <PreviewContext.Provider value={{ openPreview }}>
      {children}

      <AnimatePresence>
        {preview && (
          <>
            <Motion.div
              className="img-preview-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closePreview}
            />

            <Motion.div
              className="img-preview-container"
              onClick={closePreview}
              initial={{ opacity: 0, scale: 0.25, y: 80 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.3, y: 60 }}
              transition={{
                scale: DOCK_BOUNCE,
                y: DOCK_BOUNCE,
                opacity: { duration: 0.2 },
              }}
            >
              <Motion.button
                className="img-preview-close"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ delay: 0.15, duration: 0.2 }}
                onClick={(e) => { e.stopPropagation(); closePreview() }}
                aria-label="Close preview"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </Motion.button>

              <Motion.img
                src={preview.src}
                alt={preview.label || 'Preview'}
                className="img-preview-image"
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                exit={{ scale: 1.08 }}
                transition={DOCK_BOUNCE}
                draggable={false}
                onClick={(e) => e.stopPropagation()}
              />

              {preview.label && (
                <Motion.div
                  className="img-preview-label-wrap"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ delay: 0.12, duration: 0.35 }}
                >
                  <span className="img-preview-label">{preview.label}</span>
                </Motion.div>
              )}
            </Motion.div>
          </>
        )}
      </AnimatePresence>
    </PreviewContext.Provider>
  )
}
