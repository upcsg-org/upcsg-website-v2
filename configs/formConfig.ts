import { FormFieldProps } from "@/interface/formfield";

const getFormConfig = (
    formData: any,
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
) => {

    const formConfig: FormFieldProps[] = [
        {
            field: {
                type: 'text',
                name: 'username',
                label: 'USERNAME',
                placeholder: 'Enter your username',
                className: 'bg-secondary-dark outline-none text-white caret-white w-full',
                value: formData.username
            },
            onChange: handleChange,
            layout: 'vertical',
        },
        {
            field: {
                type: 'password',
                name: 'password',
                label: 'PASSWORD',
                placeholder: 'Enter your password',
                className: 'bg-secondary-dark outline-none text-white caret-white w-full',
                value: formData.password
            },
            onChange: handleChange,
            layout: 'vertical',
        }
    ];

    return formConfig;
};

export default getFormConfig;
