import React from "react";
import classnames from "classnames";

type CustomProps = {
    className?: string;
    label?: string;
    color?: "primary" | "secondary";
    variant?: "rounded",
    size?: "medium";
    disabled?: boolean;

};

type PropsType = CustomProps & Omit<React.ComponentPropsWithoutRef<'button'>, keyof CustomProps>


export const IconButton = React.forwardRef((props: PropsType, forwardedRef: React.Ref<HTMLButtonElement>) => {

    const {
        className,
        color = "primary",
        variant = "rounded",
        disabled = false,
        size = "medium",
        ...rest
    } = props;

    const buttonClassName = classnames("cuiIconButton",
        `cuiIconButton--${color}`,
        `cuiIconButton--${variant}`,
        `cuiIconButton--${size}`, {
        "cuiIconButton--disabled": disabled
    }, className);

    return (
        <button
            ref={forwardedRef}
            className={buttonClassName}
            disabled={disabled}
            {...rest} />
    );
});