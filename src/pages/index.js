import React, { useEffect, useState } from 'react'
import Cart from '@/component/cart'
import { TiTickOutline } from 'react-icons/ti'
import { AiOutlineAlignLeft } from 'react-icons/ai'
import TodoRow from '@/component/TodoRow'
import DeleteModal from '@/component/DeleteModal'
import Sidebar from '@/component/Sidbar'
import { supabase } from '../../lib/supabaseClient'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import TaskChart from '@/component/chart'

// pages/dashboard/index.js یا هر صفحه protected

export const getServerSideProps = async ctx => {
  const supabase = createPagesServerClient(ctx)

  console.log('supabse:', supabase)

  const {
    data: { session }
  } = await supabase.auth.getSession()
  console.log('session', session)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: {
      user: session.user
    }
  }
}

export default function index ({ user }) {
  const [showCart, setShowCart] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectTodo, setSelectTodo] = useState(null)
  const [todoValue, setTodoValue] = useState('')
  const [data, setData] = useState([])
  const [inShowSidebar, setInShowSidebar] = useState(false)
  const [done, setDone] = useState(0)
  const [notDone, setNotDone] = useState(0)
  const [inProgress, setInProgress] = useState(0)

  const handeleShowDeletedModal = () => {
    setShowDeleteModal(!showDeleteModal)
  }
  const handeleShowCart = () => {
    setShowCart(!showCart)
  }
  const handleSelect = todo => {
    setSelectTodo(todo)
  }

  const deleteHandler = async itemId => {
    console.log('🧪 itemId for deletion:', itemId)
    const { error } = await supabase.from('todos').delete().eq('id', itemId) // اگر ستون کلید اصلی اسم دیگه‌ای داره تغییر بده

    if (error) {
      console.error('Error deleting todo:', error.message)
      alert('خطا در حذف آیتم')
      return
    }

    // حذف آیتم از state
    setData(prev => prev.filter(todo => todo.id !== itemId))
    alert('Todo با موفقیت حذف شد')
  }

  useEffect(() => {
    const getTodoHandler = async () => {
      try {
        // دریافت داده‌ها از جدول todos در Supabase
        const { data: todos, error } = await supabase
          .from('todos') // نام جدول شما در Supabase
          .select('*') // انتخاب همه ستون‌ها (می‌توانید ستون‌های خاص را مشخص کنید)

        if (error) {
          console.error('Error fetching todos:', error)
          return
        }
        console.log(todos)
        setData(todos)
      } catch (error) {
        console.error('Unexpected error:', error)
      }
    }

    getTodoHandler()
  }, [])

  //chartTask

  useEffect(() => {
    const Done = data.filter(item => item.status === 'Done').length 
    const NotDone = data.filter(item => item.status === 'Not-Done').length 
    const InProgress =data.filter(item => item.status === 'In-Progress').length 
console.log(InProgress );
    setDone(Done)
    setNotDone(NotDone)
    setInProgress(InProgress)
  }, [data])

  const addTodoHandeler = async () => {
    if (!todoValue.trim()) {
      alert('Please enter a todo title')
      return
    }

    const todoObj = {
      title: todoValue,
      status: 'Not-Done',
      description: '',
      userId: user.id // فرض می‌کنیم user از props یا state داری
    }

    const { data, error } = await supabase
      .from('todos')
      .insert([todoObj])
      .select() // برای اینکه داده برگرده
      .single() // چون فقط یک ردیف درج می‌کنیم

    if (error) {
      console.error('Error inserting todo:', error)
      alert('خطا در افزودن TODO')
      return
    }

    // اضافه کردن به state
    setData(prev => [...prev, data])
    setTodoValue('')
  }

  const handleUpdateStatus = (id, newStatus) => {
    setData(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, status: newStatus } : todo))
    )
  }

  const handleUpdateTodo = async updatedTodo => {
    const { id, title, description } = updatedTodo

    const { data, error } = await supabase
      .from('todos')
      .update({ title, description })
      .eq('id', id)
      .select() // optional: اگر بخوای رکورد آپدیت شده رو بگیری

    if (error) {
      console.error('Error updating todo:', error.message)
      return
    }

    // اگه بخوای UI رو آپدیت کنی:
    setData(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, title, description } : todo
      )
    )
  }
  const closeSidebar = () => {
    setInShowSidebar(false)
  }
  return (
    <div className='relative min-h-screen bg-gradient-to-bl from-emerald-400 to-blue-500 text-center  text-white '>
      <div className='py-8 text-center'>
        <h1 className='text-2xl sm:text-4xl md:text-5xl font-serif font-bold uppercase tracking-wider text-stone-800 border-y-2 border-stone-400 inline-block px-6 py-2'>
          JUST DO IT
        </h1>
      </div>
      <div className='flex justify-end'>
        <button
          onClick={() => setInShowSidebar(!inShowSidebar)}
          className='p-2 m-4 cur rounded-md bg-white text-gray-700 shadow-md hover:shadow-lg hover:text-white hover:bg-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 active:scale-95'
        >
          <AiOutlineAlignLeft className='w-6 h-6 transition-transform duration-300 hover:rotate-180' />
        </button>
      </div>

      <Sidebar isOpen={inShowSidebar} onClose={closeSidebar} data={user} />

      <div className='bg-white/30 backdrop-blur-md border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-md mx-auto w-10/12 md:w-8/12 max-h-[520px] h-7/12 overflow-y-auto p-1 sm:p-2 md:p-4 space-y-4 transition-all duration-300'>
        {/* inputbar */}

        <div className='flex items-center justify-center my-4 w-full sm:gap-3 gap-1'>
          <input
            type='text'
            value={todoValue}
            onChange={e => setTodoValue(e.target.value)}
            placeholder="What's on your mind?"
            className='flex-1 max-w-md px-2 sm:px-4 py-2 text-[12px] sm:text-sm md:text-[16px] text-gray-900 bg-white border border-gray-300 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200'
          />
          <button
            onClick={addTodoHandeler}
            className='p-2 cursor-pointer bg-primary text-white rounded-full shadow-md hover:bg-primary/80 focus:outline-none transition-all duration-200'
          >
            <TiTickOutline className='w-5 h-5' />
          </button>
        </div>

        <>
          {data.map((todo, index) => (
            <TodoRow
              key={todo.id}
              title={todo.title}
              num={index}
              condition={todo.status}
              id={todo.id}
              onSelect={() => handleSelect(todo)}
              onShowDeleteModal={handeleShowDeletedModal}
              onShowCart={handeleShowCart}
              onUpdateStatus={handleUpdateStatus}
            />
          ))}
        </>
      </div>
      {showCart && (
        <Cart
          onUpdate={handleUpdateTodo}
          onShowCart={handeleShowCart}
          data={selectTodo}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          data={selectTodo}
          onShowDeleteModal={handeleShowDeletedModal}
          onDeleted={() => deleteHandler(selectTodo.id)}
        />
      )}
      {data.length && (
        <div className='p-4 sm:p-8 md:p-16 lg:p-24'>
          <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-6'>
            Chart Todos
          </h1>
          <TaskChart Done={done} NotDone={notDone} InProgress={inProgress} />
        </div>
      )}
    </div>
  )
}
