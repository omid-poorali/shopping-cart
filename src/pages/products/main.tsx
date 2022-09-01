import React, { useEffect, useState } from "react";
import { useBasket } from "application";
import { Product } from "./product";
import { Basket } from "./basket";
import { v4 as uuidv4 } from 'uuid';
import * as Utils from "utils";
import * as Models from "models";
import * as APIs from "apis";

export const Products = () => {

    const [products, setProducts] = useState<Models.Product[]>([]);
    const basket = useBasket();

    useEffect(() => {
        APIs.product().getProducts().then(products => {
            setProducts(products)
        })
    }, []);


    const handleAddButtonClick = (productId: string) => {
        const target = products.find(product => product.id === productId);
        if (target) {
            basket.addItem({
                id: uuidv4(),
                productId: target.id,
                name: target.name,
                poster: target.poster,
                price: target.price,
                expiredAt: Utils.Date.getUnixTime() + target.orderLimitTime
            });
        }
    }


    const rootClassName = "products";
    const wrapperClassName = "products-wrapper";
    const itemClassName = "products-item";
    const asideClassName = "products-aside";

    return (
        <div className={rootClassName}>
            <div className={wrapperClassName}>
                {React.Children.toArray(products.map(product => (
                    <Product
                        className={itemClassName}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        imageSrc={product.poster}
                        imageAlt={product.name}
                        orderLimitTime={product.orderLimitTime}
                        onAddButtonClick={handleAddButtonClick}
                    />
                )))}
            </div>
            <div className={asideClassName}>
                <Basket />
            </div>
        </div>
    )
}