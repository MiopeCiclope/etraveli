import { fireEvent, render, screen } from '@testing-library/react';
import { Default } from '../../stories/SearchBar.stories';

describe('SearchBar component', () => {
    it('should render with the correct props', () => {
        const handleInputChange = jest.fn();
        render(<Default {...Default.args as any} onChange={handleInputChange} />);

        const inputElement = screen.getByPlaceholderText("Type search here");
        fireEvent.change(inputElement, { target: { value: "test" } });

        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveValue("");
        expect(handleInputChange).toBeCalled()
    });
});
