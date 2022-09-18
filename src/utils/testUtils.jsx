import React from 'react'
import { render } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

// import here all your reducer
import JobReducer from '../features/job/jobSlice'

function renderWithRedux(
  ui,
  {
    preloadedState,
    store = configureStore({ reducer: { jobs: JobReducer }, preloadedState }),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions })
  // means = <Wrapper>{ui}</Wrapper>
}

export * from '@testing-library/react'

export { renderWithRedux }
