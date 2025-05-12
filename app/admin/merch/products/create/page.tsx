"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

export default function CreateProductPage() {
  const [productName, setProductName] = useState("")
  const [productType, setProductType] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [variants, setVariants] = useState([
    {
      id: 1,
      name: "",
      sizeRows: [{ id: 1, size: "", price: "", quantity: "" }],
      isLimited: false,
      variantImage: null,
    },
  ])
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [formErrors, setFormErrors] = useState<{
    coverImage: boolean
    productName: boolean
    productType: boolean
    productDescription: boolean
    variants: {
      id: number
      name: boolean
      image: boolean
      sizes: boolean
    }[]
  }>({
    coverImage: false,
    productName: false,
    productType: false,
    productDescription: false,
    variants: [{ id: 1, name: false, image: false, sizes: false }],
  })
  const [showValidation, setShowValidation] = useState(false)
  const [isFormValid, setIsFormValid] = useState(true)

  const variantImageRefs = useRef<(HTMLInputElement | null)[]>([])
  const coverImageRef = useRef<HTMLInputElement>(null)

  // Run validation when showValidation changes or when form fields change
  useEffect(() => {
    if (showValidation) {
      validateForm()
    }
  }, [showValidation, productName, productType, productDescription, coverImage, variants])

  const validateForm = () => {
    let isValid = true
    const newErrors = {
      coverImage: !coverImage,
      productName: !productName.trim(),
      productType: !productType.trim(),
      productDescription: !productDescription.trim(),
      variants: variants.map((variant) => ({
        id: variant.id,
        name: !variant.name.trim(),
        image: !variant.variantImage,
        sizes: variant.sizeRows.some((row) => !row.size.trim() || !row.price.trim() || !row.quantity),
      })),
    }

    setFormErrors(newErrors)

    // Check if any errors exist
    if (newErrors.coverImage || newErrors.productName || newErrors.productType || newErrors.productDescription) {
      isValid = false
    }

    for (const variant of newErrors.variants) {
      if (variant.name || variant.image || variant.sizes) {
        isValid = false
        break
      }
    }

    setIsFormValid(isValid)
    return isValid
  }

  const handleSubmit = () => {
    setShowValidation(true)

    const isValid = validateForm()
    if (isValid) {
      // Form is valid, proceed with submission
      console.log("Form submitted successfully")
      // Here you would typically send the data to your API
      alert("Product saved successfully!")
    }
  }

  const addSizeRow = (variantIndex: number) => {
    const updatedVariants = [...variants]
    const variant = updatedVariants[variantIndex]
    const newId = variant.sizeRows.length > 0 ? Math.max(...variant.sizeRows.map((row) => row.id)) + 1 : 1
    variant.sizeRows = [...variant.sizeRows, { id: newId, size: "", price: "", quantity: "" }]
    setVariants(updatedVariants)
  }

  const addVariant = () => {
    const newId = variants.length > 0 ? Math.max(...variants.map((variant) => variant.id)) + 1 : 1
    setVariants([
      ...variants,
      {
        id: newId,
        name: "",
        sizeRows: [{ id: 1, size: "", price: "", quantity: "" }],
        isLimited: false,
        variantImage: null,
      },
    ])

    setFormErrors((prev) => ({
      ...prev,
      variants: [...prev.variants, { id: newId, name: false, image: false, sizes: false }],
    }))
  }

  const toggleLimited = (variantIndex: number) => {
    const updatedVariants = [...variants]
    updatedVariants[variantIndex].isLimited = !updatedVariants[variantIndex].isLimited
    setVariants(updatedVariants)
  }

  const handleVariantNameChange = (variantIndex: number, value: string) => {
    const updatedVariants = [...variants]
    updatedVariants[variantIndex].name = value
    setVariants(updatedVariants)
  }

  const handleSizeRowChange = (variantIndex: number, rowIndex: number, field: string, value: string) => {
    const updatedVariants = [...variants]
    const row = updatedVariants[variantIndex].sizeRows[rowIndex] as any
    row[field] = value
    setVariants(updatedVariants)
  }

  const handleCoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const imageUrl = URL.createObjectURL(file)
      setCoverImage(imageUrl)
    }
  }

  const handleVariantImageUpload = (e: React.ChangeEvent<HTMLInputElement>, variantIndex: number) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const imageUrl = URL.createObjectURL(file)

      const updatedVariants = [...variants]
      updatedVariants[variantIndex].variantImage = imageUrl
      setVariants(updatedVariants)
    }
  }

  const removeCoverImage = () => {
    setCoverImage(null)
    if (coverImageRef.current) {
      coverImageRef.current.value = ""
    }
  }

  const removeVariantImage = (variantIndex: number) => {
    const updatedVariants = [...variants]
    updatedVariants[variantIndex].variantImage = null
    setVariants(updatedVariants)

    if (variantImageRefs.current[variantIndex]) {
      variantImageRefs.current[variantIndex]!.value = ""
    }
  }

  return (
    <div className="flex-1 rounded-md p-6 bg-[#0F1729] text-white">
      <div className="mb-6 pb-3 border-b border-black">
        <button className="flex items-center text-[#2D4486] hover:text-[#25376e] text-xl">
          <svg className="w-7 h-7 mr-2" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 30 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h26M12 5l-7 7 7 7" />
          </svg>
          Back to Products
        </button>
      </div>

      <h2 className="text-lg font-medium mb-4">PRODUCT DETAILS</h2>

      <div className="grid grid-cols-10 gap-6 border-4 border-[#242460] rounded-lg p-4 mb-8">
        <div className="col-span-7 space-y-6 pr-4">
          <div>
            <label className="text-gray-400 text-s uppercase block mb-2">PRODUCT NAME</label>
            <input
              type="text"
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className={`w-full bg-white text-black border-0 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                showValidation && formErrors.productName ? "border-2 border-red-500 bg-red-50" : ""
              }`}
            />
            {showValidation && formErrors.productName && (
              <p className="text-red-500 text-sm mt-1">Product name is required</p>
            )}
          </div>

          <div>
            <label className="text-gray-400 text-s uppercase block mb-2">PRODUCT TYPE</label>
            <input
              type="text"
              placeholder="T-SHIRT"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className={`w-full bg-white text-black border-0 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                showValidation && formErrors.productType ? "border-2 border-red-500 bg-red-50" : ""
              }`}
            />
            {showValidation && formErrors.productType && (
              <p className="text-red-500 text-sm mt-1">Product type is required</p>
            )}
          </div>

          <div>
            <label className="text-gray-400 text-s uppercase block mb-2">PRODUCT DESCRIPTION</label>
            <textarea
              placeholder="Enter product description"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className={`w-full bg-white text-black border-0 rounded px-3 py-2 min-h-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                showValidation && formErrors.productDescription ? "border-2 border-red-500 bg-red-50" : ""
              }`}
            ></textarea>
            {showValidation && formErrors.productDescription && (
              <p className="text-red-500 text-sm mt-1">Product description is required</p>
            )}
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
              className={`bg-[#1C2539] rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-[#232C43] transition-colors mb-2 h-[400px] relative overflow-hidden ${
                showValidation && formErrors.coverImage ? "border-2 border-red-500" : ""
              }`}
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

            {showValidation && formErrors.coverImage && (
              <div className="mt-2 text-red-500 text-sm">Cover image is required</div>
            )}

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

      {variants.map((variant, variantIndex) => (
        <div key={variant.id} className="mb-6 pb-6 bg-[#22264B] border-4 border-[#242460] rounded-lg p-4">
          <div className="grid grid-cols-10 gap-6">
            <div className="col-span-7 pr-4">
              <div className="mb-6">
                <label className="text-gray-400 text-s uppercase block mb-2">VARIANT NAME</label>
                <input
                  type="text"
                  placeholder="e.g. Black Denim"
                  value={variant.name}
                  onChange={(e) => handleVariantNameChange(variantIndex, e.target.value)}
                  className={`w-full bg-white text-black border-0 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    showValidation && formErrors.variants[variantIndex]?.name ? "border-2 border-red-500 bg-red-50" : ""
                  }`}
                />
                {showValidation && formErrors.variants[variantIndex]?.name && (
                  <p className="text-red-500 text-sm mt-1">Variant name is required</p>
                )}
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

                {variant.sizeRows.map((row, index) => (
                  <div key={row.id} className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Enter size"
                        value={row.size}
                        onChange={(e) => handleSizeRowChange(variantIndex, index, "size", e.target.value)}
                        className={`w-full bg-white text-black border-0 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          showValidation && formErrors.variants[variantIndex]?.sizes
                            ? "border-2 border-red-500 bg-red-50"
                            : ""
                        }`}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="PHP"
                        value={row.price}
                        onChange={(e) => handleSizeRowChange(variantIndex, index, "price", e.target.value)}
                        className={`w-full bg-white text-black border-0 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          showValidation && formErrors.variants[variantIndex]?.sizes
                            ? "border-2 border-red-500 bg-red-50"
                            : ""
                        }`}
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        placeholder="0"
                        step="0.01"
                        min="0"
                        value={row.quantity}
                        onChange={(e) => handleSizeRowChange(variantIndex, index, "quantity", e.target.value)}
                        className={`w-full bg-white text-black border-0 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          showValidation && formErrors.variants[variantIndex]?.sizes
                            ? "border-2 border-red-500 bg-red-50"
                            : ""
                        }`}
                      />
                    </div>
                  </div>
                ))}
                {showValidation && formErrors.variants[variantIndex]?.sizes && (
                  <p className="text-red-500 text-sm mt-1">All size fields must be completed</p>
                )}
              </div>

              <div className="pt-4 mb-6 flex items-center justify-center w-full">
                <button
                  onClick={() => addSizeRow(variantIndex)}
                  className="w-1/4 bg-[#4CAF50] hover:bg-[#45a049] text-white px-4 py-2 rounded flex items-center justify-center"
                >
                  ADD MORE SIZES
                </button>
              </div>
            </div>

            <div className="col-span-3 self-start sticky top-6">
              <div className="flex flex-col">
                <input
                  type="file"
                  ref={(el) => (variantImageRefs.current[variantIndex] = el)}
                  onChange={(e) => handleVariantImageUpload(e, variantIndex)}
                  className="hidden"
                  accept="image/*"
                />

                <div
                  className={`bg-[#1C2539] rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-[#232C43] transition-colors mb-2 h-[400px] relative overflow-hidden ${
                    showValidation && formErrors.variants[variantIndex]?.image ? "border-2 border-red-500" : ""
                  }`}
                  onClick={() => !variant.variantImage && variantImageRefs.current[variantIndex]?.click()}
                >
                  {variant.variantImage ? (
                    <Image
                      src={variant.variantImage || "/placeholder.svg"}
                      alt="Variant image"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="text-gray-400 text-center font-medium">
                      <div>UPLOAD</div>
                      <div>VARIANT IMAGE</div>
                    </div>
                  )}
                </div>

                {showValidation && formErrors.variants[variantIndex]?.image && (
                  <div className="mt-2 text-red-500 text-sm">Variant image is required</div>
                )}

                {variant.variantImage ? (
                  <button
                    onClick={() => removeVariantImage(variantIndex)}
                    className="w-full bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
                  >
                    REMOVE IMAGE
                  </button>
                ) : (
                  <button
                    onClick={() => variantImageRefs.current[variantIndex]?.click()}
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
              className={`w-5 h-5 rounded-full border-2 mr-2 flex items-center justify-center cursor-pointer ${variant.isLimited ? "border-purple-500 bg-purple-500" : "border-gray-400"}`}
              onClick={() => toggleLimited(variantIndex)}
            >
              {variant.isLimited && <div className="w-2 h-2 rounded-full bg-white"></div>}
            </div>
            <label
              htmlFor={`limitedEdition-${variant.id}`}
              className="text-purple-400 flex items-center cursor-pointer"
              onClick={() => toggleLimited(variantIndex)}
            >
              LIMITED EDITION
            </label>
          </div>
        </div>
      ))}

      {/* Add the "Add more variants" button */}
      <div className="mb-6 flex items-center justify-center w-full">
        <button
          onClick={addVariant}
          className="w-1/5 bg-[#B63EFF] hover:bg-[#A035E5] text-white px-4 py-2 rounded flex items-center justify-center"
        >
          ADD MORE VARIANTS
        </button>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="w-1/2 bg-[#5077C3] hover:bg-[#4066A8] text-white px-20 py-3 rounded font-medium"
        >
          SAVE CHANGES
        </button>
      </div>
    </div>
  )
}
