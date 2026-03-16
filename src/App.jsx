import React, { useState, useCallback, useEffect, useRef } from 'react'
import CallerPanel from './components/CallerPanel.jsx'
import NumberBoard from './components/NumberBoard.jsx'
import WinnerModal from './components/WinnerModal.jsx'
import GameTypeModal from './components/GameTypeModal.jsx'
import GameTypeBadge from './components/GameTypeBadge.jsx'
import { generateAllNumbers, shuffle, getColumnForNumber } from './gameLogic.js'
import altecLogo from '/altec-logo.png'

const COL_COLORS = {
    B: '#60a5fa', I: '#a78bfa', N: '#fbbf24', G: '#34d399', O: '#fb7185',
}

// How long until the ball "settles" and the board gets highlighted
// Keep in sync with the ejecting → settled transition in TombolaAnimation (850ms spin + 400ms eject)
const BOARD_REVEAL_DELAY = 1300

function createGame() {
    return {
        bag: shuffle(generateAllNumbers()),
        called: [],        // drives tombola animation immediately
        showBingo: false,
    }
}

function App() {
    const [game, setGame] = useState(() => createGame())
    // Delayed version of `called` — only updated after the ball animation settles
    const [boardCalled, setBoardCalled] = useState([])
    const timerRef = useRef(null)

    // null = show modal, object = selected game type
    const [gameType, setGameType] = useState(null)

    // Whenever a new number is called, schedule the board update after the animation
    useEffect(() => {
        if (game.called.length === 0) {
            // Reset (new game)
            clearTimeout(timerRef.current)
            setBoardCalled([])
            return
        }
        clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
            setBoardCalled([...game.called])
        }, BOARD_REVEAL_DELAY)

        return () => clearTimeout(timerRef.current)
    }, [game.called])

    const boardSet = new Set(boardCalled)
    // lastCalled for the board highlight uses boardCalled so it matches the board reveal
    const lastCalledOnBoard = boardCalled[boardCalled.length - 1] ?? null
    const recent = [...boardCalled].reverse().slice(0, 12)

    const lastCalled = game.called[game.called.length - 1] ?? null

    const handleCall = useCallback(() => {
        setGame(prev => {
            if (prev.bag.length === 0) return prev
            const [next, ...restBag] = prev.bag
            return { ...prev, bag: restBag, called: [...prev.called, next] }
        })
    }, [])

    const handleReset = useCallback(() => {
        clearTimeout(timerRef.current)
        setBoardCalled([])
        setGame(createGame())
        // Show game type selector again for the new game
        setGameType(null)
    }, [])

    const handleBingo = useCallback(() => {
        setGame(prev => ({ ...prev, showBingo: true }))
    }, [])

    const handleCloseBingo = useCallback(() => {
        setGame(prev => ({ ...prev, showBingo: false }))
    }, [])

    return (
        <div className="app">
            {/* Titlebar (macOS drag region) */}
            <div className="titlebar">
                <span className="titlebar-logo">🎱 BINGO</span>
            </div>

            {/* Main layout */}
            <div className="main-area">
                {/* Left: Caller panel */}
                <CallerPanel
                    calledNumbers={game.called}
                    bag={game.bag}
                    onCall={handleCall}
                    onReset={handleReset}
                    onBingo={handleBingo}
                />

                {/* Right: 75-number board — updated AFTER animation settles */}
                <div className="board-area">
                    <div className="board-area-header">
                        <h1 className="board-title">B I N G O</h1>
                        <p className="board-subtitle">¡El clásico juego de suerte!</p>
                    </div>
                    <NumberBoard calledSet={boardSet} lastCalled={lastCalledOnBoard} />
                </div>

                {/* Right panel: Game type visual display and history */}
                <div className="right-panel">
                    {gameType && <GameTypeBadge gameType={gameType} />}

                    {/* Recent numbers */}
                    <div className="history-card">
                        <div className="history-title">Últimos números</div>
                        <div className="history-numbers">
                            {recent.length === 0 && <span className="history-empty">Sin números aún</span>}
                            {recent.map((num, idx) => {
                                const col = getColumnForNumber(num)
                                const color = COL_COLORS[col]
                                return (
                                    <div
                                        key={num}
                                        className={`history-chip ${idx === 0 ? 'latest' : ''}`}
                                        title={`${col}${num}`}
                                        style={idx === 0
                                            ? { background: `linear-gradient(135deg,${color}88,${color}cc)`, borderColor: color, boxShadow: `0 0 14px ${color}66`, color: '#fff' }
                                            : { borderColor: `${color}55`, color }}
                                    >
                                        <span className="chip-col">{col}</span>
                                        <span className="chip-num">{num}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* ALTEC Logo - subtle bottom placement */}
                    <div className="altec-logo-container">
                        <span className="altec-text">Desarrollado por</span>
                        <img src={altecLogo} alt="ALTEC" className="altec-logo" />
                    </div>
                </div>
            </div>

            {/* Game type selector — shown at start of every game */}
            {!gameType && (
                <GameTypeModal onSelect={setGameType} />
            )}

            {/* BINGO modal */}
            {game.showBingo && (
                <WinnerModal
                    onNewGame={handleReset}
                    onClose={handleCloseBingo}
                />
            )}
        </div>
    )
}

export default App
