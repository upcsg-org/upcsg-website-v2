import { FiEdit, FiCheck } from 'react-icons/fi'
import { useState, useEffect } from 'react'

type CurrentTermSectionProps = {
    startYear: number
    endYear: number
}

const CurrentTermSection = ({
    startYear,
    endYear,
}: CurrentTermSectionProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [term, setTerm] = useState({ startYear, endYear })

    useEffect(() => {
        setTerm({ startYear, endYear })
    }, [startYear, endYear])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setTerm((prev) => ({
            ...prev,
            [name]: Number(value),
        }))
    }

    return (
        <section className="md:p-20 px-4 mb-4 md:mb-0">
            <div
                className={`flex justify-between items-center text-white p-2 md:p-4 border border-white rounded gap-2 ${isEditing ? 'flex-col md:flex-row' : 'items-center'}`}
            >
                <h2 className="text-base md:text-2xl font-bold">
                    Current Term:
                </h2>

                <div className="flex items-center gap-4">
                    {isEditing ? (
                        <>
                            SY:
                            <input
                                type="number"
                                name="startYear"
                                value={term.startYear}
                                onChange={handleChange}
                                className="w-20 bg-transparent border border-white/30 px-2 py-1 rounded text-sm text-white"
                            />
                            <span className="text-white">-</span>
                            <input
                                type="number"
                                name="endYear"
                                value={term.endYear}
                                onChange={handleChange}
                                className="w-20 bg-transparent border border-white/30 px-2 py-1 rounded text-sm text-white"
                            />
                            <button
                                onClick={() => setIsEditing(false)}
                                title="Save"
                            >
                                <FiCheck size={18} className="text-white" />
                            </button>
                        </>
                    ) : (
                        <>
                            <span className="text-sm md:text-lg font-bold">
                                SY {term.startYear} — {term.endYear}
                            </span>
                            <button
                                className="hover:opacity-80 transition-opacity duration-200"
                                onClick={() => setIsEditing(true)}
                                title="Edit"
                            >
                                <FiEdit size={18} className="text-white" />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}

export default CurrentTermSection
