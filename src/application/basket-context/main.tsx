import React, { useEffect, useRef } from "react";
import { useLocalStorage } from "hooks";
import * as Names from "names";
import * as Utils from "utils";
import * as Models from "models";

type BasketContext = {
    basketItems: Models.BasketItem[];
    addItem: (product: Models.BasketItem) => void;
    removeItem: (id: string) => void;
}

const basketContext = React.createContext<BasketContext>({
    basketItems: [],
    addItem: () => null,
    removeItem: () => null,
});


type PropsType = {
    children: React.ReactNode;
}

export const BasketProvider = ({ children }: PropsType) => {

    const checkExpirationIntervalRef = useRef<NodeJS.Timer | null>();
    const [basketItems, setBasketItems] = useLocalStorage<Models.BasketItem[]>(Names.basketStorage, []);

    useEffect(() => {
        if (!checkExpirationIntervalRef.current) {
            checkExpirationIntervalRef.current = setInterval(() => {
                const filterOrNot = (product: Models.BasketItem) => !Utils.Date.isUnixExpired(product.expiredAt);
                setBasketItems(prevData => prevData.filter(filterOrNot));
            }, 1000);
        }
        return () => {
            if (checkExpirationIntervalRef.current) {
                clearInterval(checkExpirationIntervalRef.current);
                checkExpirationIntervalRef.current = null;
            }
        }
    }, [checkExpirationIntervalRef, setBasketItems]);


    const addItem = (product: Models.BasketItem) => {
        setBasketItems(prevData => prevData.concat(product));
    }

    const removeItem = (id: string) => {
        setBasketItems(prevData => prevData.filter(product => product.id !== id));
    }

    return (
        <basketContext.Provider value={{ basketItems, addItem, removeItem }}>
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