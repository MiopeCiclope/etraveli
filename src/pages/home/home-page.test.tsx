import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils'
import HomePage from './home-page'

const server = setupServer(
  rest.get('https://swapi.dev/api/films/', (req: any, res: any, ctx: any) => {
    return res(ctx.json({
      results: [{
        title: 'A New Hope',
        episode_id: 4,
        opening_crawl: 'It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire\'s\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire\'s\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....',
        director: 'George Lucas',
        release_date: '1977-05-25',
        created: '2014-12-10T14:23:31.880000Z',
      },
      {
        title: 'The Empire Strikes Back',
        episode_id: 5,
        opening_crawl: 'It is a dark time for the\r\nRebellion. Although the Death\r\nStar has been destroyed,\r\nImperial troops have driven the\r\nRebel forces from their hidden\r\nbase and pursued them across\r\nthe galaxy.\r\n\r\nEvading the dreaded Imperial\r\nStarfleet, a group of freedom\r\nfighters led by Luke Skywalker\r\nhas established a new secret\r\nbase on the remote ice world\r\nof Hoth.\r\n\r\nThe evil lord Darth Vader,\r\nobsessed with finding young\r\nSkywalker, has dispatched\r\nthousands of remote probes into\r\nthe far reaches of space....',
        director: 'Irvin Kershner',
        producer: 'Gary Kurtz, Rick McCallum',
        release_date: '1980-05-17',
        created: '2014-12-12T11:26:24.656000Z',
        edited: '2014-12-15T13:07:53.386000Z',
        url: 'https://swapi.dev/api/films/2/'
      }]
    }))
  }),

  rest.get('https://www.omdbapi.com/', (req: any, res: any, ctx: any) => {
    return res(ctx.json(
      {
        Poster: 'https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_SX300.jpg',
        Ratings: [
          {
            Source: 'Internet Movie Database',
            Value: "86"
          },
          {
            Source: 'Rotten Tomatoes',
            Value: "93"
          },
          {
            Source: 'Metacritic',
            Value: "90"
          }
        ]
      }
    ))
  }),
)

beforeAll(() => server.listen())
afterEach(() => { server.resetHandlers() })
afterAll(() => server.close())

describe('HomePage component', () => {
  test('Should start with loading film list', async () => {
    renderWithProviders(<HomePage />)

    expect(screen.getByTestId("loadingMessage")).toBeInTheDocument()
    expect(screen.queryByTestId("errorMessage")).not.toBeInTheDocument()
    expect(screen.queryByTestId("filmItem")).not.toBeInTheDocument()
  })

  test('Should fetch film list', async () => {
    renderWithProviders(<HomePage />)

    await waitFor(() => {
      expect(screen.getAllByTestId("filmItem")).toHaveLength(2)
    })
    expect(screen.queryByTestId("errorMessage")).not.toBeInTheDocument()
    expect(screen.queryByTestId("loadingMessage")).not.toBeInTheDocument()
  })

  test('Should show Yoda quote on unselected', async () => {
    renderWithProviders(<HomePage />)

    expect(screen.getByTestId("quote")).toBeInTheDocument()
  })

  test('Should show film detail on selected', async () => {
    renderWithProviders(<HomePage />)

    await waitFor(() => {
      expect(screen.getAllByTestId("filmItem")).toHaveLength(2)
    })

    const item = screen.getAllByTestId("filmItem")[0];
    fireEvent.click(item);

    await waitFor(() => {
      expect(screen.queryByTestId("quote")).not.toBeInTheDocument()
      expect(screen.getByTestId("detail")).toBeInTheDocument()
    })
  })

  test('Should filter list on search change', async () => {
    renderWithProviders(<HomePage />)

    await waitFor(() => {
      expect(screen.getAllByTestId("filmItem")).toHaveLength(2)
    })
    const searchbar = screen.getByPlaceholderText("Type search here...");

    fireEvent.change(searchbar, { target: { value: "anew" } });
    await waitFor(async () => {
      expect(screen.getAllByTestId("filmItem")).toHaveLength(1)

      fireEvent.change(searchbar, { target: { value: "" } });
      await waitFor(() => {
        expect(screen.getAllByTestId("filmItem")).toHaveLength(2)
      })
    })


  })

  test('Should sort list on button click', async () => {
    renderWithProviders(<HomePage />)

    await waitFor(() => {
      expect(screen.getAllByTestId("filmItem")).toHaveLength(2)
    })
    const sortButton = screen.getByTestId("sortButtonEpisode");
    fireEvent.click(sortButton);

    await waitFor( async () => {
      const list = screen.getAllByTestId("filmItem")
      expect(list).toHaveLength(2)
      list[0].getAttribute("key") === "4"
    })
  })
});
