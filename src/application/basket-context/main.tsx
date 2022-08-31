import React, { useEffect, useRef } from "react";
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

    const checkExpirationIntervalRef = useRef<NodeJS.Timer | null>();
    const [products, setProducts] = useLocalStorage<Models.BasketItem[]>(Names.basketStorage, []);

    useEffect(() => {
        if (!checkExpirationIntervalRef.current) {
            checkExpirationIntervalRef.current = setInterval(() => {
                const filterOrNot = (product: Models.BasketItem) => !Utils.Date.isExpiredInSeconds(product.expiredAt);
                setProducts(prevData => prevData.filter(filterOrNot));
            }, 1000);
        }
        return () => {
            if (checkExpirationIntervalRef.current) {
                clearInterval(checkExpirationIntervalRef.current);
                checkExpirationIntervalRef.current = null;
            }
        }
    }, [checkExpirationIntervalRef, setProducts]);


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
        throw new Error("useBasket must be used within a BasketProvider");
    }
    return context;
}