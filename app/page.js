"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");

  // โหลดข้อมูลจาก localStorage ตอนเปิดเว็บ
  useEffect(() => {
    const saved = localStorage.getItem("stockItems");
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  // บันทึกทุกครั้งที่ items เปลี่ยน
  useEffect(() => {
    localStorage.setItem("stockItems", JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (!name || !qty) return;

    const newItem = {
      id: Date.now(),
      name,
      qty: parseInt(qty),
    };

    setItems([...items, newItem]);
    setName("");
    setQty("");
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          📦 Stock System
        </h1>

        {/* Form */}
        <div className="flex gap-2 mb-6">
          <input
            className="flex-1 border rounded-lg p-2"
            placeholder="ชื่อสินค้า"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-24 border rounded-lg p-2"
            type="number"
            placeholder="จำนวน"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />
          <button
            onClick={addItem}
            className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700"
          >
            เพิ่ม
          </button>
        </div>

        {/* List */}
        <div className="space-y-3">
          {items.length === 0 && (
            <p className="text-gray-500 text-center">ยังไม่มีสินค้า</p>
          )}

          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
            >
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">
                  จำนวน: {item.qty}
                </p>
              </div>

              <button
                onClick={() => deleteItem(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                ลบ
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

