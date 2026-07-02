// components/ScrollEffects.tsx
'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion'

export function ScrollEffects() {
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis()
    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)
    lenis.on('scroll', ScrollTrigger.update)

    const ctx = gsap.context(() => {
      gsap.to('#hero > *', {
        opacity: 0.3,
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.from('#cases', {
        opacity: 0,
        y: 60,
        duration: 0.8,
        scrollTrigger: {
          trigger: '#cases',
          start: 'top 80%',
        },
      })
    })

    return () => {
      cancelAnimationFrame(rafId)
      ctx.revert()
      lenis.destroy()
    }
  }, [prefersReducedMotion])

  return null
}
