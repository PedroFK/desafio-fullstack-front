import React from "react";
import qrCode from "../assets/qrCode.png";
import { MdClose } from "react-icons/md";
import axios from "axios";

interface Plan {
  id: number;
  description: string;
  price: string;
  gigabytes_storage: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: Plan | null;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  selectedPlan,
}) => {
  if (!isOpen || !selectedPlan) return null;

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handlePaymentDone = async () => {
    try {
      const now = new Date();
      const response = await axios.post("http://localhost:8000/api/contracts", {
        user_id: 1,
        plan_id: selectedPlan.id,
        paymentMethod: "PIX",
        start_date: now.toISOString(),
      });

      alert(response);
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Erro ao chamar a API:", error.response.data);
        alert(
          "Houve um problema ao processar o pagamento: " +
            error.response.data.message
        );
      } else {
        console.error("Erro inesperado:", error);
        alert("Houve um problema ao processar o pagamento.");
      }
    }
  };

  const formatPrice = (price: string): string => {
    const numericPrice = parseFloat(price);
    return numericPrice.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <MdClose className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold mb-4">Pagamento via PIX</h2>
        <p className="mb-2">
          Você selecionou o plano: <strong>{selectedPlan.description}</strong>
        </p>
        <p className="mb-4">
          Aponte o seu celular para o QR Code abaixo para realizar o pagamento.
        </p>
        <div className="bg-gray-200 p-6 rounded-lg flex justify-center">
          <img
            src={qrCode}
            alt="QR Code para pagamento"
            className="w-40 h-40"
          />
        </div>
        <h2 className="text-2xl text-center font-bold mb-2">
          {" "}
          {formatPrice(selectedPlan.price)}
        </h2>

        <button
          className="bg-green-500 text-white font-bold py-2 px-4 rounded mt-2 w-full hover:bg-green-600"
          onClick={handlePaymentDone}
        >
          Pagamento Feito
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
