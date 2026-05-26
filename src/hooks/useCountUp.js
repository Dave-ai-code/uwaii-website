import { useEffect, useRef, useState } from 'react'

export function useCountUp(end, duration = 1800, start = 0, decimals = 0) {
  const [value, setValue] = useState(start)
  const [triggered, setTriggered] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true)
        }
      },
      { threshold: 0.5 }
    )
    const el = ref.current
    if (el) observer.observe(el)
    return () => { if (el) observer.unobserve(el) }
  }, [triggered])

  useEffect(() => {
    if (!triggered) return
    const startTime = performance.now()
    const range = end - start
    const frame = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(parseFloat((start + range * eased).toFixed(decimals)))
      if (progress < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }, [triggered, end, start, duration, decimals])

  return [ref, value]
}
