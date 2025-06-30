import React, { useEffect, useState } from 'react'
import { IoMdDoneAll } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'
import { FiEdit3 } from 'react-icons/fi'
export default function TodoRow ({
  onSelect,
  title,
  num,
  condition,
  id,
  onShowDeleteModal,
  onShowCart
}) {
  const [status, setStatus] = useState(condition)
  const [loading, setLoading] = useState(false)

  const handeleChange = async e => {
    const newState = e.target.value
    setStatus(newState)

    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newState })
      })
    } catch (error) {
      console.log('error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleted = () => {
    onShowDeleteModal()
    onSelect()
  }
  const handleEditModal = () => {
    onShowCart()
    onSelect()
  }
  const getStatusColor = status => {
    switch (status) {
      case 'Done':
        return 'bg-green-100 text-green-700 border border-green-300'
      case 'Not-Done':
        return 'bg-red-100 text-red-700 border border-red-300'
      case 'In-Progress':
        return 'bg-yellow-100 text-yellow-700 border border-yellow-300'
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-300'
    }
  }
  

  useEffect(() => {
    const handleBeforeUnload = e => {
      if (loading) {
        e.preventDefault()
        e.returnValue = ''
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [loading])

  const setDoneHandeler = async () => {
    setStatus('Done')

    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'Done' })
      })
    } catch (error) {
      console.log('error:', error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='flex items-center justify-between gap-x-1 sm:gap-x-3 m-1 my-2 sm:m-3 text-text'>
      <span className=' hidden md:block text-center bg-blue-500 text-white px-2 md:px-5  py-1 rounded shadow-md hover:scale-110 hover:shadow-lg transition-transform duration-200 ease-in-out'>
        {num + 1}
      </span>
      <h2 className={`w-6/12 sm:w-4/12 truncate px-1 sm:px-2 py-1 text-[12px] rounded sm:text-sm font-medium ${getStatusColor(status)}`}>
  {title}
</h2>


      <select
        disabled={loading}
        onChange={handeleChange}
        className={`cursor-pointer p-1 w-16 md:w-32 text-center rounded-md shadow-md border font-medium text-[12px] sm:text-sm ${getStatusColor(
          status
        )} focus:ring-2 focus:ring-offset-1 focus:ring-green-500 transition-all duration-200 ease-in-out outline-none`}
        value={status}
        name=''
        id=''
      >
        <option className='' value='Done'>
          Done
        </option>
        <option value='In-Progress'>In Progress</option>
        <option value='Not-Done'>Not Done</option>
      </select>

      <div className='flex items-center gap-2 sm:gap-6 md:gap-10 text-sm sm:text-xl'>
        <button
          onClick={setDoneHandeler}
          className='text-green-600 hidden sm:block cursor-pointer hover:text-green-800 transition-colors duration-150 focus:outline-none'
          aria-label='Mark as complete'
        >
          <IoMdDoneAll className='sm:w-6 sm:h-6 h-3 w-3' />
        </button>

        <button
          onClick={handleEditModal}
          className='text-blue-500 cursor-pointer hover:text-blue-700 transition-colors duration-150 focus:outline-none'
          aria-label='Edit item'
        >
          <FiEdit3 className='sm:w-6 sm:h-6 h-4 w-4' />
        </button>

        <button
          onClick={handleDeleted}
          className='text-red-500 cursor-pointer hover:text-red-700 transition-colors duration-150 focus:outline-none'
          aria-label='Delete item'
        >
          <MdDelete className='sm:w-6 sm:h-6 h-4 w-4' />
        </button>
      </div>
    </div>
  )
}
