/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import React from "react";
import {
	Bot,
	Laptop,
	Terminal,
	Code2,
	Construction,
	Hammer,
	Music,
	Cpu,
	Zap,
	Coffee,
	HardHat,
} from "lucide-react";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";

const FloatingElement = ({
	children,
	delay = 0,
	duration = 5,
	x = 0,
	y = 0,
}: {
	children: React.ReactNode;
	delay?: number;
	duration?: number;
	x?: number;
	y?: number;
}) => (
	<motion.div
		initial={{ x, y, opacity: 0 }}
		animate={{
			y: [y, y - 20, y],
			opacity: [0.4, 0.8, 0.4],
		}}
		transition={{
			duration,
			repeat: Infinity,
			delay,
			ease: "easeInOut",
		}}
		className="absolute pointer-events-none"
	>
		{children}
	</motion.div>
);

const ConstructionSign = ({
	text,
	icon: Icon,
	color = "bg-yellow-400",
}: {
	text: string;
	icon: LucideIcon;
	color?: string;
}) => (
	<motion.div
		whileHover={{ scale: 1.05, rotate: 2 }}
		className={`${color} text-black px-4 py-2 rounded-lg shadow-lg flex items-center gap-3 font-bold border-2 border-black/10`}
	>
		<Icon className="w-5 h-5" />
		<span className="uppercase tracking-tight text-sm">{text}</span>
	</motion.div>
);

export default function SpotifyPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 flex flex-col items-center p-8 relative overflow-hidden font-sans selection:bg-emerald-200">
			<div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
				<div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-200/30 blur-[120px] rounded-full" />
				<div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-200/30 blur-[120px] rounded-full" />

				<FloatingElement x={100} y={200} delay={0} duration={6}>
					<div className="bg-white/80 backdrop-blur px-3 py-1.5 rounded-md shadow-sm border border-zinc-100 text-xs font-mono text-emerald-600">
						{"const mood = 'coding';"}
					</div>
				</FloatingElement>
				<FloatingElement x={800} y={150} delay={1} duration={7}>
					<div className="bg-white/80 backdrop-blur px-3 py-1.5 rounded-md shadow-sm border border-zinc-100 text-xs font-mono text-indigo-600">
						{"git commit -m 'WIP'"}
					</div>
				</FloatingElement>
				<FloatingElement x={200} y={600} delay={2} duration={5}>
					<div className="bg-white/80 backdrop-blur px-3 py-1.5 rounded-md shadow-sm border border-zinc-100 text-xs font-mono text-amber-600">
						{"npm install sanity"}
					</div>
				</FloatingElement>
				<FloatingElement x={900} y={500} delay={0.5} duration={8}>
					<div className="bg-white/80 backdrop-blur px-3 py-1.5 rounded-md shadow-sm border border-zinc-100 text-xs font-mono text-rose-600">
						{"while(true) { coffee(); }"}
					</div>
				</FloatingElement>

				<FloatingElement x={400} y={100} delay={1.5} duration={10}>
					<Cpu className="w-8 h-8 text-indigo-300" />
				</FloatingElement>
				<FloatingElement x={700} y={700} delay={3} duration={9}>
					<Zap className="w-6 h-6 text-emerald-300" />
				</FloatingElement>
			</div>

			<main className="flex-1 flex flex-col items-center justify-center gap-12 z-10">
				<div className="relative">
					<motion.div
						animate={{
							y: [0, -10, 0],
							rotate: [0, 1, 0, -1, 0],
						}}
						transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
						className="relative bg-white p-12 rounded-[3rem] shadow-2xl border-4 border-zinc-100"
					>
						<div className="flex flex-col items-center gap-6">
							<div className="relative">
								<Bot className="w-32 h-32 text-indigo-600" />
								<motion.div
									animate={{ opacity: [0, 1, 0] }}
									transition={{ duration: 2, repeat: Infinity }}
									className="absolute top-4 right-4"
								>
									<Zap className="w-6 h-6 text-yellow-400 fill-current" />
								</motion.div>
							</div>
							<div className="flex items-center gap-2 bg-zinc-50 px-4 py-2 rounded-xl border border-zinc-100">
								<Laptop className="w-6 h-6 text-zinc-400" />
								<div className="flex gap-1">
									<div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
									<div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-75" />
									<div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse delay-150" />
								</div>
							</div>
						</div>

						<div className="absolute -top-6 -left-4 rotate-[-15deg]">
							<HardHat className="w-16 h-16 text-yellow-500 drop-shadow-lg" />
						</div>
					</motion.div>

					<div className="absolute -top-12 -right-24">
						<ConstructionSign text="Work in Progress" icon={Construction} />
					</div>
					<div className="absolute top-1/2 -left-32 -translate-y-1/2">
						<ConstructionSign
							text="No Songs Found"
							icon={Music}
							color="bg-rose-400"
						/>
					</div>
					<div className="absolute -bottom-8 -right-16">
						<ConstructionSign
							text="Under Construction"
							icon={Hammer}
							color="bg-indigo-400"
						/>
					</div>
				</div>

				<div className="text-center space-y-4 max-w-lg">
					<h2 className="text-4xl font-black text-zinc-900 tracking-tight">
						Building the <span className="text-emerald-500">Ultimate</span> Playlist
					</h2>
					<p className="text-zinc-500 text-lg leading-relaxed">
						Our robot developer is currently refactoring the rhythm and debugging the bass. 
						Estimated time of arrival: <span className="font-mono font-bold text-indigo-600">Soon</span>
					</p>
				</div>

				<div className="flex items-center gap-8 pt-8">
					<div className="flex items-center gap-3 text-zinc-400 font-medium">
						<Music className="w-5 h-5 animate-pulse" />
						<span>Syncing Beats...</span>
					</div>
					<div className="h-8 w-px bg-zinc-200" />
					<div className="flex gap-4">
						<div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-zinc-100 flex items-center justify-center">
							<Terminal className="w-5 h-5 text-zinc-400" />
						</div>
						<div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-zinc-100 flex items-center justify-center">
							<Code2 className="w-5 h-5 text-zinc-400" />
						</div>
						<div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-zinc-100 flex items-center justify-center">
							<Coffee className="w-5 h-5 text-zinc-400" />
						</div>
					</div>
				</div>
			</main>

			<footer className="w-full max-w-4xl flex justify-between items-center mt-16 pt-8 border-t border-zinc-100 z-10">
				<div className="flex items-center gap-2 text-zinc-400 text-sm font-medium">
					<Construction className="w-4 h-4 text-amber-500" />
					<span>Dev Mode Active</span>
				</div>
				<div className="text-zinc-300 text-xs font-mono uppercase tracking-widest">
					© 2026 Developer Portfolio
				</div>
			</footer>
		</div>
	);
}
