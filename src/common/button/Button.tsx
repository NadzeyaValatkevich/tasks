import style from "./Button.module.css";
import React from "react";

type PropsButtonType = {
    onClick: () => void,
    styleBtn: string,
    title: string
};

export const Button = ({onClick, styleBtn, title }: PropsButtonType) => {
    return <button onClick={onClick}
                   className={styleBtn === 'activeFilter' ? `${style.activeFilter} ${style.button}` : style.button}>{title}
    </button>
};
