import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Form } from '../ui/form';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Add registration logic here
        // Example: Call API to register user

        try {
            // Assume registerUser is a function that handles user registration
            await registerUser({ username, email, password });
            // Redirect or show success message
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h2>Register</h2>
            {error && <p className="error">{error}</p>}
            <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Button type="submit">Register</Button>
        </Form>
    );
};

export default RegisterForm;