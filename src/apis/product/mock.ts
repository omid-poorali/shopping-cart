import * as Models from "models";
import { v4 as uuidv4 } from 'uuid';

export const mockProductsData = [
    {
        id: uuidv4(),
        name: "Mugr",
        price: "150.00",
        poster: "./img/products/mug.webp",
        orderLimitTime: 60
    },
    {
        id: uuidv4(),
        name: "Sqoop",
        price: "112.99",
        poster: "./img/products/sqoop.webp",
        orderLimitTime: 120
    },
    {
        id: uuidv4(),
        name: "W glass",
        price: "82.00",
        poster: "./img/products/wglass.webp",
        orderLimitTime: 180
    },
    {
        id: uuidv4(),
        name: "Eraser Ball",
        price: "171.00",
        poster: "./img/products/eraser.webp",
        orderLimitTime: 240
    },
    {
        id: uuidv4(),
        name: "Exacto Scissors",
        price: "24.00",
        poster: "./img/products/exacto.webp",
        orderLimitTime: 300
    },
    {
        id: uuidv4(),
        name: "Latte Brewing S.O.P",
        price: "95.00",
        poster: "./img/products/latte.webp",
        orderLimitTime: 360
    },
    {
        id: uuidv4(),
        name: "Pencil",
        price: "114.00",
        poster: "./img/products/pencil.webp",
        orderLimitTime: 420
    },
    {
        id: uuidv4(),
        name: "Scissors",
        price: "52.00",
        poster: "./img/products/scissors.webp",
        orderLimitTime: 480
    },
    {
        id: uuidv4(),
        name: "Paperweight",
        price: "27.00",
        poster: "./img/products/paperweight.webp",
        orderLimitTime: 540
    }
]

export const getProducts = (): Promise<Models.Product[]> => {
    return new Promise((resolve) => {
        resolve(mockProductsData);
    });
}