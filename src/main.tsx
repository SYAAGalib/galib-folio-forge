import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Force set the correct title immediately
document.title = "Sheikh Yeasin Ahsanullah Al-Galib | AI Engineer & Startup Founder";

createRoot(document.getElementById("root")!).render(<App />);
