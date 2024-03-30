import { useEffect, useState } from "react";

function dateDiff(startDate: Date, endDate: Date): string {
    const diffInMilliseconds = Math.abs(endDate.getTime() - startDate.getTime());

    const days = Math.floor(diffInMilliseconds / (24 * 60 * 60 * 1000));
    const hours = Math.floor((diffInMilliseconds % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((diffInMilliseconds % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((diffInMilliseconds % (60 * 1000)) / 1000);
    const milliseconds = diffInMilliseconds % 1000;

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");
    const formattedMilliseconds = milliseconds.toString().padStart(3, "0");

    return `${days} DAYS ${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
}
export default function ({ date }: { date: Date }) {
    const [curDate, SetDate] = useState<Date>(new Date());
    useEffect(() => {
        function animation() {
            requestAnimationFrame(animation);

            SetDate(new Date());
        }
        requestAnimationFrame(animation);
    }, []);
    return (
        <h1
            style={{
                fontFamily:
                    "Roboto,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif",
                fontWeight: 100,
                marginTop: "0px",
                marginBottom: "0px",
                translate: "0px -20px",
            }}
        >
            {dateDiff(date, curDate)}
        </h1>
    );
}
