import React from 'react'
import { motion } from 'framer-motion'
import { BiSolidFilePdf } from 'react-icons/bi'
import { FiDownload } from 'react-icons/fi'

interface PropsInterface {
    material: string
    title: string
}

const PDFMat = (props: PropsInterface) => {
    const { material, title } = props
    return (
        <motion.div
            className="bg-[#E2574C] overflow-hidden w-64 h-[360px] rounded-3xl text-center text-white flex flex-col"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
        >
            <h2 className="text-xl font-extralight mt-2 mb-2 font-vietnam">
                {material}
            </h2>
            <div className="flex-grow flex flex-col items-center justify-center space-y-1">
                <BiSolidFilePdf className="text-white text-7xl" />
                <p className="text-lg font-vietnam font-light">PDF file</p>
                <p className="text-xl font-bold font-vietnam inline-block overflow-ellipsis w-[248px] overflow-hidden whitespace-nowrap">
                    {title}
                </p>
            </div>
            <div className="mb-3">
                <button className="bg-[#E2574C] text-white py-1 px-4 text-lg font-semibold font-vietnam underline">
                    Preview
                </button>
                <button className="bg-[#B53629] text-white py-2 px-4 text-sm flex justify-center  relative top-2 mx-auto w-full h-full">
                    <span className="flex items-center justify-center pt-1 text-xl font-vietnam font-semibold">
                        Download
                        <FiDownload className="ml-3 text-xl font-bold" />
                    </span>
                </button>
            </div>
        </motion.div>
    )
}

export default PDFMat
