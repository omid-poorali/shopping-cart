import React, { useEffect, useState } from "react";
import { Product } from "./product";
import { Basket } from "./basket";
import * as Models from "models";
import * as APIs from "apis";

export const Products = () => {

    const [products, setProducts] = useState<Models.Product[]>([]);

    useEffect(() => {
        APIs.product().getProducts().then(products => {
            setProducts(products)
        })
    }, []);

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
                        name={product.name}
                        price={product.price}
                        imageSrc={product.poster}
                        imageAlt={product.name}
                    />
                )))}
            </div>
            <div className={asideClassName}>
                <Basket />
            </div>
        </div>
    )
}