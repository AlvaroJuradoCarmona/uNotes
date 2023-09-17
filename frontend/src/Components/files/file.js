import * as React from 'react';
import { useEffect, useState } from 'react';
import UploadInfoModal from "./modals/uploadInfoModal"

import fileService from "../../services/file.service"


export default function BasicTable({ user }) {
  
  const [files, setFiles] = useState([])

  useEffect(() => {
    fileService.getFiles().then(p => {
      setFiles(p);
    })
  }, [])

  return (
    <>
      <embed src="https://res.cloudinary.com/dlqsfa7ri/image/upload/v1694791684/3SFZZG-yFtgSvKb_nrkm4w.pdf" width="50%" height="600px" />
    </>
  );
}