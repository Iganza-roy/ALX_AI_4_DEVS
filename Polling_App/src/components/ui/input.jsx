import { forwardRef } from 'react';

const Input = forwardRef(({ label, ...props }, ref) => {
    return (
        <div className="flex flex-col">
            {label && <label className="mb-1 text-sm font-medium">{label}</label>}
            <input
                ref={ref}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...props}
            />
        </div>
    );
});

Input.displayName = 'Input';

export default Input;