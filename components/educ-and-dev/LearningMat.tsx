import React from 'react'
import { motion } from 'framer-motion'
import { PiFilePdfDuotone } from 'react-icons/pi'
import { FiDownload } from 'react-icons/fi'

const PDFPreviewCard = () => {
    return (
        <motion.div
            className="bg-[#E2574C] overflow-hidden w-64 h-80 rounded-3xl text-center text-white flex flex-col"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
        >
            <h2 className="text-lg font-semibold mt-4 mb-2">Lecture Notes</h2>
            <div className="flex-grow flex flex-col items-center justify-center space-y-2">
                <PiFilePdfDuotone className="text-white text-6xl" />
                <p className="text-sm">PDF file</p>
                <p className="text-base font-semibold">yearIV_primer.pdf</p>
            </div>
            <div className="mb-4 space-y-2">
                <button className="bg-[#E2574C] text-white py-1 px-4 text-sm underline">
                    Preview
                </button>
                <button className="bg-[#B53629] text-white py-2 px-4 text-sm flex items-center justify-center mx-auto w-full h-full">
                    <span className="flex items-center justify-center pb-2 text-xl font-vietnam font-bold">
                        Download
                        <FiDownload className="ml-3 text-xl font-bold" />
                    </span>
                </button>
            </div>
        </motion.div>
    )
}

export default PDFPreviewCard
