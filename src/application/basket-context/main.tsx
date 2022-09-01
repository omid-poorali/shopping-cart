import React, { useEffect, useRef } from "react";
import { useLocalStorage } from "hooks";
import * as Names from "names";
import * as Utils from "utils";
import * as Models from "models";

type BasketContext = {
    basketItems: Models.BasketItem[];
    addItem: (basketItem: Models.BasketItem) => void;
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
    const basketItemsRef = useRef<Models.BasketItem[]>([]);
    const [basketItems, setBasketItems] = useLocalStorage<Models.BasketItem[]>(Names.basketStorage, []);

    useEffect(() => {
        basketItemsRef.current = basketItems;
    }, [basketItems])

    useEffect(() => {
        if (!checkExpirationIntervalRef.current) {
            checkExpirationIntervalRef.current = setInterval(() => {
                basketItemsRef.current.forEach(basketItem => {
                    if (Utils.Date.isUnixExpired(basketItem.expiredAt)) {
                        setBasketItems(prevData => prevData.filter(el => el.id !== basketItem.id));
                    }
                })

            }, 1000);
        }
        return () => {
            if (checkExpirationIntervalRef.current) {
                clearInterval(checkExpirationIntervalRef.current);
                checkExpirationIntervalRef.current = null;
            }
        }
    }, [checkExpirationIntervalRef, basketItemsRef, setBasketItems]);


    const addItem = (basketItem: Models.BasketItem) => {
        setBasketItems(prevData => prevData.concat(basketItem));
    }

    const removeItem = (id: string) => {
        setBasketItems(prevData => prevData.filter(basketItem => basketItem.id !== id));
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