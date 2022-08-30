import React from "react";
import classnames from "classnames";
import { Card, Button } from "components"
import * as icons from "../icons";

type CustomProps = {
    className?: string;
    imageSrc?: string;
    imageAlt?: string;
    title?: string;
    price?: string;
    onButtonClick?: React.MouseEventHandler<HTMLButtonElement>
};

type PropsType = CustomProps & Omit<React.ComponentProps<'div'>, keyof CustomProps>


export const Basket = (props: PropsType) => {

    const {
        className,
        imageSrc = "/img/products/mug.webp",
        imageAlt = "Mugr",
        title = "Mugr",
        price = "150.00",
        onButtonClick,
        ...rest
    } = props;

    const rootClassName = classnames("cuiBasket", className);
    const imageWrapperClassName = "cuiBasket-imageWrapper";
    const chipClassName = "cuiBasket-chip";
    const detailsWrapperClassName = "cuiBasket-detailsWrapper";
    const titleClassName = "cuiBasket-title";
    const priceClassName = "cuiBasket-price";
    const buttonClassName = "cuiBasket-button";

    return (
        <Card
            className={rootClassName}
            {...rest}>
            <div className={imageWrapperClassName}>
                <img src={imageSrc} alt={imageAlt} />
                <div className={chipClassName}>
                    <icons.Time />2 min
                </div>
            </div>
            <div className={detailsWrapperClassName}>
                <h3 className={titleClassName}>{title}</h3>
                <h4 className={priceClassName}>{`$ ${price} `}<strong>USD</strong></h4>
                <Button onClick={onButtonClick} className={buttonClassName}>Add to basket</Button>
            </div>
        </Card>
    );
};