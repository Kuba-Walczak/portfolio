import { useApp } from '@/contexts/AppContext'
import { useEffect, useMemo, useRef, useState } from 'react'

const GLYPHS = ['未', '来', '日', '月', '火', '水', '木', '金', '土']
const CELL_SIZE = 96
const GLYPH_X_OFFSET = 18
const GLYPH_Y_OFFSET = 62
const SPOTLIGHT_RADIUS = 100
const BASE_OPACITY = 0.08
const BOOST_OPACITY = 0.52

export default function Background() {
  const { setHeroVideoGlowRef } = useApp()
  const rootRef = useRef<HTMLDivElement>(null)
  const [viewport, setViewport] = useState({ width: 0, height: 0 })
  const [mouse, setMouse] = useState({ x: 0, y: 0, active: false })
  const latestMouse = useRef({ x: 0, y: 0 })
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    const updateViewport = () => {
      const root = rootRef.current
      setViewport({
        width: root?.clientWidth ?? window.innerWidth,
        height: Math.max(
          root?.scrollHeight ?? 0,
          document.documentElement.scrollHeight,
          window.innerHeight
        ),
      })
    }

    updateViewport()
    window.addEventListener('resize', updateViewport)
    window.addEventListener('load', updateViewport)

    let resizeObserver: ResizeObserver | null = null
    if (rootRef.current && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(updateViewport)
      resizeObserver.observe(rootRef.current)
    }

    return () => {
      window.removeEventListener('resize', updateViewport)
      window.removeEventListener('load', updateViewport)
      resizeObserver?.disconnect()
    }
  }, [])

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      const rect = rootRef.current?.getBoundingClientRect()
      if (!rect) return

      latestMouse.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      }
      if (frameRef.current !== null) return

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null
        const latestRect = rootRef.current?.getBoundingClientRect()
        if (!latestRect) return

        const isInside =
          latestMouse.current.x >= 0 &&
          latestMouse.current.y >= 0 &&
          latestMouse.current.x <= latestRect.width &&
          latestMouse.current.y <= latestRect.height

        setMouse({
          x: latestMouse.current.x,
          y: latestMouse.current.y,
          active: isInside,
        })
      })
    }

    const onMouseLeave = (event: MouseEvent) => {
      if (event.relatedTarget) return
      setMouse((current) => (current.active ? { ...current, active: false } : current))
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseout', onMouseLeave)

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
      }
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseout', onMouseLeave)
    }
  }, [])

  const glyphGrid = useMemo(() => {
    const cols = Math.ceil(viewport.width / CELL_SIZE) + 2
    const rows = Math.ceil(viewport.height / CELL_SIZE) + 2
    const glyphs: Array<{ key: string; x: number; y: number; char: string }> = []

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * CELL_SIZE + GLYPH_X_OFFSET
        const y = row * CELL_SIZE + GLYPH_Y_OFFSET
        const glyphIndex = (row * 7 + col * 11) % GLYPHS.length
        glyphs.push({
          key: `${row}-${col}`,
          x,
          y,
          char: GLYPHS[glyphIndex],
        })
      }
    }

    return glyphs
  }, [viewport.height, viewport.width])
  return (
    <div
      ref={rootRef}
      className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-[#0D0D19]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* <p
          className="absolute uppercase font-bold whitespace-nowrap"
          style={{
            top: '-5%',
            left: '6%',
            fontSize: 'clamp(2.8rem, 40vmax, 128rem)',
            color: 'rgba(255, 255, 255, 0.03)',
            mixBlendMode: 'soft-light',
            fontFamily: 'var(--font-wdxl-lubrifont-sc)'
          }}
        >
          未
        </p>
        <p
          className="absolute uppercase font-bold whitespace-nowrap"
          style={{
            top: '22%',
            left: '65%',
            fontSize: 'clamp(2.8rem, 40vmax, 128rem)',
            color: 'rgba(255, 255, 255, 0.03)',
            mixBlendMode: 'soft-light',
            fontFamily: 'var(--font-wdxl-lubrifont-sc)'
          }}
        >
          未
        </p>
        <p
          className="absolute uppercase font-bold whitespace-nowrap"
          style={{
            top: '48%',
            left: '5%',
            fontSize: 'clamp(2.8rem, 40vmax, 128rem)',
            color: 'rgba(255, 255, 255, 0.03)',
            mixBlendMode: 'soft-light',
            fontFamily: 'var(--font-wdxl-lubrifont-sc)'
          }}
        >
          来
        </p> */}
        <div className="absolute inset-0" style={{ mixBlendMode: 'soft-light' }}>
          {glyphGrid.map((glyph) => {
            const dx = mouse.x - glyph.x
            const dy = mouse.y - glyph.y
            const distance = Math.hypot(dx, dy)
            const rawFalloff = mouse.active ? Math.max(0, 1 - distance / SPOTLIGHT_RADIUS) : 0
            const easedFalloff = rawFalloff * rawFalloff * (3 - 2 * rawFalloff)
            const opacity = BASE_OPACITY + (BOOST_OPACITY - BASE_OPACITY) * easedFalloff
            const brightness = 1 + 1.8 * easedFalloff
            const scale = 1 + 0.08 * easedFalloff

            return (
              <span
                key={glyph.key}
                className="absolute select-none"
                style={{
                  left: `${glyph.x}px`,
                  top: `${glyph.y}px`,
                  opacity,
                  color: '#ffffff',
                  fontFamily: 'serif',
                  fontSize: '52px',
                  lineHeight: 1,
                  transform: `translate(-50%, -50%) scale(${scale})`,
                  filter: `brightness(${brightness})`,
                  transition: 'opacity 120ms ease-out, filter 120ms ease-out, transform 120ms ease-out',
                  willChange: 'opacity, filter, transform',
                }}
              >
                {glyph.char}
              </span>
            )
          })}
        </div>
      </div>
      <div
        ref={setHeroVideoGlowRef}
        className="absolute rounded-full opacity-0"
        style={{
          width: '200vw',
          height: '200vw',
          top: 0,
          right: 0,
          transform: 'translate(50%, -50%)',
        }}
      />
    </div>
  )
}
