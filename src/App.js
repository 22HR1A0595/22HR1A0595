import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import ShortenerForm from './components/ShortenerForm';
import ShortenedLinks from './components/ShortenedLinks';
import Statistics from './components/Statistics';
import RedirectPage from './routes';
import { getShortLinks } from './utils/api';

function App() {
  const [links, setLinks] = useState(getShortLinks());
  const [showStats, setShowStats] = useState(false);

  const handleCreate = (newLinks) => {
  setLinks(prev => [...prev, ...newLinks]);
};


  return (
    <Router>
      <Routes>
        <Route path="/:shortcode" element={<RedirectPage />} />
        <Route path="/" element={
          <Container>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>React URL Shortener</Typography>
                <Button color="inherit" onClick={() => setShowStats(!showStats)}>
                  {showStats ? 'Shortener' : 'Statistics'}
                </Button>
              </Toolbar>
            </AppBar>
            {showStats ? (
              <Statistics />
            ) : (
              <>
                <ShortenerForm onCreate={handleCreate} />
                <ShortenedLinks links={links} />
              </>
            )}
          </Container>
        } />
      </Routes>
    </Router>
  );
}

export default App;
