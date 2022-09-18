import { Grid, Paper, styled } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'

const StyledPaper = styled(Paper)({
  padding: '1em',
  marginBottom: '1em',
  marginTop: '1em',
})

const JobLoadingSkeleton = () => {
  return (
    <StyledPaper data-testid="job-container-loading">
      <Grid container>
        <Grid item xs={9}>
          <Skeleton variant="text" height="30px" />
          <Skeleton variant="rect" height="100px" />
          <Skeleton variant="text" height="100px" />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={2}>
          <Skeleton varian="rect" height="160px" />
        </Grid>
      </Grid>
    </StyledPaper>
  )
}

export default JobLoadingSkeleton
