import { FormFieldProps } from "@/interface/formfield"

// create a list of string numerals ranging from start to end
const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (v, k) => (k + start).toString())

// list of months
const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
]

// general styles for each field
const buttonClassName = 'bg-secondary-dark'

const getContentFormConfig = (
    formData: any,
    handleChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void
) => {
    const contentForm: FormFieldProps[] = [
        {
            field: {
                type: 'text',
                name: 'eventTitle',
                label: 'Event Title',
                value: formData.eventTitle,
                placeholder: 'Input your title here.',
                className: `${buttonClassName} w-full px-10`,
            },
            onChange: handleChange,
        },
        {
            field: {
                type: 'text',
                name: 'startTime',
                label: 'Start Time',
                value: formData.startTime,
                className: `${buttonClassName} w-45 mr-2 px-5`,
            },
            onChange: handleChange,
        },
        {
            field: {
                type: 'text',
                name: 'endTime',
                label: 'End Time',
                value: formData.endTime,
                className: `${buttonClassName} w-3/2 px-5`,
            },
            onChange: handleChange,
        },
        {
            field: {
                type: 'text',
                name: 'eventLocation',
                label: 'Event Location',
                value: formData.eventLocation,
                className: `${buttonClassName} w-full px-5`,
            },
            onChange: handleChange,
        },
        {
            field: {
                type: 'select',
                name: 'eventDay',
                label: 'Event Day',
                value: formData.eventDay,
                options: range(1, 31),
                className: `${buttonClassName} mr-2 w-45 px-5`,
            },
            onChange: handleChange,
        },
        {
            field: {
                type: 'select',
                name: 'eventMonth',
                label: 'Event Month',
                value: formData.eventMonth,
                options: months,
                className: `${buttonClassName} mr-2 w-45 px-5`,
            },
            onChange: handleChange,
        },
        {
            field: {
                type: 'select',
                name: 'eventYear',
                label: 'Event Year',
                value: formData.eventYear,
                options: range(2024, 2026),
                className: `${buttonClassName} w-45 px-5`,
            },
            onChange: handleChange,
        },
    ]

    return contentForm
}

export default getContentFormConfig
