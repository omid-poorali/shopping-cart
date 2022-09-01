import React from "react";
import classnames from "classnames";
import { UIKIT, Icons } from "components"
import ImagePlaceholder from "assets/image-placeholder.svg"

type CustomProps = {
    id: string;
    productId: string;
    className?: string;
    imageSrc?: string;
    imageAlt?: string;
    name?: string;
    price?: string;
    onDeleteButtonClick?: (id: string) => void;
};

type PropsType = CustomProps & Omit<React.ComponentProps<'div'>, keyof CustomProps>


export const BasketItem = (props: PropsType) => {

    const {
        id,
        productId,
        className,
        imageSrc,
        imageAlt = "",
        name = "",
        price = "",
        onDeleteButtonClick,
        ...rest
    } = props;

    const rootClassName = classnames("basketItem", className);
    const imageWrapperClassName = "basketItem-imageWrapper";
    const deleteButtonClassName = "basketItem-deleteButton";
    const detailsWrapperClassName = "basketItem-detailsWrapper";
    const nameClassName = "basketItem-name";
    const priceClassName = "basketItem-price";

    return (
        <div
            data-testid={`basketItem-${productId}`}
            className={rootClassName}
            {...rest}>
            <div className={imageWrapperClassName}>
                <img src={imageSrc ?? ImagePlaceholder} alt={imageAlt} />
                <UIKIT.IconButton
                    data-testid={`deleteBasketItem-${productId}`}
                    onClick={() => onDeleteButtonClick?.(id)}
                    className={deleteButtonClassName}
                    color="secondary">
                    <Icons.Trash />
                </UIKIT.IconButton>
            </div>
            <div className={detailsWrapperClassName}>
                <h3 className={nameClassName}>{name}</h3>
                <h4 className={priceClassName}>{`$ ${price} `}<strong>USD</strong></h4>
            </div>
        </div>
    );
};