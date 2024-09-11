
import { FormFieldProps } from "@/interface/formfield";
import CustomUploadAfile from "./CustomUpoadAFile";

const InputField = ({field, layout, onChange}: FormFieldProps) => { 
    const {type, name, label, value, placeholder, options, className, accept, readonly, custom, formimage} = field

    const containerClass = layout === 'horizontal' ? 'flex flex-row items-center' : 'flex flex-col';
    const labelClass = layout === 'horizontal' ? 'w-1/2' : 'mb-1 font-semibold';

    if (custom) {
      switch (type) {
        case 'file':
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
          )
      }
    }
    
      switch (type) {
        case 'text':
        case 'email':
        case 'tel':
          return (
            <div className={containerClass}>
              <label className={labelClass}>{label}</label>
              <div className={labelClass}>
                <input
                  type={type}
                  name={name}
                  value={value}
                  onChange={onChange}
                  placeholder={placeholder}
                  className={`p-2 border rounded-xl ${className}`}
                  readOnly={readonly}
                />
              </div>
            </div>
          );
          
        case 'select':
          return (
            <div className={containerClass}>
              <label className={labelClass + ' whitespace-nowrap truncate'}>{label}</label>
              <div className={labelClass}>
                <select
                  name={name}
                  value={value}
                  onChange={onChange}
                  className={`p-2 border rounded-xl cursor-pointer ${className}`}
                >
                  <option value="" disabled>Select an option</option>
                  {options?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          );
        default:
          return null;
      }
}

export default InputField
