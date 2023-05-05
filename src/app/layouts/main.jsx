import React from 'react'
import useMockData from '../utils/mockData'
<<<<<<< HEAD
const Main = () => {
    const { error, initialize, progress, status } = useMockData()
    const handleClick = () => {
        initialize()
    }
    return (
        <div className="container mt-5">
            <h1> Main Page</h1>
            <h3>Инициализация данных в FireBase</h3>
=======

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
>>>>>>> 06.Initialize_Mock_Data
            <ul>
                <li>Status: {status}</li>
                <li>Progress: {progress}%</li>
                {error && <li>error: {error}</li>}
            </ul>
<<<<<<< HEAD
            <button className="btn btn-primary" onClick={handleClick}>
=======
            <button className="btn btn-primary" onClick={hanleClick}>
>>>>>>> 06.Initialize_Mock_Data
                Инициализировать
            </button>
        </div>
    )
}

export default Main
