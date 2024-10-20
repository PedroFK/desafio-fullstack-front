// src/components/Navbar.js
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    toast.success('Simlando Usuário Deslogado');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <nav className="w-full bg-yellow-500 p-3 flex justify-between items-center fixed top-0 z-50">
        <div className="text-white text-lg font-bold">
          <Link to="/">Serviço de Assinatura</Link>
        </div>
        <div className="relative space-x-4">
          <button onClick={toggleDropdown} className="text-white focus:outline-none">
            <FaUser className="h-6 w-6" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
              <Link
                to="/user"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 flex items-center"
                onClick={() => setDropdownOpen(false)}
              >
                <FaUser className="h-5 w-5 mr-2" />
                Conta
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 flex items-center"
              >
                <FaSignOutAlt className="h-5 w-5 mr-2" />
                Sair
              </button>
            </div>
          )}
        </div>
      </nav>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </>
  );
};
