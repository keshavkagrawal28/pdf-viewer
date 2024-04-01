import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import './App.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import resume1 from './assets/resume1.pdf';
import resume2 from './assets/resume2.pdf';

function App() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  let pdfToRender = null;

  const decidePdf = () => {
    pdfToRender = resume1;
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams && searchParams.has('pdf')) {
      const pdf = searchParams.get('pdf');
      if (!['v1', 'v2'].includes(pdf)) {
        pdfToRender = resume1;
        window.alert('Invalid URL parameters found. Displaying default pdf');
      } else if (pdf === 'v2') {
        pdfToRender = resume2;
      }
    }
  };

  decidePdf();

  return (
    <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
      <div style={{ height: '100vh' }}>
        <Viewer fileUrl={pdfToRender} plugins={[defaultLayoutPluginInstance]} />
      </div>
    </Worker>
  );
}

export default App;
