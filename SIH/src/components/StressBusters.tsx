import { useState } from "react";
import { ChevronDown, ChevronUp, Gamepad2, Heart } from "lucide-react";
import { openFishingGameWindow } from "./FishingGame";

export function StressBusters() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const openBottleGameWindow = () => {
    const gameWindow = window.open(
      "",
      "BottleSmashGame",
      "width=1200,height=900,scrollbars=yes,resizable=yes",
    );

    if (gameWindow) {
      gameWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Stress Relief Bottle Smash Game</title>
          <style>
            body {
              margin: 0;
              overflow: hidden;
              height: 100vh;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
              color: #444;
              background: linear-gradient(135deg, #e0f7fa, #f3e5f5, #ffe0b2, #f8bbd0);
              background-size: 400% 400%;
              animation: gradientShift 25s ease infinite alternate;
            }

            @keyframes gradientShift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }

            canvas {
              background: rgba(255, 255, 255, 0.6);
              border-radius: 16px;
              box-shadow: 0 4px 30px rgba(0,0,0,0.1);
              cursor: crosshair;
            }

            .controls {
              margin-top: 12px;
              font-size: 14px;
              text-align: center;
            }

            input[type=range] {
              width: 200px;
            }

            .selectors {
              margin-bottom: 10px;
              text-align: center;
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 32px;
              flex-wrap: wrap;
            }

            .selectors select {
              padding: 4px 8px;
              border: 1px solid #ccc;
              border-radius: 4px;
              font-size: 12px;
            }

            .instructions {
              margin-top: 10px;
              font-size: 12px;
              color: #666;
              text-align: center;
              max-width: 600px;
            }

            .title {
              text-align: center;
              margin-bottom: 20px;
              color: #333;
            }

            .close-btn {
              position: absolute;
              top: 10px;
              right: 15px;
              background: #ff4757;
              color: white;
              border: none;
              border-radius: 50%;
              width: 30px;
              height: 30px;
              cursor: pointer;
              font-size: 16px;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .close-btn:hover {
              background: #ff3742;
            }
          </style>
        </head>
        <body>
          <button class="close-btn" onclick="window.close()">×</button>
          
          <div id="bgOverlay" style="
            position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:-1;
            pointer-events:none;opacity:0;transition:opacity 2.5s cubic-bezier(.4,0,.2,1);">
          </div>
          
          <div class="title">
            <h1>🔨 Stress Relief Bottle Smash</h1>
            <p>Click to throw objects and release your stress!</p>
          </div>
          
          <div class="selectors">
            <div>
              <label for="objectTypeSelect">Object Type:</label>
              <select id="objectTypeSelect">
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
              <label for="glassColorSelect">Glass Color:</label>
              <select id="glassColorSelect">
                <option value="random">Default (Random)</option>
                <option value="#7EC8E3">Blue</option>
                <option value="#77DD77">Green</option>
                <option value="#CBA6E3">Purple</option>
                <option value="#FFB347">Orange</option>
                <option value="#F4A7B9">Pink</option>
              </select>
            </div>
            <div>
              <label for="liquidColorSelect">Liquid Color:</label>
              <select id="liquidColorSelect">
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
              <label for="bgColorSelect">Background:</label>
              <select id="bgColorSelect">
                <option value="auto">Auto (Calm Random)</option>
                <option value="linear-gradient(135deg, #a8edea, #fed6e3)">Aqua Pink (Peaceful)</option>
                <option value="linear-gradient(135deg, #b7ffea, #e0c3fc)">Mint Lavender (Stress Relief)</option>
                <option value="linear-gradient(135deg, #d4fc79, #96e6a1)">Green Yellow (Fresh)</option>
                <option value="linear-gradient(135deg, #fbc2eb, #a6c1ee)">Pink Blue (Calm)</option>
                <option value="linear-gradient(135deg, #f5f7fa, #c3cfe2)">Grey White (Soft)</option>
                <option value="linear-gradient(135deg, #f9d423, #ff4e50)">Yellow Red (Warm)</option>
              </select>
            </div>
          </div>
          
          <canvas id="gameCanvas" width="800" height="500"></canvas>
          
          <div class="controls">
            <label>Wall Depth: <span id="depthValue">1.5</span></label><br>
            <input type="range" id="depthSlider" min="1" max="3" step="0.1" value="1.5">
          </div>
          
          <div class="instructions">
            Click on the canvas to throw a breakable object. Customize colors and enjoy the realistic shatter effect with liquid splash!<br>
            <strong>This therapeutic game helps release tension through satisfying virtual destruction.</strong>
          </div>

          <script>
            const canvas = document.getElementById("gameCanvas");
            const ctx = canvas.getContext("2d");

            const depthSlider = document.getElementById("depthSlider");
            const depthValue = document.getElementById("depthValue");

            let wallDepth = 1.5;
            let currentDepth = 1.5;

            const glassColors = ["#7EC8E3", "#77DD77", "#CBA6E3", "#FFB347", "#F4A7B9"];
            const objectTypes = ["bottle", "cup", "plate", "vase", "glass", "bowl"];
            const glassColorSelect = document.getElementById("glassColorSelect");
            const liquidColorSelect = document.getElementById("liquidColorSelect");
            const objectTypeSelect = document.getElementById("objectTypeSelect");
            const bgColorSelect = document.getElementById("bgColorSelect");
            let selectedGlassColor = glassColorSelect.value;
            let selectedLiquidColor = liquidColorSelect.value;
            let selectedObjectType = objectTypeSelect.value;

            glassColorSelect.addEventListener("change", function() {
              selectedGlassColor = this.value;
            });
            liquidColorSelect.addEventListener("change", function() {
              selectedLiquidColor = this.value;
            });
            objectTypeSelect.addEventListener("change", function() {
              selectedObjectType = this.value;
            });

            const wallBase = {
              width: 400,
              height: 300,
              x: (canvas.width - 400) / 2,
              y: (canvas.height - 300) / 2
            };

            const objects = [];
            const splashes = [];

            class BreakableObject {
              constructor(type, glassColor, liquidColor, targetX, targetY) {
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
                this.broken = false;
                this.shards = [];
                this.burstFrame = 0;
                this.bursting = false;
                this.shatterPieces = [];
                this.shatterAnimFrames = 24;
                this.shatterStarted = false;
                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.15;
                this.sizeScale = 0.9 + Math.random() * 0.2;
              }

              hexToRgba(hex, alpha) {
                if (typeof hex !== 'string' || !hex.match(/^#[0-9A-F]{6}$/i)) return hex;
                let r = parseInt(hex.slice(1, 3), 16);
                let g = parseInt(hex.slice(3, 5), 16);
                let b = parseInt(hex.slice(5, 7), 16);
                return \`rgba(\${r}, \${g}, \${b}, \${alpha})\`;
              }

              update() {
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
                    splashes.push(new Splash(this.liquidColor, this.targetX, this.targetY));
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

              drawShape() {
                // This will be overridden by subclasses
              }

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

                // Liquid
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

                // Neck
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

                // Highlights
                ctx.beginPath();
                ctx.moveTo(-8, -20);
                ctx.bezierCurveTo(-14, -35, -6, -55, 0, -60);
                ctx.strokeStyle = "rgba(255,255,255,0.6)";
                ctx.lineWidth = 3;
                ctx.stroke();

                ctx.restore();
              }
            }

            class Cup extends BreakableObject {
              drawShape() {
                ctx.save();

                const topRadius = 20;
                const bottomRadius = 14;
                const height = 55;

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

                // Handle
                ctx.beginPath();
                ctx.arc(25, -height / 4, 8, Math.PI / 3, -Math.PI / 3);
                ctx.strokeStyle = this.glassColor;
                ctx.lineWidth = 6;
                ctx.stroke();

                ctx.restore();
              }
            }

            class Plate extends BreakableObject {
              drawShape() {
                ctx.save();

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

                // Inner surface
                ctx.beginPath();
                ctx.arc(0, -depth, innerRadius, 0, Math.PI * 2);
                ctx.fillStyle = this.hexToRgba(this.glassColor, 0.9);
                ctx.fill();

                // Food or liquid on plate
                if (this.liquidColor) {
                  ctx.beginPath();
                  ctx.arc(0, -depth / 2, innerRadius * 0.8, 0, Math.PI * 2);
                  ctx.fillStyle = this.liquidColor;
                  ctx.fill();
                }

                ctx.restore();
              }
            }

            class Vase extends BreakableObject {
              drawShape() {
                ctx.save();

                // Vase with flared neck and base
                ctx.beginPath();
                ctx.moveTo(-14, 0);
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

                // Optional flowers
                if (Math.random() > 0.5) {
                  ctx.fillStyle = "red";
                  ctx.beginPath();
                  ctx.arc(-3, -90, 3, 0, Math.PI * 2);
                  ctx.fill();
                  ctx.beginPath();
                  ctx.arc(3, -90, 3, 0, Math.PI * 2);
                  ctx.fill();
                }

                ctx.restore();
              }
            }

            class Glass extends BreakableObject {
              drawShape() {
                ctx.save();

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

                ctx.restore();
              }
            }

            class Bowl extends BreakableObject {
              drawShape() {
                ctx.save();

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

                // Contents
                if (this.liquidColor) {
                  ctx.beginPath();
                  ctx.arc(0, -depth / 2, outerRadius * 0.8, 0, Math.PI * 2);
                  ctx.fillStyle = this.liquidColor;
                  ctx.fill();
                }

                ctx.restore();
              }
            }

            class ShatterPiece {
              constructor(x, y, angle, speed, rotationSpeed, fragment, glassColor, outlineColor) {
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
              constructor(x, y, angle, speed, size, color) {
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
              constructor(color, x, y) {
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

              update() {
                this.life -= this.fadeRate;
                return this.life > 0;
              }

              draw() {
                const scale = 1 / currentDepth;
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
              const scale = 1 / currentDepth;
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
              currentDepth += (wallDepth - currentDepth) * 0.02;
              drawWall();
              for (let i = splashes.length - 1; i >= 0; i--) {
                if (!splashes[i].update()) splashes.splice(i, 1);
                else splashes[i].draw();
              }
              for (let i = objects.length - 1; i >= 0; i--) {
                if (!objects[i].update()) objects.splice(i, 1);
                else objects[i].draw();
              }
              requestAnimationFrame(gameLoop);
            }

            const calmGradients = [
              "linear-gradient(135deg, #a8edea, #fed6e3)",
              "linear-gradient(135deg, #b7ffea, #e0c3fc)",
              "linear-gradient(135deg, #d4fc79, #96e6a1)",
              "linear-gradient(135deg, #fbc2eb, #a6c1ee)",
              "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
              "linear-gradient(135deg, #f9d423, #ff4e50)"
            ];

            let autoBgInterval = null;
            let lastBgIdx = null;

            const bgOverlay = document.getElementById("bgOverlay");

            function smoothBgChange(newGradient) {
              bgOverlay.style.background = newGradient;
              bgOverlay.style.opacity = "1";
              setTimeout(() => {
                document.body.style.background = newGradient;
                bgOverlay.style.opacity = "0";
              }, 2500);
            }

            function setAutoBackground() {
              if (autoBgInterval) clearInterval(autoBgInterval);
              let idx = Math.floor(Math.random() * calmGradients.length);
              lastBgIdx = idx;
              document.body.style.background = calmGradients[idx];
              bgOverlay.style.opacity = "0";

              autoBgInterval = setInterval(() => {
                let newIdx;
                do {
                  newIdx = Math.floor(Math.random() * calmGradients.length);
                } while (newIdx === lastBgIdx);
                lastBgIdx = newIdx;
                smoothBgChange(calmGradients[newIdx]);
              }, 8000);
            }

            bgColorSelect.addEventListener("change", function() {
              if (autoBgInterval) clearInterval(autoBgInterval);
              if (this.value === "auto") {
                setAutoBackground();
              } else {
                smoothBgChange(this.value);
              }
            });

            if (bgColorSelect.value === "auto") setAutoBackground();

            canvas.addEventListener("click", (e) => {
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
              objects.push(obj);
            });

            depthSlider.addEventListener("input", (e) => {
              wallDepth = parseFloat(e.target.value);
              depthValue.textContent = wallDepth.toFixed(1);
            });

            gameLoop();
          </script>
        </body>
        </html>
      `);
      gameWindow.document.close();
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const stressBusterSections = [
    {
      id: "games",
      title: "🎮 Interactive Stress Relief Games",
      subtitle: "Fun activities to release tension and unwind",
      color: "from-purple-50 to-blue-50",
      borderColor: "border-purple-200",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bottle Smash Game */}
          <div
            className="bg-white rounded-lg p-4 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
            onClick={openBottleGameWindow}
          >
            <div className="relative overflow-hidden rounded-lg mb-3">
              {/* Placeholder for Bottle Smash Game Image */}
              <div className="w-full h-20 bg-gradient-to-r from-purple-200 to-purple-300 border-2 border-dashed border-purple-400 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 text-xs font-medium">🔨 Bottle Smash Image</span>
              </div>
              <div className="absolute inset-0 bg-purple-600 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Open Game →
                </span>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Bottle Smash
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Release stress by smashing virtual bottles! Customize colors and enjoy realistic physics.
            </p>
            <div className="flex items-center text-xs text-purple-600">
              <span className="mr-2">🎯</span>
              <span>Interactive • Stress Relief</span>
            </div>
          </div>

          {/* Fishing Game */}
          <div
            className="bg-white rounded-lg p-4 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
            onClick={openFishingGameWindow}
          >
            <div className="relative overflow-hidden rounded-lg mb-3">
              {/* Placeholder for Fishing Game Image */}
              <div className="w-full h-20 bg-gradient-to-r from-blue-200 to-blue-300 border-2 border-dashed border-blue-400 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-xs font-medium">🎣 Fishing Game Image</span>
              </div>
              <div className="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Open Game →
                </span>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Peaceful Fishing
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Relax by a tranquil virtual lake with meditative fishing experience.
            </p>
            <div className="flex items-center text-xs text-blue-600">
              <span className="mr-2">🎣</span>
              <span>Meditative • Calming</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "wellness-toolkit",
      title: "🧠 Complete Wellness Toolkit",
      subtitle: "Evidence-based practices for mental health & cognitive support",
      color: "from-emerald-50 to-teal-50",
      borderColor: "border-emerald-200",
      content: (
        <div className="space-y-8">
          {/* Focus Enhancement (ADHD Support) */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-indigo-600 text-xl">🎯</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-lg">Focus Enhancement (ADHD Support)</h4>
                <p className="text-sm text-gray-600">Evidence-based techniques to improve attention and concentration</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-indigo-50 rounded-lg p-4">
                <h5 className="font-medium text-indigo-900 mb-2">🧘 Mindful Attention Training</h5>
                <p className="text-sm text-indigo-700">5-minute focused breathing to strengthen attention span and reduce hyperactivity</p>
              </div>
              <div className="bg-indigo-50 rounded-lg p-4">
                <h5 className="font-medium text-indigo-900 mb-2">⏰ Pomodoro Focus Sessions</h5>
                <p className="text-sm text-indigo-700">25-minute work intervals with 5-minute breaks to optimize concentration</p>
              </div>
              <div className="bg-indigo-50 rounded-lg p-4">
                <h5 className="font-medium text-indigo-900 mb-2">🏃 Movement Breaks</h5>
                <p className="text-sm text-indigo-700">Brief physical exercises to channel hyperactivity and reset attention</p>
              </div>
              <div className="bg-indigo-50 rounded-lg p-4">
                <h5 className="font-medium text-indigo-900 mb-2">📝 Organization Strategies</h5>
                <p className="text-sm text-indigo-700">Visual planning tools and task prioritization techniques</p>
              </div>
            </div>
          </div>

          {/* Stress & Anxiety Relief */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-green-600 text-xl">🌿</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-lg">Stress & Anxiety Relief</h4>
                <p className="text-sm text-gray-600">Immediate and long-term strategies to calm the nervous system</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-green-50 rounded-lg p-4">
                <h5 className="font-medium text-green-900 mb-2">🌬️ 4-7-8 Breathing</h5>
                <p className="text-sm text-green-700">Inhale 4, hold 7, exhale 8 - activates relaxation response instantly</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h5 className="font-medium text-green-900 mb-2">🧘 Progressive Muscle Relaxation</h5>
                <p className="text-sm text-green-700">Systematic tension and release for full-body stress relief</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h5 className="font-medium text-green-900 mb-2">🎯 5-4-3-2-1 Grounding</h5>
                <p className="text-sm text-green-700">Sensory awareness technique to interrupt anxiety spirals</p>
              </div>
            </div>
          </div>

          {/* Depression Support */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-yellow-600 text-xl">☀️</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-lg">Depression Support & Energy Boost</h4>
                <p className="text-sm text-gray-600">Evidence-based practices to lift mood and increase energy levels</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-yellow-50 rounded-lg p-4">
                <h5 className="font-medium text-yellow-900 mb-2">🌅 Morning Light Therapy</h5>
                <p className="text-sm text-yellow-700">15-minute guided sunlight exposure to regulate circadian rhythm</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4">
                <h5 className="font-medium text-yellow-900 mb-2">📝 Gratitude Practice</h5>
                <p className="text-sm text-yellow-700">Daily journaling of 3 positive experiences to rewire brain patterns</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4">
                <h5 className="font-medium text-yellow-900 mb-2">🏃 Gentle Movement</h5>
                <p className="text-sm text-yellow-700">Low-impact exercises that boost endorphins and energy</p>
              </div>
            </div>
          </div>

          {/* PTSD Support */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-purple-600 text-xl">💜</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-lg">PTSD Support & Trauma Recovery</h4>
                <p className="text-sm text-gray-600">Gentle, trauma-informed practices for healing and safety building</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-purple-50 rounded-lg p-4">
                <h5 className="font-medium text-purple-900 mb-2">🛡️ Safe Space Visualization</h5>
                <p className="text-sm text-purple-700">Creating mental sanctuary for emotional regulation and calm</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <h5 className="font-medium text-purple-900 mb-2">🌱 Gentle Embodiment</h5>
                <p className="text-sm text-purple-700">Slow, mindful body awareness practices for nervous system healing</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <h5 className="font-medium text-purple-900 mb-2">🔄 Resource Building</h5>
                <p className="text-sm text-purple-700">Developing internal resources for stability and resilience</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "daily-routine",
      title: "🌅 Evidence-Based Daily Wellness Routine",
      subtitle: "Comprehensive daily practices for optimal mental health across all conditions",
      color: "from-orange-50 to-yellow-50",
      borderColor: "border-orange-200",
      content: (
        <div className="space-y-8">
          {/* Morning Routine (6-9 AM) */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-orange-600 text-xl">🌅</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-lg">Morning Foundation (6-9 AM)</h4>
                <p className="text-sm text-gray-600">Start your day with evidence-based practices for optimal brain function</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-orange-50 rounded-lg p-4">
                <h5 className="font-medium text-orange-900 mb-2">☀️ Light Exposure (10-15 mins)</h5>
                <p className="text-sm text-orange-700">Natural sunlight within 1 hour of waking to regulate circadian rhythm and boost mood (supports all mental health conditions)</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <h5 className="font-medium text-orange-900 mb-2">💧 Hydration + Nutrition</h5>
                <p className="text-sm text-orange-700">16-20oz water + protein-rich breakfast to stabilize blood sugar and neurotransmitter production</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <h5 className="font-medium text-orange-900 mb-2">🧘 Mindful Breathing (5 mins)</h5>
                <p className="text-sm text-orange-700">Box breathing or 4-7-8 technique to activate parasympathetic nervous system and reduce cortisol</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <h5 className="font-medium text-orange-900 mb-2">📝 Intention Setting</h5>
                <p className="text-sm text-orange-700">Write 3 priorities and 1 gratitude to improve focus, motivation, and positive neural pathways</p>
              </div>
            </div>
          </div>

          {/* Midday Routine (12-2 PM) */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-blue-600 text-xl">☀️</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-lg">Midday Reset (12-2 PM)</h4>
                <p className="text-sm text-gray-600">Combat afternoon energy dips and maintain cognitive performance</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h5 className="font-medium text-blue-900 mb-2">🚶 Movement Break (10-15 mins)</h5>
                <p className="text-sm text-blue-700">Walk outdoors or gentle stretching to boost BDNF, improve mood, and enhance focus</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <h5 className="font-medium text-blue-900 mb-2">🍎 Mindful Eating</h5>
                <p className="text-sm text-blue-700">Eat lunch without distractions, focusing on flavors and textures to reduce stress and improve digestion</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <h5 className="font-medium text-blue-900 mb-2">📱 Digital Detox (20 mins)</h5>
                <p className="text-sm text-blue-700">Screen-free time to reduce dopamine dysregulation and eye strain, especially beneficial for ADHD</p>
              </div>
            </div>
          </div>

          {/* Afternoon Routine (3-6 PM) */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-green-600 text-xl">🌿</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-lg">Afternoon Optimization (3-6 PM)</h4>
                <p className="text-sm text-gray-600">Maintain energy and prepare for evening wind-down</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-green-50 rounded-lg p-4">
                <h5 className="font-medium text-green-900 mb-2">⚡ Energy Check-In</h5>
                <p className="text-sm text-green-700">Rate energy 1-10, adjust activities accordingly. Low energy = gentle tasks, high energy = challenging work</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h5 className="font-medium text-green-900 mb-2">🧘 Stress Release (5 mins)</h5>
                <p className="text-sm text-green-700">Progressive muscle relaxation or grounding technique to process daily stress and prevent accumulation</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h5 className="font-medium text-green-900 mb-2">🎯 Accomplishment Review</h5>
                <p className="text-sm text-green-700">Acknowledge 2-3 things completed today to build self-efficacy and combat negative thought patterns</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h5 className="font-medium text-green-900 mb-2">🤝 Social Connection</h5>
                <p className="text-sm text-green-700">Brief meaningful interaction (text, call, or in-person) to strengthen support networks and release oxytocin</p>
              </div>
            </div>
          </div>

          {/* Evening Routine (7-9 PM) */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-purple-600 text-xl">🌙</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-lg">Evening Wind-Down (7-9 PM)</h4>
                <p className="text-sm text-gray-600">Prepare mind and body for restorative sleep</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-purple-50 rounded-lg p-4">
                <h5 className="font-medium text-purple-900 mb-2">📝 Reflection Journaling (10 mins)</h5>
                <p className="text-sm text-purple-700">Write about emotions, challenges, and wins to process experiences and reduce rumination</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <h5 className="font-medium text-purple-900 mb-2">🛁 Calming Activity</h5>
                <p className="text-sm text-purple-700">Warm bath, gentle yoga, or reading to lower cortisol and transition to rest mode</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <h5 className="font-medium text-purple-900 mb-2">📱 Digital Sunset</h5>
                <p className="text-sm text-purple-700">Blue light reduction 1 hour before bed to support natural melatonin production</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <h5 className="font-medium text-purple-900 mb-2">🙏 Gratitude Practice</h5>
                <p className="text-sm text-purple-700">List 3 things appreciated today to rewire brain for positivity and improve sleep quality</p>
              </div>
            </div>
          </div>

          {/* Bedtime Routine (9-10 PM) */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-indigo-600 text-xl">😴</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-lg">Sleep Preparation (9-10 PM)</h4>
                <p className="text-sm text-gray-600">Optimize for 7-9 hours of quality sleep - the foundation of mental health</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-indigo-50 rounded-lg p-4">
                <h5 className="font-medium text-indigo-900 mb-2">🛏️ Sleep Environment</h5>
                <p className="text-sm text-indigo-700">Cool (65-68°F), dark room with comfortable bedding to optimize sleep architecture</p>
              </div>
              <div className="bg-indigo-50 rounded-lg p-4">
                <h5 className="font-medium text-indigo-900 mb-2">🧘 Body Scan (5-10 mins)</h5>
                <p className="text-sm text-indigo-700">Progressive relaxation from toes to head to release physical tension and calm the mind</p>
              </div>
              <div className="bg-indigo-50 rounded-lg p-4">
                <h5 className="font-medium text-indigo-900 mb-2">📋 Tomorrow's Prep</h5>
                <p className="text-sm text-indigo-700">Set out clothes and write top 3 priorities to reduce morning decision fatigue</p>
              </div>
            </div>
          </div>

          {/* Weekly Additions */}
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6 border border-emerald-200">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-emerald-600 text-xl">📅</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-lg">Weekly Enhancements</h4>
                <p className="text-sm text-gray-600">Additional practices to deepen your wellness routine</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/70 rounded-lg p-4">
                <h5 className="font-medium text-emerald-900 mb-2">🏃 Exercise (3-4x/week)</h5>
                <p className="text-sm text-emerald-700">20-30 mins moderate activity to boost BDNF, reduce inflammation, and improve mood regulation</p>
              </div>
              <div className="bg-white/70 rounded-lg p-4">
                <h5 className="font-medium text-emerald-900 mb-2">🧘 Meditation (Daily)</h5>
                <p className="text-sm text-emerald-700">10-20 mins mindfulness practice to strengthen prefrontal cortex and emotional regulation</p>
              </div>
              <div className="bg-white/70 rounded-lg p-4">
                <h5 className="font-medium text-emerald-900 mb-2">🌱 Nature Exposure (2x/week)</h5>
                <p className="text-sm text-emerald-700">Minimum 20 mins in green spaces to reduce cortisol and improve attention restoration</p>
              </div>
              <div className="bg-white/70 rounded-lg p-4">
                <h5 className="font-medium text-emerald-900 mb-2">📚 Learning/Creativity (Weekly)</h5>
                <p className="text-sm text-emerald-700">Engage in novel activities to promote neuroplasticity and sense of accomplishment</p>
              </div>
            </div>
          </div>

          {/* Scientific Foundation */}
          <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-6 border border-gray-200">
            <h5 className="font-medium text-gray-900 mb-3 flex items-center">
              <span className="mr-2">🧬</span>
              Scientific Foundation
            </h5>
            <div className="text-sm text-gray-700 space-y-2">
              <p><strong>Circadian Regulation:</strong> Light exposure and sleep timing optimize cortisol/melatonin cycles, crucial for all mental health conditions</p>
              <p><strong>Neuroplasticity:</strong> Movement, mindfulness, and novel experiences promote BDNF production and neural rewiring</p>
              <p><strong>Stress Response:</strong> Regular practices strengthen parasympathetic nervous system, reducing chronic inflammation</p>
              <p><strong>Social Connection:</strong> Human interaction releases oxytocin and reduces isolation, key factors in depression and anxiety</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Stress Busters
        </h1>
        <p className="text-gray-600">
          Interactive tools and evidence-based practices for stress relief and mental wellness
        </p>
      </div>

      {stressBusterSections.map((section) => (
        <div
          key={section.id}
          className={`bg-gradient-to-r ${section.color} ${section.borderColor} border rounded-xl overflow-hidden`}
        >
          <div
            className="p-4 cursor-pointer hover:bg-white/20 transition-colors duration-200"
            onClick={() => toggleSection(section.id)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-gray-900 mb-1">
                  {section.title}
                </h2>
                <p className="text-sm text-gray-600">
                  {section.subtitle}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {expandedSection === section.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </div>
            </div>
          </div>

          {expandedSection === section.id && (
            <div className="px-4 pb-4">
              <div className="bg-white/50 rounded-lg p-4">
                {section.content}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Quick Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center mb-4">
          <Heart className="w-6 h-6 text-blue-600 mr-2" />
          <h3 className="font-semibold text-blue-900">Quick Stress Relief Tips</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div className="flex items-start space-x-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Take 3 deep breaths before responding to stressful situations</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Step outside for fresh air and natural light when feeling overwhelmed</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Listen to calming music or nature sounds for instant relaxation</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Practice gratitude by listing 3 things you're thankful for</span>
          </div>
        </div>
      </div>
    </div>
  );
}