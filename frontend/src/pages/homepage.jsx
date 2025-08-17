import Header from '../components/Headercomp.jsx';
import Footer from '../components/footercomp.jsx';

export default function Homepage() {
    console.log('Homepage is being rendered');
    return (
      <>
      <Header />
      {/*<div className="min-h-screen min-w-screen flex items-center justify-center bg gradient-to-tl from-green-200 from-20% via-green-300 to-green-865">*/}
      <div className="relative min-h-screen min-w-screen flex items-center justify-center bg-[url(src/assets/brightleavesbg2.jpg)] bg-cover">
      <section className="section_one border-2 border-stone-600 bg-stone-100 rounded-lg h-[500px] w-[1200px] flex flex-col justify-around items-center">
        <h1 className="relative text-4xl text-amber-950">
          Welcome to PlantGuard 🌱
        </h1>
        <button className="mt-4 px-6 py-2 bg-lime-500 text-stone-200 hover:bg-lime-600 hover:text-stone-200 rounded-md w-[200px]">
          Get Started
          </button> 
      </section>
      </div>
      <Footer />
      </>
    );
  }
