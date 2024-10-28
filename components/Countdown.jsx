"use client"

import React, { useEffect, useState } from 'react'
import "../public/css/animekai-main.css";

export default function AnimeCountdown({ releaseDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const release = new Date(releaseDate).getTime()
      const difference = release - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        setIsFinished(true)
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [releaseDate])

  return (
    <div className="countdown">
      <h3 className="title">Cuenta Regresiva para el Estreno</h3>
      <div className="countdownTime">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="timeUnit">
            <div className="timeValue">
              <span className="number">{value}</span>
              <span className="pulse"></span>
            </div>
            <span className="label">{unit}</span>
          </div>
        ))}
      </div>
      {isFinished && <div className="finishedMessage">¡El estreno ha llegado!</div>}
    </div>
  )
}