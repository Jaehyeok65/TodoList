import React from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete } from 'react-icons/md';
import {
    useTodoDispatch,
    useSetUpdateId,
    useSetToggleState,
    useSetUpdateState,
    useTodoDate,
    useSetTodoValue
} from './TodoContext';

const Remove = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #dee2e6;
    font-size: 30px;
    cursor: pointer;
    opacity: 0;
    &:hover {
        color: #ff6b6b;
    }
`;

const UPDATE = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #dee2e6;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    &:hover {
        color: #ff6b6b;
    }
`;

const TodoItemBlock = styled.div`
    display: flex;
    align-items: center;
    padding-top: 12px;
    padding-bottom: 12px;
    &:hover {
        ${Remove} {
            opacity: 1;
        }
        ${UPDATE} {
            opacity: 1;
        }
    }
`;

const CheckCircle = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 16px;
    border: 1px solid #ced4da;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    cursor: pointer;
    ${(props) =>
        props.done &&
        css`
            border: 1px solid #38d9a9;
            color: #38d9a9;
        `}
`;

const Text = styled.div`
    flex: 1;
    font-size: 18px;
    color: #495057;
    ${(props) =>
        props.done &&
        css`
            color: #ced4da;
        `}
`;

function TodoItem2({ id, done, todo }) {
    const dispatch = useTodoDispatch();
    const setUpdate = useSetUpdateState();
    const setOpen = useSetToggleState();
    const setUpdateId = useSetUpdateId();
    const date = useTodoDate();
    const setValue = useSetTodoValue();


    const onToggle = () => {
        const todo = JSON.parse(localStorage.getItem('todo'));
        const index = todo.findIndex(item => (Object.keys(item)[0] === date));
        const newtodo = todo[index][date].map((item) =>
            item.id === id ? { ...item, done: !item.done } : item
        );
        const newnewtodo = todo.map(item => (
            Object.keys(item)[0] === date ? {[date] : newtodo} : item
        ));
        localStorage.setItem('todo', JSON.stringify(newnewtodo));
        dispatch({ type: 'TOGGLE', id });
    };

    const onUpdate = () => {
        const todo = JSON.parse(localStorage.getItem('todo'));
        const index = todo.findIndex(item => (Object.keys(item)[0] === date));
        if(todo && todo[index] && todo[index][date]) { //정합성 체크
            const updateIndex = todo[index][date].findIndex(item => item.id === id);
            setValue(todo[index][date][updateIndex].todo);
        } 
        setUpdate();
        setOpen(true);
        setUpdateId(id);
    };

    const onRemove = () => {
        const todo = JSON.parse(localStorage.getItem('todo'));
        const index = todo.findIndex(item => (Object.keys(item)[0] === date));
        const newtodo = todo[index][date].filter((todo) => todo.id !== id);
        const newnewtodo = todo.map(item => (
            Object.keys(item)[0] === date ? {[date] : newtodo } : item
        ));
        localStorage.setItem('todo', JSON.stringify(newnewtodo));
        dispatch({ type: 'REMOVE', id });
    };

    return (
        <TodoItemBlock>
            <CheckCircle done={done} onClick={onToggle}>
                {done && <MdDone />}
            </CheckCircle>
            <Text done={done}>{todo}</Text>
            <UPDATE onClick={onUpdate}>수정</UPDATE>
            <Remove onClick={onRemove}>
                <MdDelete />
            </Remove>
        </TodoItemBlock>
    );
}

export default TodoItem2;
