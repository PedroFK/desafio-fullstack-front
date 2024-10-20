// src/components/User.tsx
import { useEffect, useState } from "react";
import axios from 'axios';
import UserProfile from './User/UserProfile';
import PlanInfo from './User/PlanInfo';
import Loading from './User/Loading';
import ErrorMessage from './User/ErrorMessage';

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

  const formatPrice = (price: string): string => {
    const numericPrice = parseFloat(price);
    return numericPrice.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!userData) {
    return <ErrorMessage message="Nenhum dado de usuário encontrado." />;
  }

  const { name, email, activeContract } = userData;

  return (
    <div className="h-screen items-center bg-gray-100 flex px-4">
      <UserProfile name={name} email={email} />
      <div className="w-2/3 p-3 flex flex-col items-center">
        <PlanInfo activeContract={activeContract} formatPrice={formatPrice} />
      </div>
    </div>
  );
};
