import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

const UrlStats = () => {
  const keys = Object.keys(localStorage);
  const urls = keys.map(key => JSON.parse(localStorage.getItem(key))).filter(item => item?.url);

  return (
    <Box>
      <Typography variant="h6">Shortened URL Statistics</Typography>
      {urls.map((item, idx) => (
        <Box key={idx} sx={{ mt: 2 }}>
          <Typography><strong>Short URL:</strong> http://localhost:3000/{item.shortcode}</Typography>
          <Typography><strong>Original URL:</strong> {item.url}</Typography>
          <Typography><strong>Created:</strong> {new Date(item.createdAt).toString()}</Typography>
          <Typography><strong>Expires:</strong> {new Date(item.expiry).toString()}</Typography>
          <Typography><strong>Click Count:</strong> {item.clicks.length}</Typography>
          <Typography><strong>Click Details:</strong></Typography>
          {item.clicks.map((click, i) => (
            <Typography key={i} sx={{ ml: 2 }}>
              - {click.timestamp} | Source: {click.source} | Location: {click.geo}
            </Typography>
          ))}
          <Divider sx={{ mt: 2 }} />
        </Box>
      ))}
    </Box>
  );
};

export default UrlStats;