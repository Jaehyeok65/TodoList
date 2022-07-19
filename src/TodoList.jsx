import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { MdDeleteSweep } from 'react-icons/md';

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

function TodoList() {

  const [todos,setTodos] = useState([]);

  const nowTime = moment().format('YYYY-MM-DD');

  useEffect( () => {
    axios.post('http://localhost:8088/todo/list',{
        date : nowTime
      }).then(res => {
        setTodos(res.data);
      })
  },[])

  const clicks = (todo) => {
    axios.post('http://localhost:8088/todo/check',{
      id : todo.id,
      date : nowTime,
      work : todo.work,
      finish : !todo.finish
    }).then(res => {
      setTodos(res.data);
    })
  }

  const deletes = (todo) => {
    //console.log(id);
    axios.post('http://localhost:8088/todo/delete',{
      id : todo.id,
      date : nowTime,
      work : todo.work,
      finish : todo.finish
    }).then(res => {
      setTodos(res.data);
    })
  }


 

 


  
  




  return (
    <TodoListBlock>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.work}
          done={todo.finish}
          list={todo}
          click={() => clicks(todo)}
          deletes={() => deletes(todo)}
        />
      ))}
    </TodoListBlock>
  );
}

export default TodoList;