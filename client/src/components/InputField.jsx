import React, { useState } from "react";

function InputField({ isCollapsed, setIsCollapsed }) {
  

  const [c_name, setC_name] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [loc, setLoc] = useState("");

  const handleSubmit = async (e) => {
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
    <div
      className={isCollapsed ? "hidden" : "flex flex-col gap-4 max-w-md m-2"}
    >
      <form onSubmit={handleSubmit}>
        <div className=" flex items-center justify-center">
          <div className="flex w-full max-w-md">
            <input
              type="text"
              name="c_name"
              className="border p-2 mx-2"
              value={c_name}
              onChange={(e) => setC_name(e.target.value)}
              placeholder="Customer Name"
            />
            <input
              type="number"
              name="age"
              className="border p-2 mx-2"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
            />
            <input
              type="tel"
              name="phone"
              className="border p-2 mx-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Mobile Number"
            />
            <input
              type="text"
              name="loc"
              className="border p-2 mx-2"
              value={loc}
              onChange={(e) => setLoc(e.target.value)}
              placeholder="Address"
            />
            <button
              className="bg-gray-300 p-2 mx-2 border rounded hover:bg-gray-400 focus:outline-none"
              type="submit"
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default InputField;
