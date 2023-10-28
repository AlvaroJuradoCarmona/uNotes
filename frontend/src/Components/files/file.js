import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { CopyToClipboard } from "react-copy-to-clipboard";
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import c from 'react-syntax-highlighter/dist/esm/languages/hljs/c';
import cpp from 'react-syntax-highlighter/dist/esm/languages/hljs/cpp';
import haskell from 'react-syntax-highlighter/dist/esm/languages/hljs/haskell';
import java from 'react-syntax-highlighter/dist/esm/languages/hljs/java';
import php from 'react-syntax-highlighter/dist/esm/languages/hljs/php';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';

import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import ReportModal from './modals/reportFile'
import CommentModal from './modals/createComment'
import Comment from './../comments/comments'

import fileService from './../../services/file.service'
import categoryService from './../../services/categories.service'

import './file.css'

export default function BasicTable({ user }) {
  
  const { id } = useParams();
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [fontSize, setFontSize] = useState(16);

  const fetchData = useCallback(async () => {
    try {
      const fileData = await fileService.getFileById(id);
      setUrl(fileData[0][0].url);
      setDescription(fileData[0][0].description);
      const languageData = await categoryService.getLanguageByCategoryId(fileData[0][0].idCategory)
      setLanguage(languageData[0][0].name)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [id]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  SyntaxHighlighter.registerLanguage('javascript', js);
  SyntaxHighlighter.registerLanguage('c', c);
  SyntaxHighlighter.registerLanguage('cpp', cpp);
  SyntaxHighlighter.registerLanguage('haskell', haskell);
  SyntaxHighlighter.registerLanguage('java', java);
  SyntaxHighlighter.registerLanguage('php', php);
  SyntaxHighlighter.registerLanguage('python', python);

  const Code = ({ children, className }) => {
    return <div className={className}>{children}</div>;
  };
  
  const downloadTxtFile = () => {
    const element = document.createElement('a');
    const file = new Blob([description], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'myFile.txt';
    document.body.appendChild(element);
    element.click();
  };

  const increaseFontSize = () => {
    setFontSize(prevSize => {
      const newSize = prevSize + 2;
      return newSize <= 30 ? newSize : prevSize;
    });
  };

  const decreaseFontSize = () => {
    setFontSize(prevSize => Math.max(prevSize - 2, 8));
  };

  return (
    <>
      {url ? (
        <>
          <ReportModal user={user} />
          <CommentModal user={user} />
          <div className='codecontainer'>
            <div className='codeblock'>
              <embed src={url} width="100%" height="800px" />
            </div>
            <div className='commentsection'>
              <Comment user={user} />
            </div>
          </div>
        </>
    ) : (
      <>
        <ReportModal user={user} />
        <CommentModal user={user} />
        <div className='codecontainer'>
          <Code className="codeblock">
            <div className="codeheader">
              <IconButton aria-label="Decrementa tamaño letra" onClick={decreaseFontSize}>
                <RemoveIcon />
              </IconButton>
              <IconButton aria-label="Incrementa tamaño letra" onClick={increaseFontSize}>
                <AddIcon />
              </IconButton>
              <CopyToClipboard text={description}>
                <IconButton aria-label="Copiar">
                  <ContentCopyIcon />
                </IconButton>
              </CopyToClipboard>
              <IconButton aria-label='Descargar' onClick={downloadTxtFile}>
                <DownloadIcon />
              </IconButton>
              
            </div>
            <SyntaxHighlighter
              className="coding"
              language={language}
              showLineNumbers
              style={docco}
              codeTagProps = {{
              style: {
              fontSize: `${fontSize}px`
              }
              }}
              wrapLines
            >
              {description}
            </SyntaxHighlighter>
          </Code>
          <div className='commentsection'>
            <Comment user={user} />
          </div>
        </div>
      </>
      )}
    </>
  );
}
