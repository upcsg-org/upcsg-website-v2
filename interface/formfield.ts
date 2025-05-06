export interface InputFieldProps {
    type: 'text' | 'email' | 'tel' | 'file' | 'select' | 'password' | 'date' | 'textarea',
    name: string,
    label?: string,
    value?: string,
    placeholder?: string,
    options?: string[],
    className?: string,
    accept?: string,
    readonly?: boolean,
    custom?: boolean,
    formimage?: File | null,
}

export interface FormFieldProps {
    field: InputFieldProps,
    layout?: 'horizontal' | 'vertical',
    onChange: (e: any) => void;
}
