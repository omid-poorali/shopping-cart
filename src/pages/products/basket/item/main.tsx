import React from "react";
import classnames from "classnames";
import { UIKIT, Icons } from "components"

type CustomProps = {
    className?: string;
    imageSrc?: string;
    imageAlt?: string;
    name?: string;
    price?: string;
    onDeleteIconClick?: React.MouseEventHandler<HTMLButtonElement>;
};

type PropsType = CustomProps & Omit<React.ComponentProps<'div'>, keyof CustomProps>


export const BasketItem = (props: PropsType) => {

    const {
        className,
        imageSrc = "/img/products/mug.webp",
        imageAlt = "Mugr",
        name = "Mugr",
        price = "150.00",
        onDeleteIconClick,
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
            className={rootClassName}
            {...rest}>
            <div className={imageWrapperClassName}>
                <img src={imageSrc} alt={imageAlt} />
                <UIKIT.IconButton onClick={onDeleteIconClick} className={deleteButtonClassName} color="secondary">
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