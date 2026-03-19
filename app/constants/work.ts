import * as THREE from "three";
import { WorkTimelinePoint } from "../types";

export const WORK_TIMELINE: WorkTimelinePoint[] = [
	{
		point: new THREE.Vector3(0, 0, 0),
		year: "2024",
		title: "Started Web Development",
		subtitle: "Learning JavaScript, React & modern web technologies",
		position: "right",
	},

	{
		point: new THREE.Vector3(-4, -3, -3),
		year: "2024",
		title: "Built First Fullstack Projects",
		subtitle: "Working with Next.js, APIs, and modern UI systems",
		position: "left",
	},

	{
		point: new THREE.Vector3(-2, -1, -6),
		year: "2025",
		title: "Developer Tools & Extensions",
		subtitle: "Created productivity tools including a VS Code extension",
		position: "left",
	},

	{
		point: new THREE.Vector3(1, -1, -9),
		year: "2025",
		title: "Building SaaS Platforms",
		subtitle: "Developing scalable dashboards and modern web apps",
		position: "right",
	},

	{
		point: new THREE.Vector3(2, 1, -12),
		year: "2025",
		title: "Travel & Booking Platforms",
		subtitle: "Working on Airline & Chartered Bus Booking Systems",
		position: "right",
	},

	{
		point: new THREE.Vector3(1, 1, -12),
		year: new Date().toLocaleDateString("default", { year: "numeric" }),
		title: "?",
		subtitle: "???",
		position: "left",
	},
];