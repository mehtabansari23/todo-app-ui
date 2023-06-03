import React, { useEffect, useState } from "react";
import ToDoTO from "model/ToDoTO";
import { ALL, TODO, COMPLETED, SERVER_URL } from "constants/AppConstants";
import axios from "axios";
import { Form } from "react-bootstrap";
import ToDo from "components/ToDo";
import Footer from "components/Footer";
import 'style/ToDo.css';

const ToDoApp: React.FC = () => {

    const [todoList, setTodoList] = useState(new Array<ToDoTO>());
    const [name, setName] = useState('');
    const [checkAll, setCheckAll] = useState(false);
    const [activeState, setActiveState] = useState(ALL);

    useEffect(() => {
        axios.get(SERVER_URL)
            .then((response) => {
                if(response.data != null && response.data.length > 0) {
                    setTodoList(response.data)
                    setCheckAll(response.data.every((toDo: ToDoTO) => toDo.completed));
                }
            }).catch(alert);
    }, [])

    function add(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            let toDo: ToDoTO = new ToDoTO(0, name, false);
            axios.post(SERVER_URL, toDo)
                .then((response) => {
                    setTodoList(todoList => [...todoList, response.data]);
                    setName('');
                }).catch(alert);
        }
    }

    function handleCheckAll(event: React.ChangeEvent<HTMLInputElement>) {
        setTodoList((toDos) => [...todoList]);
        todoList.forEach((todo) => todo.completed = event.target.checked)
        updateToDo(todoList)
    }

    function updateToDo(toDos: Array<ToDoTO>) {
        axios.patch(SERVER_URL + "update", toDos).then((response)=>{
            setCheckAll(todoList.every(toDo => toDo.completed));
            setTodoList(todos => [...todoList])
        }).catch(alert);
    }

    function clearCompleted() {
        let ids: Array<number> = todoList.filter(todo => todo.completed).map((todo) => todo.id);
        if(ids == null || ids.length === 0 ) {
            alert("Please select a todo to delete!")
            return;
        }
        axios.delete(SERVER_URL + "deleteByIds/" + ids.toString())
            .then((response) => {
                if (response.data) {
                    setTodoList((toDos) => todoList.filter(todo => !todo.completed));
                    setCheckAll(false);
                }
            }).catch(alert)
    }

    function deleteToDo(toDo: ToDoTO, index: number) {
        axios.delete(SERVER_URL + "deleteByIds/" + toDo.id)
            .then((response) => {
                if (response.data) {
                    todoList.splice(index, 1);
                    setTodoList(() => [...todoList]);
                    const checkAll = todoList != null && todoList.length > 0 ?  todoList.every(toDo => toDo.completed): false;
                    setCheckAll(checkAll);
                }
            }).catch(alert)
    }

    function showToDosByState() {
        switch(activeState) {
            case ALL: return todoList;
            case TODO: return todoList.filter(toDo => !toDo.completed);
            case COMPLETED: return todoList.filter(toDo => toDo.completed);
            default: return todoList;
        }
    }
    
    return (
        <div className="to-do-app">
            <Form.Control type="checkbox" className="todo-checkbox" name="checkAll" checked={checkAll}
                disabled={(todoList == null || todoList.length === 0)} onChange={handleCheckAll} />

            <Form.Control type="text" placeholder="Any to do task ?" className="edit"
                value={name} onChange={(event) => setName(event.target.value)}
                onKeyUp={add}></Form.Control>
            <div>
                {
                    todoList && showToDosByState().map((elem, index) => <ToDo  toDo={elem} deleteToDo={deleteToDo}
                    updateToDo={updateToDo} index={index} key={index} />)
                }
            </div>
            {
                todoList != null && todoList.length ? 
                <Footer clearCompleted={clearCompleted} setActiveState={setActiveState} activeState={activeState}
                    toDoCount={todoList.filter(toDo => !toDo.completed).length}></Footer> : null
            }
        </div>
    )
}

export default ToDoApp;