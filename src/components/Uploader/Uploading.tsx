import React, { useEffect, useState } from "react";

const Uploading = () => {
    const [progress, setProgress] = useState(0);
    const [reverse, setReverse] = useState(false);
    const duration = 100;

    useEffect(() => {
        const intervalId = setInterval(() => {
            setProgress(prev => {
                if (prev + 10 === 100) setReverse(true);
                if (prev - 10 === 0) setReverse(false);
                return reverse ? prev - 10 : prev + 10;
            });
        }, duration);

        return () => clearInterval(intervalId);
    }, [reverse]);

    return (
        <div className="Uploading-image">
            <p className="label">Uploading...</p>
            <div className="progress">
                <div
                    className="inner"
                    style={{ marginLeft: progress * 2.4 }}
                    data-duration={duration}
                />
            </div>
        </div>
    );
};

export default Uploading;
