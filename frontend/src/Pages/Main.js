
import React, { useState } from 'react';
const baseUrl = process.env.REACT_APP_BASE_URL;

function FileUpload() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);

  const handleFile1Change = (event) => {
    const selectedFile = event.target.files[0];
    setFile1(selectedFile);
  };

  const handleFile2Change = (event) => {
    const selectedFile = event.target.files[0];
    setFile2(selectedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (file1 === null || !(file1.type === 'application/pdf')) {
      alert('Please select two PDF files1.');
      return;
    }
    if (file2 === null || !(file2.type === 'application/pdf')) {
      alert('Please select two PDF files2.');
      return;
    }

    const formData = new FormData();
    formData.append('file1', file1);
    formData.append('file2', file2);

    try {
      const response = await fetch(baseUrl + "/upload", {
        method: 'POST',
        body: formData,
      });

      if (response) {
        const data = await response.json();
        console.log('Files uploaded successfully.');
        alert('Files uploaded successfully.');
        alert(data)
        // Handle the response as needed
      } else {
        console.log('An error occurred while uploading the files.');
      }
    } catch (error) {
      console.log('An error occurred:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="file1">File 1:</label>
          <input type="file" id="file1" accept=".pdf" onChange={handleFile1Change} />
        </div>

        <div>
          <label htmlFor="file2">File 2:</label>
          <input type="file" id="file2" accept=".pdf" onChange={handleFile2Change} />
        </div>

        <button type="submit">Upload Files</button>
      </form>
    </div>
  );
}

export default FileUpload;


