
import { FormFieldProps } from "@/interface/formfield";
import InputField from "./InputField";

interface FormFieldBuilderProps {
    formConfig: FormFieldProps[],
    className?: string,
}

const FormFieldBuilder = ({formConfig, className}: FormFieldBuilderProps) => {

    return (
        <div className={className}>
            {formConfig.map((config: FormFieldProps, index: number) => {
                return <InputField 
                    key={index} 
                    field={config.field} 
                    layout={config.layout}
                    onChange={config.onChange} 
                />
            })}
        </div>
    )
}

export default FormFieldBuilder
