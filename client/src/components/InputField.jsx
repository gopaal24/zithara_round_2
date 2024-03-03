import React, { useState } from "react";

function InputField({ isCollapsed, setIsCollapsed }) {
  const [c_name, setC_name] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [loc, setLoc] = useState("");

  // Function to handle submition of the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const created_at = new Date().toLocaleString();
    try {
      const body = { c_name, age, phone, loc, created_at };
      const response = await fetch("http://localhost:3000/data", {
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
    <form onSubmit={handleSubmit} className={isCollapsed ? "hidden" : "flex mb-4"}>
      <div className="flex-grow flex items-center justify-center">
        <input
          type="text"
          name="c_name"
          className="border p-2 mr-2 rounded"
          value={c_name}
          onChange={(e) => setC_name(e.target.value)}
          placeholder="Customer Name"
        />
        <input
          type="number"
          name="age"
          className="border p-2 mr-2 rounded"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
        />
        <input
          type="tel"
          name="phone"
          className="border p-2 mr-2 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Mobile Number"
        />
        <input
          type="text"
          name="loc"
          className="border p-2 mr-2 rounded"
          value={loc}
          onChange={(e) => setLoc(e.target.value)}
          placeholder="Address"
        />
        <button
          className="bg-green-500 text-white p-2 border rounded hover:bg-white hover:border-green-500 hover:text-green-500 font-bold focus:outline-none"
          type="submit"
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default InputField;
