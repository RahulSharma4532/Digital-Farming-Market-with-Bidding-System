import { useState, useEffect } from "react";

const CountdownTimer = ({ endTime }) => {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const calculateTime = () => {
            const now = new Date().getTime();
            const end = new Date(endTime).getTime();
            const distance = end - now;

            if (distance < 0) {
                setTimeLeft("ENDED");
            } else {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                let timeString = "";
                if (days > 0) timeString += `${days}d `;
                if (hours > 0) timeString += `${hours}h `;
                timeString += `${minutes}m ${seconds}s`;

                setTimeLeft(timeString);
            }
        };

        calculateTime();
        const timer = setInterval(calculateTime, 1000);

        return () => clearInterval(timer);
    }, [endTime]);

    return <span>{timeLeft}</span>;
};

export default CountdownTimer;
