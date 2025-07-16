import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { LoggerContext } from '../middleware/LoggerContext';
import { generateShortcode, isValidUrl } from '../utils/helpers';

const UrlShortener = () => {
  const { log } = useContext(LoggerContext);
  const [inputs, setInputs] = useState([{ url: '', validity: '', shortcode: '' }]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };

  const addUrlField = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { url: '', validity: '', shortcode: '' }]);
    }
  };

  const handleShorten = () => {
    const newResults = [];
    inputs.forEach((input) => {
      const { url, validity, shortcode } = input;
      if (!isValidUrl(url)) {
        log('Invalid URL input: ' + url);
        return;
      }
      const code = shortcode || generateShortcode();
      const createdAt = new Date();
      const expiry = validity
        ? new Date(Date.now() + parseInt(validity) * 60000)
        : new Date(Date.now() + 1800000);

      const data = {
        url,
        shortcode: code,
        createdAt,
        expiry,
        clicks: [],
      };

      localStorage.setItem(code, JSON.stringify(data));
      log(`URL shortened: ${url} => ${code}`);
      newResults.push(data);
    });
    setResults(newResults);
  };

  return (
    <Box>
      {inputs.map((input, i) => (
        <Box
          key={i}
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gap={2}
          mb={2}
        >
          <Box gridColumn="span 5">
            <TextField
              fullWidth
              label="Original URL"
              value={input.url}
              onChange={(e) => handleChange(i, 'url', e.target.value)}
            />
          </Box>
          <Box gridColumn="span 3">
            <TextField
              fullWidth
              label="Validity (min)"
              type="number"
              value={input.validity}
              onChange={(e) => handleChange(i, 'validity', e.target.value)}
            />
          </Box>
          <Box gridColumn="span 4">
            <TextField
              fullWidth
              label="Custom Shortcode (optional)"
              value={input.shortcode}
              onChange={(e) => handleChange(i, 'shortcode', e.target.value)}
            />
          </Box>
        </Box>
      ))}

      <Box mt={2}>
        <Button onClick={addUrlField} disabled={inputs.length >= 5}>
          Add More
        </Button>
        <Button variant="contained" onClick={handleShorten} sx={{ ml: 2 }}>
          Shorten URLs
        </Button>
      </Box>

      {results.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">Shortened URLs</Typography>
          {results.map((res, idx) => (
            <Box key={idx} sx={{ mt: 1 }}>
              <Typography>
                <strong>Original:</strong> {res.url}
                <br />
                <strong>Short URL:</strong> http://localhost:3000/{res.shortcode}
                <br />
                <strong>Expires:</strong> {new Date(res.expiry).toString()}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default UrlShortener;
