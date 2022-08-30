import { UIKIT } from "components";
import { BasketItem } from "./item";


export const Basket = () => {
    const rootClassName = "basket";

    return (
        <UIKIT.Card className={rootClassName}>
            <BasketItem />
            <BasketItem />
        </UIKIT.Card>
    );
};