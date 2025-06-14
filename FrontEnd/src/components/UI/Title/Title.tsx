import React from "react";

interface TitleProps {
  title: React.ReactNode;
}

function Title({ title, classes }: TitleProps) {
  return (
    <h2
      className={`text-3xl uppercase candal font-extrabold  ${
        classes ? classes : "text-center mb-10"
      }`}
    >
      {title}
    </h2>
  );
}

export default Title;