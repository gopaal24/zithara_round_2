import React from "react";
import { useState } from "react";

function InputTodo() {
  const [c_name, setC_name] = useState("");
  const [age, setAge] = useState();
  const [phone, setPhone] = useState();
  const [loc, setLoc] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const created_at = new Date().toLocaleString();
    try {
      const body = { c_name, age, phone, loc, created_at };
      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <h1>Input Form</h1>
      <form className="px-8 pt-6 pb-8 mb-4 flex gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          name="c_name"
          className="border p-2"
          value={c_name}
          onChange={(e) => {
            setC_name(e.target.value);
          }}
          placeholder="customer_name"
        />
        <input
          type="number"
          name="age"
          className="border p-2"
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
          }}
          placeholder="age"
        />
        <input
          type="number"
          name="phone"
          className="border p-2"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          placeholder="Mobile Number"
        />
        <input
          type="text"
          name="loc"
          className="border p-2"
          value={loc}
          onChange={(e) => {
            setLoc(e.target.value);
          }}
          placeholder="address"
        />
        <button className="bg-gray-300 p-2 border rounded ">Add</button>
      </form>
    </>
  );
}

export default InputTodo;
