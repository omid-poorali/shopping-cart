import { lazy } from "react";

export const list = "/products";

export const all = [
    {
        path: list,
        element: lazy(() => import("pages/products"))
    }
]