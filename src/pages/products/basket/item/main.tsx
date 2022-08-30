import React from "react";
import classnames from "classnames";
import { UIKIT, Icons } from "components"

type CustomProps = {
    className?: string;
    imageSrc?: string;
    imageAlt?: string;
    title?: string;
    price?: string;
};

type PropsType = CustomProps & Omit<React.ComponentProps<'div'>, keyof CustomProps>


export const BasketItem = (props: PropsType) => {

    const {
        className,
        imageSrc = "/img/products/mug.webp",
        imageAlt = "Mugr",
        title = "Mugr",
        price = "150.00",
        ...rest
    } = props;

    const rootClassName = classnames("basketItem", className);
    const imageWrapperClassName = "basketItem-imageWrapper";
    const deleteButtonClassName = "basketItem-deleteButton";
    const detailsWrapperClassName = "basketItem-detailsWrapper";
    const titleClassName = "basketItem-title";
    const priceClassName = "basketItem-price";

    return (
        <div
            className={rootClassName}
            {...rest}>
            <div className={imageWrapperClassName}>
                <img src={imageSrc} alt={imageAlt} />
                <UIKIT.IconButton className={deleteButtonClassName} color="secondary">
                    <Icons.Trash />
                </UIKIT.IconButton>
            </div>
            <div className={detailsWrapperClassName}>
                <h3 className={titleClassName}>{title}</h3>
                <h4 className={priceClassName}>{`$ ${price} `}<strong>USD</strong></h4>
            </div>
        </div>
    );
};