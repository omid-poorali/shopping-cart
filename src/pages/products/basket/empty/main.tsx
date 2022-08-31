import React from "react";
import classnames from "classnames";
import { UIKIT } from "components";
import cleanUpImage from "assets/clean-up.svg";

type CustomProps = {
    className?: string;
};

type PropsType = CustomProps & Omit<React.ComponentProps<'div'>, keyof CustomProps>


export const EmptyBasket = (props: PropsType) => {

    const {
        className,
        ...rest
    } = props;

    const rootClassName = classnames("emptyBasket", className);
    const imageClassName = "emptyBasket-image";
    const textClassName = "emptyBasket-text";

    return (
        <UIKIT.Card
            className={rootClassName}
            {...rest}>
            <img className={imageClassName} src={cleanUpImage} alt="clean up" />
            <p className={textClassName}>Your basket is empty</p>
        </UIKIT.Card>
    );
};