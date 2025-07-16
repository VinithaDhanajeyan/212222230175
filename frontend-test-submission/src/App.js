import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UrlShortener from './components/UrlShortener';
import UrlStats from './components/UrlStats';
import RedirectHandler from './components/RedirectHandler';
import LoggerProvider from './middleware/LoggerContext';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

function App() {
  return (
    <LoggerProvider>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              URL  Shortener
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Shorten URL
            </Button>
            <Button color="inherit" component={Link} to="/stats">
              View Stats
            </Button>
          </Toolbar>
        </AppBar>

        <Container sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<UrlShortener />} />
            <Route path="/stats" element={<UrlStats />} />
            <Route path="/:shortcode" element={<RedirectHandler />} />
          </Routes>
        </Container>
      </Router>
    </LoggerProvider>
  );
}

export default App;
