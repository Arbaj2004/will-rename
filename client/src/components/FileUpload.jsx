import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = ({ onDataReceived }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // New state for loading

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a CSV file first.');
      return;
    }

    const formData = new FormData();
    // Make sure the field name 'file' matches the one in your multer configuration
    formData.append('file', file);
    const URL = `${process.env.REACT_APP_BACKEND_URL}/users/importUser`;
    try {
      setError(null);
      setLoading(true); // Set loading to true when the upload starts
      const response = await axios.post(URL, formData, {
        withCredentials: true
      });
      onDataReceived(response.data.data.newUserData); // Pass the parsed JSON data back to the parent component
      console.log(response);
    } catch (err) {
      setError('Error uploading file. Please try again.');
      console.error(err);
    } finally {
      setLoading(false); // Set loading to false after upload finishes
    }
  };

  return (
    <div className='bg-slate-600 text-slate-300 dark:bg-slate-200 dark:text-black text-center p-3'>
      <h2 className='font-serif font-bold text-lg mb-4'>Upload CSV File</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button type="submit" className='bg-slate-400 hover:bg-slate-500 p-2 rounded-3xl'>Upload</button>
      </form>
      {loading && <p>Loading... Please wait.</p>} {/* Show loading message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FileUpload;
