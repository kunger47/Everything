import React, { useEffect, useRef, useState } from 'react';
import './ToDo.scss';
import { Draggable } from 'react-beautiful-dnd';
import ToDoItem from 'models/todo/ToDoItem';
import todoApi from 'services/apis/todo-api';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import ToDoItemTask from 'models/todo/ToDoItemTask';
import { handleRawInputChange } from 'services/form-helpers';
import Input from 'components/Form/Input';
import DeleteButton from 'components/DeleteButton';

interface Props {
    item: ToDoItem;
    index: number;
    reload: () => void;
}

const ItemBlock = (props: Props) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [itemName, setItemName] = useState<string | null>(props.item.name);
    const [tasks, setTasks] = useState<ToDoItemTask[]>([]);
    const [newTask, setNewTask] = useState<ToDoItemTask>(new ToDoItemTask());
    const [isAddingTask, setIsAddingTask] = useState<boolean>(false);

    const addRef = useRef<HTMLInputElement>(null);
    const updateRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setItemName(props.item.name);
    }, [props.item.name]);

    useEffect(() => {
        loadTasks();
    }, [props.item.id]);

    useEffect(() => {
        isEditing && updateRef.current && updateRef.current.focus();
    }, [isEditing]);

    const loadTasks = () => {
        todoApi.getTasksForItem(props.item.id, setTasks);
    }

    const saveUpdate = () => {
        setIsEditing(false);
        if (props.item.name != itemName && !!itemName && !!itemName.trim())
            todoApi.updateItem({ ...props.item, name: itemName }, props.reload);
        setItemName('');
    };

    const deleteItem = (id: number) => {
        todoApi.removeItem(id, props.reload);
    };

    const saveTask = () => {
        if (!!newTask.name && !!newTask.name.trim())
            todoApi.createTask({ ...newTask, toDoItemId: props.item.id }, loadTasks);
        setIsAddingTask(false);
    }

    return (
        <Draggable draggableId={props.item.id.toString()} index={props.index}>
            {provided => (
                <div className='row e-item-block'
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
                >
                    {!isEditing
                        ? <OverlayTrigger
                            placement="right"
                            trigger={"click"}
                            overlay={
                                <Popover id="popover-basic">
                                    {/* <Popover.Header as="h3">{ }</Popover.Header>
                                    <Popover.Body> */}
                                    {tasks.map(t => <p key={t.id}>{t.name}</p>)}
                                    {!isAddingTask
                                        ? <div onClick={() => setIsAddingTask(true)}>Add +</div>
                                        : <Input
                                            ref={addRef}
                                            value={newTask.name ?? undefined}
                                            inputName={"newTaskName"}
                                            handleInputChange={handleRawInputChange([newTask, setNewTask], "name")}
                                            onBlur={saveTask}
                                        />}
                                    {/* </Popover.Body> */}
                                </Popover>
                            }
                        >
                            <span>
                                {isHovering && <DeleteButton onClick={() => deleteItem(props.item.id)} />}
                                <span onClick={() => setIsEditing(true)}>{props.item.name}</span>

                            </span>
                        </OverlayTrigger>
                        : <Input
                            ref={updateRef}
                            value={itemName ?? undefined}
                            inputName={"itemName"}
                            handleInputChange={setItemName}
                            onBlur={saveUpdate}
                        />
                    }
                </div>
            )
            }
        </Draggable >
    )
}

export default ItemBlock;