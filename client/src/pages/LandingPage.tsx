import { useNavigate } from "react-router-dom"

export const LandingPage = () => {
    const navigate = useNavigate()
    return(
        <div className="font-sans bg-white text-gray-800">
      <header className="w-full bg-black text-white py-6 px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">PayMate</h1>
      </header>

      <section className="bg-black text-white text-center py-20">
        <h2 className="text-4xl font-semibold mb-4">Simple, Secure, and Fast Payments</h2>
        <p className="text-lg mb-8">Experience hassle-free transactions with PayMate. Sign up now and manage your payments easily.</p>
        <button onClick={() => navigate('/signup')} className="bg-white text-black py-3 px-8 font-semibold rounded-full hover:bg-gray-200 transition">Get Started</button>
      </section>

      <section id="features" className="py-20 bg-gray-100 text-center">
        <h2 className="text-3xl font-semibold mb-12">Features</h2>
        <div className="flex justify-around">
          <div className="bg-white shadow-lg p-8 w-1/3">
            <h3 className="text-xl font-semibold mb-4">Fast Transactions</h3>
            <p>Instant payments to any account worldwide.</p>
          </div>
          <div className="bg-white shadow-lg p-8 w-1/3">
            <h3 className="text-xl font-semibold mb-4">Secure Payments</h3>
            <p>Your data and transactions are fully encrypted.</p>
          </div>
          <div className="bg-white shadow-lg p-8 w-1/3">
            <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
            <p>Our support team is available around the clock.</p>
          </div>
        </div>
      </section>
      <footer className="w-full bg-black text-white text-center py-4">
        <p>&copy; 2025 PayMate. All rights reserved.</p>
      </footer>
    </div>
    )
}