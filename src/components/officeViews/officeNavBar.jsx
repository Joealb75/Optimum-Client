export const OfficeNavBar = () => {
    return (
      <nav className="bg-gray-900 p-4 fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-white">Optimum Mens Health</h1>
          </div>
          <div className="flex space-x-8">
            <a href="/" className="text-white hover:text-[#B87333]">
              Home
            </a>
            <a href="/profile" className="text-white hover:text-[#B87333]">
              Profile
            </a>
            <a href="/articles" className="text-white hover:text-[#B87333]">
              Articles
            </a>
          </div>
        </div>
      </nav>
    );
  };
  
  