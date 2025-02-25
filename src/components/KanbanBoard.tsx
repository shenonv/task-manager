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

	return (
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
	);
};

export default KanbanBoard;
