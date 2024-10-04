import { FaCloudArrowUp } from "react-icons/fa6";

interface customUploadAFileProps {
    name: string,
    label?: string,
    type: string,
    accept?: string,
    className?: string,
    onChange: (e: any) => void,
    formimage?: File | null,
}

const CustomUploadAfile = ({name, label, type, accept, className, onChange, formimage}: customUploadAFileProps) => {
    return (
        <div className="w-full flex flex-row items-center">
        <label className="w-1/2 mb-1 font-semibold">{label}</label>
            <div className="w-1/2 flex items-center">
            <input
                type={type}
                accept={accept}
                id={name}
                name={name}
                className={className}
                onChange={onChange}
            />
            <label
                htmlFor={name}
                className="flex grow justify-center items-center bg-white p-2 rounded-2xl text-[#47376B] font-semibold cursor-pointer text-center"
            >
                {formimage ? formimage.name : (
                <span className="overflow-hidden whitespace-nowrap text-ellipsis flex flex-row">  
                    <FaCloudArrowUp className="mr-2 w-7 h-7" />
                    UPLOAD A FILE
                </span>
                )}
            </label>
            </div>
        </div>
    )
}

export default CustomUploadAfile;
