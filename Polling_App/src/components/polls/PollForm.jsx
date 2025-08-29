import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Form } from '../ui/form';

const PollForm = () => {
    const [title, setTitle] = useState('');
    const [options, setOptions] = useState(['']);

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const addOption = () => {
        setOptions([...options, '']);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to handle poll creation
        console.log('Poll Created:', { title, options });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Label htmlFor="title">Poll Title</Label>
            <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <Label>Poll Options</Label>
            {options.map((option, index) => (
                <Input
                    key={index}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    required
                />
            ))}
            <Button type="button" onClick={addOption}>
                Add Option
            </Button>
            <Button type="submit">Create Poll</Button>
        </Form>
    );
};

export default PollForm;