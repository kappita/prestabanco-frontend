
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
    setLoading(false)
    

  })

  return (<div>
    <button onClick={handleDownload} disabled={loading} className="border-2 border-black w-[16rem] h-[3rem] rounded-lg flex justify-around items-center">
      {loading ? "Descargando..." : "Descargar documentos"}
      <img src="https://www.svgrepo.com/show/513826/download.svg" alt="Icono de descarga" className="h-8"/>

    </button>
  </div>)
}

export default FilesDownloader;