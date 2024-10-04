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
                label: 'ADMIN USERNAME',
                placeholder: 'Enter your username',
                className: 'w-full bg-[#181B32] border-[1px] border-[#676F99]',
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
                className: 'w-full bg-[#181B32] border-[1px] border-[#676F99]',
                value: formData.password
            },
            onChange: handleChange,
            layout: 'vertical',
        }
    ];

    return formConfig;
};

export default getFormConfig;
