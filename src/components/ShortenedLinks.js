import React from 'react';
import { List, ListItem, ListItemText, Button, Typography } from '@mui/material';

const ShortenedLinks = ({ links }) => {
  return (
    <div>
      <Typography variant="h6">Shortened Links</Typography>
      <List>
        {links.map(link => (
          <ListItem key={link.id} divider>
            <ListItemText
              primary={link.shortUrl}
              secondary={`Expires: ${new Date(link.expiry).toLocaleString()}`}
            />
            <Button onClick={() => window.open(link.shortUrl, '_blank')} variant="outlined">Visit</Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ShortenedLinks;
