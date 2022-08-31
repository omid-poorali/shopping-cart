import * as Models from "../../models";

export const getProducts = (): Promise<Models.Product[]> => {
    return new Promise((resolve) => {
        resolve([
            {
                name: "Mugr",
                price: "150.00",
                poster: "./img/products/mug.webp",
                orderLimitTime: 120
            },
            {
                name: "Sqoop",
                price: "112.99",
                poster: "./img/products/sqoop.webp",
                orderLimitTime: 360
            },
            {
                name: "W glass",
                price: "82.00",
                poster: "./img/products/wglass.webp",
                orderLimitTime: 180
            },
            {
                name: "Eraser Ball",
                price: "171.00",
                poster: "./img/products/eraser.webp",
                orderLimitTime: 540
            },
            {
                name: "Exacto Scissors",
                price: "24.00",
                poster: "./img/products/exacto.webp",
                orderLimitTime: 60
            },
            {
                name: "Latte Brewing S.O.P",
                price: "95.00",
                poster: "./img/products/latte.webp",
                orderLimitTime: 120
            },
            {
                name: "Pencil",
                price: "114.00",
                poster: "./img/products/pencil.webp",
                orderLimitTime: 450
            },
            {
                name: "Scissors",
                price: "52.00",
                poster: "./img/products/scissors.webp",
                orderLimitTime: 60
            },
            {
                name: "Paperweight",
                price: "27.00",
                poster: "./img/products/paperweight.webp",
                orderLimitTime: 180
            }
        ]);
    });
}