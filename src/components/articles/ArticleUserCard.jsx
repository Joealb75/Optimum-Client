import { Link } from "react-router-dom";

export const ArticleUserCard = ({ user, officeUser }) => {
    const API_URL = "http://localhost:8000"; 

    return (
        <Link to={`/about-me/${user.id}`} className="block max-w-xs">
            <div className="flex items-center p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <img
                    src={API_URL + officeUser.profileImage}
                    alt="Profile"
                    className="w-10 h-10 object-cover rounded-full"
                />
                <div className="ml-4">
                    <h2 className="text-sm font-bold text-gray-900">{user.first_name} {user.last_name}</h2>
                    <p className="text-xs text-gray-500">{officeUser.profession}</p>
                </div>
            </div>
        </Link>
    );
};