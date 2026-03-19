import {
	Box,
	Edges,
	Line,
	RoundedBox,
	Text,
	TextProps,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { usePortalStore } from "@stores";
import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import * as THREE from "three";

import { WORK_TIMELINE } from "@constants";
import { WorkTimelinePoint } from "@types";

const YEAR_START = 1.0;
const TITLE_START = 0.75;
const SUBTITLE_START = 0.5;
const FADE_SPEED = 4;

const staggerOpacity = (diff: number, start: number) =>
	Math.max(0, Math.min(1, (start - diff) * FADE_SPEED));

// ─── InstancedMesh dot grid — 1 draw call for ALL dots ───────────────────────
const DotGrid = ({
	W,
	H,
	opacity,
}: {
	W: number;
	H: number;
	opacity: number;
}) => {
	const meshRef = useRef<THREE.InstancedMesh>(null);
	const { count, positions } = useMemo(() => {
		const stepX = 0.22,
			stepY = 0.22;
		const cols = Math.floor((W - 0.4) / stepX);
		const rows = Math.floor((H - 0.4) / stepY);
		const pos: THREE.Vector3[] = [];
		for (let r = 0; r <= rows; r++)
			for (let c = 0; c <= cols; c++)
				pos.push(
					new THREE.Vector3(
						-W / 2 + 0.2 + c * stepX,
						H / 2 - 0.2 - r * stepY,
						0.025,
					),
				);
		return { count: pos.length, positions: pos };
	}, [W, H]);

	useEffect(() => {
		if (!meshRef.current) return;
		const m = new THREE.Matrix4();
		positions.forEach((p, i) => {
			m.setPosition(p);
			meshRef.current!.setMatrixAt(i, m);
		});
		meshRef.current.instanceMatrix.needsUpdate = true;
	}, [positions]);

	return (
		<instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
			<circleGeometry args={[0.01, 5]} />
			<meshBasicMaterial color="white" transparent opacity={opacity * 0.12} />
		</instancedMesh>
	);
};

// ─── Corner bracket — two planes, zero Lines ──────────────────────────────────
const Corner = ({
	x,
	y,
	flipX,
	flipY,
	size = 0.13,
	opacity,
}: {
	x: number;
	y: number;
	flipX: boolean;
	flipY: boolean;
	size?: number;
	opacity: number;
}) => {
	const sx = flipX ? -1 : 1;
	const sy = flipY ? -1 : 1;
	const t = 0.014;
	return (
		<group position={[x, y, 0.07]}>
			<mesh position={[sx * (size / 2 - t / 2), 0, 0]}>
				<planeGeometry args={[size, t]} />
				<meshBasicMaterial color="white" transparent opacity={opacity} />
			</mesh>
			<mesh position={[0, sy * (size / 2 - t / 2), 0]}>
				<planeGeometry args={[t, size]} />
				<meshBasicMaterial color="white" transparent opacity={opacity} />
			</mesh>
		</group>
	);
};

// ─── Card border — 4 Lines max (not 12) ──────────────────────────────────────
const CardBorder = ({
	W,
	H,
}: {
	W: number;
	H: number;
}) => {
	const hw = W / 2,
		hh = H / 2;
	const pts = useMemo(
		() => [
			[new THREE.Vector3(-hw, -hh, 0.04), new THREE.Vector3(hw, -hh, 0.04)],
			[new THREE.Vector3(hw, -hh, 0.04), new THREE.Vector3(hw, hh, 0.04)],
			[new THREE.Vector3(hw, hh, 0.04), new THREE.Vector3(-hw, hh, 0.04)],
			[new THREE.Vector3(-hw, hh, 0.04), new THREE.Vector3(-hw, -hh, 0.04)],
		],
		[hw, hh],
	);
	return (
		<>
			{pts.map(([a, b], i) => (
				<Line key={i} points={[a, b]} color="white" lineWidth={1.2} />
			))}
		</>
	);
};

// ─── Timeline Card ────────────────────────────────────────────────────────────
const TimelineCard = ({
	point,
	diff,
	isLeft,
	index,
}: {
	point: WorkTimelinePoint;
	diff: number;
	isLeft: boolean;
	index: number;
}) => {
	const cardRef = useRef<THREE.Group>(null);

	const W = isMobile ? 2.2 : 3.2;
	const H = isMobile ? 1.6 : 2.0;
	const cardX = isLeft ? -(W / 2 + 0.35) : W / 2 + 0.35;

	const yearOp = staggerOpacity(diff, YEAR_START);
	const titleOp = staggerOpacity(diff, TITLE_START);
	const subtitleOp = staggerOpacity(diff, SUBTITLE_START);
	const cardOp = staggerOpacity(diff, TITLE_START);

	const PAD = W / 2 - 0.25;
	const TOP = H / 2;

	// ── Entrance / exit ────────────────────────────────────────────────────────
	const prevDiff = useRef(1);
	useEffect(() => {
		if (!cardRef.current) return;
		const entering = prevDiff.current > 0.5 && diff <= 0.5;
		const exiting = prevDiff.current <= 0.5 && diff > 0.5;

		if (entering) {
			const fromX = isLeft ? cardX - 1.5 : cardX + 1.5;
			gsap.fromTo(
				cardRef.current.position,
				{ x: fromX, z: -0.8 },
				{ x: cardX, z: 0, duration: 0.75, ease: "back.out(1.4)" },
			);
			gsap.fromTo(
				cardRef.current.rotation,
				{ y: isLeft ? -1.0 : 1.0 },
				{ y: 0, duration: 0.75, ease: "power3.out" },
			);
			gsap.fromTo(
				cardRef.current.scale,
				{ x: 0.3, y: 0.3, z: 0.3 },
				{ x: 1, y: 1, z: 1, duration: 0.75, ease: "back.out(1.6)" },
			);
		}
		if (exiting) {
			gsap.to(cardRef.current.position, {
				x: isLeft ? cardX - 0.8 : cardX + 0.8,
				z: -0.5,
				duration: 0.35,
				ease: "power3.in",
			});
			gsap.to(cardRef.current.scale, {
				x: 0.4,
				y: 0.4,
				z: 0.4,
				duration: 0.35,
				ease: "power3.in",
			});
		}
		prevDiff.current = diff;
	}, [diff, isLeft, cardX]);

	// ── Idle float only (no mouse parallax — too expensive per card) ───────────
	useFrame(({ clock }) => {
		if (!cardRef.current || diff > 0.5) return;
		cardRef.current.position.y =
			Math.sin(clock.elapsedTime * 0.6 + index * 1.3) * 0.022;
		cardRef.current.rotation.z =
			Math.sin(clock.elapsedTime * 0.35 + index) * 0.012;
	});

	const baseText: Partial<TextProps> = {
		font: "./Vercetti-Regular.woff",
		color: "white",
		anchorX: "left",
		anchorY: "top",
	};

	// Title needs approx Y based on font size
	const TITLE_FONT = isMobile ? 0.3 : 0.38;
	const TITLE_Y = TOP - 0.32;
	const SUB_Y = -(TOP - 0.52);

	return (
		<group ref={cardRef} position={[cardX, 0, 0]}>
			{/* ── Hard shadow ── */}
			<mesh position={[0.055, -0.055, -0.14]}>
				<planeGeometry args={[W + 0.08, H + 0.08]} />
				<meshBasicMaterial color="black" transparent opacity={cardOp * 0.55} />
			</mesh>

			{/* ── Card body — meshBasicMaterial, NOT physical/standard ── */}
			<RoundedBox
				args={[W, H, 0.08]}
				radius={0.055}
				smoothness={4}
				position={[0, 0, -0.03]}
			>
				<meshBasicMaterial
					color="#080810"
					transparent
					opacity={cardOp * 0.97}
				/>
			</RoundedBox>

			{/* ── Subtle top-half sheen (single cheap plane) ── */}
			<mesh position={[0, TOP * 0.38, 0.01]}>
				<planeGeometry args={[W - 0.06, H * 0.5]} />
				<meshBasicMaterial color="#161622" transparent opacity={cardOp * 0.5} />
			</mesh>

			{/* ── Border — 4 Lines ── */}
			{cardOp > 0.05 && <CardBorder W={W} H={H} />}

			{/* ── Left accent bar ── */}
			<mesh position={[-(W / 2) + 0.025, 0, 0.05]}>
				<planeGeometry args={[0.022, H - 0.12]} />
				<meshBasicMaterial color="white" transparent opacity={cardOp * 0.85} />
			</mesh>

			{/* ── Top accent stripe ── */}
			{cardOp > 0.05 && (
				<mesh position={[0, TOP - 0.022, 0.05]}>
					<planeGeometry args={[W - 0.08, 0.02]} />
					<meshBasicMaterial color="white" transparent opacity={cardOp} />
				</mesh>
			)}

			{/* ── Dot grid (instanced — 1 draw call) ── */}
			{cardOp > 0.15 && <DotGrid W={W - 0.1} H={H - 0.1} opacity={cardOp} />}

			{/* ── Corner brackets ── */}
			{cardOp > 0.1 && (
				<>
					<Corner
						x={-PAD}
						y={TOP - 0.26}
						flipX={false}
						flipY={false}
						opacity={cardOp * 0.9}
					/>
					<Corner
						x={PAD}
						y={TOP - 0.26}
						flipX={true}
						flipY={false}
						opacity={cardOp * 0.9}
					/>
					<Corner
						x={-PAD}
						y={-(TOP - 0.26)}
						flipX={false}
						flipY={true}
						opacity={cardOp * 0.9}
					/>
					<Corner
						x={PAD}
						y={-(TOP - 0.26)}
						flipX={true}
						flipY={true}
						opacity={cardOp * 0.9}
					/>
				</>
			)}

			{/* ── Index watermark ── */}
			<Text
				font="./soria-font.ttf"
				color="white"
				anchorX="right"
				anchorY="top"
				fontSize={0.65}
				position={[PAD + 0.04, TOP - 0.04, 0.05]}
				fillOpacity={cardOp * 0.055}
				letterSpacing={0.02}
			>
				{String(index + 1).padStart(2, "0")}
			</Text>

			{/* ── Year ── */}
			<Text
				{...baseText}
				anchorY="middle"
				fontSize={0.105}
				letterSpacing={0.2}
				position={[-PAD + 0.08, TOP - 0.13, 0.07]}
				fillOpacity={yearOp * 0.7}
				color="#777777"
			>
				{point.year}
			</Text>

			{/* ── Year-to-title divider ── */}
			{cardOp > 0.05 && (
				<Line
					points={[
						new THREE.Vector3(-PAD + 0.06, TOP - 0.24, 0.07),
						new THREE.Vector3(PAD - 0.06, TOP - 0.24, 0.07),
					]}
					color="#252530"
					lineWidth={0.5}
				/>
			)}

			{/* ── Title ── */}
			{titleOp > 0 && (
				<Text
					font="./soria-font.ttf"
					color="white"
					anchorX="left"
					anchorY="top"
					fontSize={TITLE_FONT}
					maxWidth={W - 0.55}
					lineHeight={1.18}
					letterSpacing={0.01}
					position={[-PAD + 0.08, TITLE_Y, 0.07]}
					fillOpacity={titleOp}
				>
					{point.title}
				</Text>
			)}

			{/* ── Title-to-subtitle divider ── */}
			{subtitleOp > 0.05 && (
				<Line
					points={[
						new THREE.Vector3(-PAD + 0.06, SUB_Y + 0.1, 0.07),
						new THREE.Vector3(PAD - 0.06, SUB_Y + 0.1, 0.07),
					]}
					color="#252530"
					lineWidth={0.4}
				/>
			)}

			{/* ── Subtitle ── */}
			{subtitleOp > 0 && (
				<Text
					{...baseText}
					fontSize={0.105}
					maxWidth={W - 0.55}
					lineHeight={2.2}
					position={[-PAD + 0.08, SUB_Y, 0.07]}
					fillOpacity={subtitleOp * 0.75}
					color="#9e9b9b"
				>
					{point.subtitle}
				</Text>
			)}
		</group>
	);
};

// ─── Timeline Point ───────────────────────────────────────────────────────────
const TimelinePoint = ({
	point,
	diff,
	index,
}: {
	point: WorkTimelinePoint;
	diff: number;
	index: number;
}) => {
	const isLeft = point.position === "left";
	const scale = isMobile ? 0.35 : 0.6;
	const cubeScale = Math.max(0.01, 1 - diff * 0.5);
	const connOp = staggerOpacity(diff, 0.55);
	const nodeRef = useRef<THREE.Group>(null);

	// Pulse only the node group, not the whole card
	useFrame(({ clock }) => {
		if (!nodeRef.current || diff > 0.5) return;
		const s =
			cubeScale * (0.92 + Math.sin(clock.elapsedTime * 2.8 + index) * 0.08);
		nodeRef.current.scale.setScalar(s);
	});

	return (
		<group position={point.point} scale={scale}>
			{/* Connector */}
			{connOp > 0 && (
				<Line
					points={[
						new THREE.Vector3(0, 0, 0),
						new THREE.Vector3(isLeft ? -0.38 : 0.38, 0, 0),
					]}
					color="white"
					lineWidth={0.8}
				/>
			)}

			{/* Node */}
			<group ref={nodeRef}>
				<Box args={[0.13, 0.13, 0.13]} position={[0, 0, -0.05]}>
					<meshBasicMaterial
						color="white"
						wireframe
						transparent
						opacity={cubeScale * 0.6}
					/>
					<Edges color="white" lineWidth={1.5} />
				</Box>
				{/* Core dot */}
				<mesh position={[0, 0, -0.05]}>
					<boxGeometry args={[0.055, 0.055, 0.055]} />
					<meshBasicMaterial
						color="white"
						transparent
						opacity={cubeScale * 0.9}
					/>
				</mesh>
			</group>

			<TimelineCard point={point} diff={diff} isLeft={isLeft} index={index} />
		</group>
	);
};

// ─── Timeline ─────────────────────────────────────────────────────────────────
const Timeline = ({ progress }: { progress: number }) => {
	const { camera } = useThree();
	const isActive = usePortalStore((s) => s.activePortalId === "work");
	const timeline = useMemo(() => WORK_TIMELINE, []);

	const curve = useMemo(
		() =>
			new THREE.CatmullRomCurve3(
				timeline.map((p) => p.point),
				false,
				"catmullrom",
				0.4,
			),
		[timeline],
	);

	const CURVE_RES = Math.max(500, timeline.length * 80);
	const curvePoints = useMemo(
		() => curve.getPoints(CURVE_RES),
		[curve, CURVE_RES],
	);

	const visibleCurvePoints = useMemo(
		() =>
			curvePoints.slice(
				0,
				Math.max(2, Math.ceil(progress * curvePoints.length)),
			),
		[curvePoints, progress],
	);
	const visibleTimelinePoints = useMemo(
		() =>
			timeline.slice(
				0,
				Math.max(1, Math.round(progress * (timeline.length - 1) + 1)),
			),
		[timeline, progress],
	);

	const [visibleDashedPoints, setVisibleDashedPoints] = useState<
		THREE.Vector3[]
	>([]);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const groupRef = useRef<THREE.Group>(null);

	useFrame((_, delta) => {
		if (!isActive) return;
		const pos = curve.getPoint(Math.min(progress, 1));
		const mx = isMobile ? -1.6 : -3.0;
		camera.position.x = THREE.MathUtils.damp(
			camera.position.x,
			mx + pos.x,
			3.5,
			delta,
		);
		camera.position.y = THREE.MathUtils.damp(
			camera.position.y,
			-39 + pos.z,
			3.5,
			delta,
		);
		camera.position.z = THREE.MathUtils.damp(
			camera.position.z,
			13 - pos.y,
			3.5,
			delta,
		);
	});

	useEffect(() => {
		const tl = gsap.timeline();
		if (groupRef.current) {
			tl.to(groupRef.current.scale, {
				x: isActive ? 1 : 0,
				y: isActive ? 1 : 0,
				z: isActive ? 1 : 0,
				duration: 1.2,
				ease: "power2.out",
				delay: isActive ? 0.3 : 0,
			});
			tl.to(
				groupRef.current.position,
				{
					y: isActive ? 0 : -2,
					duration: 1.2,
					ease: "power2.out",
					delay: isActive ? 0.3 : 0,
				},
				0,
			);
		}
		if (isActive) {
			let i = 0;
			clearInterval(intervalRef.current!);
			setTimeout(() => {
				intervalRef.current = setInterval(() => {
					const p = i++ / 100;
					setVisibleDashedPoints(
						curvePoints.slice(
							0,
							Math.max(2, Math.ceil(p * curvePoints.length)),
						),
					);
					if (i > 100 && intervalRef.current)
						clearInterval(intervalRef.current);
				}, 12);
			}, 800);
		} else {
			setVisibleDashedPoints([]);
			clearInterval(intervalRef.current!);
		}
		return () => clearInterval(intervalRef.current!);
	}, [isActive, curvePoints]);

	return (
		<group position={[0, -0.1, -0.1]}>
			{visibleCurvePoints.length >= 2 && (
				<Line points={visibleCurvePoints} color="white" lineWidth={2.5} />
			)}
			{visibleDashedPoints.length >= 2 && (
				<Line
					points={visibleDashedPoints}
					color="white"
					lineWidth={0.5}
					dashed
					dashSize={0.18}
					gapSize={0.18}
				/>
			)}
			<Text
				font="./soria-font.ttf"
				fontSize={1.5}
				color="#f1f1f1"
				position={[0, -2.5, -3.5]}
				anchorX="center"
				anchorY="middle"
				fillOpacity={0.95}
				letterSpacing={0.15}
			>
				JOURNEY
			</Text>
			<group ref={groupRef}>
				{visibleTimelinePoints.map((point, i) => {
					const rawDiff = i - progress * (timeline.length - 1);
					const diff = Math.min(2 * Math.max(rawDiff, 0), 1);
					return <TimelinePoint point={point} diff={diff} index={i} key={i} />;
				})}
			</group>
		</group>
	);
};

export default Timeline;
