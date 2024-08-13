export interface InputFieldProps {
    type: 'text' | 'email' | 'tel' | 'file' | 'select',
    name: string,
    value: string,
    placeholder?: string,
    options?: string[],
    className?: string,
    accept?: string,
    custom?: boolean,
}

export interface FormFieldProps {
    field: InputFieldProps,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    formimage?: File | null,
}
