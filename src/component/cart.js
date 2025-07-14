import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function Cart({ onShowCart, data, onUpdate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (data) {
      setTitle(data.title || '');
      setDescription(data.description || '');
    }
  }, [data]);

  const removeHandeler = (e) => {
    if (e.target === e.currentTarget) {
      onShowCart();
    }
  };

  const submitHandeler = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase
        .from('todos')
        .update({ title, description })
        .eq('id', data.id); // استفاده از 'id' به جای '_id'

      if (error) {
        console.error('Error updating todo:', error.message);
        alert('خطا در به‌روزرسانی تودو');
        return;
      }

      // به‌روزرسانی استیت والد
      onUpdate({ id: data.id, title, description });
      onShowCart(); // بستن فرم
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('خطای غیرمنتظره در به‌روزرسانی');
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/20 flex items-center justify-center z-40"
      onClick={removeHandeler}
    >
      <form
        onSubmit={submitHandeler}
        className="bg-white w-64 rounded border p-3 flex flex-col gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          className="border rounded px-2 py-1 text-md text-title"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border rounded px-2 py-1 text-md resize-none text-title"
          maxLength={200}
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add description..."
        />

        <button className="bg-black text-white cursor-pointer text-md py-1.5 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}