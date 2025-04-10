import { Dispatch, SetStateAction } from 'react'
import { CiCircleCheck } from "react-icons/ci";

interface PropsInterface {
    toggleModal: Dispatch<SetStateAction<boolean>>
}

const PopUserAddedModal = (props: PropsInterface) => {

    return (
        <>
            <div className="fixed inset-0 z-30 bg-gray-800 bg-opacity-75"></div>
            <div className="z-40 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center bg-[#000017] rounded-3xl h-[40vh] sm:h-[38vh] lg:h-[33vh]  w-[80vw] sm:w-[60vw] lg:w-[40vw]">
                <div className="flex-grow"/>
                <CiCircleCheck className="h-[200px] w-[200px] text-[#638cfe]"/>
                <div className="w-[80vw] sm:w-[60vw] lg:w-[40vw] h-[8vh] flex items-center justify-center">
                    <h1 className="text-center lg:!text-3xl sm:!text-base !text-sm font-bold text-[#C6E0FF]">
                        (USER) ALREADY EXISTS AS A (ROLE).
                    </h1>
                </div>
                <div className="flex-grow"/>
            </div>
        </>
    )
}

export default PopUserAddedModal
