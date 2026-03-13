import React from 'react'
import { COLUMNS_LIST, RANGES_MAP } from '../gameLogic.js'

const COL_COLORS = {
    B: { color: '#60a5fa', glow: 'rgba(96,165,250,0.6)' },
    I: { color: '#a78bfa', glow: 'rgba(167,139,250,0.6)' },
    N: { color: '#fbbf24', glow: 'rgba(251,191,36,0.6)' },
    G: { color: '#34d399', glow: 'rgba(52,211,153,0.6)' },
    O: { color: '#fb7185', glow: 'rgba(251,113,133,0.6)' },
}

function NumberBoard({ calledSet, lastCalled }) {
    return (
        <div className="number-board">
            {/* Column headers */}
            <div className="nb-header-row">
                {COLUMNS_LIST.map(col => (
                    <div
                        key={col}
                        className="nb-col-header"
                        style={{ color: COL_COLORS[col].color }}
                    >
                        {col}
                    </div>
                ))}
            </div>

            {/* Numbers grid: 5 cols × 15 rows */}
            <div className="nb-grid">
                {COLUMNS_LIST.map(col => {
                    const [min, max] = RANGES_MAP[col]
                    const nums = []
                    for (let n = min; n <= max; n++) nums.push(n)
                    return (
                        <div key={col} className="nb-column">
                            {nums.map(num => {
                                const isCalled = calledSet.has(num)
                                const isLatest = num === lastCalled
                                return (
                                    <div
                                        key={num}
                                        className={`nb-cell ${isCalled ? 'nb-called' : 'nb-normal'} ${isLatest ? 'nb-latest' : ''}`}
                                        style={isCalled ? {
                                            background: `linear-gradient(135deg, ${COL_COLORS[col].color}33, ${COL_COLORS[col].color}66)`,
                                            borderColor: COL_COLORS[col].color,
                                            boxShadow: isLatest ? `0 0 18px ${COL_COLORS[col].glow}` : `0 0 8px ${COL_COLORS[col].glow}44`,
                                            color: COL_COLORS[col].color,
                                        } : {}}
                                    >
                                        {num}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default NumberBoard
