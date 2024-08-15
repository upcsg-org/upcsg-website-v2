
import FormFieldBuilder from '@/components/generics/formField/FormFieldBuilder'
import { FormFieldProps } from '@/interface/formfield'

interface ReciepientInformationProps {
    formConfig: FormFieldProps[]
}

const ReciepientInformation = ({formConfig}: ReciepientInformationProps) => {
    return (
        <div className='flex md:flex-row flex-col text-sm lg:text-base px-6'>
            <div className="flex flex-col bg-[#7D66AD] flex-1 rounded-t-xl md:rounded-tr-none md:rounded-l-xl p-5 text-[#47376B] font-light gap-3">
                <h2 className='text-lg font-bold tracking-wider'>RECIEPIENT INFORMATION</h2>
                <FormFieldBuilder formConfig={[formConfig[0]]} />
                <FormFieldBuilder formConfig={formConfig.slice(1,3)} className='w-full flex flex-row gap-3' />
                <FormFieldBuilder formConfig={formConfig.slice(3,5)} className='flex flex-col gap-3'/>
            </div>
            <FormFieldBuilder formConfig={formConfig.slice(5)} className='flex flex-col bg-[#5F4C87] flex-1 rounded-b-xl md:rounded-bl-none md:rounded-r-xl p-5 gap-5 text-[#18083A] font-bold gap-3' />
        </div>
    )
}

export default ReciepientInformation
