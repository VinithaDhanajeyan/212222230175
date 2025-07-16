import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

const RedirectHandler = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Shortcode from URL:", shortcode);

    const dataString = localStorage.getItem(shortcode);
    console.log("Raw localStorage data:", dataString);

    if (!dataString) {
      alert('Shortcode not found');
      navigate('/');
      return;
    }

    let data;
    try {
      data = JSON.parse(dataString);
    } catch (e) {
      alert('Failed to parse data');
      navigate('/');
      return;
    }

    const now = new Date();
    const expiry = new Date(data.expiry);
    console.log("Now:", now);
    console.log("Expiry:", expiry);

    if (expiry < now) {
      alert('Link expired');
      navigate('/');
      return;
    }

    const click = {
      timestamp: now.toISOString(),
      source: document.referrer || 'direct',
      geo: 'Unknown',
    };

    data.clicks = [...(data.clicks || []), click];
    localStorage.setItem(shortcode, JSON.stringify(data));
    console.log("Redirecting to:", data.url);

    
    window.location.replace(data.url);
  }, [shortcode, navigate]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
      <CircularProgress color="primary" />
    </Box>
  );
};

export default RedirectHandler;
