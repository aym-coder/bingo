import React from 'react'

const BINGO_COLS = ['B', 'I', 'N', 'G', 'O']

/**
 * Mini 5×5 bingo card that highlights cells matching the game type pattern.
 * pattern: boolean[5][5]  (row 0 = top, col 0 = B)
 */
function PatternGrid({ pattern, color }) {
    return (
        <div className="pg-wrap">
            {/* Column headers */}
            <div className="pg-headers">
                {BINGO_COLS.map(l => (
                    <div key={l} className="pg-header">{l}</div>
                ))}
            </div>
            {/* Cells */}
            <div className="pg-grid">
                {pattern.map((row, r) =>
                    row.map((active, c) => (
                        <div
                            key={`${r}-${c}`}
                            className={`pg-cell ${active ? 'pg-active' : ''}`}
                            style={active ? {
                                background: `radial-gradient(circle at 35% 32%, #ffffff44 0%, ${color}cc 60%, ${color} 100%)`,
                                boxShadow: `0 0 8px ${color}88`,
                                borderColor: `${color}`,
                            } : {}}
                        >
                            {/* FREE center */}
                            {r === 2 && c === 2 && (
                                <span className="pg-free">★</span>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

/**
 * Large in-game display of the selected game type.
 */
function GameTypeBadge({ gameType }) {
    if (!gameType) return null
    return (
        <div className="gtb-card" style={{ '--gt-color': gameType.color }}>
            <div className="gtb-header">
                <div className="gtb-icon-wrap">
                    <span className="gtb-icon">{gameType.icon}</span>
                </div>
                <div className="gtb-info">
                    <span className="gtb-label">Tipo de juego</span>
                    <span className="gtb-name">{gameType.name}</span>
                    <span className="gtb-desc">{gameType.desc}</span>
                </div>
            </div>
            <PatternGrid pattern={gameType.pattern} color={gameType.color} />
        </div>
    )
}

export default GameTypeBadge
