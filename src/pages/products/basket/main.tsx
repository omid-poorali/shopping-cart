import { UIKIT } from "components";
import { useBasket } from "application";
import { BasketItem } from "./item";
import React from "react";
import { EmptyBasket } from "./empty";


export const Basket = () => {

    const basket = useBasket();

    const handleOnDeleteIconClick = (id: string) => {
        basket.remove(id);
    }

    // if basket is empty
    if (basket.products.length === 0) {
        return (
            <EmptyBasket />
        )
    }

    const rootClassName = "basket";
    const dividerClassName = "basket-divider";

    return (
        <UIKIT.Card className={rootClassName}>
            {React.Children.toArray(basket.products.map((product, index) => (
                <>
                    {index > 0 && <UIKIT.Divider className={dividerClassName} />}
                    <BasketItem
                        name={product.name}
                        price={product.price}
                        imageSrc={product.poster}
                        imageAlt={product.name}
                        onDeleteIconClick={() => handleOnDeleteIconClick(product.id)}
                    />
                </>
            )))}
        </UIKIT.Card>
    );
};