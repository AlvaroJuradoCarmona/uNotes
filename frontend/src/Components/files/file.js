import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';

import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import c from 'react-syntax-highlighter/dist/esm/languages/hljs/c';
import cpp from 'react-syntax-highlighter/dist/esm/languages/hljs/cpp';
import haskell from 'react-syntax-highlighter/dist/esm/languages/hljs/haskell';
import java from 'react-syntax-highlighter/dist/esm/languages/hljs/java';
import php from 'react-syntax-highlighter/dist/esm/languages/hljs/php';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';

import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

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

  return (
    <>
      {url ? (
        <>
          <CommentModal user={user} />
          <div className='codecontainer'>
            <div className='codeblock'>
              <embed src={url} width="100%" height="800px" />
            </div>
            <div className='commentsection'>
              <Comment />
            </div>
          </div>
        </>
    ) : (
      <>
        <CommentModal user={user} />
        <div className='codecontainer'>
          <div className='codeblock'>
            <SyntaxHighlighter
              className="coding"
              language={language}
              showLineNumbers
              style={docco}
              wrapLines
            >
              {description}
            </SyntaxHighlighter>
          </div>
          <div className='commentsection'>
            <Comment />
          </div>
        </div>
      </>
      )}
    </>
  );
}
