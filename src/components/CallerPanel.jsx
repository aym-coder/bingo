import React from 'react'
import TombolaAnimation from './TombolaAnimation.jsx'

function CallerPanel({ calledNumbers, bag, onCall, onReset, onBingo }) {
    const lastNum = calledNumbers[calledNumbers.length - 1] ?? null

    return (
        <div className="caller-panel">
            {/* Parroquia Logo */}
            <div className="parroquia-logo-container">
                <img src="/logo.jpg" alt="Parroquia San Isidro Labrador" className="parroquia-logo" />
            </div>

            {/* Tombola animation */}
            <TombolaAnimation lastCalled={lastNum} calledCount={calledNumbers.length} />

            {/* Stats */}
            <div className="stats-card">
                <div className="stat-item">
                    <div className="stat-value" style={{ color: 'var(--accent-gold)' }}>{calledNumbers.length}</div>
                    <div className="stat-label">Cantados</div>
                </div>
                <div className="stat-item">
                    <div className="stat-value" style={{ color: 'var(--accent-green)' }}>{bag.length}</div>
                    <div className="stat-label">Restantes</div>
                </div>
            </div>

            {/* Call button */}
            <button
                className="btn btn-primary btn-call"
                onClick={onCall}
                disabled={bag.length === 0}
            >
                {bag.length === 0 ? '🎉 ¡Todos cantados!' : '🎲 Cantar Número'}
            </button>

            {/* BINGO button */}
            <button
                className="btn btn-bingo"
                onClick={onBingo}
                disabled={calledNumbers.length === 0}
            >
                🎉 ¡BINGO!
            </button>

            {/* Reset */}
            <button className="btn btn-secondary" onClick={onReset}>🔄 Nueva Partida</button>

            {/* Exit App */}
            {window.electronAPI && (
                <button
                    className="btn btn-danger"
                    onClick={() => window.electronAPI.quitApp()}
                    style={{ marginTop: 'auto', background: 'transparent', border: '1px solid var(--danger)' }}
                >
                    ❌ Salir del Bingo
                </button>
            )}
        </div>
    )
}

export default CallerPanel
