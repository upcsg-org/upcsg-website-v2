import { Dispatch, SetStateAction } from 'react'
import TheButton from '../../admin/permissions/TheButton'
import { FaExclamation } from "react-icons/fa"

interface PropsInterface {
    toggleModal: Dispatch<SetStateAction<boolean>>
}

const PopRemoveUserModal = (props: PropsInterface) => {
    const { toggleModal } = props

    const handleCloseModal = () => {
        toggleModal(false)
    }
    return (
        <>
            <div className="fixed inset-0 z-30  bg-gray-800 bg-opacity-75"></div>
            <div className="z-40 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center bg-[#000017] rounded-3xl h-[45vh] sm:h-[38vh] lg:h-[33vh]  w-[80vw] sm:w-[60vw] lg:w-[40vw]">
                <div className="flex-grow"/>
                <FaExclamation  className="h-[170px] w-[150px] text-[#638cfe]"/>
                <div className="w-[33vw] h-[8vh] flex items-center justify-center">
                    <h1 className="text-center lg:!text-3xl sm:!text-base !text-sm font-bold text-[#C6E0FF]">
                        REMOVE (USER) AS A (ROLE)?
                    </h1>
                </div>
                <div className="w-[80vw] sm:w-[60vw] lg:w-[40vw] h-[8vh] sm:h-[8vh] lg:h-[6vh] flex justify-center">
                    <TheButton onClick={handleCloseModal} className="text-[#6868A4] w-full rounded-t-none rounded-br-none bg-[#1D1D4F] font-bold lg:!text-4xl sm:!text-2xl !text-xl">
                        YES
                    </TheButton>
                    <TheButton onClick={handleCloseModal} className="text-[#2C2C8C] w-full rounded-t-none rounded-bl-none bg-[#0C0C3A] font-bold lg:!text-4xl sm:!text-2xl !text-xl">
                        NO
                    </TheButton>
                </div>
            </div>
        </>
    )
}

export default PopRemoveUserModal
