// src/components/StyledContainer.js
import styled from 'styled-components';


export const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #1a1a1a;
  font-family: 'Segoe UI', sans-serif;
`;

export const Card = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  min-width: 320px;
`;

export const Message = styled.p`
  background-color: #ffe0e0;
  color: #b00020;
  padding: 10px;
  border-radius: 6px;
  margin-top: 1rem;
  font-weight: bold;
`;

export const Title = styled.h2`
  margin-bottom: 1rem;
  color: #333;
  text-align: center;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;

export const Button = styled.button`
  width: 100%;
  background-color: #6a0dad;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #5500b6;
  }
`;
