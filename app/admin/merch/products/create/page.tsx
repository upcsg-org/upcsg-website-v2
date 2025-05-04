"use client"

export default function CreateProductPage() {
  return (
    <div className="min-h-screen bg-[#0e0e1a]">
      {/* Header */}
      <div className="px-10 py-6">
        <h1 className="text-3xl font-bold text-white mb-8">MERCH</h1>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-[250px] bg-[#171A33] rounded-md overflow-hidden mr-6">
            <a className="block py-8 px-6"></a>
            <a
              href="/admin/merch/products"
              className="block py-3 px-6 [background-color:#41A01E] text-white font-medium text-lg"
            >
              Products
            </a>
            <a href="/admin/merch/orders" className="block py-3 px-6 text-white text-lg">
              Orders
            </a>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-[#171A33] rounded-md p-6">
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
                  className="text-blue-400"
                >
                  <path d="m12 19-7-7 7-7" />
                  <path d="M19 12H5" />
                </svg>
              </a>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-gray-400 text-s uppercase block mb-2">PRODUCT NAME</label>
                <input
                  type="text"
                  defaultValue="LOREM IPSUM"
                  className="w-full bg-gray-200 text-[#0F2355] border-0 rounded px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="w-full">
                    <label className="text-gray-400 text-s uppercase block mb-2">PRODUCT TYPE</label>
                    <input
                    type="text"
                    defaultValue="TSHIRT"
                    className="w-full bg-gray-200 text-[#0F2355] border-0 rounded px-3 py-2"
                    />
                </div>
                <div className="w-full">
                    <label className="text-gray-400 text-s uppercase block mb-2">PRICE</label>
                    <input
                    type="text"
                    defaultValue="PHP"
                    className="w-full bg-gray-200 text-[#0F2355] border-0 rounded px-3 py-2"
                    />
                </div>
                <div className="w-full">
                    <label className="text-gray-400 text-s uppercase block mb-2">VARIANT</label>
                    <div className="flex relative bg-gray-200 rounded">
                    <input
                        type="text"
                        defaultValue="WHITE DENIM"
                        className="w-full bg-transparent text-[#0F2355] border-0 rounded px-3 py-2 pr-8"
                    />
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
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
                        >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    </div>
                </div>
                <div className="w-full flex items-end">
                    <button className="w-full bg-[#30b8c4] hover:bg-[#2aa0aa] text-white px-3 py-2 rounded">
                    UPLOAD IMAGE
                    </button>
                </div>
                </div>

                <div>
                    <label className="text-gray-400 text-s uppercase block mb-2">SIZES</label>
                    <div className="space-y-2">
                        <div className="flex items-center w-full">
                        <input
                            type="text"
                            defaultValue="LOREM IPSUM"
                            className="w-1/2 bg-gray-200 text-[#0F2355] border-0 rounded px-3 py-2"
                        />
                        <button className="ml-2 bg-gray-200 rounded-full h-8 w-8 flex items-center justify-center">
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
                            >
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </button>
                        </div>
                        <div className="flex items-center">
                        <div className="bg-gray-300 text-gray-700 px-3 py-1 rounded flex items-center">
                            <span className="mr-2 text-s">SMALL</span>
                            <button>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>


              <div>
                <label className="text-gray-400 text-s uppercase block mb-2">TAGS</label>
                <div className="space-y-2 w-1/2">
                    <input
                    type="text"
                    defaultValue="LOREM IPSUM"
                    className="w-full bg-gray-200 text-[#0F2355] border-0 rounded px-3 py-2"
                    />
                    <div className="bg-gray-300 text-gray-700 px-3 py-1 rounded inline-flex items-center">
                    <span className="mr-2 text-s">TAG 1</span>
                    <button>
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    </div>
                </div>
                </div>

              <div>
                <label className="text-gray-400 text-s uppercase block mb-2">PRODUCT DESCRIPTION</label>
                <div className="grid grid-cols-2 gap-4">
                  <textarea
                    defaultValue="LOREM IPSUM"
                    className="w-full bg-gray-200 text-[#0F2355] border-0 rounded px-3 py-2 min-h-[200px]"
                  ></textarea>
                  <div className="bg-gray-400 rounded-md flex flex-col items-center justify-center min-h-[200px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-600 mb-2"
                    >
                      <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 3v12"></path>
                    </svg>
                    <div className="text-gray-600 text-center font-medium">
                      <div>UPLOAD</div>
                      <div>COVER PHOTO</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-s uppercase block mb-2">STATUS</label>
                <input
                  type="text"
                  defaultValue="AVAILABLE"
                  className="w-1/2 bg-gray-200 text-[#0F2355] border-0 rounded px-3 py-2"
                />
              </div>

              <div className="pt-4 flex justify-center">
              <button className="bg-[#5077C3] hover:bg-[#4066A8] text-white px-20 py-2 rounded">SAVE CHANGES</button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
