import Logo from "../assets/Logo.png";
function Header() {
  return (
    <header className="app-header gap-4 tracking-wider ">
      <img className="  w-[6rem] sm:w-[8rem]" src={Logo} alt="React logo" />
      <h1 className="text-[3.5rem] sm:text-[8rem] ">The React Quiz</h1>
    </header>
  );
}

export default Header;
