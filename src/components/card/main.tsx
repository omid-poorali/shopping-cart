import React from "react";
import classnames from "classnames";

type CustomProps = {
    className?: string;
};

type PropsType = CustomProps & Omit<React.ComponentProps<'div'>, keyof CustomProps>


export const Card = (props: PropsType) => {

    const {
        className,
        ...rest
    } = props;

    const buttonClassName = classnames("cuiCard", className);

    return (
        <div
            className={buttonClassName}
            {...rest} >
        </div>
    );
};