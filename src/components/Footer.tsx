import { FaCcVisa, FaCcMastercard } from 'react-icons/fa';
import { FaPix } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-800 p-2 text-white text-center fixed bottom-0 left-0 w-full">
      <div className="flex justify-center space-x-4">
        <FaCcVisa className="h-8 w-8" title="Visa" />
        <FaCcMastercard className="h-8 w-8" title="Mastercard" />
        <FaPix className="h-8 w-8" title="Pix" />
      </div>
      <p>Aceitamos cartões de crédito e Pix</p>
    </footer>
  );
};

export default Footer;
