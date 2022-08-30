import React from "react";
import classnames from "classnames";

type CustomProps = {
    className?: string;
};

type PropsType = CustomProps & Omit<React.ComponentProps<"main">, keyof CustomProps>

export const Desktop = (props: PropsType) => {

    const {
        className,
        ...rest
    } = props;

    const rootClassName = classnames("cuiMainLayout", className);

    return (
        <main className={rootClassName} {...rest} />
    )
};