import React from 'react';

interface Plan {
  description: string;
  price: string;
  gigabytes_storage: string;
}

interface ActiveContract {
  active: boolean;
  start_date: string;
  plan: Plan | null;
  credit?: string;
}

interface PlanInfoProps {
  activeContract: ActiveContract | null;
  formatPrice: (price: string) => string;
}

const PlanInfo: React.FC<PlanInfoProps> = ({ activeContract, formatPrice }) => {
  if (!activeContract || !activeContract.plan) {
    return <div className="text-gray-500 text-center mt-4">Nenhum plano associado ao contrato encontrado.</div>;
  }

  const startDate = new Date(activeContract.start_date);
  const localDateString = startDate.toLocaleDateString('pt-BR', { timeZone: 'UTC' });

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-bold mb-4 text-center">Informações do Plano</h2>
      <h3 className="text-lg font-bold text-center">Plano Atual: {activeContract.plan.description}</h3>
      <p className="mt-2 text-center">Preço: {formatPrice(activeContract.plan.price)}</p>
      <p className="mt-2 text-center">Armazenamento: {activeContract.plan.gigabytes_storage} GB</p>
      <p className="mt-2 text-center">Status: {activeContract.active ? 'Ativo' : 'Inativo'}</p>
      <p className="mt-2 text-center">Início: {localDateString}</p>
      <p className="mt-2 text-center">Renovação: {localDateString}</p>
      <h3 className="text-lg text-green-600 font-bold text-center">Crédito: {formatPrice(activeContract.credit || '0')}</h3>
    </div>
  );
};

export default PlanInfo;
