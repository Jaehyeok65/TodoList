import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
    padding: 10% 10% 10% 10%;
`;

const Title = styled.div`
    color: #20c997;
    font-size: 18px;
    font-weight: bold;
    text-align : center;
`;

const Body = styled.div`
    padding-top : 10%;
    font-size : 18px;
`

const TodoComplete = ({ Day }) => {


    const currentDay = Day.split('-')[1];

    const getTodo = () => {
        const todo = JSON.parse(localStorage.getItem('todo'));
        const newtodo = [];
        todo.map(item => (
            currentDay === Object.keys(item)[0].split('-')[1] && newtodo.push(item)
        ));

        return newtodo;
    };

    const getWholeTodo = () => {
        const newtodo = getTodo();
        
        let wholecount = 0;
        newtodo.map(item => (
            wholecount += Object.values(item)[0].length
        ));

        return wholecount;
    };


    const getCompleteTodo = () => {
        const newtodo = getTodo();
        
        let completecount = 0;
        newtodo.map(item => (
            Object.values(item)[0].map(item2 => (
                item2.done === true && completecount++
            ))
        ))

        return completecount;
    };

    const getCompletePercent = () => {

        let percent = getWholeTodo() === 0 ? 0 : (getCompleteTodo() / getWholeTodo()) * 100
        
        return percent.toFixed(0);
    };
    
    return (
        <Content>
            <Title>
                이번 달 목표 완수율
            </Title>
            <Body>
                이번 달 총 목표 : {getWholeTodo()}개 <br /> <br />
                이번 달 완료 목표 : {getCompleteTodo()}개 <br /> <br />
                이번 달 목표 완수율 : {getCompletePercent()}%
            </Body>
        </Content>
    )
};

export default React.memo(TodoComplete);
