import { FaUser } from 'react-icons/fa';
import { useEffect, useState } from "react";
import axios from 'axios';

interface Plan {
  id: number;
  description: string;
  price: string;
  gigabytes_storage: string;
}

interface Contract {
  id: number;
  user_id: number;
  plan: Plan | null;
  active: boolean;
  start_date: string;
  end_date: string | null;
}

interface User {
  id: number;
  name: string;
  email: string;
  activeContract: Contract | null;
}

export const User = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/user`);
        setUserData(response.data);
      } catch (err) {
        setError('Erro ao carregar os dados do usuário');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>Nenhum dado de usuário encontrado.</div>;
  }

  const { name, email, activeContract } = userData;

  const hasActiveContract = activeContract !== null;
  const hasPlan = hasActiveContract && activeContract.plan !== null;

  const formatPrice = (price: string): string => {
    const numericPrice = parseFloat(price);
    return numericPrice.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const startDate = hasActiveContract ? new Date(activeContract.start_date) : null;
  const localDateString = startDate ? startDate.toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '';

  return (
    <div className="h-screen items-center bg-gray-100 flex px-4">
      <div className="w-1/3 bg-white p-6 shadow-lg flex flex-col items-center">
        <FaUser className="rounded-full w-32 h-32 mb-4 border border-gray-200"/>
        <h2 className="text-xl font-semibold mb-2 text-center">{name}</h2>
        <div className="text-gray-600 mb-2 text-center">{email}</div>
      </div>

      <div className="w-2/3 p-3 flex flex-col items-center">
        <div className="bg-white p-4 rounded-lg shadow-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-center">Informações do Plano</h2>
          {hasPlan ? (
            <>
              <h3 className="text-lg font-bold text-center">Plano Atual: {activeContract.plan.description}</h3>
              <p className="mt-2 text-center">Preço: {formatPrice(activeContract.plan.price)}</p>
              <p className="mt-2 text-center">Armazenamento: {activeContract.plan.gigabytes_storage} GB</p>
              <p className="mt-2 text-center">Status: {activeContract.active ? 'Ativo' : 'Inativo'}</p>
              <p className="mt-2 text-center">Início: {localDateString}</p>
              <p className="mt-2 text-center">Renovação: {localDateString}</p>
              <h3 className="text-lg text-green-600 font-bold text-center">Crédito: {formatPrice(activeContract.credit)}</h3>
            </>
          ) : (
            <div className="text-gray-500 text-center mt-4">Nenhum plano associado ao contrato encontrado.</div>
          )}
        </div>
      </div>
    </div>
  );
};
