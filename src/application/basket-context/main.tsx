import React, { useEffect } from "react";
import { useLocalStorage } from "hooks";
import * as Names from "names";
import * as Utils from "utils";
import * as Models from "models";


type BasketContext = {
    products: Models.BasketItem[];
    add: (product: Models.BasketItem) => void;
    remove: (id: string) => void;
}

const basketContext = React.createContext<BasketContext>({
    products: [],
    add: () => null,
    remove: () => null,
});


type PropsType = {
    children: React.ReactNode;
}



export const BasketProvider = ({ children }: PropsType) => {

    const [products, setProducts] = useLocalStorage<Models.BasketItem[]>(Names.basketStorage, []);

    const add = (product: Models.BasketItem) => {
        setProducts(prevData => prevData.concat(product));
    }

    const remove = (id: string) => {
        setProducts(prevData => prevData.filter(product => product.id !== id));
    }

    return (
        <basketContext.Provider value={{ products, add, remove }}>
            {children}
        </basketContext.Provider>
    );
}

export const useBasket = () => {
    const context = React.useContext(basketContext);
    if (context === undefined) {
        throw new Error("useBasketContext must be used within a BasketProvider");
    }
    return context;
}