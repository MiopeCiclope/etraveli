import { fireEvent, render, screen } from '@testing-library/react';
import { SortButtonAsc, SortButtonDesc, SortButtonOff } from '../../stories/SortButton.stories';

describe('SortButton component', () => {
    it('should render without icon', () => {
        const handleInputChange = jest.fn();

        render(<SortButtonOff {...SortButtonOff.args as any} onChange={handleInputChange} />);
        const button = screen.getByText("Date");
        const ascIcon = screen.queryByTestId('ascIcon');
        const descIcon = screen.queryByTestId("descIcon")

        expect(button).toBeInTheDocument();
        expect(ascIcon).toBeNull()
        expect(descIcon).toBeNull()
    });

    it('should trigger on click event', () => {
        const handleInputChange = jest.fn();
        render(<SortButtonOff {...SortButtonOff.args as any} onClick={handleInputChange} />);

        const button = screen.getByText("Date");
        fireEvent.click(button);

        expect(handleInputChange).toBeCalled()
    });

    it('should render asc icon', () => {
        const handleInputChange = jest.fn();

        render(<SortButtonAsc {...SortButtonAsc.args as any} onChange={handleInputChange} />);
        const ascIcon = screen.getByTestId("ascIcon")
        const descIcon = screen.queryByTestId("descIcon")

        expect(ascIcon).toBeInTheDocument();
        expect(descIcon).toBeNull()
    });

    it('should render desc icon', () => {
        const handleInputChange = jest.fn();

        render(<SortButtonDesc {...SortButtonDesc.args as any} onChange={handleInputChange} />);
        const ascIcon = screen.queryByTestId("ascIcon")
        const descIcon = screen.getByTestId("descIcon")

        expect(ascIcon).toBeNull()
        expect(descIcon).toBeInTheDocument();
    });
});
