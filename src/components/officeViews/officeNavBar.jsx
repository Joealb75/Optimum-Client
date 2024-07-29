import { useCurrentUser } from "../../TSQ_hooks/useCurrentUser.js";
import { Link } from "react-router-dom";

export const OfficeNavBar = () => {
  const { currentUser } = useCurrentUser();
  // updated component to use <link /> tags instead of <a> so that it does not trigger a full page reload 
  return (
    <nav className="bg-gray-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-white">Optimum Mens Health</h1>
        </div>
        <div className="flex space-x-8">
          <Link to="/" className="text-white hover:text-[#B87333]">
            Home
          </Link>
          {currentUser && (
            <Link
              to={`/profile/${currentUser.id}`}
              className="text-white hover:text-[#B87333]"
            >
              Profile
            </Link>
          )}
          <Link
            to="/office-dashboard"
            className="text-white hover:text-[#B87333]"
          >
            Dashboard
          </Link>
          <Link to="/articles" className="text-white hover:text-[#B87333]">
            Articles
          </Link>
        </div>
      </div>
    </nav>
  );
};
