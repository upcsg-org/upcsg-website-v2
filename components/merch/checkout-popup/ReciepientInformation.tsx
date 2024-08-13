
import { FaCloudArrowUp } from 'react-icons/fa6'

interface ReciepientInformationProps {
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    handleDropdownChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    selectedYear: string
    selectedPaymentOption: string
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    formimage: File | null
    status: string
    estimatedDate: string
}

const ReciepientInformation = ({ handleChange, handleDropdownChange, selectedYear, selectedPaymentOption, handleImageChange, formimage, status, estimatedDate}: ReciepientInformationProps) => {
    return (
        <div className='flex md:flex-row flex-col text-sm lg:text-base px-6'>
            <div className="flex flex-col bg-[#7D66AD] flex-1 rounded-t-xl md:rounded-tr-none md:rounded-l-xl p-5 text-[#47376B] font-light gap-3">
                <div>
                    <h2 className='text-lg font-bold tracking-wider'>RECIEPIENT INFORMATION</h2>
                </div>
                <div>
                    <label
                        htmlFor="name"
                        className=""
                    >
                        NAME
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={handleChange}
                        className="w-full bg-transparent outline-none bg-white p-2 rounded-lg text-[#47376B] font-semibold"
                    />
                </div>
                <div className="flex w-full flex-wrap gap-4">
                    <div className="flex flex-col w-4/12 grow">
                        <label
                            htmlFor="selectedYear"
                            className="whitespace-nowrap truncate"
                        >
                            YEAR (optional)
                        </label>
                        <select
                            id="selectedYear"
                            name="selectedYear"
                            value={selectedYear}
                            onChange={handleDropdownChange}
                            className="p-1 md:p-2 rounded-lg bg-white h-10 text-[#47376B] font-semibold"
                        >
                            <option value="N/A">N/A</option>
                            <option value="1st year">
                                1st year
                            </option>
                            <option value="2nd year">
                                2nd year
                            </option>
                            <option value="3rd year">
                                3rd year
                            </option>
                            <option value="4th year">
                                4th year
                            </option>
                            <option value="Staff">Staff</option>
                        </select>
                    </div>
                    <div className="w-7/12 grow">
                        <label
                            htmlFor="course"
                            className="whitespace-nowrap truncate"
                        >
                            COURSE (optional)
                        </label>
                        <input
                            type="text"
                            id="course"
                            name="course"
                            onChange={handleChange}
                            className="w-full bg-transparent outline-none bg-white p-2 rounded-lg text-[#47376B] font-semibold"
                        />
                    </div>
                </div>
                <div>
                    <label
                        htmlFor="email"
                        className=""
                    >
                        EMAIL
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={handleChange}
                        className="w-full bg-transparent outline-none bg-white p-2 rounded-lg text-[#47376B] font-semibold"
                    />
                </div>
                <div>
                    <label
                        htmlFor="number"
                        className=""
                    >
                        PHONE NUMBER
                    </label>
                    <input
                        type="tel"
                        id="number"
                        name="number"
                        onChange={handleChange}
                        className="w-full bg-transparent outline-none bg-white p-2 rounded-lg text-[#47376B] font-semibold"
                    />
                </div>
            </div>
            <div className="flex flex-col bg-[#5F4C87] flex-1 rounded-b-xl md:rounded-bl-none md:rounded-r-xl p-5 gap-5 text-[#18083A] font-bold">
                <div className='flex flex-row items-center'>
                    <label
                        htmlFor="selectedPaymentOption"
                        className="w-1/2"
                    >
                        PAYMENT OPTION
                    </label>
                    <select
                            id="selectedPaymentOption"
                            name="selectedPaymentOption"
                            value={selectedPaymentOption}
                            onChange={handleDropdownChange}
                            className="p-1 md:px-5 rounded-2xl bg-white h-10 text-[#47376B] font-semibold w-1/2"
                        >
                            <option value="GCASH">GCASH</option>
                            <option value="CASH">
                                CASH
                            </option>
                    </select>
                </div>
                <div className='flex flex-row items-center'>
                    <label
                        htmlFor="proofOfPayment"
                        className="w-1/2"
                    >
                        PROOF OF PAYMENT
                    </label>
                    <div className="w-1/2 flex items-center">
                        <input
                            type="file"
                            accept='image/*'
                            id="proofOfPayment"
                            name='proofOfPayment'
                            className="hidden"
                            onChange={handleImageChange}
                        />
                        <label
                            htmlFor="proofOfPayment"
                            className="w-full flex justify-center items-center bg-white p-2 rounded-2xl text-[#47376B] font-semibold cursor-pointer text-center"
                        >
                            {formimage ? formimage.name : (      
                                <>
                                    <FaCloudArrowUp className="mr-2 w-7 h-7" />
                                    UPLOAD A FILE
                                </>)
                            }
                        </label>
                    </div>
                </div>
                <div className='flex flex-row items-center'>
                    <label
                        htmlFor="status"
                        className="w-1/2"
                    >
                        STATUS
                    </label>
                    <input
                    type="text"
                    className="w-1/2 bg-transparent outline-none bg-white p-2 rounded-2xl text-[#47376B] font-semibold text-center"
                    value={status}
                    readOnly
                    />
                </div>
                <div className='flex flex-row items-center'>
                    <label
                        htmlFor="status"
                        className="w-1/2"
                    >
                        ESTIMATED DATE TO CLAIM
                    </label>
                    <input
                    type="text"
                    className="w-1/2 bg-transparent outline-none bg-white p-2 rounded-2xl text-[#47376B] font-semibold text-center"
                    value={estimatedDate}
                    readOnly
                    />
                </div>
            </div>
        </div>
    )
}

export default ReciepientInformation
