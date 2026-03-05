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
      name,
      qty,
    };

    setItems([...items, newItem]);
    setName("");
    setQty("");
  };

  const deleteItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const updateQty = (index, newQty) => {
    const newItems = [...items];
    newItems[index].qty = newQty;
    setItems(newItems);
  };

  const totalItems = items.reduce(
    (sum, item) => sum + Number(item.qty),
    0
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          📦 Stock System
        </h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="ชื่อสินค้า"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 border p-2 rounded"
          />
          <input
            type="number"
            placeholder="จำนวน"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="w-20 border p-2 rounded text-center"
          />
          <button
            onClick={addItem}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            เพิ่ม
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-gray-500 text-center">ยังไม่มีสินค้า</p>
        ) : (
          <div className="space-y-2">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-100 p-2 rounded"
              >
                <span>{item.name}</span>

                <input
                  type="number"
                  value={item.qty}
                  onChange={(e) =>
                    updateQty(index, e.target.value)
                  }
                  className="w-16 border rounded text-center"
                />

                <button
                  onClick={() => deleteItem(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  ลบ
                </button>
              </div>
            ))}
          </div>
        )}

        <p className="mt-4 font-bold text-center">
          จำนวนสินค้าทั้งหมด: {totalItems}
        </p>
      </div>
    </div>
  );
}
