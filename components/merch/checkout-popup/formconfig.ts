
import { FormFieldProps } from "@/interface/formfield";

const getFormConfig = (
    formData: any,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleDropdownChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
) => {

    const formConfig: FormFieldProps[] = [
        {
            field: {
                type: 'text',
                name: 'name',
                label: 'Name',
                value: formData.name,
                placeholder: '',
                className: 'w-full bg-transparent outline-none bg-white p-2 rounded-lg text-[#47376B] font-semibold',
            },
            onChange: handleChange,
        },
        {
            field: {
                type: 'select',
                name: 'selectedYear',
                label: 'YEAR (optional)',
                value: formData.selectedYear,
                options: ['N/A', '1st year', '2nd year', '3rd year', '4th year', 'Staff'],
                className: 'w-full p-1 md:p-2 rounded-lg bg-white h-10 text-[#47376B] font-semibold',
            },
            onChange: handleDropdownChange,
        },
        {
            field: {
                type: 'text',
                name: 'course',
                label: 'COURSE (optional)',
                value: formData.course,
                placeholder: '',
                className: 'w-full bg-transparent outline-none bg-white p-2 rounded-lg text-[#47376B] font-semibold',
            },
            onChange: handleChange,
        },
        {
            field: {
                type: 'email',
                name: 'email',
                label: 'EMAIL',
                value: formData.email,
                placeholder: '',
                className: 'w-full bg-transparent outline-none bg-white p-2 rounded-lg text-[#47376B] font-semibold',
            },
            onChange: handleChange,
        },
        {
            field: {
                type: 'tel',
                name: 'number',
                label: 'PHONE NUMBER',
                value: formData.number,
                placeholder: '',
                className: 'w-full bg-transparent outline-none bg-white p-2 rounded-lg text-[#47376B] font-semibold',
            },
            onChange: handleChange,
        },
        {
            field: {
                type: 'select',
                name: 'selectedPaymentOption',
                label: 'PAYMENT OPTION',
                value: formData.selectedPaymentOption,
                placeholder: '',
                options: ['GCASH', 'CASH'],
                className: 'w-full bg-transparent outline-none bg-white p-2 rounded-lg text-[#47376B] font-semibold',
            },
            layout: 'horizontal',
            onChange: handleDropdownChange,
        },
        {
            field: {
                type: 'file',
                name: 'proofOfPayment',
                label: 'PROOF OF PAYMENT',
                value: formData.image,
                placeholder: '',
                className: 'hidden',
                accept: 'image/*',
                custom: true,
                formimage: formData.image,
            },
            layout: 'horizontal',
            onChange: handleImageChange,
        },
        {
            field: {
                type: 'text',
                name: 'status',
                label: 'STATUS',
                value: formData.status,
                placeholder: '',
                className: 'w-full bg-transparent outline-none bg-white p-2 rounded-lg text-[#47376B] font-semibold text-center',
                readonly: true,
            },
            layout: 'horizontal',
            onChange: handleChange,
        },
        {
            field: {
                type: 'text',
                name: 'estimatedDate',
                label: 'ESTIMATED DATE TO CLAIMS',
                value: formData.estimatedDate,
                placeholder: '',
                className: 'w-full bg-transparent outline-none bg-white p-2 rounded-lg text-[#47376B] font-semibold text-center',
                readonly: true,
            },
            layout: 'horizontal',
            onChange: handleChange,
        },
    ];

    return formConfig;
};

export default getFormConfig;
