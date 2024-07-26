import { L10n, setCulture } from '@syncfusion/ej2-base';
import {
  PdfBitmap,
  PdfDocument,
  PdfPageOrientation,
  PdfPageSettings,
  SizeF
} from '@syncfusion/ej2-pdf-export';
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import { useEffect, useRef, useState } from 'react';

setCulture('en-US');
L10n.load({
  'en-US': {
    documenteditorcontainer: {
      New: 'New',
      Open: 'Open',
      Undo: 'Undo',
      Redo: 'Redo',
      Print: 'Print',
      Sfdt: 'Sfdt',
      'Download as PDF': 'Download as PDF'
    }
  }
});

DocumentEditorContainerComponent.Inject(Toolbar);

function App({ document }) {
  const containerRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    const fetchFile = async () => {
      const fileUrl = document;

      try {
        const response = await fetch(fileUrl);
        const arrayBuffer = await response.arrayBuffer();
        const base64String = arrayBufferToBase64(arrayBuffer);

        if (containerRef.current) {
          containerRef.current.documentEditor.open(base64String);
        }
      } catch (error) {
        console.error('Error fetching or opening document:', error);
      }
    };

    fetchFile();
  }, [document]);

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const handleImageReplacement = () => {
    if (typeof window === 'undefined') return; // Ensure client-side execution

    const editor = containerRef.current.documentEditor;
    const selection = editor.selection;

    // Check if the selection is an image
    if (selection.text !== '') {
      // Dynamically create the file input element
      const fileInput = window.document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            const base64String = reader.result;
            // Remove the selected image and insert the new image
            editor.editor.delete();
            editor.editor.insertImage(base64String);
          };
          reader.readAsDataURL(file);
        }
      };
      fileInput.click();
    } else {
      alert('Please select an image to replace.');
    }
  };

  const handleMouseDown = (event) => {
    const editor = containerRef.current.documentEditor;
    const selection = editor.selection;
    const selectedElement = selection.start.paragraph.childWidgets[0].children[0];
    if (selectedElement && selectedElement instanceof window.Image) {
      setDragging(true);
      setCurrentImage(selectedElement);
    }
  };

  const handleMouseMove = (event) => {
    if (!dragging || !currentImage) return;

    const editor = containerRef.current.documentEditor;
    const rect = containerRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Update the position of the image
    currentImage.style.position = 'absolute';
    currentImage.style.left = `${x}px`;
    currentImage.style.top = `${y}px`;
  };

  const handleMouseUp = () => {
    setDragging(false);
    setCurrentImage(null);
  };

  const handleSaveAsPDF = () => {
    const editor = containerRef.current.documentEditor;
    const pdfDocument = new PdfDocument();
    const pageCount = editor.pageCount;
    editor.documentEditorSettings.printDevicePixelRatio = 2;
    let loadedPage = 0;

    for (let i = 1; i <= pageCount; i++) {
      setTimeout(() => {
        const format = 'image/jpeg';
        const image = editor.exportAsImage(i, format);
        image.onload = () => {
          const imageHeight = parseInt(image.style.height.replace('px', ''));
          const imageWidth = parseInt(image.style.width.replace('px', ''));
          const section = pdfDocument.sections.add();
          const settings = new PdfPageSettings(0);

          if (imageWidth > imageHeight) {
            settings.orientation = PdfPageOrientation.Landscape;
          }
          settings.size = new SizeF(imageWidth, imageHeight);
          section.setPageSettings(settings);
          const page = section.pages.add();
          const graphics = page.graphics;
          const imageStr = image.src.replace('data:image/jpeg;base64,', '');
          const pdfImage = new PdfBitmap(imageStr);
          graphics.drawImage(pdfImage, 0, 0, imageWidth, imageHeight);
          loadedPage++;

          if (loadedPage === pageCount) {
            pdfDocument.save(
              (editor.documentName === '' ? 'sample' : editor.documentName) + '.pdf'
            );
          }
        };
      }, 500);
    }
  };

  return (
    <div onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <div className="mb-2 flex gap-2">
        {' '}
        <button className="border border-gray-100" onClick={handleImageReplacement}>
          Replace Image
        </button>
        <button className="border border-gray-100" onClick={handleSaveAsPDF}>
          Save as PDF
        </button>
      </div>
      <DocumentEditorContainerComponent
        id="container"
        height={'100vh'}
        width={'80vw'}
        ref={containerRef}
        isReadOnly={false}
        enableToolbar={true}
        serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
      />
    </div>
  );
}

export default App;
