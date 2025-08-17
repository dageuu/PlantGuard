const Header = () => {
    return <header className="min-w-screen bg-lime-900 p-4 shadow-md flex justify-start items-center">
    <h1 className="ml-[25px] text-2xl text-white mr-[750px]">PlantGuard</h1>
    <div className="flex">
      <nav className="flex space-x-4 text-white text-lg ml-[250px]">
        <a href="#" className="hover:text-green-300">Home</a>
        <a href="#" className="hover:text-green-300">About</a>
        <a href="#" className="hover:text-green-300">Contact</a>
      </nav>
    </div>  
  </header>
};

export default Header;