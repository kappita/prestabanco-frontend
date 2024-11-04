import { useState } from "react"
import { Document, Page } from 'react-pdf';

function documentsViewer({documents}) {
  const [documentUrls, setDocumentUrls] = useState([])
  const [currentDocument, setCurrentDocument] = useState(null)
  const docs = []
  for (document of documents) {
    const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setPdfUrl(url);
    
  }

  return (
  <div>
    <div id="documents-viewer" className="w-[70%] h-full bg-green-500">
        <div id="navigator" className="h-[15%] w-full flex justify-center">
          <button className="w-[20%] h-full bg-white m-2">Previous</button>
          <button className="w-[20%] h-full bg-white">Next</button>
        </div>
        <div id="document" ></div>
      </div>
  </div>
  )
}