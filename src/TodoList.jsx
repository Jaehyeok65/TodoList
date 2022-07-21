import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

const TodoHeadBlock = styled.div`
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
  }
  .day {
    margin-top: 4px;
    color: #868e96;
    font-size: 21px;
  }
  .tasks-left {
    color: #20c997;
    font-size: 18px;
    margin-top: 40px;
    font-weight: bold;
  }
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

  const undoneTasks = todos.filter(todo => !todo.finish);

  const today = new Date();
  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const dayName = today.toLocaleDateString('ko-KR', { weekday: 'long' });

  console.log(undoneTasks);


 

 


  
  




  return (
    <>
    <TodoHeadBlock>
      <h1>{dateString}</h1>
      <div className="day">{dayName}</div>
      <div className="tasks-left">할 일 {undoneTasks.length}개 남음</div>
    </TodoHeadBlock>
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
    </>
  );
}

export default TodoList;