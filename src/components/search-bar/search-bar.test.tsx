import { fireEvent, render, screen } from '@testing-library/react';
import { Default } from '../../stories/SearchBar.stories';

describe('SearchBar component', () => {
    it('should render with the correct elements', () => {
        const handleInputChange = jest.fn();

        render(<Default {...Default.args as any} onChange={handleInputChange} />);
        const inputElement = screen.getByPlaceholderText("Type search here");
        const searchIcon = screen.getByTestId("searchIcon")

        expect(inputElement).toBeInTheDocument();
        expect(searchIcon).toBeInTheDocument();
        expect(inputElement).toHaveValue("");
    });

    it('should trigger on change event', () => {
        const handleInputChange = jest.fn();
        render(<Default {...Default.args as any} onChange={handleInputChange} />);

        const inputElement = screen.getByPlaceholderText("Type search here");
        fireEvent.change(inputElement, { target: { value: "test" } });

        expect(handleInputChange).toBeCalled()
    });
});
