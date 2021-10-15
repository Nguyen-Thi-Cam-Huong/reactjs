import TodoList from './components/todolist';
import Textfield from '@atlaskit/textfield';
import Icon from '@atlaskit/icon';
import Button from '@atlaskit/button';
import { useState, useEffect, useCallback } from 'react';
import { v4 } from 'uuid';
import React from 'react';

const TODO_APP_STORAGE_KEY = "TODO_APP";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [textInput, setTextinput] = useState("");

  useEffect(() => {
    const storagedTodoList  = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if (storagedTodoList){
      setTodoList(JSON.parse(storagedTodoList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList]);

  const onTextInputChange = useCallback((e) => {
    setTextinput(e.target.value);
  }, []);

  const onAddBtnClick = useCallback((e) =>{
    setTodoList([
      {id: v4(), name: textInput, isCompleted: false},
      ...todoList,
    ]);

    setTextinput("");
  }, [textInput, todoList]);

const onCheckBtnClick = useCallback((id) => {
  setTodoList(prevState => prevState.map(todo => todo.id === id ? { ...todo, isCompleted: true} : todo))
}, []);

  return (
    <>
      <h3>Danh sách cần làm</h3>
      <Textfield
       name='add-todo'
       placeholder='Thêm ...'
       elemAfterInput={
        <Button isDisabled={!textInput} appearance="primary" onClick={onAddBtnClick}>
        Them
        </Button>
      }
      css={{ padding: "2px 4px" }}
      value={textInput}
      onChange={onTextInputChange}
      ></Textfield>
      <TodoList todoList={todoList} onCheckBtnClick={onCheckBtnClick} />
    </>
  );
}

export default App;
