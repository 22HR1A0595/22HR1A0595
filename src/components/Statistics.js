import React, { useEffect, useState } from 'react';
import { getShortLinks } from '../utils/api';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const Statistics = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(getShortLinks());
  }, []);

  return (
    <div>
      <Typography variant="h6">Statistics</Typography>
      {data.map(link => (
        <div key={link.id}>
          <Typography><strong>{link.shortUrl}</strong></Typography>
          <Typography>Clicks: {link.clicks.length}</Typography>
          <Typography>Created: {new Date(link.createdAt).toLocaleString()}</Typography>
          <Typography>Expires: {new Date(link.expiry).toLocaleString()}</Typography>
          <List>
            {link.clicks.map((click, i) => (
              <ListItem key={i}>
                <ListItemText
                  primary={`Clicked at: ${new Date(click.timestamp).toLocaleString()}`}
                  secondary={`Source: ${click.source} | Location: ${click.location}`}
                />
              </ListItem>
            ))}
          </List>
        </div>
      ))}
    </div>
  );
};

export default Statistics;
