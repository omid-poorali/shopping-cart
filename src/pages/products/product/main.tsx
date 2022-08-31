import React from "react";
import classnames from "classnames";
import { UIKIT } from "components"
import * as Icons from "components/icons";

type CustomProps = {
    className?: string;
    imageSrc?: string;
    imageAlt?: string;
    name?: string;
    price?: string;
    onButtonClick?: React.MouseEventHandler<HTMLButtonElement>
};

type PropsType = CustomProps & Omit<React.ComponentProps<'div'>, keyof CustomProps>


export const Product = (props: PropsType) => {

    const {
        className,
        imageSrc = "/img/products/mug.webp",
        imageAlt = "Mugr",
        name = "Mugr",
        price = "150.00",
        onButtonClick,
        ...rest
    } = props;

    const rootClassName = classnames("product", className);
    const imageWrapperClassName = "product-imageWrapper";
    const chipClassName = "product-chip";
    const detailsWrapperClassName = "product-detailsWrapper";
    const nameClassName = "product-name";
    const priceClassName = "product-price";
    const buttonClassName = "product-button";

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
                <h3 className={nameClassName}>{name}</h3>
                <h4 className={priceClassName}>{`$ ${price} `}<strong>USD</strong></h4>
                <UIKIT.Button onClick={onButtonClick} className={buttonClassName}>Add to basket</UIKIT.Button>
            </div>
        </UIKIT.Card>
    );
};