import React from "react";

interface TitleProps {
    title: string;
    classes?: string;
}

const Title: React.FC<TitleProps> = ({ title, classes }) => {
    return (
        <h2
            className={`text-3xl uppercase candal font-extrabold ${classes ? classes : "text-center mb-10"
                }`}
        >
            {title}
        </h2>
    );
};

export default Title;
