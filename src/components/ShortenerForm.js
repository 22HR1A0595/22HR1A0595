import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Box
} from '@mui/material';
import { createShortLink } from '../utils/api';
import { logAction, logError } from '../utils/logger';

const defaultEntry = { longUrl: '', validity: 30, shortcode: '' };

const ShortenerForm = ({ onCreate }) => {
  const [entries, setEntries] = useState(Array(5).fill({ ...defaultEntry }));
  const [errors, setErrors] = useState(Array(5).fill(''));

  const handleChange = (index, field, value) => {
    const updated = [...entries];
    updated[index] = { ...updated[index], [field]: value };
    setEntries(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = [...errors];
    const results = [];

    for (let i = 0; i < entries.length; i++) {
      const { longUrl, validity, shortcode } = entries[i];

      // Skip empty rows
      if (!longUrl.trim()) continue;

      // Validate URL
      if (!/^https?:\/\/[^\s$.?#].[^\s]*$/i.test(longUrl)) {
        newErrors[i] = 'Invalid URL format';
        logError('ValidationError', `Entry ${i + 1}: Invalid URL`);
        continue;
      }

      try {
        const result = await createShortLink(longUrl, validity, shortcode);
        logAction('URL Created', result);
        results.push(result);
        newErrors[i] = '';
      } catch (err) {
        newErrors[i] = err.message;
        logError('ShortcodeError', err.message);
      }
    }

    setErrors(newErrors);

    if (results.length > 0) {
      onCreate(results);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Shorten up to 5 URLs
      </Typography>
      <form onSubmit={handleSubmit}>
        {entries.map((entry, i) => (
          <Box key={i} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
            <Typography variant="subtitle1">URL #{i + 1}</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Long URL"
                  value={entry.longUrl}
                  onChange={(e) => handleChange(i, 'longUrl', e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Validity (minutes)"
                  type="number"
                  value={entry.validity}
                  onChange={(e) => handleChange(i, 'validity', e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Custom Shortcode (optional)"
                  value={entry.shortcode}
                  onChange={(e) => handleChange(i, 'shortcode', e.target.value)}
                />
              </Grid>
              {errors[i] && (
                <Grid item xs={12}>
                  <Typography color="error">{errors[i]}</Typography>
                </Grid>
              )}
            </Grid>
          </Box>
        ))}
        <Button variant="contained" color="primary" type="submit">
          Shorten All
        </Button>
      </form>
    </Paper>
  );
};

export default ShortenerForm;
