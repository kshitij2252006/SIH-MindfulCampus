import { useEffect, useRef, useState } from "react";
import { Card } from "./ui/card";

export function BottleSmashGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [wallDepth, setWallDepth] = useState(1.5);
  const [selectedGlassColor, setSelectedGlassColor] = useState("random");
  const [selectedLiquidColor, setSelectedLiquidColor] = useState("same");
  const [selectedObjectType, setSelectedObjectType] = useState("random");
  const [selectedBackground, setSelectedBackground] = useState("auto");

  const currentDepthRef = useRef(1.5);
  const objectsRef = useRef<any[]>([]);
  const splashesRef = useRef<any[]>([]);
  const animationIdRef = useRef<number>();
  const bgIntervalRef = useRef<NodeJS.Timeout>();

  const glassColors = ["#7EC8E3", "#77DD77", "#CBA6E3", "#FFB347", "#F4A7B9"];
  const objectTypes = ["bottle", "cup", "plate", "vase", "glass", "bowl"];

  const calmGradients = [
    "linear-gradient(135deg, #a8edea, #fed6e3)",
    "linear-gradient(135deg, #b7ffea, #e0c3fc)",
    "linear-gradient(135deg, #d4fc79, #96e6a1)",
    "linear-gradient(135deg, #fbc2eb, #a6c1ee)",
    "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
    "linear-gradient(135deg, #f9d423, #ff4e50)"
  ];

  const wallBase = {
    width: 400,
    height: 300,
    x: 200, // (800 - 400) / 2
    y: 100  // (500 - 300) / 2
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size with timeout to prevent blocking
    setTimeout(() => {
      canvas.width = 800;
      canvas.height = 500;
    }, 0);

    class BreakableObject {
      type: string;
      glassColor: string;
      liquidColor: string | null;
      x: number;
      y: number;
      z: number;
      targetZ: number;
      progress: number;
      frames: number;
      targetX: number;
      targetY: number;
      currentX: number;
      currentY: number;
      broken: boolean;
      shards: any[];
      burstFrame: number;
      bursting: boolean;
      shatterPieces: any[];
      shatterAnimFrames: number;
      rotation: number;
      rotationSpeed: number;
      sizeScale: number;

      constructor(type: string, glassColor: string, liquidColor: string, targetX: number, targetY: number) {
        this.type = type;
        this.glassColor = this.hexToRgba(glassColor, 0.8);
        this.liquidColor = liquidColor === 'same' ? glassColor : (liquidColor === 'none' ? null : liquidColor);
        this.x = canvas.width / 2;
        this.y = canvas.height - 100;
        this.z = 0;
        this.targetZ = wallDepth;
        this.progress = 0;
        this.frames = 25 * wallDepth;
        this.targetX = targetX;
        this.targetY = targetY;
        this.currentX = this.x;
        this.currentY = this.y;
        this.broken = false;
        this.shards = [];
        this.burstFrame = 0;
        this.bursting = false;
        this.shatterPieces = [];
        this.shatterAnimFrames = 24;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.15;
        this.sizeScale = 0.9 + Math.random() * 0.2;
      }

      hexToRgba(hex: string, alpha: number): string {
        if (typeof hex !== 'string' || !hex.match(/^#[0-9A-F]{6}$/i)) return hex;
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      }

      update(): boolean {
        this.progress++;
        this.z = (this.progress / this.frames) * this.targetZ;
        const t = Math.min(this.progress / this.frames, 1);
        this.currentX = this.x + (this.targetX - this.x) * t;
        this.currentY = this.y + (this.targetY - this.y) * t;

        if (!this.broken && !this.bursting) {
          this.rotation += this.rotationSpeed;
        }

        if (this.progress >= this.frames && !this.broken) {
          if (this.liquidColor) {
            splashesRef.current.push(new Splash(this.liquidColor, this.targetX, this.targetY));
          }
          this.broken = true;
          this.bursting = true;
          this.createShards();
          this.createShatterPieces();
          this.burstFrame = 0;
          return true;
        }
        if (this.bursting) {
          this.burstFrame++;
          for (const shard of this.shards) {
            shard.update();
          }
          for (const piece of this.shatterPieces) {
            piece.update();
          }
          if (this.burstFrame > this.shatterAnimFrames) {
            this.bursting = false;
            return false;
          }
          return true;
        }
        return !this.broken;
      }

      draw() {
        if (this.bursting) {
          for (const piece of this.shatterPieces) {
            piece.draw();
          }
          for (const shard of this.shards) {
            shard.draw();
          }
          if (this.burstFrame < 8) {
            ctx.save();
            ctx.globalAlpha = 0.15 * (8 - this.burstFrame);
            ctx.beginPath();
            ctx.arc(this.targetX, this.targetY, 40 + this.burstFrame * 2, 0, Math.PI * 2);
            ctx.fillStyle = "#fff";
            ctx.fill();
            ctx.restore();
          }
          return;
        }
        const scale = (1 - (this.z / (wallDepth * 1.2))) * this.sizeScale;
        ctx.save();
        ctx.translate(this.currentX, this.currentY);
        ctx.scale(scale, scale);
        ctx.rotate(this.rotation);

        this.drawShape();

        ctx.restore();
      }

      drawShape() {}

      createShards() {
        const shardCount = 28 + Math.floor(Math.random() * 12);
        for (let i = 0; i < shardCount; i++) {
          const angle = (Math.PI * 2 * i) / shardCount + (Math.random() - 0.5) * 1.2;
          const speed = 5 + Math.random() * 5;
          const size = 4 + Math.random() * 7;
          this.shards.push(new Shard(this.targetX, this.targetY, angle, speed, size, this.glassColor));
        }
      }

      createShatterPieces() {
        const pieceCount = 12 + Math.floor(Math.random() * 6);
        const baseX = this.targetX;
        const baseY = this.targetY;
        for (let i = 0; i < pieceCount; i++) {
          const angle = Math.PI * 2 * (i / pieceCount) + (Math.random() - 0.5) * 1.2;
          const speed = 3 + Math.random() * 3.5;
          const rotation = (Math.random() - 0.5) * 0.4;
          const fragment = [];
          const baseRadius = 7 + Math.random() * 8;
          const points = 5 + Math.floor(Math.random() * 4);
          let baseAngle = Math.random() * Math.PI * 2;
          for (let j = 0; j < points; j++) {
            const a = baseAngle + (Math.PI * 2 * j / points) + (Math.random() - 0.5) * 0.7;
            const r = baseRadius * (0.7 + Math.random() * 1.2);
            fragment.push({ x: Math.cos(a) * r, y: Math.sin(a) * r });
          }
          this.shatterPieces.push(new ShatterPiece(baseX, baseY, angle, speed, rotation, fragment, "#e0e0e0", this.glassColor));
        }
      }
    }

    class Bottle extends BreakableObject {
      drawShape() {
        ctx.save();

        // Beer bottle: wider neck, curvy body
        const bodyHeight = 60;
        const bodyWidth = 20;
        const neckWidth = 8;

        // Glass body with more curves
        ctx.beginPath();
        ctx.ellipse(0, -bodyHeight / 2, bodyWidth, bodyHeight / 2, 0, 0, Math.PI * 2);
        ctx.fillStyle = this.glassColor;
        ctx.fill();
        ctx.strokeStyle = "#ddd";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Liquid (beer-like foam if applicable)
        if (this.liquidColor) {
          ctx.globalAlpha = 0.9;
          ctx.beginPath();
          ctx.ellipse(0, -bodyHeight / 2 * 0.9, bodyWidth * 0.9, (bodyHeight / 2) * 0.8, 0, 0, Math.PI * 2);
          ctx.fillStyle = this.liquidColor;
          ctx.fill();
          ctx.globalAlpha = 1;

          // Foam on top for beer bottles
          if (this.liquidColor.includes("#FF6B35") || this.liquidColor.includes("#8B4513")) {
            ctx.beginPath();
            ctx.arc(0, -bodyHeight * 0.7, bodyWidth * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255,255,255,0.7)";
            ctx.fill();
          }
        }

        // Neck with label area
        ctx.beginPath();
        ctx.moveTo(-neckWidth, -bodyHeight / 2 - 5);
        ctx.lineTo(-neckWidth, -75);
        ctx.quadraticCurveTo(-neckWidth, -85, 0, -85);
        ctx.quadraticCurveTo(neckWidth, -85, neckWidth, -75);
        ctx.lineTo(neckWidth, -bodyHeight / 2 - 5);
        ctx.closePath();
        ctx.fillStyle = this.hexToRgba("#e0e0e0", 0.7);
        ctx.fill();
        ctx.stroke();

        // Cap
        ctx.beginPath();
        ctx.ellipse(0, -85, 8, 5, 0, 0, Math.PI * 2);
        ctx.fillStyle = "#c9a063";
        ctx.fill();

        // Rim and bottle base with engraving
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#aaa";
        ctx.beginPath();
        ctx.arc(0, 0, 12, 0, Math.PI * 2);
        ctx.stroke();

        // Highlights and reflections
        ctx.beginPath();
        ctx.moveTo(-8, -20);
        ctx.bezierCurveTo(-14, -35, -6, -55, 0, -60);
        ctx.strokeStyle = "rgba(255,255,255,0.6)";
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(6, -15);
        ctx.bezierCurveTo(12, -30, 4, -50, 8, -70);
        ctx.strokeStyle = "rgba(255,255,255,0.3)";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.restore();
      }
    }

    class Cup extends BreakableObject {
      drawShape() {
        ctx.save();

        // Cup with handle and smooth taper
        const topRadius = 20;
        const bottomRadius = 14;
        const height = 55;
        const handleRadius = 8;

        // Cup shape
        ctx.beginPath();
        ctx.moveTo(-bottomRadius, 0);
        ctx.lineTo(bottomRadius, 0);
        ctx.arc(bottomRadius, -height / 2, topRadius - bottomRadius, -Math.PI / 2, Math.PI / 2);
        ctx.lineTo(-topRadius, -height);
        ctx.arc(-topRadius, -height / 2, topRadius - bottomRadius, Math.PI / 2, -Math.PI / 2, true);
        ctx.closePath();
        ctx.fillStyle = this.glassColor;
        ctx.fill();
        ctx.strokeStyle = "#ddd";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Liquid
        if (this.liquidColor) {
          ctx.globalAlpha = 0.9;
          ctx.beginPath();
          ctx.moveTo(-bottomRadius * 0.9, -2);
          ctx.lineTo(bottomRadius * 0.9, -2);
          ctx.arc(bottomRadius * 0.9, -height / 2 - 2, (topRadius - bottomRadius) * 0.9, -Math.PI / 2, Math.PI / 2);
          ctx.lineTo(-topRadius * 0.9, -height + 2);
          ctx.arc(-topRadius * 0.9, -height / 2 - 2, (topRadius - bottomRadius) * 0.9, Math.PI / 2, -Math.PI / 2, true);
          ctx.closePath();
          ctx.fillStyle = this.liquidColor;
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        // Handle with realistic curve
        ctx.beginPath();
        ctx.arc(25, -height / 4, handleRadius, Math.PI / 3, -Math.PI / 3);
        ctx.arc(-10, -height / 2, handleRadius, -Math.PI / 2, Math.PI / 2, false);
        ctx.arc(25, -3 * height / 4, handleRadius, -Math.PI / 3, Math.PI / 3, false);
        ctx.closePath();
        ctx.fillStyle = this.glassColor;
        ctx.fill();
        ctx.stroke();

        // Rim highlight
        ctx.beginPath();
        ctx.arc(0, -height + 5, topRadius, Math.PI, 0);
        ctx.strokeStyle = "rgba(255,255,255,0.5)";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Inner reflection
        ctx.beginPath();
        ctx.arc(-6, -height / 2, topRadius * 0.4, 0, Math.PI);
        ctx.strokeStyle = "rgba(255,255,255,0.3)";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
      }
    }

    class Plate extends BreakableObject {
      drawShape() {
        ctx.save();

        // Plate with rim and edge
        const outerRadius = 32;
        const innerRadius = 25;
        const depth = 8;

        // Outer plate
        ctx.beginPath();
        ctx.arc(0, 0, outerRadius, 0, Math.PI * 2);
        ctx.fillStyle = this.glassColor;
        ctx.fill();
        ctx.strokeStyle = "#ddd";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Inner surface with slight curve
        ctx.beginPath();
        ctx.arc(0, -depth, innerRadius, 0, Math.PI * 2);
        ctx.arc(0, 0, innerRadius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.hexToRgba(this.glassColor, 0.9);
        ctx.fill();

        // Food or liquid on plate if any
        if (this.liquidColor) {
          ctx.beginPath();
          ctx.arc(0, -depth / 2, innerRadius * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = this.liquidColor;
          ctx.fill();
        }

        // Outer rim highlight
        ctx.beginPath();
        ctx.arc(0, 0, outerRadius, -Math.PI / 2, Math.PI / 2);
        ctx.strokeStyle = "rgba(255,255,255,0.4)";
        ctx.lineWidth = 3;
        ctx.stroke();

        // Inner shadow
        ctx.beginPath();
        ctx.arc(0, -depth, innerRadius, Math.PI / 2, -Math.PI / 2);
        ctx.strokeStyle = "#bbb";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
      }
    }

    class Vase extends BreakableObject {
      drawShape() {
        ctx.save();

        // Vase with flared neck and base
        ctx.beginPath();
        ctx.moveTo(-14, 0); // Base
        ctx.bezierCurveTo(-20, -15, -10, -50, -8, -70);
        ctx.bezierCurveTo(-5, -80, 5, -80, 8, -70);
        ctx.bezierCurveTo(10, -50, 20, -15, 14, 0);
        ctx.closePath();
        ctx.fillStyle = this.glassColor;
        ctx.fill();
        ctx.strokeStyle = "#ddd";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Water or liquid
        if (this.liquidColor) {
          ctx.beginPath();
          ctx.moveTo(-10, -5);
          ctx.bezierCurveTo(-15, -20, -8, -45, -5, -65);
          ctx.bezierCurveTo(-3, -75, 3, -75, 5, -65);
          ctx.bezierCurveTo(8, -45, 15, -20, 10, -5);
          ctx.closePath();
          ctx.fillStyle = this.liquidColor;
          ctx.fill();
        }

        // Neck
        ctx.beginPath();
        ctx.moveTo(-5, -70);
        ctx.lineTo(-5, -85);
        ctx.quadraticCurveTo(-5, -95, 0, -95);
        ctx.quadraticCurveTo(5, -95, 5, -85);
        ctx.lineTo(5, -70);
        ctx.closePath();
        ctx.fillStyle = this.hexToRgba("#e0e0e0", 0.7);
        ctx.fill();
        ctx.stroke();

        // Rim
        ctx.beginPath();
        ctx.arc(0, -85, 7, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255,255,255,0.5)";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Reflections
        ctx.beginPath();
        ctx.moveTo(-8, -30);
        ctx.bezierCurveTo(-14, -45, -6, -65, 0, -80);
        ctx.strokeStyle = "rgba(255,255,255,0.6)";
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(9, -35, 6, Math.PI / 2, -Math.PI / 2);
        ctx.strokeStyle = "rgba(255,255,255,0.3)";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Flowers
        if (Math.random() > 0.5) {
          ctx.fillStyle = "red";
          ctx.beginPath();
          ctx.arc(-5, -90, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(5, -90, 4, 0, Math.PI * 2);
          ctx.fill();
          // Stems
          ctx.strokeStyle = "green";
          ctx.beginPath();
          ctx.moveTo(-2, -90);
          ctx.lineTo(-2, -70);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(8, -90);
          ctx.lineTo(8, -70);
          ctx.stroke();
        }

        ctx.restore();
      }
    }

    class Glass extends BreakableObject {
      drawShape() {
        ctx.save();

        // Tumbler with straight sides
        const radius = 18;
        const height = 65;

        // Glass body
        ctx.beginPath();
        ctx.moveTo(-radius, 0);
        ctx.lineTo(-radius, -height);
        ctx.lineTo(radius, -height);
        ctx.lineTo(radius, 0);
        ctx.closePath();
        ctx.fillStyle = this.glassColor;
        ctx.fill();
        ctx.strokeStyle = "#ddd";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Liquid
        if (this.liquidColor) {
          ctx.globalAlpha = 0.9;
          ctx.beginPath();
          ctx.moveTo(-radius + 2, -3);
          ctx.lineTo(-radius + 2, -height + 3);
          ctx.lineTo(radius - 2, -height + 3);
          ctx.lineTo(radius - 2, -3);
          ctx.closePath();
          ctx.fillStyle = this.liquidColor;
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        // Rim highlight
        ctx.beginPath();
        ctx.arc(0, -height + 5, radius, Math.PI, 0);
        ctx.strokeStyle = "rgba(255,255,255,0.5)";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Inner reflections
        ctx.beginPath();
        ctx.arc(-5, -height / 2, radius * 0.3, 0, Math.PI);
        ctx.strokeStyle = "rgba(255,255,255,0.4)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(8, -height / 3, radius * 0.2, -Math.PI / 2, 0);
        ctx.strokeStyle = "rgba(255,255,255,0.3)";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
      }
    }

    class Bowl extends BreakableObject {
      drawShape() {
        ctx.save();

        // Bowl with deep bowl-like shape
        const outerRadius = 32;
        const depth = 25;

        // Outer shape
        ctx.beginPath();
        ctx.arc(0, 0, outerRadius, 0, Math.PI * 2);
        ctx.arc(0, -depth, outerRadius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.glassColor;
        ctx.fill();
        ctx.strokeStyle = "#ddd";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Inner surface
        ctx.beginPath();
        ctx.arc(0, -depth, outerRadius * 0.9, 0, Math.PI * 2);
        ctx.fillStyle = this.hexToRgba(this.glassColor, 0.9);
        ctx.fill();

        // Contents - soup, salad, or liquid
        if (this.liquidColor) {
          ctx.beginPath();
          ctx.arc(0, -depth / 2, outerRadius * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = this.liquidColor;
          ctx.fill();

          // For beer-like, add bubbles
          if (this.liquidColor.includes("#FF6B35") || this.liquidColor.includes("#8B4513")) {
            ctx.fillStyle = "rgba(255,255,255,0.6)";
            for (let i = 0; i < 10; i++) {
              const x = (Math.random() - 0.5) * outerRadius * 0.6;
              const y = -depth / 2 + Math.random() * depth / 2;
              ctx.beginPath();
              ctx.arc(x, y, 1 + Math.random() * 2, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }

        // Rim highlight
        ctx.beginPath();
        ctx.arc(0, 0, outerRadius, Math.PI, 0);
        ctx.strokeStyle = "rgba(255,255,255,0.4)";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Inner shadow
        ctx.beginPath();
        ctx.arc(0, -depth, outerRadius * 0.9, Math.PI / 2, -Math.PI / 2);
        ctx.strokeStyle = "#bbb";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
      }
    }

    class ShatterPiece {
      x: number;
      y: number;
      vx: number;
      vy: number;
      fragment: { x: number; y: number }[];
      life: number;
      fadeRate: number;
      rotation: number;
      rotationSpeed: number;
      glassColor: string;
      outlineColor: string;

      constructor(x: number, y: number, angle: number, speed: number, rotationSpeed: number, fragment: { x: number; y: number }[], glassColor: string, outlineColor: string) {
        this.x = x;
        this.y = y;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.fragment = fragment;
        this.life = 1.0;
        this.fadeRate = 0.04 + Math.random() * 0.01;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = rotationSpeed;
        this.glassColor = glassColor;
        this.outlineColor = outlineColor;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.12;
        this.life -= this.fadeRate;
        this.rotation += this.rotationSpeed;
      }

      draw() {
        if (this.life <= 0) return;
        ctx.save();
        ctx.globalAlpha = Math.max(this.life, 0.7);
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.beginPath();
        ctx.moveTo(this.fragment[0].x, this.fragment[0].y);
        for (let i = 1; i < this.fragment.length; i++) {
          ctx.lineTo(this.fragment[i].x, this.fragment[i].y);
        }
        ctx.closePath();
        ctx.fillStyle = this.outlineColor;
        ctx.fill();
        ctx.strokeStyle = this.glassColor;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      }
    }

    class Shard {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      life: number;
      fadeRate: number;
      color: string;
      rotation: number;
      rotationSpeed: number;

      constructor(x: number, y: number, angle: number, speed: number, size: number, color: string) {
        this.x = x;
        this.y = y;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.size = size;
        this.life = 1.0;
        this.fadeRate = 0.03 + Math.random() * 0.01;
        this.color = color;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.18;
        this.life -= this.fadeRate;
        this.rotation += this.rotationSpeed;
      }

      draw() {
        if (this.life <= 0) return;
        ctx.save();
        ctx.globalAlpha = Math.max(this.life, 0);
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = "#e0e0e0";
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(this.size, -this.size / 2);
        ctx.lineTo(this.size / 2, this.size);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    }

    class Splash {
      color: string;
      life: number;
      fadeRate: number;
      x: number;
      y: number;
      size: number;
      centralEllipse: { rx: number; ry: number; rotation: number };
      arms: Array<{ angle: number; length: number; width: number; ry: number; rotation: number }>;
      droplets: Array<{ angle: number; distance: number; radius: number }>;

      constructor(color: string, x: number, y: number) {
        this.color = color;
        this.life = 1.0;
        this.fadeRate = 1 / (4 * 60);
        this.x = x;
        this.y = y;
        this.size = 60 + Math.random() * 30;

        this.centralEllipse = {
          rx: this.size * (0.6 + Math.random() * 0.1),
          ry: this.size * (0.45 + Math.random() * 0.1),
          rotation: Math.random() * Math.PI
        };

        this.arms = [];
        const armCount = 7 + Math.floor(Math.random() * 6);
        for (let i = 0; i < armCount; i++) {
          const angle = (Math.PI * 2 * i) / armCount + (Math.random() - 0.5) * 0.5;
          const length = this.size * (0.7 + Math.random() * 1.1);
          const width = 8 + Math.random() * 18;
          const ry = width / (1.5 + Math.random());
          const rotation = Math.random() * Math.PI;
          this.arms.push({ angle, length, width, ry, rotation });
        }

        this.droplets = [];
        const dropletCount = 5 + Math.floor(Math.random() * 8);
        for (let i = 0; i < dropletCount; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = this.size * (1.1 + Math.random() * 1.2);
          const radius = 4 + Math.random() * 10;
          this.droplets.push({ angle, distance, radius });
        }
      }

      update(): boolean {
        this.life -= this.fadeRate;
        return this.life > 0;
      }

      draw() {
        const scale = 1 / currentDepthRef.current;
        const cx = this.x * scale + (canvas.width * (1 - scale)) / 2;
        const cy = this.y * scale + (canvas.height * (1 - scale)) / 2;

        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.ellipse(
          cx,
          cy,
          this.centralEllipse.rx * scale,
          this.centralEllipse.ry * scale,
          this.centralEllipse.rotation,
          0,
          Math.PI * 2
        );
        ctx.fill();

        for (const arm of this.arms) {
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(arm.angle);
          ctx.beginPath();
          ctx.ellipse(
            arm.length * scale,
            0,
            arm.width * scale,
            arm.ry * scale,
            arm.rotation,
            0,
            Math.PI * 2
          );
          ctx.fill();
          ctx.restore();
        }

        for (const drop of this.droplets) {
          ctx.beginPath();
          ctx.arc(
            cx + Math.cos(drop.angle) * drop.distance * scale,
            cy + Math.sin(drop.angle) * drop.distance * scale,
            drop.radius * scale,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }

        ctx.restore();
      }
    }

    function drawWall() {
      const scale = 1 / currentDepthRef.current;
      const wallX = wallBase.x * scale + (canvas.width * (1 - scale)) / 2;
      const wallY = wallBase.y * scale + (canvas.height * (1 - scale)) / 2;
      const wallW = wallBase.width * scale;
      const wallH = wallBase.height * scale;

      ctx.save();
      ctx.strokeStyle = "#bdbdbd";
      ctx.lineWidth = 12 * scale;
      ctx.strokeRect(wallX, wallY, wallW, wallH);
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.fillRect(wallX, wallY, wallW, wallH);
      ctx.shadowColor = "#888";
      ctx.shadowBlur = 18 * scale;
      ctx.restore();
    }

    function gameLoop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      currentDepthRef.current += (wallDepth - currentDepthRef.current) * 0.02;
      drawWall();
      
      for (let i = splashesRef.current.length - 1; i >= 0; i--) {
        if (!splashesRef.current[i].update()) splashesRef.current.splice(i, 1);
        else splashesRef.current[i].draw();
      }
      
      for (let i = objectsRef.current.length - 1; i >= 0; i--) {
        if (!objectsRef.current[i].update()) objectsRef.current.splice(i, 1);
        else objectsRef.current[i].draw();
      }
      
      animationIdRef.current = requestAnimationFrame(gameLoop);
    }

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      let objType = selectedObjectType;
      if (selectedObjectType === "random") {
        objType = objectTypes[Math.floor(Math.random() * objectTypes.length)];
      }
      let glassColor = selectedGlassColor === "random" ? glassColors[Math.floor(Math.random() * glassColors.length)] : selectedGlassColor;
      let obj;
      switch (objType) {
        case 'bottle':
          obj = new Bottle('bottle', glassColor, selectedLiquidColor, mouseX, mouseY);
          break;
        case 'cup':
          obj = new Cup('cup', glassColor, selectedLiquidColor, mouseX, mouseY);
          break;
        case 'plate':
          obj = new Plate('plate', glassColor, selectedLiquidColor, mouseX, mouseY);
          break;
        case 'vase':
          obj = new Vase('vase', glassColor, selectedLiquidColor, mouseX, mouseY);
          break;
        case 'glass':
          obj = new Glass('glass', glassColor, selectedLiquidColor, mouseX, mouseY);
          break;
        case 'bowl':
          obj = new Bowl('bowl', glassColor, selectedLiquidColor, mouseX, mouseY);
          break;
      }
      if (obj) objectsRef.current.push(obj);
    };

    canvas.addEventListener("click", handleCanvasClick);

    // Auto background change
    let lastBgIdx: number | null = null;
    
    function smoothBgChange(newGradient: string) {
      const gameContainer = canvas.parentElement;
      if (gameContainer) {
        gameContainer.style.background = newGradient;
      }
    }

    function setAutoBackground() {
      if (bgIntervalRef.current) clearInterval(bgIntervalRef.current);
      let idx = Math.floor(Math.random() * calmGradients.length);
      lastBgIdx = idx;
      smoothBgChange(calmGradients[idx]);

      bgIntervalRef.current = setInterval(() => {
        let newIdx;
        do {
          newIdx = Math.floor(Math.random() * calmGradients.length);
        } while (newIdx === lastBgIdx);
        lastBgIdx = newIdx;
        smoothBgChange(calmGradients[newIdx]);
      }, 8000);
    }

    if (selectedBackground === "auto") {
      setAutoBackground();
    } else {
      smoothBgChange(selectedBackground);
    }

    // Start game loop with delay to prevent blocking
    setTimeout(() => {
      animationIdRef.current = requestAnimationFrame(gameLoop);
    }, 100);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (bgIntervalRef.current) {
        clearInterval(bgIntervalRef.current);
      }
      canvas.removeEventListener("click", handleCanvasClick);
    };
  }, [wallDepth, selectedBackground, selectedObjectType, selectedGlassColor, selectedLiquidColor]);

  useEffect(() => {
    currentDepthRef.current = wallDepth;
  }, [wallDepth]);

  return (
    <Card className="p-6 space-y-6 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-purple-900">🔨 Bottle Smash Stress Relief</h2>
        <p className="text-purple-700">Click to throw objects and watch them shatter! Customize colors and enjoy the satisfying destruction.</p>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Object Type</label>
          <select 
            value={selectedObjectType} 
            onChange={(e) => setSelectedObjectType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="random">Random</option>
            <option value="bottle">Beer Bottle</option>
            <option value="cup">Glass Cup</option>
            <option value="plate">Glass Plate</option>
            <option value="vase">Glass Vase</option>
            <option value="glass">Drinking Glass</option>
            <option value="bowl">Glass Bowl</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Glass Color</label>
          <select 
            value={selectedGlassColor} 
            onChange={(e) => setSelectedGlassColor(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="random">Default (Random)</option>
            <option value="#7EC8E3">Blue</option>
            <option value="#77DD77">Green</option>
            <option value="#CBA6E3">Purple</option>
            <option value="#FFB347">Orange</option>
            <option value="#F4A7B9">Pink</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Liquid Color</label>
          <select 
            value={selectedLiquidColor} 
            onChange={(e) => setSelectedLiquidColor(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="same">Same as Glass</option>
            <option value="#7EC8E3">Blue</option>
            <option value="#77DD77">Green</option>
            <option value="#CBA6E3">Purple</option>
            <option value="#FFB347">Orange</option>
            <option value="#F4A7B9">Pink</option>
            <option value="#FF6B35">Beer (Amber)</option>
            <option value="#8B4513">Beer (Brown)</option>
            <option value="#FFD700">Champagne</option>
            <option value="none">None</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Background</label>
          <select 
            value={selectedBackground} 
            onChange={(e) => setSelectedBackground(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="auto">Default (Calm Random)</option>
            <option value="linear-gradient(135deg, #a8edea, #fed6e3)">Aqua Pink (Peaceful)</option>
            <option value="linear-gradient(135deg, #b7ffea, #e0c3fc)">Mint Lavender (Stress Relief)</option>
            <option value="linear-gradient(135deg, #d4fc79, #96e6a1)">Green Yellow (Fresh)</option>
            <option value="linear-gradient(135deg, #fbc2eb, #a6c1ee)">Pink Blue (Calm)</option>
            <option value="linear-gradient(135deg, #f5f7fa, #c3cfe2)">Grey White (Soft)</option>
            <option value="linear-gradient(135deg, #f9d423, #ff4e50)">Yellow Red (Warm)</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Wall Depth: {wallDepth.toFixed(1)}
        </label>
        <input
          type="range"
          min="1"
          max="3"
          step="0.1"
          value={wallDepth}
          onChange={(e) => setWallDepth(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Game Canvas */}
      <div className="flex justify-center">
        <div 
          className="rounded-2xl overflow-hidden shadow-2xl transition-all duration-2500 ease-in-out"
          style={{ background: calmGradients[0] }}
        >
          <canvas
            ref={canvasRef}
            className="cursor-crosshair bg-white/60 backdrop-blur-sm"
            style={{ borderRadius: "16px" }}
          />
        </div>
      </div>

      <div className="text-center text-sm text-gray-600">
        <p>Click on the canvas to throw a breakable object. Customize colors and enjoy the realistic shatter effect with liquid splash!</p>
        <p className="mt-1 text-xs">This therapeutic game helps release tension through satisfying virtual destruction.</p>
      </div>
    </Card>
  );
}