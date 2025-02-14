import React, { useState } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { Eye, EyeOff, ArrowLeft } from 'react-feather'; // Importa ArrowLeft

const Login: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(''); // Cambia el tipo aquí
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      fullName,
      email,
      password,
      phoneNumber,
      dob,
    });

    // Limpiar los campos del formulario después de enviar los datos
    setFullName('');
    setEmail('');
    setPassword('');
    setDob('');
    setPhoneNumber(undefined); // Ahora esto es válido
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 overflow-hidden">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-sm md:max-w-md lg:max-w-lg relative"
      >
        <a
          href="/" 
          className="absolute top-6 left-6 text-gray-700 hover:text-gray-900 transition-colors duration-200"
        >
          <ArrowLeft className="h-6 w-6" />
        </a>

        <h2 className="text-2xl md:text-3xl font-bold text-center">Sign Up</h2>
        <p className="text-sm md:text-base text-gray-600 text-center mt-4 mb-6">Please type your information below</p>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base md:text-lg"
              required
              data-testid="fullName" // Agrega un data-testid para Cypress
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base md:text-lg"
              required
              data-testid="email" // Agrega un data-testid para Cypress
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base md:text-lg"
                required
                data-testid="password" // Agrega un data-testid para Cypress
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-sm leading-5"
                data-testid="toggle-password" // Agrega un data-testid para Cypress
              >
                {showPassword ? <EyeOff className="h-6 w-6 text-gray-500" /> : <Eye className="h-6 w-6 text-gray-500" />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <div className="relative" data-testid="phoneNumber"> {/* Aplica el data-testid aquí */}
              <PhoneInput
                id="phoneNumber"
                international
                defaultCountry="US"
                value={phoneNumber}
                onChange={(value) => setPhoneNumber(value || undefined)} // Acepta string o undefined
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base md:text-lg"
              />
            </div>
          </div>

          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              id="dob"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base md:text-lg h-11"
              required
              data-testid="dob" // Agrega un data-testid para Cypress
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-lg"
            data-testid="submit-button" // Agrega un data-testid para Cypress
          >
            Send
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          You have an account? <a href="#" className="text-green-500 hover:text-green-300">Sign In</a>
        </p>
      </form>
    </div>
  );
};

export default Login;