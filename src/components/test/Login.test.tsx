import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Importa jest-dom
import Login from '../Login';

describe('Login Component', () => {
  it('renders the form correctly', () => {
    render(<Login />);

    // Verifica que los elementos del formulario estén presentes
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Phone Number/i })).toBeInTheDocument(); // Usa role
    expect(screen.getByLabelText(/Date of Birth/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send/i })).toBeInTheDocument();
  });

  it('submits the form with correct data', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    render(<Login />);

    // Simula cambios en los inputs
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByRole('textbox', { name: /Phone Number/i }), { target: { value: '+1234567890' } }); // Usa role
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), { target: { value: '1990-01-01' } });

    // Simula el envío del formulario
    fireEvent.click(screen.getByRole('button', { name: /Send/i }));

    // Verifica que console.log fue llamado con los datos correctos
    expect(consoleSpy).toHaveBeenCalledWith({
      fullName: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      phoneNumber: '+1234567890',
      dob: '1990-01-01',
    });
  });
});