import React, { useState } from 'react';
import FileUpload from './FileUpload';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Typography } from '@mui/material';
import { useSelector } from 'react-redux'; // Import useSelector to access the state

const RegisterComponent = () => {
  const [data, setData] = useState([]); // State to hold the parsed data
  const darkMode = useSelector((state) => state.darkMode.darkMode); // Get the dark mode state from Redux

  // Function to handle data received from the FileUpload component
  const handleDataReceived = (uploadedData) => {
    // Add a unique id to each row based on its index (starting from 1)
    const formattedData = uploadedData.map((item, index) => ({
      id: index + 1,
      ...item,
    }));
    setData(formattedData);
  };

  // Define columns for the DataGrid based on the CSV data structure
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'mis', headerName: 'MIS', width: 150 },
    // Add more columns based on your CSV data fields
  ];

  return (
    <Container
      style={{
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh', // Ensure full height
      }}
    >
      <Typography variant="h4" gutterBottom>CSV File Uploader</Typography>

      <FileUpload onDataReceived={handleDataReceived} />
      
      <div style={{ height: 400, width: '100%', maxWidth: '800px', marginTop: 30 }}>
        {data.length > 0 ? (
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            autoHeight // Automatically adjust the height of the DataGrid based on data
            sx={{
              '& .MuiDataGrid-root': {
                backgroundColor: darkMode ? '#1c1c1c' : '#fff', // DataGrid background
              },
              '& .MuiDataGrid-cell': {
                color: darkMode ? '#ffffff' : '#000000', // Cell text color
              },
              '& .MuiDataGrid-columnHeader': {
                backgroundColor: darkMode ? '#2c2c2c' : '#f5f5f5', // Header background
                color: darkMode ? '#ffffff' : '#000000', // Header text color
              },
            }}
          />
        ) : (
          <Typography variant="body1" color="textSecondary">Upload a CSV file to see the data here.</Typography>
        )}
      </div>
    </Container>
  );
};

export default RegisterComponent;
