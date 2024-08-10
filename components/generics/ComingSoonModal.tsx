import { Dispatch, SetStateAction } from 'react'

interface PropsInterface {
    toggleModal: Dispatch<SetStateAction<boolean>>
}

const ComingSoonModal = (props: PropsInterface) => {
    const { toggleModal } = props

    const handleCloseModal = () => {
        toggleModal(false)
    }

    return (
        <>
            <div className="fixed inset-0 z-30 bg-gray-800 bg-opacity-75"></div>
            <div className="z-40 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-9 sm:gap-14 items-center h-[70vh] w-[90vw] justify-center rounded-lg bg-main-dark">
                <h1 className="text-2xl sm:text-5xl md:text-6xl font-economica italic text-csg-green-100 font-bold">
                    Coming Soon
                </h1>
                <button
                    className="rounded-lg bg-csg-green-300 px-10 py-4 text-xs sm:text-base"
                    onClick={handleCloseModal}
                >
                    Go Back
                </button>
            </div>
        </>
    )
}

export default ComingSoonModal
