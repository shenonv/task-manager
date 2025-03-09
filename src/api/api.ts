import axios from "axios";

export type Task = {
	title: string;
	description: string;
	duration: string;
};

// Function to fetch tasks
export async function getAll(): Promise<Task[]> {
	try {
		const response = await axios.get("http://localhost:4000/task/");
		return response.data;
	} catch (error) {
		console.error("Error fetching tasks:", error);
		return [];
	}
}

// Function to add a new task
export async function addTask(task: Task) {
	try {
		const response = await axios.post("http://localhost:4000/task/", task);
		return response.data;
	} catch (error) {
		console.error("Error adding task:", error);
	}
}
