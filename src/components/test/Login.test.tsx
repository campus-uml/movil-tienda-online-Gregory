import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Importa jest-dom para extender expect
import Login from '../Login'; // Importa el componente desde el mismo directorio

describe('Login Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(<Login />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the login form correctly', () => {
    render(<Login />);

    // Verifica que los elementos del formulario estén presentes
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Date of Birth')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });

  it('allows entering text into input fields', () => {
    render(<Login />);

    // Simula la entrada de texto en los campos
    const fullNameInput = screen.getByLabelText('Full Name') as HTMLInputElement;
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;

    fireEvent.change(fullNameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Verifica que los valores se hayan actualizado
    expect(fullNameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('john@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('toggles password visibility', () => {
    render(<Login />);

    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    const toggleButton = screen.getByRole('button', { name: '' }); // Botón del ícono

    // Verifica que la contraseña esté oculta por defecto
    expect(passwordInput.type).toBe('password');

    // Simula el clic en el botón de mostrar/ocultar
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('text');

    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('password');
  });

  it('submits the form with the correct data', () => {
    const consoleSpy = vi.spyOn(console, 'log'); // Usa vi globalmente
    render(<Login />);

    // Simula la entrada de datos
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Phone Number'), { target: { value: '+1234567890' } });
    fireEvent.change(screen.getByLabelText('Date of Birth'), { target: { value: '1990-01-01' } });

    // Simula el envío del formulario
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));

    // Verifica que console.log fue llamado con los datos correctos
    expect(consoleSpy).toHaveBeenCalledWith({
      fullName: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      phoneNumber: '+1234567890',
      dob: '1990-01-01',
    });

    consoleSpy.mockRestore(); // Restaura console.log
  });

  it('renders the back button and navigates correctly', () => {
    render(<Login />);

    // Verifica que el botón de retroceso esté presente
    const backButton = screen.getByRole('link', { name: '' }); // Botón de flecha
    expect(backButton).toBeInTheDocument();
    expect(backButton.getAttribute('href')).toBe('/'); // Verifica la ruta de retroceso
  });
});