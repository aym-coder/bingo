import React from 'react'

// 5×5 grid: true = highlighted cell
// Row 0 = top, Row 4 = bottom | Col 0 = left, Col 4 = right
function makeGrid(fn) {
    return Array.from({ length: 5 }, (_, r) =>
        Array.from({ length: 5 }, (_, c) => fn(r, c))
    )
}

export const GAME_TYPES = [
    {
        id: 'cuaterna',
        name: 'Cuaterna',
        icon: '▬',
        desc: 'Linea completa, 4 esquinas mata todo',
        color: '#60a5fa',
        // Any complete row (show 1 full row as example)
        pattern: makeGrid((r, c) => r === 2),
    },
    {
        id: 'L',
        name: 'L',
        icon: 'L',
        desc: 'Forma de L en el cartón',
        color: '#34d399',
        // Left column + bottom row
        pattern: makeGrid((r, c) => c === 0 || r === 4),
    },
    {
        id: 'carton',
        name: 'Cartón lleno',
        icon: '▦',
        desc: 'Todos los números del cartón',
        color: '#f59e0b',
        pattern: makeGrid(() => true),
    },
    {
        id: 'X',
        name: 'X',
        icon: '✕',
        desc: 'Las dos diagonales del cartón',
        color: '#fb7185',
        // Both diagonals
        pattern: makeGrid((r, c) => r === c || r + c === 4),
    },
    {
        id: 'O',
        name: 'O',
        icon: '○',
        desc: 'El borde completo del cartón',
        color: '#a78bfa',
        // Border only
        pattern: makeGrid((r, c) => r === 0 || r === 4 || c === 0 || c === 4),
    },
]

function GameTypeModal({ onSelect }) {
    return (
        <div className="gt-overlay">
            <div className="gt-card">
                <div className="gt-title">🎱 Nueva Partida</div>
                <p className="gt-subtitle">Elige el tipo de juego</p>

                <div className="gt-options">
                    {GAME_TYPES.map(g => (
                        <button
                            key={g.id}
                            className="gt-option"
                            style={{ '--gt-color': g.color }}
                            onClick={() => onSelect(g)}
                        >
                            <span className="gt-icon">{g.icon}</span>
                            <span className="gt-name">{g.name}</span>
                            <span className="gt-desc">{g.desc}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default GameTypeModal
