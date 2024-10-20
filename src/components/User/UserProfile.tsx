import { FaUser } from 'react-icons/fa';

interface UserProfileProps {
  name: string;
  email: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ name, email }) => {
  return (
    <div className="w-1/3 bg-white p-6 shadow-lg flex flex-col items-center">
      <FaUser className="rounded-full w-32 h-32 mb-4 border border-gray-200"/>
      <h2 className="text-xl font-semibold mb-2 text-center">{name}</h2>
      <div className="text-gray-600 mb-2 text-center">{email}</div>
    </div>
  );
};

export default UserProfile;
