import { fireEvent, render, screen } from '@testing-library/react';
import { Unselected, Selected } from '../../stories/FilmItem.stories';

describe('FilmItem component', () => {
    it('should render with the correct elements', () => {
        const handleInputChange = jest.fn();

        render(<Unselected {...Unselected.args as any} onChange={handleInputChange} />);
        const title = screen.getByText("Episode 4: A New Hope");
        const progressBar = screen.getByTestId("progressBar")
        const progress = screen.getByText("89%");
        const date = screen.getByText("1994-02-15");

        expect(title).toBeInTheDocument();
        expect(progressBar).toBeInTheDocument();
        expect(progress).toBeInTheDocument();
        expect(date).toBeInTheDocument();
    });

    it('should trigger on click event', () => {
        const handleInputChange = jest.fn();
        render(<Selected {...Selected.args as any} onClick={handleInputChange} />);

        const item = screen.getByTestId("filmItem");
        fireEvent.click(item);

        expect(handleInputChange).toBeCalled()
    });
});
