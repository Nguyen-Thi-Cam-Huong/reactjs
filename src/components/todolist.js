import React from 'react';
import Button from '@atlaskit/button';
import Todo from './todo';

export default function TodoList({ todoList, onCheckBtnClick }) {
  return (
    <div>
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} onCheckBtnClick={onCheckBtnClick} />
      ))}
    </div>
  );
}
