import React from "react";
import classnames from "classnames";

type CustomProps = {
    className?: string;
    label?: string;
    color?: "primary";
    size?: "medium";
    disabled?: boolean;

};

type PropsType = CustomProps & Omit<React.ComponentPropsWithoutRef<'button'>, keyof CustomProps>


export const Button = React.forwardRef((props: PropsType, forwardedRef: React.Ref<HTMLButtonElement>) => {

    const {
        className,
        color = "primary",
        disabled = false,
        size = "medium",
        ...rest
    } = props;

    const buttonClassName = classnames("cuiButton", `cuiButton--${color}`, `cuiButton--${size}`, {
        "cuiButton--disabled": disabled
    }, className);

    return (
        <button
            ref={forwardedRef}
            className={buttonClassName}
            disabled={disabled}
            {...rest} />
    );
});