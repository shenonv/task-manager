"use client";

import React, { useState, useEffect } from "react";
import styles from "./KanbanBoard.module.css";
// Import your API utilities and Task type (without an id)
import { Task, getAll, addTask } from "../api/api";

type Column = {
	id: string;
	title: string;
	tasks: Task[];
};

const initialColumns: Column[] = [
	{ id: "todo", title: "To Do", tasks: [] },
	{ id: "inProgress", title: "In Progress", tasks: [] },
	{ id: "done", title: "Done", tasks: [] },
];

const KanbanBoard: React.FC = () => {
	// Column state
	const [columns, setColumns] = useState<Column[]>(initialColumns);
	// State for drag-and-drop
	const [draggedTask, setDraggedTask] = useState<Task | null>(null);
	// State for the new task form
	const [form, setForm] = useState<Task>({
		title: "",
		description: "",
		duration: "",
	});

	// Fetch tasks from the backend on mount and add them to "todo" column
	useEffect(() => {
		getAll().then((fetchedTasks) => {
			setColumns((prevCols) =>
				prevCols.map((col) =>
					col.id === "todo" ? { ...col, tasks: fetchedTasks } : col
				)
			);
		});
	}, []);

	// Handle drag start by storing the dragged task
	const handleDragStart = (task: Task) => {
		setDraggedTask(task);
	};

	// Handle drop: remove the task from its current column and add it to the target column
	const handleDrop = (columnId: string) => {
		if (!draggedTask) return;
		setColumns((prevColumns) =>
			prevColumns.map((col) => {
				if (col.id === columnId) {
					return { ...col, tasks: [...col.tasks, draggedTask] };
				}
				return {
					...col,
					tasks: col.tasks.filter((t) => t !== draggedTask),
				};
			})
		);
		setDraggedTask(null);
	};

	// Handle changes in the form fields
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	// Handle form submission to add a new task
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!form.title || !form.description || !form.duration) {
			alert("All fields are required!");
			return;
		}
		const createdTask = await addTask(form);
		if (!createdTask) return;
		setColumns((prevColumns) =>
			prevColumns.map((col) =>
				col.id === "todo"
					? { ...col, tasks: [...col.tasks, createdTask] }
					: col
			)
		);
		// Reset form fields after successful submission
		setForm({ title: "", description: "", duration: "" });
	};

	return (
		<div>
			<div className="container">
				{/* New Task Form */}
				<form onSubmit={handleSubmit} className={styles.form}>
					<input
						type="text"
						name="title"
						value={form.title}
						onChange={handleChange}
						placeholder="Title"
						className={styles.input}
					/>
					<textarea
						name="description"
						value={form.description}
						onChange={handleChange}
						placeholder="Description"
						className={styles.input}
					/>
					<input
						type="text"
						name="duration"
						value={form.duration}
						onChange={handleChange}
						placeholder="Duration"
						className={styles.input}
					/>
					<button type="submit" className={styles.button}>
						Add Task
					</button>
				</form>
			</div>
			{/* Kanban Board Columns */}
			<div className={styles.kanbanBoard}>
				{columns.map((column) => (
					<div
						key={column.id}
						className={styles.column}
						onDragOver={(e) => e.preventDefault()}
						onDrop={() => handleDrop(column.id)}
					>
						<h2 className={styles.columnTitle}>{column.title}</h2>
						{column.tasks.map((task, index) => (
							// Use index as key since tasks do not have a unique id
							<div
								key={index}
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
