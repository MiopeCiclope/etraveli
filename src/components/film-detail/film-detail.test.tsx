import { render, screen } from '@testing-library/react';
import { Default } from '../../stories/FilmDetail.stories';

describe('FilmDetail component', () => {
    it('should render with the correct elements', () => {
        render(<Default {...Default.args as any} />);
        const title = screen.getByText("Episode 4: A New Hope");
        const director = screen.getByText("Directed by: George Lucas");
        const imdbRating = screen.getByText("IMDb");
        const rottenRating = screen.getByText("Rotten Tomatoes");
        const metacriticRating = screen.getByText("Metacritic");

        expect(title).toBeInTheDocument();
        expect(director).toBeInTheDocument();
        expect(imdbRating).toBeInTheDocument();
        expect(rottenRating).toBeInTheDocument();
        expect(metacriticRating).toBeInTheDocument();
    });
});
