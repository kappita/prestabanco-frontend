
import React, { useCallback, useEffect, useState } from "react";

function FilesDownloader({files}) {
  console.log(files)
  const [loading, setLoading] = useState(false)


  const handleDownload = useCallback(() => {
    setLoading(true)
    files.forEach((file, index) => {
      const blob = new Blob([file.data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name; // Optionally set the filename
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url); // Replace with the actual file data type
    });
    

  })

  return (<div>
    <button onClick={handleDownload} disabled={loading}>
      {loading ? "Descargando..." : "Descargar documentos"}
    </button>
  </div>)
}

export default FilesDownloader;