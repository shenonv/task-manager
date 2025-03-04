"use client";

import React, { useState } from "react";
import styles from "./KanbanBoard.module.css";

type Task = {
	id: number;
	title: string;
};

type Column = {
	id: string;
	title: string;
	tasks: Task[];
};

const initialColumns: Column[] = [
	{ id: "todo", title: "To Do", tasks: [{ id: 1, title: "Task 1" }] },
	{
		id: "inProgress",
		title: "In Progress",
		tasks: [{ id: 2, title: "Task 2" }],
	},
	{ id: "done", title: "Done", tasks: [{ id: 3, title: "Task 3" }] },
];

const KanbanBoard: React.FC = () => {
	const [columns, setColumns] = useState<Column[]>(initialColumns);
	const [draggedTask, setDraggedTask] = useState<Task | null>(null);

	// State for new task title
	const [newTaskTitle, setNewTaskTitle] = useState("");

	const handleDragStart = (task: Task) => {
		setDraggedTask(task);
	};

	const handleDrop = (columnId: string) => {
		if (!draggedTask) return;

		setColumns((prevColumns) =>
			prevColumns.map((col) => {
				if (col.id === columnId) {
					return { ...col, tasks: [...col.tasks, draggedTask] };
				}
				return {
					...col,
					tasks: col.tasks.filter(
						(task) => task.id !== draggedTask.id
					),
				};
			})
		);

		setDraggedTask(null);
	};

	// Add new task to the "To Do" column (or whichever column you prefer)
	const handleAddTask = () => {
		const trimmedTitle = newTaskTitle.trim();
		if (!trimmedTitle) return;

		// Create a new task object
		const newTask: Task = {
			id: Date.now(), // or any unique ID logic
			title: trimmedTitle,
		};

		// Add the new task into the "todo" column
		setColumns((prevColumns) =>
			prevColumns.map((col) => {
				if (col.id === "todo") {
					return { ...col, tasks: [...col.tasks, newTask] };
				}
				return col;
			})
		);

		// Reset the input field
		setNewTaskTitle("");
	};

	return (
		<div>
			{/* Input field and button to add a new task */}
			<div className={styles.taskInputContainer}>
				<input
					type="text"
					value={newTaskTitle}
					onChange={(e) => setNewTaskTitle(e.target.value)}
					placeholder="Enter new task"
					className={styles.taskInput}
				/>
				<button
					onClick={handleAddTask}
					className={styles.addTaskButton}
				>
					Add Task
				</button>
			</div>

			<div className={styles.kanbanBoard}>
				{columns.map((column) => (
					<div
						key={column.id}
						className={styles.column}
						onDragOver={(e) => e.preventDefault()}
						onDrop={() => handleDrop(column.id)}
					>
						<h2 className={styles.columnTitle}>{column.title}</h2>
						{column.tasks.map((task) => (
							<div
								key={task.id}
								className={styles.task}
								draggable
								onDragStart={() => handleDragStart(task)}
							>
								{task.title}
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default KanbanBoard;
