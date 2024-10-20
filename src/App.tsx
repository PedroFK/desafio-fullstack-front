import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { Header } from './components/Header';
import Footer from './components/Footer';

export function App() {

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Router />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

