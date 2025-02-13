import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Para usar expect extendido
import App from '../../App'; // Importa el componente App desde la ruta correcta
import { vi } from 'vitest'; // Importa vi desde vitest

// Mock del componente Login usando vi
vi.mock('../Login', () => ({
  default: () => <div>Mocked Login Component</div>,
}));

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    // Verifica que el componente App se renderice correctamente
    expect(screen.getByText('Mocked Login Component')).toBeInTheDocument();
  });

  it('renders the Login component inside App', () => {
    render(<App />);
    // Verifica que el componente Login esté presente
    const loginComponent = screen.getByText('Mocked Login Component');
    expect(loginComponent).toBeInTheDocument();
  });

  it('has a div container', () => {
    const { container } = render(<App />);
    // Verifica que el contenedor principal sea un div
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild?.nodeName).toBe('DIV');
  });
});