import React, { useEffect } from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem2';
import { useTodoState, useTodoDispatch } from './TodoContext';
import axios from 'axios';
import moment from 'moment';

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

function TodoList2() {
  const todos = useTodoState();
  const dispatch = useTodoDispatch();

  const fetchs = async() => {
    const res = await axios.post('http://localhost:8088/todo/list',{
        date : moment().format('YYYY-MM-DD')
      })
      dispatch ( { type : 'ONLOAD' , data : res.data})
  }

  useEffect(() => {
    fetchs();
  },[])

  return (
    <TodoListBlock>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          done={todo.done}
        />
      ))}
    </TodoListBlock>
  );
}

export default TodoList2;