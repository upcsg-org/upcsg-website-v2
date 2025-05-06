'use client'
import { useState } from "react";

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [orders, setOrders] = useState([
    { id: 1, pointPerson: "NAME OF POINT PERSON", type: "PHP", products: "ORDER DETAILS (Products)" },
    { id: 2, pointPerson: "NAME OF POINT PERSON", type: "PHP", products: "ORDER DETAILS (Products)" },
    { id: 3, pointPerson: "NAME OF POINT PERSON", type: "PHP", products: "ORDER DETAILS (Products)" },
    { id: 4, pointPerson: "NAME OF POINT PERSON", type: "PHP", products: "ORDER DETAILS (Products)" },
    { id: 5, pointPerson: "NAME OF POINT PERSON", type: "PHP", products: "ORDER DETAILS (Products)" },
  ]);

  const handleVoidOrder = (id) => {
    // In a real application, you would call an API to void the order
    console.log(`Voiding order ${id}`);
  };

  const handleMarkClaimed = (id) => {
    // In a real application, you would call an API to mark as claimed
    console.log(`Marking order ${id} as claimed`);
  };

  return (
    <div className="">
      {/* Filter controls */}
      <div className="flex w-full justify-end gap-2 border-b-2 border-[#242460] pb-3 mb-6">
        <div className="relative w-[180px]">
          <select className="w-full appearance-none bg-[#31334C] text-white border border-black focus:border-white rounded px-3 py-2 pr-8">
            <option value="product">Product</option>
            <option value="category">Category</option>
            <option value="price">Price</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="relative w-[180px]">
          <select className="w-full appearance-none bg-[#31334C] text-white border border-black focus:border-white rounded px-3 py-2 pr-8">
            <option value="tag">Tag</option>
            <option value="tote">Tote Bags</option>
            <option value="shirt">Shirts</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="relative w-[180px]">
          <input
            type="search"
            placeholder="Search"
            className="w-full bg-[#31334C] text-white border border-black focus:border-white rounded px-3 py-2 pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Order list */}
      <div className="flex-1">
        {orders.map((order) => (
          <div key={order.id} className="border-[#242460] border-2 rounded-xl p-4 mb-4 flex items-center">
            <div className="flex-shrink-0 mr-4">
              <div className="w-16 h-16 bg-[#1D203E] border border-[#2A2D4E] rounded flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-white text-lg font-bold">{order.pointPerson}</h3>
              <p className="text-gray-400">{order.products}</p>
              <p className="text-blue-400 mt-1">{order.type}</p>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={() => handleVoidOrder(order.id)}
                className="bg-[#D15252] hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex items-center"
              >
                <span className="mr-1">✕</span> VOID ORDER
              </button>
              
              <button 
                onClick={() => handleMarkClaimed(order.id)}
                className="bg-[#69B133] hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center"
              >
                MARK AS CLAIMED <span className="ml-1">✓</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
