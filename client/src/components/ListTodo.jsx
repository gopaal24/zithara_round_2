import React, { useState, useEffect } from 'react';

function ListTodo() {
  const [todoData, setTodoData] = useState([]);
  const [order, setOrder] = useState("ASC");
  const [searchQuery, setSearchQuery] = useState('');

  const getTodo = async () => {
    try {
      const response = await fetch("http://localhost:3000/todos");
      const jsonData = await response.json();
      setTodoData(jsonData);
    } catch (error) {
      console.error('Error fetching todos:', error.message);
    }
  };

  const sorting = (col) => {
    if(order === "ASC"){
        const sorted = [...todoData].sort((a,b) => {
           return a[col].toLowerCase > b[col].toLowerCase ? 1:-1
        });
        setTodoData(sorted)
        setOrder("DSC")
    }
    else if(order === "DSC"){
        const sorted = [...todoData].sort((a,b) => {
            return a[col].toLowerCase < b[col].toLowerCase ? 1:-1
        });
        setTodoData(sorted)
        setOrder("ASC")
    }
  }

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <>
      <h1>List</h1>
      <div>
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <table className='table-fixed'>
        <thead>
          <tr>
            <th onClick={()=>sorting("id")}>Sno</th>
            <th>Customer Name</th>
            <th>Age</th>
            <th>Mobile Number</th>
            <th>Address</th>
            <th onClick={()=>sorting("created_at")}>Created at</th>
          </tr>
        </thead>
        <tbody>
          {todoData.map(todo => {
            if (
              todo.c_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              todo.loc.toLowerCase().includes(searchQuery.toLowerCase())
            ) {
              return (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.c_name}</td>
                  <td>{todo.age}</td>
                  <td>{todo.phone}</td>
                  <td>{todo.loc}</td>
                  <td>{todo.created_at}</td>
                </tr>
              );
            }
            return null; // Skip rendering if the todo doesn't match the search
          })}
        </tbody>
      </table>
    </>
  );
}

export default ListTodo;
