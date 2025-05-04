"use client"

export default function CreateProductPage() {
  return (
    <div className="min-h-screen bg-[#0e0e1a]">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-[#0e0e1a] border-b border-blue-900">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-[#0e0e1a] font-bold text-xs">UP</span>
          </div>
          <div className="text-white font-bold text-xs leading-tight">
            <div>UP COMPUTER</div>
            <div>SCIENCE GUILD</div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-white text-sm">
            NEWS
          </a>
          <a href="#" className="text-white text-sm">
            BADGES
          </a>
          <a href="#" className="text-white text-sm">
            LOGIN
          </a>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-[220px] bg-[#0e0e1a] p-6">
          <h1 className="text-2xl font-bold text-white mb-6">MERCH</h1>
          <nav>
            <ul>
              <li className="mb-2">
                <a href="/admin/merch/products" className="block py-2 px-4 bg-green-600 text-white font-medium rounded">
                  Products
                </a>
              </li>
              <li>
                <a
                  href="/admin/merch/orders"
                  className="block py-2 px-4 text-white hover:bg-gray-800 hover:text-white rounded"
                >
                  Orders
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="mb-4">
            <a href="/admin/merch/products" className="text-blue-400 hover:text-blue-300 flex items-center">
              {/* Back arrow icon */}
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
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              Back
            </a>
          </div>

          <div className="bg-[#1a1a2e] p-6 rounded-md">
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-xs uppercase block mb-1">Product Name</label>
                <input
                  type="text"
                  placeholder="LOREM IPSUM"
                  className="w-full bg-gray-200 text-gray-800 border-0 rounded px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-gray-400 text-xs uppercase block mb-1">Product Type</label>
                  <input
                    type="text"
                    value="T-SHIRT"
                    className="w-full bg-gray-200 text-gray-800 border-0 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-xs uppercase block mb-1">Price</label>
                  <input
                    type="text"
                    placeholder="PHP"
                    className="w-full bg-gray-200 text-gray-800 border-0 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-xs uppercase block mb-1">Variant</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value="WHITE DENIM"
                      className="flex-1 bg-gray-200 text-gray-800 border-0 rounded px-3 py-2"
                    />
                    <button className="bg-[#30b8c4] hover:bg-[#2aa0aa] text-white px-3 py-2 rounded">
                      UPLOAD IMAGE
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-xs uppercase block mb-1">Sizes</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="LOREM IPSUM"
                    className="flex-1 bg-gray-200 text-gray-800 border-0 rounded px-3 py-2"
                  />
                  <button className="rounded-full h-6 w-6 p-0 border border-gray-400 flex items-center justify-center">
                    <span className="text-gray-400">+</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-xs uppercase block mb-1">Tags</label>
                <input
                  type="text"
                  placeholder="LOREM IPSUM"
                  className="w-full bg-gray-200 text-gray-800 border-0 rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="text-gray-400 text-xs uppercase block mb-1">Product Description</label>
                <div className="grid grid-cols-2 gap-4">
                  <textarea
                    placeholder="LOREM IPSUM"
                    className="w-full bg-gray-200 text-gray-800 border-0 rounded px-3 py-2 min-h-[100px]"
                  ></textarea>
                  <div className="bg-gray-200 rounded-md flex flex-col items-center justify-center min-h-[100px]">
                    {/* Upload icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-400 mb-2"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <div className="text-gray-500 text-center">
                      <div>UPLOAD</div>
                      <div>COVER PHOTO</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-xs uppercase block mb-1">Status</label>
                <input
                  type="text"
                  value="AVAILABLE"
                  className="w-full bg-gray-200 text-gray-800 border-0 rounded px-3 py-2"
                />
              </div>

              <div className="pt-4 flex justify-center">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded">SAVE CHANGES</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
