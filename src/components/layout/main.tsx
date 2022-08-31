import React from "react";

type PropsType = {
    children?: React.ReactNode;
};

export const Main = (props: PropsType) => {
    return (
        <main className="cuiMainLayout">{props.children}</main>
    )
};