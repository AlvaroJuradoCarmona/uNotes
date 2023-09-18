import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import CommentModal from './modals/createComment'

import fileService from './../../services/file.service'

export default function BasicTable({ user }) {
  
  const { id } = useParams();
  const [url, setUrl] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const fileData = await fileService.getFileById(id);
      setUrl(fileData[0][0].url);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [id]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <CommentModal user={user} />
      {url && <embed src={url} width="50%" height="600px" />} {/* Conditionally render when url exists */}
    </>
  );
}
