import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { fireEvent, renderWithRedux } from '../../../utils/testUtils'
import JobContainer from '../JobContainer'

const handlers = [
  rest.get('http://localhost:3000/api/v1/jobs', (req, res, ctx) => {
    // console.log()
    const offset = req.url.searchParams.get('offset')
    if (+offset === 0) {
      return res(
        ctx.json({
          job: [
            {
              created_at: '15/09/2022',
              description: 'description',
              expired_at: '2022-09-20T00:00:00.000Z',
              id: 'be86000d-9bdc-4f86-aefc-03a324ab2b93',
              max_budget: '200',
              min_budget: '100',
              skills: 'skills',
              title: 'title',
              updated_at: '15/09/2022',
              user_id: 'fdeeda25-214c-4d2e-b643-6ff510d2d71e',
              version: 'bce1e37b-e3dd-4435-aace-fdf59bb0282d',
            },
          ],
        }),
        ctx.delay(150),
      )
    }
    return res(
      ctx.json({
        job: [
          {
            created_at: '15/09/2022',
            description: 'description - 2',
            expired_at: '2022-09-20T00:00:00.000Z',
            id: 'be86000d-9bdc-4f86-aefc-03a324ab2b94',
            max_budget: '200',
            min_budget: '100',
            skills: 'skills',
            title: 'title - 2',
            updated_at: '15/09/2022',
            user_id: 'fdeeda25-214c-4d2e-b643-6ff510d2d71e',
            version: 'bce1e37b-e3dd-4435-aace-fdf59bb0282d',
          },
        ],
      }),
      ctx.delay(150),
    )
  }),
]

const server = setupServer(...handlers)

describe('JobContainer Test', () => {
  beforeAll(() => server.listen())

  afterEach(() => server.resetHandlers())

  afterAll(() => server.close())
  it('should show loader when request is pending', () => {
    const { getByTestId, asFragment } = renderWithRedux(<JobContainer />)

    expect(getByTestId('job-container-loading')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render jobList', async () => {
    const { findByText, asFragment } = renderWithRedux(<JobContainer />)

    expect(await findByText('title')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })

  it('shoul load more jobs when click on load more button', async () => {
    // asFragment ini snapshot digunakan untuk membuat file berbentuk html html ke dalam folder snapshot
    // Kemudian apabila ada perubahan akan membuat error
    const {
      findByText,
      getByText,
      asFragment,
      getByTestId,
      queryByTestId,
    } = renderWithRedux(<JobContainer />)

    expect(await findByText('title')).toBeInTheDocument()

    fireEvent.click(getByText('Load More'))
    expect(getByTestId('load-more-btn')).toBeDisabled()
    expect(getByTestId('job-container-loading')).toBeInTheDocument()

    expect(await findByText('title - 2')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()

    expect(getByTestId('load-more-btn')).not.toBeDisabled()
    expect(queryByTestId('job-container-loading')).not.toBeInTheDocument()
  })

  it('should handle server error', async () => {
    server.use(
      rest.get('http://localhost:3000/api/v1/jobs', (req, res, ctx) => {
        return res.once(
          ctx.status(500),
          ctx.json({ message: 'server is not working!' }),
        )
      }),
    )
    const { findByText } = renderWithRedux(<JobContainer />)

    expect(await findByText('Something went wrong!')).toBeInTheDocument()
  })
})
