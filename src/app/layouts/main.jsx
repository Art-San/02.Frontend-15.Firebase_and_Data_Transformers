import React from 'react'
import useMockData from '../utils/mockData'

const Main = () => {
    // Инициализация Mock-данных
    const { error, initialize, progress, status } = useMockData()
    const hanleClick = () => {
        initialize()
        console.log('klick')
    }
    return (
        <div className="container mt-5">
            <h1>MainPage</h1>
            <h3>Инициализация данных в fireBase</h3>
            <ul>
                <li>Status: {status}</li>
                <li>Progress: {progress}%</li>
                {error && <li>error: {error}</li>}
            </ul>
            <button className="btn btn-primary" onClick={hanleClick}>
                Инициализировать
            </button>
        </div>
    )
}

export default Main
