import React, { useState, useEffect } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import '../style/CountdownTimer.css'; 

const CountdownTimer = ({ targetDate }) => {
    const getRemainingTime = () => {
        const totalTime = new Date(targetDate).getTime() - new Date().getTime();
        return totalTime / 1000; // Total time in seconds
    };
    const formatTime = (remainingTime) => {
        const days = Math.floor(remainingTime / (60 * 60 * 24));
        const hours = Math.floor((remainingTime % (60 * 60 * 24)) / (60 * 60));
        const minutes = Math.floor((remainingTime % (60 * 60)) / 60);
        const seconds = Math.floor(remainingTime % 60);

        return { days, hours, minutes, seconds };
    };

    const [remainingTime, setRemainingTime] = useState(getRemainingTime);

    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime(getRemainingTime());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const { days, hours, minutes, seconds } = formatTime(remainingTime);
    return (
        <div className="countdown-timer">
            <div className="timer-circle">
                <CountdownCircleTimer
                    isPlaying
                    duration={remainingTime}
                    colors={["#004777"]}
                    colorsTime={[0]}
                    size={80}
                    strokeWidth={8}
                    initialRemainingTime={remainingTime}
                >
                    {() => <div className="value">{days}</div>}
                </CountdownCircleTimer>
                <div className="label">Days</div>
            </div>
            <div className="timer-circle">
                <CountdownCircleTimer
                    isPlaying
                    duration={24 * 60 * 60}
                    colors={["#004777"]}
                    colorsTime={[0]}
                    size={80}
                    strokeWidth={8}
                    initialRemainingTime={hours * 3600}
                >
                    {() => <div className="value">{hours}</div>}
                </CountdownCircleTimer>
                <div className="label">Hours</div>
            </div>
            <div className="timer-circle">
                <CountdownCircleTimer
                    isPlaying
                    duration={60 * 60}
                    colors={["#004777"]}
                    colorsTime={[0]}
                    size={80}
                    strokeWidth={8}
                    initialRemainingTime={minutes * 60}
                >
                    {() => <div className="value">{minutes}</div>}
                </CountdownCircleTimer>
                <div className="label">Minutes</div>
            </div>
            <div className="timer-circle">
                <CountdownCircleTimer
                    isPlaying
                    duration={60}
                    colors={["#004777"]}
                    colorsTime={[0]}
                    size={80}
                    strokeWidth={8}
                    initialRemainingTime={seconds}
                >
                    {() => <div className="value">{seconds}</div>}
                </CountdownCircleTimer>
                <div className="label">Seconds</div>
            </div>
        </div>
    );
};

export default CountdownTimer;
