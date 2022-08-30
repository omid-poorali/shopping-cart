import React from "react";
import classnames from "classnames";
import { Card } from "../card";
import cleanUpImage from "assets/cleanUp.svg";

type CustomProps = {
    className?: string;
};

type PropsType = CustomProps & Omit<React.ComponentProps<'div'>, keyof CustomProps>


export const EmptyBasket = (props: PropsType) => {

    const {
        className,
        ...rest
    } = props;

    const rootClassName = classnames("cuiEmptyBasket", className);
    const imageClassName = "cuiEmptyBasket-image";
    const textClassName = "cuiEmptyBasket-text";

    return (
        <Card
            className={rootClassName}
            {...rest}>
            <img className={imageClassName} src={cleanUpImage} alt="clean up" />
            <p className={textClassName}>Your basket is empty</p>
        </Card>
    );
};