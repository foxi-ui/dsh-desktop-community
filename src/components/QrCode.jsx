import React from 'react'

/* 装饰性二维码（占位，可替换为真实公众号二维码） */
function mulberry32(a) {
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export default function QrCode({ size = 120 }) {
  const n = 21
  const rand = mulberry32(20260818)
  const modules = []
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const inFinder =
        (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7)
      const inSeparator =
        (x < 8 && y < 8) || (x >= n - 8 && y < 8) || (x < 8 && y >= n - 8)
      let on = false
      if (inFinder) {
        const fx = x < 7 ? x : x >= n - 7 ? x - (n - 7) : x
        const fy = y < 7 ? y : y >= n - 7 ? y - (n - 7) : y
        on = fx === 0 || fx === 6 || fy === 0 || fy === 6 || (fx >= 2 && fx <= 4 && fy >= 2 && fy <= 4)
      } else if (!inSeparator) {
        on = rand() > 0.52
      }
      modules.push({ x, y, on })
    }
  }
  const cell = size / n
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="微信公众号二维码（占位）">
      <rect width={size} height={size} fill="#fff" rx={size * 0.06} />
      {modules
        .filter((m) => m.on)
        .map((m, i) => (
          <rect key={i} x={m.x * cell + cell * 0.12} y={m.y * cell + cell * 0.12} width={cell * 0.76} height={cell * 0.76} fill="#121c31" />
        ))}
    </svg>
  )
}
