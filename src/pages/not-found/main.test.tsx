import { render, screen } from '@testing-library/react';
import { NotFound } from "./main";

describe("notFound page tests", () => {
    it('should render properly', async () => {
        render(<NotFound />);
        expect(screen.getByText(/Error 404/i)).toBeInTheDocument();
    });
})