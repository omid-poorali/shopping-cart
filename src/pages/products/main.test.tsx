import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Products } from "./main";
import { BasketProvider } from "application";
import { mockProductsData } from "apis/product/mock";
import * as Utils from "utils";

describe("Products page tests", () => {

    beforeEach(() => {
        window.localStorage.clear();
    });

    const customRender = () => render(
        <BasketProvider >
            <Products />
        </BasketProvider>
    );

    it("should render properly", async () => {
        customRender();
        await waitFor(() => screen.findAllByRole("button"));
        expect(screen.getAllByText(/Add to basket/i).length).toEqual(mockProductsData.length);
        expect(screen.getAllByRole("button").length).toEqual(mockProductsData.length);
        expect(screen.getByText(/Your basket is empty/i)).toBeInTheDocument();
    });

    mockProductsData.forEach(product => {
        it("should render product info", async () => {
            customRender();
            await waitFor(() => screen.findByTestId(`product-${product.id}`));
            expect(screen.getByText(product.name)).toBeInTheDocument();
            expect(screen.getByText(new RegExp(`${product.price}`, "i"))).toBeInTheDocument();
            expect(screen.getByText(new RegExp(`${Utils.Date.secondsToMinutes(product.orderLimitTime)} min`, "i"))).toBeInTheDocument();
            expect(screen.getByAltText(product.name).getAttribute("src")).toEqual(product.poster);
        });
    });

    mockProductsData.forEach(product => {
        it("should add item to basket after add button click", async () => {
            customRender();
            await waitFor(() => screen.findByTestId(`addProductButton-${product.id}`));
            userEvent.click(screen.getByTestId(`addProductButton-${product.id}`))
            await waitFor(() => screen.findByTestId(`basketItem-${product.id}`));
        });
    });


    it("should remove emptyBasket component after adding basket item", async () => {
        customRender();
        const productId = mockProductsData[0].id;
        await waitFor(() => screen.findByTestId(`addProductButton-${productId}`));
        userEvent.click(screen.getByTestId(`addProductButton-${productId}`))
        await waitFor(() => screen.findByTestId(`basketItem-${productId}`));
        expect(screen.queryByAltText(/Your basket is empty/i)).not.toBeInTheDocument();
    });

    it("should delete basket item after clicking on delete button", async () => {
        customRender();
        const productId = mockProductsData[0].id;
        await waitFor(() => screen.findByTestId(`addProductButton-${productId}`));
        userEvent.click(screen.getByTestId(`addProductButton-${productId}`))
        await waitFor(() => screen.findByTestId(`basketItem-${productId}`));
        userEvent.click(screen.getByTestId(`deleteBasketItem-${productId}`))
        expect(screen.queryByTestId(`basketItem-${productId}`)).not.toBeInTheDocument();
    });

    it('should remove basket item after a specific amount of time', async () => {
        customRender();
        const productId = mockProductsData[0].id;
        const orderLimitTime = mockProductsData[0].orderLimitTime;
        await waitFor(() => screen.findByTestId(`addProductButton-${productId}`));
        userEvent.click(screen.getByTestId(`addProductButton-${productId}`))
        await waitFor(() => screen.findByTestId(`basketItem-${productId}`));
        jest.useFakeTimers();
        jest.advanceTimersByTime(orderLimitTime * 1000);
        await waitFor(() => {
            expect(screen.queryByTestId(`basketItem-${productId}`)).not.toBeInTheDocument();
        }, { timeout: orderLimitTime * 1000 });
    });
}) 