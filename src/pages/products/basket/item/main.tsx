import React from "react";
import classnames from "classnames";
import { UIKIT } from "components"
import * as Icons from "components/icons";

type CustomProps = {
    className?: string;
    imageSrc?: string;
    imageAlt?: string;
    title?: string;
    price?: string;
    onButtonClick?: React.MouseEventHandler<HTMLButtonElement>
};

type PropsType = CustomProps & Omit<React.ComponentProps<'div'>, keyof CustomProps>


export const BasketItem = (props: PropsType) => {

    const {
        className,
        imageSrc = "/img/products/mug.webp",
        imageAlt = "Mugr",
        title = "Mugr",
        price = "150.00",
        onButtonClick,
        ...rest
    } = props;

    const rootClassName = classnames("basketItem", className);
    const imageWrapperClassName = "basketItem-imageWrapper";
    const chipClassName = "basketItem-chip";
    const detailsWrapperClassName = "basketItem-detailsWrapper";
    const titleClassName = "basketItem-title";
    const priceClassName = "basketItem-price";
    const buttonClassName = "basketItem-button";

    return (
        <UIKIT.Card
            className={rootClassName}
            {...rest}>
            <div className={imageWrapperClassName}>
                <img src={imageSrc} alt={imageAlt} />
                <div className={chipClassName}>
                    <Icons.Time />2 min
                </div>
            </div>
            <div className={detailsWrapperClassName}>
                <h3 className={titleClassName}>{title}</h3>
                <h4 className={priceClassName}>{`$ ${price} `}<strong>USD</strong></h4>
                <UIKIT.Button onClick={onButtonClick} className={buttonClassName}>Add to basket</UIKIT.Button>
            </div>
        </UIKIT.Card>
    );
};