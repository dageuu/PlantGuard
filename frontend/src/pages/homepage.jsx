export default function Homepage() {
    return (
      <>
      <header className="bg-amber-950 text-white p-4 shadow-md">
        <h1 className="text-2xl ">PlantGuard</h1>
      </header>
      {/*<div className="min-h-screen min-w-screen flex items-center justify-center bg gradient-to-tl from-green-200 from-20% via-green-300 to-green-865">*/}
      <div className="relative min-h-screen min-w-screen flex items-center justify-center bg-[url(src/assets/brightleavesbg.jpg)] bg-cover">
      <div className="absolute inset-0 bg-white opacity-35"></div>
      <section className="section_one bg-amber-200 rounded-md">
        <h1 className="relative text-4xl text-amber-950">
          Welcome to PlantGuard 🌱
        </h1>
      </section>
      </div>
      <footer className=" bg-green-500 text-white p-4 text-center">
        <p>&copy; 2023 PlantGuard. All rights reserved.</p>
      </footer>
      </>
    );
  }
