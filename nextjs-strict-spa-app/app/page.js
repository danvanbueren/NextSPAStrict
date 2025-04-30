'use client'

import { useSPARouter } from '../context/spaRouter';
import { Button, Grid, Typography, Container } from '@mui/material';

export default function Home() {
  const { navigate, currentPath } = useSPARouter();
  
  const dest = ['', '/app', '/app/cow', '/app/dog', '/app/cat']

  const content = {
    '/': <Typography variant="h4" sx={{ p: 2}}>1</Typography>,
    '/app': <Typography variant="h4" sx={{ p: 2}}>2</Typography>,
    '/app/cow': <Typography variant="h4" sx={{ p: 2}}>3</Typography>,
    '/app/dog': <Typography variant="h4" sx={{ p: 2}}>4</Typography>,
    '/app/cat': <Typography variant="h4" sx={{ p: 2}}>5</Typography>,
  }

  return (
      <main>
        <Container maxWidth="xl">
          <Typography variant="h2" sx={{ p: 2}}>Page :: `{currentPath}`</Typography>
          <Grid container spacing={2}>
            {dest.map((d) => (
              <Grid item xs={12} md={4} key={d}>
                <Button variant="contained" onClick={() => navigate(d)}>Link : `{d}`</Button>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h4" sx={{ p: 2}}>Content</Typography>

          {content[currentPath]}

        </Container>
      </main>
  );
}
