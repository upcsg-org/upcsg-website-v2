"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"

export default function CreateProductPage() {
  const [sizeRows, setSizeRows] = useState([{ id: 1 }])
  const [isLimited, setIsLimited] = useState(false)
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [variantImage, setVariantImage] = useState<string | null>(null)

  const coverImageRef = useRef<HTMLInputElement>(null)
  const variantImageRef = useRef<HTMLInputElement>(null)

  const addSizeRow = () => {
    const newId = sizeRows.length > 0 ? Math.max(...sizeRows.map((row) => row.id)) + 1 : 1
    setSizeRows([...sizeRows, { id: newId }])
  }

  const handleCoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const imageUrl = URL.createObjectURL(file)
      setCoverImage(imageUrl)
    }
  }

  const handleVariantImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const imageUrl = URL.createObjectURL(file)
      setVariantImage(imageUrl)
    }
  }

  const removeCoverImage = () => {
    setCoverImage(null)
    if (coverImageRef.current) {
      coverImageRef.current.value = ""
    }
  }

  const removeVariantImage = () => {
    setVariantImage(null)
    if (variantImageRef.current) {
      variantImageRef.current.value = ""
    }
  }

  return (
    <div className="flex-1 rounded-md p-6 bg-[#0F1729] text-white">
      <div className="mb-6 pb-3 border-b border-black">
        <a href="/admin/merch/products" className="text-blue-400 hover:text-blue-300 flex items-center">
          {/* Back arrow icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-400 mr-2"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Back to Products
        </a>
      </div>

  
        <h2 className="text-lg font-medium mb-4">PRODUCT DETAILS</h2>

        <div className="grid grid-cols-10 gap-6 border-4 border-[#242460] rounded-lg p-4 mb-8" >
          <div className="col-span-7 space-y-6 pr-4">
            <div>
              <label className="text-gray-400 text-s uppercase block mb-2">PRODUCT NAME</label>
              <input
                type="text"
                placeholder="Enter product name"
                className="w-full bg-white text-black border-0 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-gray-400 text-s uppercase block mb-2">PRODUCT TYPE</label>
              <input
                type="text"
                placeholder="T-SHIRT"
                className="w-full bg-white text-black border-0 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-gray-400 text-s uppercase block mb-2">PRODUCT DESCRIPTION</label>
              <textarea
                placeholder="Enter product description"
                className="w-full bg-white text-black border-0 rounded px-3 py-2 min-h-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>

          <div className="col-span-3">
            <div className="flex flex-col h-full">
              <input
                type="file"
                ref={coverImageRef}
                onChange={handleCoverImageUpload}
                className="hidden"
                accept="image/*"
              />

              <div
                className="bg-[#1C2539] rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-[#232C43] transition-colors mb-2 h-[400px] relative overflow-hidden"
                onClick={() => !coverImage && coverImageRef.current?.click()}
              >
                {coverImage ? (
                  <Image src={coverImage || "/placeholder.svg"} alt="Cover photo" fill className="object-cover" />
                ) : (
                  <div className="text-gray-400 text-center font-medium">
                    <div>UPLOAD</div>
                    <div>COVER PHOTO</div>
                  </div>
                )}
              </div>

              {coverImage ? (
                <button
                  onClick={removeCoverImage}
                  className="w-full bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
                >
                  REMOVE IMAGE
                </button>
              ) : (
                <button
                  onClick={() => coverImageRef.current?.click()}
                  className="w-full bg-[#30b8c4] hover:bg-[#2aa0aa] text-white px-3 py-2 rounded"
                >
                  UPLOAD IMAGE
                </button>
              )}
            </div>
          </div>
        </div>

        <h2 className="text-lg font-medium mb-4">VARIANTS</h2>

        <div className="mb-6 pb-6 border-4 border-[#242460] rounded-lg p-4">
          <div className="grid grid-cols-10 gap-6">
            <div className="col-span-7 pr-4">
              <div className="mb-6">
                <label className="text-gray-400 text-s uppercase block mb-2">VARIANT NAME</label>
                <input
                  type="text"
                  placeholder="e.g. Black Denim"
                  className="w-full bg-white text-black border-0 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <div className="grid grid-cols-3 gap-4 mb-2">
                  <div>
                    <label className="text-gray-400 text-s uppercase block mb-2">SIZE</label>
                  </div>
                  <div>
                    <label className="text-gray-400 text-s uppercase block mb-2">PRICE</label>
                  </div>
                  <div>
                    <label className="text-gray-400 text-s uppercase block mb-2">QUANTITY</label>
                  </div>
                </div>

                {sizeRows.map((row, index) => (
                  <div key={row.id} className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Enter size"
                        className="w-full bg-white text-black border-0 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="PHP"
                        className="w-full bg-white text-black border-0 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        placeholder="0"
                        step="0.01"
                        min="0"
                        className="w-full bg-white text-black border-0 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <button
                  onClick={addSizeRow}
                  className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white px-4 py-2 rounded flex items-center justify-center"
                >
                  {/* Plus icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  ADD MORE SIZES
                </button>
              </div>
            </div>

            <div className="col-span-3 self-start sticky top-6">
              <div className="flex flex-col">
                <input
                  type="file"
                  ref={variantImageRef}
                  onChange={handleVariantImageUpload}
                  className="hidden"
                  accept="image/*"
                />

                <div
                  className="bg-[#1C2539] rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-[#232C43] transition-colors mb-2 h-[400px] relative overflow-hidden"
                  onClick={() => !variantImage && variantImageRef.current?.click()}
                >
                  {variantImage ? (
                    <Image src={variantImage || "/placeholder.svg"} alt="Variant image" fill className="object-cover" />
                  ) : (
                    <div className="text-gray-400 text-center font-medium">
                      <div>VARIANT</div>
                      <div>IMAGE</div>
                    </div>
                  )}
                </div>

                {variantImage ? (
                  <button
                    onClick={removeVariantImage}
                    className="w-full bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
                  >
                    REMOVE IMAGE
                  </button>
                ) : (
                  <button
                    onClick={() => variantImageRef.current?.click()}
                    className="w-full bg-[#30b8c4] hover:bg-[#2aa0aa] text-white px-3 py-2 rounded"
                  >
                    UPLOAD IMAGE
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center mt-6">
            <div
              className={`w-5 h-5 rounded-full border-2 mr-2 flex items-center justify-center cursor-pointer ${isLimited ? "border-purple-500 bg-purple-500" : "border-gray-400"}`}
              onClick={() => setIsLimited(!isLimited)}
            >
              {isLimited && <div className="w-2 h-2 rounded-full bg-white"></div>}
            </div>
            <label
              htmlFor="limitedEdition"
              className="text-purple-400 flex items-center cursor-pointer"
              onClick={() => setIsLimited(!isLimited)}
            >
              LIMITED EDITION
            </label>
          </div>
        </div>

        <div className="flex justify-center">
          <button className="bg-[#5077C3] hover:bg-[#4066A8] text-white px-20 py-3 rounded font-medium">
            SAVE CHANGES
          </button>
        </div>
    </div>
  )
}
