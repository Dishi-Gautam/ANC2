import { useState, useEffect, useCallback } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'
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
              className="fixed inset-0 z-[9998] cursor-pointer bg-black/90 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closePreview}
            />

            <Motion.div
              className="fixed inset-0 z-[9999] flex cursor-pointer flex-col items-center justify-center p-5 sm:p-10 [perspective:800px]"
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
                className="fixed right-3 top-3 z-[10000] flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-md transition-all duration-200 hover:scale-110 hover:border-white/30 hover:bg-white/10 sm:right-5 sm:top-5 sm:h-11 sm:w-11"
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
                className="h-auto max-h-[72vh] w-auto max-w-[95vw] cursor-default rounded-xl object-contain shadow-[0_20px_60px_rgba(0,0,0,0.6),0_40px_120px_rgba(0,0,0,0.4)] select-none sm:max-h-[78vh] sm:max-w-[88vw] sm:rounded-2xl"
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                exit={{ scale: 1.08 }}
                transition={DOCK_BOUNCE}
                draggable={false}
                onClick={(e) => e.stopPropagation()}
              />

              {preview.label && (
                <Motion.div
                  className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 text-center sm:bottom-9"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ delay: 0.12, duration: 0.35 }}
                >
                  <span className="text-base font-semibold tracking-[-0.02em] text-white [text-shadow:0_4px_16px_rgba(0,0,0,0.6)] sm:text-[22px]">{preview.label}</span>
                </Motion.div>
              )}
            </Motion.div>
          </>
        )}
      </AnimatePresence>
    </PreviewContext.Provider>
  )
}
