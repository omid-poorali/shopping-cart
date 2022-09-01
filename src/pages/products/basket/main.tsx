import React from "react";
import { UIKIT } from "components";
import { useBasket } from "application";
import { BasketItem } from "./item";
import { EmptyBasket } from "./empty";

export const Basket = () => {

    const basket = useBasket();

    const handleDeleteButtonClick = (id: string) => {
        basket.removeItem(id);
    }

    // if the basket is empty it will render a placeholder
    if (basket.basketItems.length === 0) {
        return (
            <EmptyBasket />
        )
    }

    const rootClassName = "basket";
    const dividerClassName = "basket-divider";

    return (
        <UIKIT.Card className={rootClassName}>
            {React.Children.toArray(basket.basketItems.map((basketItem, index) => (
                <>
                    {index > 0 && <UIKIT.Divider className={dividerClassName} />}
                    <BasketItem
                        id={basketItem.id}
                        productId={basketItem.productId}
                        name={basketItem.name}
                        price={basketItem.price}
                        imageSrc={basketItem.poster}
                        imageAlt={basketItem.name}
                        onDeleteButtonClick={handleDeleteButtonClick}
                    />
                </>
            )))}
        </UIKIT.Card>
    );
};