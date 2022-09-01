import React from "react";
import classnames from "classnames";
import { UIKIT } from "components";
import ImagePlaceholder from "assets/image-placeholder.svg"
import * as Icons from "components/icons";
import * as Utils from "utils";

type CustomProps = {
    id: string;
    className?: string;
    imageSrc?: string;
    imageAlt?: string;
    name?: string;
    price?: string;
    orderLimitTime?: number;
    onAddButtonClick?: (id: string) => void;
};

type PropsType = CustomProps & Omit<React.ComponentProps<'div'>, keyof CustomProps>


export const Product = (props: PropsType) => {

    const {
        id,
        className,
        imageSrc,
        imageAlt = "",
        name = "",
        price = "",
        orderLimitTime = 0,
        onAddButtonClick,
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
            data-testid={`product-${id}`}
            className={rootClassName}
            {...rest}>
            <div className={imageWrapperClassName}>
                <img src={imageSrc ?? ImagePlaceholder} alt={imageAlt} />
                <div className={chipClassName}>
                    <Icons.Time />{`${Utils.Date.secondsToMinutes(orderLimitTime)} min`}
                </div>
            </div>
            <div className={detailsWrapperClassName}>
                <h3 className={nameClassName}>{name}</h3>
                <h4 className={priceClassName}>{`$ ${price} `}<strong>USD</strong></h4>
                <UIKIT.Button
                    data-testid={`addProductButton-${id}`}
                    onClick={() => onAddButtonClick?.(id)}
                    className={buttonClassName}>
                    Add to basket
                </UIKIT.Button>
            </div>
        </UIKIT.Card>
    );
};