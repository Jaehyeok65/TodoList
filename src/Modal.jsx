import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

const slideup = keyframes`
    from {
        transform : translateY(200px);
    }
    to {
        transform : translateY(0px);
    }
`;

const slidedown = keyframes`
    from {
        transform : translateY(0px);
    }
    to {
        transform : translateY(200px);
    }
`;

const fadein = keyframes`
    from {
        opacity : 0
    }
    to {
        opacity : 1
    }
`;

const fadeout = keyframes`
    from {
        opacity : 1
    }
    to {
        opacity : 0
    }
`;

const BackgroundModal = styled.div`
    z-index: 29999;
    animation-duration: 0.5s;
    animation-timing-function: ease-out;
    animation-name: ${fadein};
    ${(props) =>
        props.disappear &&
        css`
            animation-duration: 0.5s;
            animation-name: ${fadeout};
            animation-timing-function: ease-out;
        `}
`;

const Layer = styled.div`
   z-index: 1500;
   display: block;
   background: rgba(0,0,0,0.3);
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
`;

const Modals = styled.div`
    width: 85%;
    height: 60vh;
    margin-top : 10%;
    margin-left : 2%;
    position : absolute;
    background-color : white;
    z-index: 29999;
    border-radius: 8px;
    border : 1px solid lightgray;
    animation-duration: 0.5s;
    animation-timing-function: ease-out;
    animation-name: ${slideup};
    ${(props) =>
        props.disappear &&
        css`
            animation-duration: 0.5s;
            animation-name: ${slidedown};
            animation-timing-function: ease-out;
        `}
    @media screen and (max-width: 600px) {
        width: 80%;
        left: 10%;
    }
`;

const Modal = ({ toggle, onToggle, children }) => {
    const [animate, setAnimate] = useState(false);
    const [localvisible, setLocalvisible] = useState(toggle);
    const modalref = useRef();

    useEffect(() => {
        if (localvisible && !toggle) {
            setAnimate(true);
            setTimeout(() => setAnimate(false), 400);
        }
        setLocalvisible(toggle);
    }, [localvisible, toggle]);

    if (!animate && !localvisible) {
        return null;
    }

    return (
        <BackgroundModal disappear={!toggle}>
            <Layer onClick={onToggle}></Layer>
            <Modals disappear={!toggle}>{children}</Modals>
        </BackgroundModal>
    );
};

export default React.memo(Modal);