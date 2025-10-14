"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface ParallaxHeroProps {
  children: React.ReactNode
  imageUrl: string
}

export function ParallaxHero({ children, imageUrl }: ParallaxHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const currentOffsetRef = useRef(0)
  const targetOffsetRef = useRef(0)
  const rafRef = useRef<number>()

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return

      const scrolled = window.scrollY
      const heroHeight = heroRef.current.offsetHeight

      // Only apply parallax when hero is in view
      if (scrolled < heroHeight) {
        // Parallax factor: 0.5 means background moves at half speed
        targetOffsetRef.current = scrolled * 0.5
      }
    }

    const animate = () => {
      if (!bgRef.current) return

      // Lerp for smooth easing: current + (target - current) * smoothing factor
      const smoothing = 0.1 // Lower = smoother but slower, higher = faster but less smooth
      currentOffsetRef.current += (targetOffsetRef.current - currentOffsetRef.current) * smoothing

      // Apply transform
      bgRef.current.style.transform = `translate3d(0, ${currentOffsetRef.current}px, 0)`

      // Continue animation loop
      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-[120%] bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url('${imageUrl}')`,
          top: "-10%",
        }}
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 w-full">{children}</div>
    </section>
  )
}
