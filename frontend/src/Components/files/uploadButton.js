import { useState } from 'react';

import UploadWidget from './uploadWidget';

function UploadButton() {
  const [url, updateUrl] = useState();
  const [error, updateError] = useState();

  function handleOnUpload(error, result, widget) {
    if ( error ) {
      updateError(error);
      widget.close({
        quiet: true
      });
      return;
    }
    updateUrl(result?.info?.secure_url);
  }

  return (
    <>

      <div className="container">
        <UploadWidget onUpload={handleOnUpload}>
          {({ open }) => {
            function handleOnClick(e) {
              e.preventDefault();
              open();
            }
            return (
              <button onClick={handleOnClick}>
                Upload an Image
              </button>
            )
          }}
        </UploadWidget>

        {error && <p>{ error }</p>}

        {url && (
          <>
            <p>{ url }</p>
          </>
        )}
      </div>

    </>
  );
}

export default UploadButton;