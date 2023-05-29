import { useState } from "react";
import { Form, CloseButton } from "react-bootstrap";
import ToDoTO from "model/ToDoTO";

interface ToDoProps {
    toDo: ToDoTO;
    deleteToDo: Function;
    index: number;
    updateToDo: Function;
};

const ToDo: React.FC<ToDoProps> = (props) => {
    const [name, setName] = useState(props.toDo.name)
    const [showText, setShowText] = useState(false);
    
    function handleCheck(toDo: ToDoTO, target: any) {
        let checked: boolean = target.checked;
        toDo.completed = checked;
        props.updateToDo(toDo);
    }

    function handleDoubleClick() {
        setShowText(true);
    }

    function handleBlur() {
        setShowText(false);
        props.toDo.name = name;
        props.updateToDo(props.toDo);
    }

    function handleEnter(event: React.KeyboardEvent<HTMLInputElement>) {
        if(event.key === 'Enter') {
            handleBlur();
        }
    }

    return (<div>
        <span>
            <Form.Control type="checkbox" className="todo-checkbox" checked={props.toDo.completed} name={props.toDo.id.toString()}
                onChange={event => handleCheck(props.toDo, event.target)} />
        </span>
        {
            showText ? <Form.Control type="text" className="mt10 edit" autoFocus={true} onBlur={handleBlur}
                 onKeyUp={handleEnter} defaultValue={props.toDo.name} 
                 onChange={(event)=> setName(event.target.value)}></Form.Control>
                : <><span className="todo-name" onDoubleClick={handleDoubleClick}> {props.toDo.name} </span>
                    <span> <CloseButton onClick={() => props.deleteToDo(props.toDo, props.index)}
                    className="delete-btn">&times;</CloseButton> </span>
                </>
        }
        
    </div>)
}

export default ToDo;