import API from 'apis/api';
import * as Models from "models";

export const getProducts = (): Promise<Models.Product[]> => {
    return API.get(`/product`);
}