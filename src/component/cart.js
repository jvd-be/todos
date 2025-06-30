import React, { useEffect, useState } from 'react'

export default function Cart ({  onShowCart,data,onUpdate}) {

    
  const removeHandeler = e => {
    if (e.target === e.currentTarget) {
     onShowCart() 
    }
  }
  
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  
  
  useEffect(() => {
    if (data) {
      setTitle(data.title)
      setDescription(data.description)
    }
  }, [data])

  const submitHandeler = async e => {
    e.preventDefault()

    try {
      const res = await fetch(`/api/todos/${data._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title,description})
      })
      
      if (res.ok) {
         onUpdate({ _id: data._id, title, description })
        
        onShowCart()

      }
    } catch (error) {
         console.error('error:', error)
    }
  }

  return (
 <div
  className="fixed inset-0 bg-black/20 flex items-center justify-center z-40"
  onClick={removeHandeler}
>
  <form
    onSubmit={submitHandeler}
    className="bg-white w-64 rounded border p-3 flex flex-col gap-2"
    onClick={e => e.stopPropagation()}
  >
    <input
      className="border rounded px-2 py-1 text-md text-title"
      value={title}
      placeholder="Title"
      onChange={e => setTitle(e.target.value)}
    />

    <textarea
      className="border rounded px-2 py-1 text-md resize-none text-title"
      maxLength={200}
      rows={4}
      value={description}
      onChange={e => setDescription(e.target.value)}
      placeholder="Add description..."
    />

    <button className="bg-black text-white cursor-pointer text-md py-1.5 rounded">
      Submit
    </button>
  </form>
</div>


  )
}
