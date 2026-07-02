'use client'

import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY)
    setPrefersReduced(mediaQueryList.matches)

    const listener = (event: MediaQueryListEvent) => setPrefersReduced(event.matches)
    mediaQueryList.addEventListener('change', listener)

    return () => mediaQueryList.removeEventListener('change', listener)
  }, [])

  return prefersReduced
}
