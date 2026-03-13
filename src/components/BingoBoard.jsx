import React from 'react'
import { COLUMNS_LIST } from '../gameLogic.js'

function BingoBoard({ player, board, calledSet, winnerCells, isWinner }) {
    const winSet = new Set(winnerCells.map(([c, r]) => `${c}-${r}`))

    return (
        <div className={`board-container ${isWinner ? 'board-winner' : ''}`}
            style={isWinner ? { borderColor: 'var(--accent-gold)', boxShadow: 'var(--glow-gold)' } : {}}>
            <div className="board-header">
                <span className="board-id">🎴 {player}</span>
                {isWinner && <span className="board-winner-badge">🏆 ¡BINGO!</span>}
            </div>

            {/* Column headers */}
            <div className="bingo-header-row">
                {COLUMNS_LIST.map(col => (
                    <div key={col} className={`bingo-col-header ${col}`}>{col}</div>
                ))}
            </div>

            {/* Grid: board[col][row], render by rows */}
            <div className="bingo-grid">
                {[0, 1, 2, 3, 4].map(row =>
                    [0, 1, 2, 3, 4].map(col => {
                        const isFree = col === 2 && row === 2
                        const num = isFree ? null : board[col][row]
                        const isCalled = isFree || calledSet.has(num)
                        const isWinCell = winSet.has(`${col}-${row}`)

                        return (
                            <div
                                key={`${col}-${row}`}
                                className={`bingo-cell ${isFree ? 'free' :
                                        isWinCell ? 'winner-cell' :
                                            isCalled ? 'called' : 'normal'
                                    }`}
                            >
                                {isFree ? 'FREE' : num}
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default BingoBoard
