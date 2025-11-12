
/* 
  Footer for entire app.
*/

const Footer = () => {
  return (
    <div>
      <footer className={`px-5 py-8 bg-slate-800`}>
        <div className="max-w-7xl mx-auto text-white">
          <h2 className="font-['Lekton'] text-xl mb-6 font-bold">
            Digital Depot
          </h2>
          <p className={`text-sm mb-4 "text-gray-500"`}>
            Shop certified refurbished computers for unbeatable prices.
          </p>
          <p className="text-xs">© 2025 Digital Depot. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
