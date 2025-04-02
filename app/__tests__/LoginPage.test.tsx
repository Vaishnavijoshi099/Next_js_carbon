import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../Login/LoginPage'; // Adjust the import path as needed
import { useRouter } from 'next/navigation';

// Mocking next/navigation's useRouter hook for navigation functionality
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));


//Test case 1
describe('LoginPage', () => {
  it('should render username and password input fields', () => {
    render(<LoginPage />);
    
    expect(screen.getByLabelText("username")).toBeInTheDocument();
    expect(screen.getByLabelText("password")).toBeInTheDocument();
  });

  //Test case 2
  it('should render login button', () => {
    render(<LoginPage />);
    
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  //Test case 3
  it('should call onLogin prop with credentials on form submission', async () => {
    const mockOnLogin = jest.fn();
    render(<LoginPage onLogin={mockOnLogin} />);
    
    fireEvent.change(screen.getByLabelText("username"), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText("password"), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText("Login"));
    
    await waitFor(() => expect(mockOnLogin).toHaveBeenCalledWith({ username: 'testuser', password: 'password123' }));
  });

  //Test case 4
  it('should navigate to Dashboard on successful login', async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    
    render(<LoginPage />);
    
    fireEvent.change(screen.getByLabelText("username"), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText("password"), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText("Login"));
    
    await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/Dashboard"));
  });

  it('should display validation errors for empty fields', async () => {
    render(<LoginPage />);
  
    fireEvent.click(screen.getByText("Login"));
  
    expect(await screen.findByText("Username is required")).toBeInTheDocument();
    expect(await screen.findByText("Password is required")).toBeInTheDocument();
  });
  it('should toggle the Remember Me checkbox', () => {
    render(<LoginPage />);
  
    const rememberMeCheckbox = screen.getByLabelText("Remember Me");
    expect(rememberMeCheckbox).not.toBeChecked();
  
    fireEvent.click(rememberMeCheckbox);
    expect(rememberMeCheckbox).toBeChecked();
  
    fireEvent.click(rememberMeCheckbox);
    expect(rememberMeCheckbox).not.toBeChecked();
  });
  
  it('calls onLogin prop with correct credentials on form submission', async () => {
    const mockOnLogin = jest.fn();
    render(<LoginPage onLogin={mockOnLogin} />);
  
    fireEvent.change(screen.getByLabelText('username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Login'));
  
    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalledWith({ username: 'testuser', password: 'password123' });
    });
  });

  it('renders the "Forgot Password" link', () => {
    render(<LoginPage />);
  
    const forgotPasswordLink = screen.getByText('Forgot Password?');
    expect(forgotPasswordLink).toBeInTheDocument();
    expect(forgotPasswordLink).toHaveAttribute('href', '/');
  });



});
