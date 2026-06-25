'use client'
import { useEffect, useRef } from 'react'

export function useReveal(selector = '.reveal, .reveal-l, .reveal-r, .reveal-s') {
  useEffect(() => {
    const els = document.querySelectorAll(selector)
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            const delay = e.target.dataset.delay || 0
            setTimeout(() => e.target.classList.add('visible'), Number(delay))
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [selector])
}

export function useSkillBars() {
  useEffect(() => {
    const bars = document.querySelectorAll('.skill-bar-fill')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('filled')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.4 }
    )
    bars.forEach((b) => obs.observe(b))
    return () => obs.disconnect()
  }, [])
}
