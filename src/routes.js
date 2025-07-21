import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { trackClick } from './utils/api';

const RedirectPage = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = async () => {
      const longUrl = trackClick(shortcode, 'direct');
      if (longUrl) {
        window.location.href = longUrl;
      } else {
        navigate('/');
      }
    };
    redirect();
  }, [shortcode, navigate]);

  return <p>Redirecting...</p>;
};

export default RedirectPage;
