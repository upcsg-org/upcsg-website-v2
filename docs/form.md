
---

# Form Builder and Form Hooks

## Table of Contents
1. [Introduction](#introduction)
2. [Usage](#usage)
3. [Troubleshooting](#troubleshooting)
4. [Custom Design](#custom-design)
5. [Contact](#contact)

## Introduction
A reusable form builder and form hooks to easily create and manage forms.

## Usage

### IMPORT
In the parent component where you want the form, add the following imports:
```javascript
import useFormHandler from '@/hooks/FormHooks'
import FormFieldBuilder from '@/components/generics/formField/FormFieldBuilder'
```

In the same component, create or get the initial values for the form data and pass them to the form handler.

### INITIALIZE VALUES

```javascript
const initVal = {
    name: 'Harley',
    lastname: 'Acabal',
    image: null,
    selectedClass: 'CMSC 69',
}

const { formData, handleChange, handleImageChange, handleSubmit } = useFormHandler(initVal);
```

If you want to check the definitions of the functions, you can check `hooks/FormHooks.tsx` file.

This initializes a form with the given data. Now you can style each input/form field.

In the same folder as the parent component, create a `formConfig` file. This file will define the type of inputs, names, Tailwind classes, and other properties. A basic config file looks like this:

### WRITE FORM CONFIG 

```javascript
import { FormFieldProps } from "@/interface/formfield";

const formConfig = (
    formData: any,
    handleChange: (e: any) => void,
    // Optional if you're not submitting images in this form
    handleImageChange: (e: any) => void,
): FormFieldProps[] => [
    // Array of input/form field styles
]

export default formConfig;
```

Example configuration for a text field:

```javascript
{
    field: {
        // To see all available parameters, refer to the FormFieldProps file
        type: 'text',
        name: 'name',
        label: 'Name of the Developer',
        // value should match: formData.{field name from initVal}
        value: formData.name,
    },
    onChange: handleChange,
    layout: 'horizontal',
}
```

For the full list of props you can use, check `interface\formfield.ts` file. 

### Important: Ensure the fields are styled in the same order as `initVal`.

In the parent component, use the `formConfig`:

```javascript
const config = formConfig(formData, handleChange, handleImageChange);
```

To render the input fields, pass the `formConfig` to the form builder:

```javascript
<FormFieldBuilder formConfig={config} />
```

In most cases, this is all you need. However, if you want to split the form into different sections or divs, you can use the `slice()` method:

```javascript
<div>
    <FormFieldBuilder formConfig={config.slice(0, 2)} />
</div>

<FormFieldBuilder formConfig={config.slice(2)} />
```

You can also apply styles to the parent div by adding a class name:

```javascript
<div>
    <FormFieldBuilder formConfig={config.slice(0, 2)} className="flex flex-row" />
</div>

<FormFieldBuilder formConfig={config.slice(2)} />
```

## Custom Design
To add custom designs, create a custom component under `generics/formField`. After building the component, add it to the input field switch case for custom designs like this:

```javascript
if (custom?.[0]) {
    switch (custom?.[1]) {
        case 'custom-field':
            return (
                <CustomUploadAfile
                    name={name}
                    label={label}
                    type={type}
                    accept={accept}
                    className={className}
                    onChange={onChange}
                    formimage={formimage}
                />
                // Add more custom components here
            );
    }
}
```

To use it, set the `custom` attribute of the input field to `true` and match the string to the one in the switch case:

```typescript
field: {
    type: 'text',
    name: 'Custom',
    label: 'Custom text input',
    placeholder: '',
    custom: [true, 'custom-input'],
}
```

## Troubleshooting
If it’s not working, skill issue dagay na.

## Contact
For help or suggestions to improve the form builder, feel free contact me via email at harleyvanacabal@gmail.com or via chat.

---
