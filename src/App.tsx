import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { Navbar } from './components/Navbar';
import Footer from './components/Footer';

export function App() {

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Router />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

