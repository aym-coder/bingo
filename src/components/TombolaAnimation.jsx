import React, { useState, useEffect, useRef } from 'react'
import { getColumnForNumber } from '../gameLogic.js'

const COL_COLORS = {
    B: '#60a5fa',
    I: '#a78bfa',
    N: '#fbbf24',
    G: '#34d399',
    O: '#fb7185',
}

const MINI = [
    { cx: 76, cy: 72, r: 9, color: '#60a5fa' },
    { cx: 116, cy: 67, r: 8, color: '#fb7185' },
    { cx: 98, cy: 96, r: 11, color: '#34d399' },
    { cx: 70, cy: 112, r: 8, color: '#fbbf24' },
    { cx: 125, cy: 108, r: 9, color: '#a78bfa' },
    { cx: 88, cy: 128, r: 7, color: '#f97316' },
    { cx: 56, cy: 96, r: 7, color: '#60a5fa' },
]

// ─────────────────────────────────────────────────────────────────────────────

function TombolaAnimation({ lastCalled, calledCount }) {
    const [phase, setPhase] = useState('idle')
    const [shownNum, setShownNum] = useState(null)
    const [shownCol, setShownCol] = useState('')
    const prevCount = useRef(0)
    const timers = useRef([])

    const kill = () => { timers.current.forEach(clearTimeout); timers.current = [] }
    const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.current.push(t) }

    useEffect(() => {
        if (calledCount === 0) {
            prevCount.current = 0
            kill()
            setPhase('idle')
            setShownNum(null)
            return
        }
        if (calledCount > prevCount.current) {
            prevCount.current = calledCount
            kill()

            setPhase('spinning')

            later(() => {
                setShownNum(lastCalled)
                setShownCol(getColumnForNumber(lastCalled))
                setPhase('ejecting')
            }, 850)

            later(() => setPhase('settled'), 1250)
        }
        return kill
    }, [calledCount, lastCalled])

    useEffect(() => () => kill(), [])

    const color = shownCol ? COL_COLORS[shownCol] : '#a78bfa'
    const showBall = phase === 'ejecting' || phase === 'settled'

    return (
        <div className={`tombola-wrap tombola-${phase}`}>
            <svg className="tombola-svg" viewBox="0 0 200 200" fill="none">
                <defs>
                    <radialGradient id="tDrum" cx="38%" cy="32%" r="62%">
                        <stop offset="0%" stopColor="#1a1060" />
                        <stop offset="100%" stopColor="#08051a" />
                    </radialGradient>
                    <filter id="tGlow">
                        <feGaussianBlur stdDeviation="2.5" result="b" />
                        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                </defs>

                <rect x="86" y="178" width="28" height="9" rx="4" fill="#2d1b69" stroke="#6d28d9" strokeWidth="1.5" />
                <rect x="74" y="185" width="52" height="7" rx="3" fill="#1e1060" stroke="#5b21b6" strokeWidth="1" />
                <path d="M 90 177 L 87 195 Q 100 200 113 195 L 110 177" fill="#0a0720" stroke="#7c3aed" strokeWidth="2" />
                <ellipse cx="100" cy="96" rx="80" ry="82" fill="url(#tDrum)" stroke="#7c3aed" strokeWidth="3" />

                <g className="t-bars">
                    {[0, 26, 52, 78, 104, 130, 156].map(a => (
                        <line key={a}
                            x1="100" y1="14" x2="100" y2="178"
                            stroke="rgba(139,92,246,0.5)" strokeWidth="1.8"
                            transform={`rotate(${a},100,96)`}
                        />
                    ))}
                    <ellipse cx="100" cy="56" rx="73" ry="17" stroke="rgba(139,92,246,0.4)" strokeWidth="1.4" />
                    <ellipse cx="100" cy="96" rx="79" ry="8" stroke="rgba(139,92,246,0.3)" strokeWidth="1.2" />
                    <ellipse cx="100" cy="136" rx="70" ry="17" stroke="rgba(139,92,246,0.4)" strokeWidth="1.4" />
                </g>

                {MINI.map((b, i) => (
                    <circle key={i} cx={b.cx} cy={b.cy} r={b.r}
                        fill={b.color} filter="url(#tGlow)" opacity="0.82" />
                ))}
            </svg>

            {showBall && (
                <div
                    className={`t-ball t-ball-${phase}`}
                    style={{
                        background: `radial-gradient(circle at 36% 32%, #ffffffaa 0%, ${color}dd 50%, ${color} 100%)`,
                        boxShadow: `0 0 28px ${color}99, 0 0 60px ${color}44, inset 0 -4px 10px rgba(0,0,0,0.35)`,
                        borderColor: `${color}88`,
                    }}
                >
                    <span className="t-ball-col">{shownCol}</span>
                    <span className="t-ball-num">{shownNum}</span>
                </div>
            )}
        </div>
    )
}

export default TombolaAnimation
