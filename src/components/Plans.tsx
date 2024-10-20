import React, { useEffect, useState } from "react";
import axios from "axios";
import PaymentModal from "./PaymentModal";

interface Plan {
  id: number;
  description: string;
  price: string;
  gigabytes_storage: string;
}

const Plans: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/plans`);
        setPlans(response.data);
      } catch (error) {
        console.error("Erro ao buscar planos:", error);
      }
    };

    fetchPlans();
  }, []);

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
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
    <div className="container mx-auto p-4 overflow-auto">
      <h1 className="text-3xl font-bold mb-2 text-center">
        Selecione o seu Plano
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white py-3 pe-3 rounded-md shadow-md cursor-pointer transform transition-transform duration-300 hover:shadow-l hover:scale-105"
            onClick={() => handleSelectPlan(plan)}
          >
            <div className="bg-orange-500 p-3 rounded-r-lg">
              <h2 className="text-xl font-bold text-white">
                {plan.description}
              </h2>
            </div>
            <div className="mt-3 px-2">
              <p className="text-md font-bold text-gray-600">Preço:</p>
              <p className="text-2xl font-semibold text-gray-600">
                {formatPrice(plan.price)} /mês
              </p>
              <p className="text-lg font-semibold text-gray-500">
                Armazenamento:
              </p>
              <p className="text-2xl font-bold text-gray-600">
                {plan.gigabytes_storage} GB
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedPlan && (
        <PaymentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedPlan={selectedPlan}
        />
      )}
    </div>
  );
};

export default Plans;
