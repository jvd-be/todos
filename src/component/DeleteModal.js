import React from 'react'

export default function DeleteModal({data,onShowDeleteModal,onDeleted}) {

    
  return (
<div onClick={()=>{onShowDeleteModal()}} className="fixed inset-0 backdrop-blur-md bg-black/60 flex items-center justify-center z-50">
  <div className="bg-white w-72 rounded-xl p-5 shadow-lg flex flex-col items-center gap-6">
    <h3 className="text-center text-base text-gray-800 font-medium">
      Are you sure you want to delete this todo?
    </h3>

    <div className="flex gap-4">
      <button
        onClick={() => {
          onDeleted(data._id);
          onShowDeleteModal();
        }}
        className="bg-green-500 text-white cursor-pointer hover:scale-105 hover:shadow shadow-green-200 px-4 py-2 rounded-md text-md hover:bg-green-600 transition"
      >
        Yes
      </button>
      <button
        onClick={onShowDeleteModal}
        className="bg-red-500 text-white px-4 cursor-pointer hover:scale-105 hover:shadow shadow-red-200 py-2 rounded-md text-md hover:bg-red-600 transition"
      >
        No
      </button>
    </div>
  </div>
</div>


  )
}
