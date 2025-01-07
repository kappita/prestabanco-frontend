import React, { useState } from 'react';

const FileSelecter = ({ onFileSelect }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    onFileSelect(files);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setSelectedFiles(files);
    onFileSelect(files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div style={styles.container}>
      <div
        style={styles.dropArea}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <p>Haz click para seleccionar los archivos</p>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          style={styles.fileInput}
        />
      </div>
      {selectedFiles.length > 0 && (
        <ul style={styles.fileList}>
          {selectedFiles.map((file, index) => (
            <li key={index} style={styles.fileItem}>
              {file.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '400px',
    margin: 'auto',
    fontFamily: 'Arial, sans-serif',
  },
  dropArea: {
    border: '2px dashed #4CAF50',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    width: '100%',
    backgroundColor: '#f9f9f9',
    color: '#555',
    position: 'relative',
  },
  fileInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    cursor: 'pointer',
  },
  fileList: {
    marginTop: '15px',
    width: '100%',
  },
  fileItem: {
    padding: '5px 0',
    borderBottom: '1px solid #ddd',
    fontSize: '14px',
  },
};

export default FileSelecter;
