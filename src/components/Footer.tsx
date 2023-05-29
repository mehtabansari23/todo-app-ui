import { useState } from "react";
import { ALL, TODO, COMPLETED } from "constants/AppConstants";

interface FooterProps {
  toDoCount: number;
  clearCompleted: Function;
  setActiveState: Function;
  activeState: string;
}

const Footer: React.FC<FooterProps> = (props) => {

  const handleActiveClick = (activeState: string)=> {
    props.setActiveState(activeState);
  }

  return (
    <footer className="footer">
      <span className="todo-items">
        <strong data-testid="todo-count">{props.toDoCount}</strong> todo{props.toDoCount > 1 ? 's' : ''} left
      </span>
      <span className="filters">
        <span onClick={() => handleActiveClick(ALL)}
          className={props.activeState === ALL ? "active" : ""}>
          All
        </span>
        <span onClick={() => handleActiveClick(TODO)}
          className={props.activeState === TODO ? "active" : ""}>
          To Do
        </span>
        <span onClick={() => handleActiveClick(COMPLETED)}
          className={props.activeState === COMPLETED ? "active" : ""}>
          Completed
        </span>
      </span>
      <span className="clear-completed" onClick={() => props.clearCompleted()}>Clear Completed</span>
    </footer>
  );
}

export default Footer;