
import { FormFieldProps } from "@/interface/formfield";
import { FaCloudArrowUp } from "react-icons/fa6";

const InputField = ({field, onChange, formimage}: FormFieldProps) => { 
    const {type, name, value, placeholder, options, className, accept, custom} = field

    if (custom && type === 'file') {
        return (
          <div className="w-full flex flex-col mb-4">
            <label className="mb-2 text-sm font-semibold">{name.toUpperCase()}</label>
            <div className="w-full flex items-center">
              <input
                type="file"
                accept={accept}
                id={name}
                name={name}
                className={className}
                onChange={onChange}
              />
              <label
                htmlFor={name}
                className="w-full flex justify-center items-center bg-white p-2 rounded-2xl text-[#47376B] font-semibold cursor-pointer text-center"
              >
                {formimage ? formimage.name : (
                  <>
                    <FaCloudArrowUp className="mr-2 w-7 h-7" />
                    UPLOAD A FILE
                  </>
                )}
              </label>
            </div>
          </div>
        );
      }
    
      switch (type) {
        case 'text':
        case 'email':
        case 'tel':
          return (
            <div className="flex flex-col mb-4">
              <label className="mb-2 text-sm font-semibold">{name}</label>
              <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`p-2 border rounded ${className}`}
              />
            </div>
          );
        case 'select':
          return (
            <div className="flex flex-col mb-4">
              <label className="mb-2 text-sm font-semibold">{name}</label>
              <select
                name={name}
                value={value}
                onChange={onChange}
                className={`p-2 border rounded ${className}`}
              >
                <option value="" disabled>Select an option</option>
                {options?.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          );
        default:
          return null;
      }
}

export default InputField
