import { FormFieldProps } from "@/interface/formfield"

// create a list of string numerals ranging from start to end
const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (v, k) => (k + start).toString())

// list of months
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

// obtain the date for today
const date = new Date()

// general styles for each field
const buttonClassName = 'bg-secondary-dark w-full'


const getContentFormConfig = (
    formData: any,
    handleChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => void
) => {
    const contentForm: FormFieldProps[] = [
        {
            field: {
                type: 'text',
                name: 'title',
                label: 'Event Title',
                value: formData.title,
                placeholder: 'Input your title here.',
                className: `${buttonClassName} px-10 min-w-[200px]`,
            },
            onChange: handleChange,
        },
        {
            field: {
                type: 'date',
                name: 'start_date',
                label: 'Start Date',
                value: formData.start_date,
                className: `${buttonClassName} px-5 min-w-[200px] text-white`,
            },
            onChange: handleChange,
        },
        {
            field: {
                type: 'date',
                name: 'end_date',
                label: 'End Date',
                value: formData.end_date,
                className: `${buttonClassName} px-5 min-w-[200px]`,
            },
            onChange: handleChange,
        },
        {
            field: {
                type: 'text',
                name: 'location',
                label: 'Event Location',
                value: formData.location,
                className: `${buttonClassName} px-5 min-w-[200px]`,
            },
            onChange: handleChange,
        },
        {
            field: {
                type: 'textarea',
                name: 'body',
                label: 'Event Description',
                value: formData.body,
                placeholder: 'Provide details about the event...',
                className: `${buttonClassName} px-5 min-w-[200px] h-32`,
            },
            onChange: handleChange,
        }
    ]

    return contentForm
}

export default getContentFormConfig
