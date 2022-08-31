import * as real from './real';
import * as mock from './mock';

export const product = () => {
    return process.env.NODE_ENV !== "production" ? mock : real;
}