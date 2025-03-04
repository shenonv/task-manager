"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Tasks.module.css"; // Import the CSS module

type Task = {
	title: string;
	description: string;
	duration: string;
};

// Function to fetch tasks
async function getAll(): Promise<Task[]> {
	try {
		const response = await axios.get("http://localhost:4000/task/");
		return response.data;
	} catch (error) {
		console.error("Error fetching tasks:", error);
		return [];
	}
}

// Function to add a new task
async function addTask(task: Task) {
	try {
		const response = await axios.post("http://localhost:4000/task/", task);
		return response.data;
	} catch (error) {
		console.error("Error adding task:", error);
	}
}

export default function Tasks() {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [form, setForm] = useState<Task>({
		title: "",
		description: "",
		duration: "",
	});

	useEffect(() => {
		getAll().then(setTasks);
	}, []);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!form.title || !form.description || !form.duration) {
			alert("All fields are required!");
			return;
		}

		const newTask = await addTask(form);
		if (newTask) {
			setTasks([...tasks, newTask]); // Update UI dynamically
			setForm({ title: "", description: "", duration: "" }); // Reset form
		}
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Task Manager</h1>

			{/* Task Form */}
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

			{/* Task List */}
			<div className={styles.taskList}>
				{tasks.map((task, index) => (
					<div key={index} className={styles.task}>
						<h2 className={styles.taskTitle}>{task.title}</h2>
						<p className={styles.taskDescription}>
							{task.description}
						</p>
						<span className={styles.taskDuration}>
							{task.duration}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
