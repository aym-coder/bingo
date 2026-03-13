import React from 'react'

function WinnerModal({ onNewGame, onClose }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-card" onClick={e => e.stopPropagation()}>
                <div className="modal-confetti">
                    {['🎊', '🎉', '🏆', '🎊', '🎉'].map((e, i) => (
                        <span key={i} className="confetti-piece" style={{ animationDelay: `${i * 0.15}s` }}>{e}</span>
                    ))}
                </div>
                <div className="modal-trophy">🏆</div>
                <div className="modal-title">¡BINGO!</div>
                <p className="modal-winner">
                    ¡Alguien ganó la partida!
                </p>
                <div className="modal-buttons">
                    <button className="btn btn-primary" onClick={onNewGame}>
                        🎲 Nueva Partida
                    </button>
                    <button className="btn btn-secondary" onClick={onClose}>
                        Continuar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WinnerModal
