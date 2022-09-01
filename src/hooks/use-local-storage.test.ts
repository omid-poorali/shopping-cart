import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from './use-local-storage'

const localStorageMock = (function () {
    let store: { [key: string]: string } = {};

    return {
        getItem(key: string) {
            return store[key];
        },

        setItem(key: string, value: string) {
            store[key] = value;
        },

        clear() {
            store = {};
        },

        removeItem(key: string) {
            delete store[key];
        },

        getAll() {
            return store;
        },
    };
})();

describe('useLocalStorage custome hook tests', () => {

    beforeAll(() => {
        Object.defineProperty(window, 'localStorage', {
            value: localStorageMock,
        });
    });

    const mockId = "test";
    const mockJson = { data: "json data" };

    it("should work like useState", () => {

        const { result } = renderHook(() => useLocalStorage(mockId, mockJson))

        expect(result.current[0].data).toEqual(mockJson.data);

        act(() => {
            result.current[1]({
                data: "newValue"
            });
        });

        expect(result.current[0].data).toEqual("newValue");
    });

    it("data is added into local storage", () => {
        window.localStorage.setItem(mockId, JSON.stringify(mockJson));
        expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(mockJson));
    })

    it("should save the value on local storage as well", () => {
        const { result } = renderHook(() => useLocalStorage("test", mockJson));
        expect(result.current[0].data).toEqual(mockJson.data);
        expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(mockJson));
        act(() => {
            result.current[1]({
                data: "newValue"
            });
        });
        expect(result.current[0].data).toEqual("newValue");
        expect(localStorage.getItem(mockId)).toEqual(JSON.stringify({
            data: "newValue"
        }));
    });
});