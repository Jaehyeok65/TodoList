import React, { useEffect } from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem2';
import { useTodoState, useTodoDispatch, useTodoDate } from './TodoContext';

const TodoListBlock = styled.div`
    flex: 1;
    padding: 20px 32px;
    padding-bottom: 48px;
    overflow-y: auto;
`;

function TodoList2() {
    const todos = useTodoState();
    const dispatch = useTodoDispatch();
    const date = useTodoDate();

    const fetchs = async () => {
        const todo = JSON.parse(localStorage.getItem('todo'));
        if (todo && Array.isArray(todo)) { //배열인 경우
            const index = todo.findIndex(item => (Object.keys(item)[0] === date));
            if(index === -1) { //index가 -1이라는 것은 배열에 데이터가 존재하지 않는 것
                dispatch({ type: 'ONLOAD', data: [] });
            }
            else { // -1이 아닌 경우 배열에 데이터가 존재하므로 데이터 정합성 체크 후 데이터 표출
                if(todo[index] && todo[index][date]) {
                    dispatch({ type: 'ONLOAD', data: todo[index][date] });
                }
            }
        }
        else {
            window.alert("에러가 발생했습니다! 잠시 후 다시 시도해주세요!");
            window.localStorage.removeItem('todo');
            window.localStorage.removeItem('todoId');
        }
    };

    useEffect(() => {
        fetchs();
    }, [date]);

    return (
        <TodoListBlock>
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    id={todo.id}
                    todo={todo.todo}
                    done={todo.done}
                />
            ))}
        </TodoListBlock>
    );
}

export default TodoList2;
