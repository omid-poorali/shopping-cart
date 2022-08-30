import React from "react";
import classnames from "classnames";

type CustomProps = {
    className?: string;
};

type PropsType = CustomProps & Omit<React.ComponentPropsWithoutRef<'div'>, keyof CustomProps>


export const Divider = React.forwardRef((props: PropsType, forwardedRef: React.Ref<HTMLDivElement>) => {

    const {
        className,
        ...rest
    } = props;

    const DividerClassName = classnames("cuiDivider", className);

    return (
        <div
            ref={forwardedRef}
            className={DividerClassName}
            {...rest} />
    );
});