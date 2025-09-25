import { useState, lazy, Suspense } from "react";
import { ChevronDown, ChevronUp, Gamepad2, Heart, ArrowLeft } from "lucide-react";
import { openFishingGameWindow } from "./FishingGame";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

// Lazy load the BottleSmashGame to improve performance
const BottleSmashGame = lazy(() => import("./BottleSmashGame").then(module => ({ default: module.BottleSmashGame })));

export function StressBusters() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [selectedWellnessCard, setSelectedWellnessCard] = useState<string | null>(null);
  const [selectedRoutineCard, setSelectedRoutineCard] = useState<string | null>(null);
  const [showBottleGame, setShowBottleGame] = useState(false);

  const openBottleGameWindow = () => {
    setShowBottleGame(true);
  };

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
              margin-bottom: 20px;
            }

            .controls {
              display: flex;
              flex-wrap: wrap;
              gap: 15px;
              align-items: center;
              justify-content: center;
              background: rgba(255, 255, 255, 0.9);
              padding: 20px;
              border-radius: 16px;
              box-shadow: 0 4px 20px rgba(0,0,0,0.1);
              margin-bottom: 10px;
              max-width: 95%;
            }

            .control-group {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 5px;
              min-width: 120px;
            }

            .control-group label {
              font-size: 12px;
              font-weight: 600;
              color: #555;
              text-align: center;
            }

            select, input[type="range"] {
              padding: 8px;
              border: 2px solid #ddd;
              border-radius: 8px;
              font-size: 12px;
              background: white;
              transition: border-color 0.2s;
            }

            select:focus, input[type="range"]:focus {
              outline: none;
              border-color: #4CAF50;
            }

            select {
              min-width: 100px;
            }

            input[type="range"] {
              width: 80px;
            }

            .stats {
              display: flex;
              gap: 20px;
              align-items: center;
              justify-content: center;
              background: rgba(255, 255, 255, 0.8);
              padding: 10px 20px;
              border-radius: 12px;
              font-size: 14px;
              font-weight: 600;
              color: #333;
            }

            @media (max-width: 768px) {
              .controls {
                flex-direction: column;
                gap: 10px;
              }
              
              .control-group {
                min-width: auto;
                width: 100%;
              }
              
              select, input[type="range"] {
                width: 100%;
              }
            }
          </style>
        </head>
        <body>
          <div class="controls">
            <div class="control-group">
              <label for="objectType">Object Type</label>
              <select id="objectType">
                <option value="bottle">Bottle</option>
                <option value="cup">Cup</option>
                <option value="plate">Plate</option>
                <option value="vase">Vase</option>
                <option value="glass">Glass</option>
                <option value="bowl">Bowl</option>
                <option value="random" selected>Random</option>
              </select>
            </div>

            <div class="control-group">
              <label for="glassColor">Glass Color</label>
              <select id="glassColor">
                <option value="clear">Clear</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="red">Red</option>
                <option value="purple">Purple</option>
                <option value="yellow">Yellow</option>
                <option value="orange">Orange</option>
                <option value="pink">Pink</option>
                <option value="random" selected>Random</option>
              </select>
            </div>

            <div class="control-group">
              <label for="liquidColor">Liquid Color</label>
              <select id="liquidColor">
                <option value="water">Water</option>
                <option value="wine">Wine</option>
                <option value="juice">Orange Juice</option>
                <option value="soda">Cola</option>
                <option value="milk">Milk</option>
                <option value="coffee">Coffee</option>
                <option value="tea">Tea</option>
                <option value="random" selected>Random</option>
              </select>
            </div>

            <div class="control-group">
              <label for="bgColor">Background</label>
              <select id="bgColor">
                <option value="auto" selected>Auto Cycle</option>
                <option value="#e8f5e8">Calm Green</option>
                <option value="#e8f4fd">Peaceful Blue</option>
                <option value="#fff0e6">Warm Orange</option>
                <option value="#f0e6ff">Gentle Purple</option>
                <option value="#ffe6f2">Soft Pink</option>
                <option value="#fff9e6">Sunny Yellow</option>
              </select>
            </div>

            <div class="control-group">
              <label for="wallDepth">3D Depth: <span id="depthValue">1.0</span></label>
              <input type="range" id="wallDepth" min="0.1" max="3.0" step="0.1" value="1.0">
            </div>
          </div>

          <canvas id="gameCanvas" width="1000" height="600"></canvas>
          
          <div class="stats">
            <span>Objects Smashed: <span id="smashCount">0</span></span>
            <span>•</span>
            <span>Fragments: <span id="fragmentCount">0</span></span>
            <span>•</span>
            <span>Click anywhere to create & smash objects!</span>
          </div>

          <script>
            const canvas = document.getElementById("gameCanvas");
            const ctx = canvas.getContext("2d");
            const objectTypeSelect = document.getElementById("objectType");
            const glassColorSelect = document.getElementById("glassColor");
            const liquidColorSelect = document.getElementById("liquidColor");
            const bgColorSelect = document.getElementById("bgColor");
            const depthSlider = document.getElementById("wallDepth");
            const depthValue = document.getElementById("depthValue");
            const smashCountEl = document.getElementById("smashCount");
            const fragmentCountEl = document.getElementById("fragmentCount");

            let objects = [];
            let fragments = [];
            let liquidDrops = [];
            let smashCount = 0;
            let selectedObjectType = "random";
            let selectedGlassColor = "random";
            let selectedLiquidColor = "random";
            let currentBgColor = "#e8f5e8";
            let targetBgColor = "#e8f5e8";
            let bgTransition = 0;
            let wallDepth = 1.0;
            let autoBgInterval;

            const objectTypes = ['bottle', 'cup', 'plate', 'vase', 'glass', 'bowl'];
            const glassColors = ['clear', 'blue', 'green', 'red', 'purple', 'yellow', 'orange', 'pink'];
            const liquidTypes = ['water', 'wine', 'juice', 'soda', 'milk', 'coffee', 'tea'];

            function hexToRgba(hex, alpha = 1) {
              if (hex.startsWith('#')) hex = hex.slice(1);
              const r = parseInt(hex.slice(0, 2), 16);
              const g = parseInt(hex.slice(2, 4), 16);
              const b = parseInt(hex.slice(4, 6), 16);
              return \`rgba(\${r}, \${g}, \${b}, \${alpha})\`;
            }

            function smoothBgChange(newColor) {
              targetBgColor = newColor;
              bgTransition = 0;
            }

            function updateBackground() {
              if (bgTransition < 1) {
                bgTransition += 0.02;
                const current = hexToRgba(currentBgColor);
                const target = hexToRgba(targetBgColor);
                
                const currentRgb = current.match(/\\d+/g).map(Number);
                const targetRgb = target.match(/\\d+/g).map(Number);
                
                const r = Math.round(currentRgb[0] + (targetRgb[0] - currentRgb[0]) * bgTransition);
                const g = Math.round(currentRgb[1] + (targetRgb[1] - currentRgb[1]) * bgTransition);
                const b = Math.round(currentRgb[2] + (targetRgb[2] - currentRgb[2]) * bgTransition);
                
                canvas.style.background = \`rgba(\${r}, \${g}, \${b}, 0.6)\`;
                
                if (bgTransition >= 1) {
                  currentBgColor = targetBgColor;
                }
              }
            }

            class GlassObject {
              constructor(type, glassColor, liquidColor, x, y) {
                this.type = type;
                this.x = x;
                this.y = y;
                this.glassColor = this.getGlassColor(glassColor);
                this.liquidColor = this.getLiquidColor(liquidColor);
                this.broken = false;
                this.size = 30 + Math.random() * 40;
                this.rotation = Math.random() * Math.PI * 2;
                this.depth = wallDepth;
              }

              getGlassColor(color) {
                const colors = {
                  clear: 'rgba(220, 220, 255, 0.3)',
                  blue: 'rgba(100, 150, 255, 0.4)',
                  green: 'rgba(100, 255, 150, 0.4)',
                  red: 'rgba(255, 100, 100, 0.4)',
                  purple: 'rgba(200, 100, 255, 0.4)',
                  yellow: 'rgba(255, 255, 100, 0.4)',
                  orange: 'rgba(255, 180, 100, 0.4)',
                  pink: 'rgba(255, 150, 200, 0.4)'
                };
                return colors[color] || colors.clear;
              }

              getLiquidColor(liquid) {
                const colors = {
                  water: 'rgba(150, 200, 255, 0.6)',
                  wine: 'rgba(120, 50, 80, 0.8)',
                  juice: 'rgba(255, 180, 50, 0.8)',
                  soda: 'rgba(80, 40, 20, 0.9)',
                  milk: 'rgba(255, 255, 240, 0.9)',
                  coffee: 'rgba(101, 67, 33, 0.9)',
                  tea: 'rgba(160, 120, 80, 0.7)'
                };
                return colors[liquid] || colors.water;
              }

              draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                
                // Create 3D effect
                const shadowOffset = this.depth * 3;
                
                // Draw shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
                this.drawShape(shadowOffset, shadowOffset, true);
                
                // Draw main object
                ctx.fillStyle = this.glassColor;
                this.drawShape(0, 0, false);
                
                // Draw liquid
                ctx.fillStyle = this.liquidColor;
                this.drawLiquid();
                
                // Add glass shine effect
                ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
                this.drawShine();
                
                ctx.restore();
              }

              drawShape(offsetX, offsetY, isShadow) {
                switch(this.type) {
                  case 'bottle':
                    this.drawBottle(offsetX, offsetY);
                    break;
                  case 'cup':
                    this.drawCup(offsetX, offsetY);
                    break;
                  case 'plate':
                    this.drawPlate(offsetX, offsetY);
                    break;
                  case 'vase':
                    this.drawVase(offsetX, offsetY);
                    break;
                  case 'glass':
                    this.drawGlass(offsetX, offsetY);
                    break;
                  case 'bowl':
                    this.drawBowl(offsetX, offsetY);
                    break;
                }
              }

              drawBottle(offsetX, offsetY) {
                ctx.beginPath();
                ctx.rect(-this.size/4 + offsetX, -this.size + offsetY, this.size/2, this.size * 1.5);
                ctx.rect(-this.size/6 + offsetX, -this.size * 1.3 + offsetY, this.size/3, this.size/3);
                ctx.fill();
              }

              drawCup(offsetX, offsetY) {
                ctx.beginPath();
                ctx.arc(offsetX, offsetY, this.size/2, 0, Math.PI * 2);
                ctx.fill();
              }

              drawPlate(offsetX, offsetY) {
                ctx.beginPath();
                ctx.ellipse(offsetX, offsetY, this.size, this.size/4, 0, 0, Math.PI * 2);
                ctx.fill();
              }

              drawVase(offsetX, offsetY) {
                ctx.beginPath();
                ctx.ellipse(offsetX, offsetY, this.size/3, this.size/2, 0, 0, Math.PI * 2);
                ctx.ellipse(offsetX, offsetY - this.size/3, this.size/4, this.size/4, 0, 0, Math.PI * 2);
                ctx.fill();
              }

              drawGlass(offsetX, offsetY) {
                ctx.beginPath();
                ctx.rect(-this.size/3 + offsetX, -this.size/2 + offsetY, this.size * 2/3, this.size);
                ctx.fill();
              }

              drawBowl(offsetX, offsetY) {
                ctx.beginPath();
                ctx.arc(offsetX, offsetY, this.size/2, 0, Math.PI);
                ctx.fill();
              }

              drawLiquid() {
                const liquidHeight = this.size * 0.6;
                switch(this.type) {
                  case 'bottle':
                    ctx.fillRect(-this.size/5, -liquidHeight, this.size/2.5, liquidHeight);
                    break;
                  case 'cup':
                  case 'glass':
                    ctx.beginPath();
                    ctx.arc(0, liquidHeight/4, this.size/2.5, 0, Math.PI * 2);
                    ctx.fill();
                    break;
                  case 'bowl':
                    ctx.beginPath();
                    ctx.arc(0, 0, this.size/3, 0, Math.PI);
                    ctx.fill();
                    break;
                }
              }

              drawShine() {
                ctx.beginPath();
                ctx.ellipse(-this.size/4, -this.size/4, this.size/6, this.size/3, Math.PI/4, 0, Math.PI * 2);
                ctx.fill();
              }

              smash() {
                this.broken = true;
                smashCount++;
                smashCountEl.textContent = smashCount;
                this.createFragments();
                this.createLiquidSplash();
              }

              createFragments() {
                const fragmentCount = 8 + Math.random() * 12;
                for(let i = 0; i < fragmentCount; i++) {
                  fragments.push({
                    x: this.x + (Math.random() - 0.5) * this.size,
                    y: this.y + (Math.random() - 0.5) * this.size,
                    vx: (Math.random() - 0.5) * 10,
                    vy: (Math.random() - 0.5) * 10,
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.3,
                    size: 3 + Math.random() * 8,
                    color: this.glassColor,
                    life: 1.0,
                    gravity: 0.3
                  });
                }
                fragmentCountEl.textContent = fragments.length;
              }

              createLiquidSplash() {
                const dropCount = 15 + Math.random() * 25;
                for(let i = 0; i < dropCount; i++) {
                  liquidDrops.push({
                    x: this.x + (Math.random() - 0.5) * this.size,
                    y: this.y + (Math.random() - 0.5) * this.size,
                    vx: (Math.random() - 0.5) * 8,
                    vy: (Math.random() - 0.5) * 8,
                    size: 2 + Math.random() * 6,
                    color: this.liquidColor,
                    life: 1.0,
                    gravity: 0.4
                  });
                }
              }
            }

            // Specific glass object classes
            class Bottle extends GlassObject {
              constructor(type, glassColor, liquidColor, x, y) {
                super(type, glassColor, liquidColor, x, y);
                this.size = 25 + Math.random() * 30;
              }
            }

            class Cup extends GlassObject {
              constructor(type, glassColor, liquidColor, x, y) {
                super(type, glassColor, liquidColor, x, y);
                this.size = 35 + Math.random() * 25;
              }
            }

            class Plate extends GlassObject {
              constructor(type, glassColor, liquidColor, x, y) {
                super(type, glassColor, liquidColor, x, y);
                this.size = 40 + Math.random() * 35;
              }
            }

            class Vase extends GlassObject {
              constructor(type, glassColor, liquidColor, x, y) {
                super(type, glassColor, liquidColor, x, y);
                this.size = 30 + Math.random() * 40;
              }
            }

            class Glass extends GlassObject {
              constructor(type, glassColor, liquidColor, x, y) {
                super(type, glassColor, liquidColor, x, y);
                this.size = 25 + Math.random() * 30;
              }
            }

            class Bowl extends GlassObject {
              constructor(type, glassColor, liquidColor, x, y) {
                super(type, glassColor, liquidColor, x, y);
                this.size = 35 + Math.random() * 35;
              }
            }

            function updateFragments() {
              for(let i = fragments.length - 1; i >= 0; i--) {
                const fragment = fragments[i];
                fragment.x += fragment.vx;
                fragment.y += fragment.vy;
                fragment.vy += fragment.gravity;
                fragment.rotation += fragment.rotationSpeed;
                fragment.life -= 0.015;
                fragment.vx *= 0.98;
                fragment.vy *= 0.98;

                if(fragment.y > canvas.height + 50 || fragment.life <= 0) {
                  fragments.splice(i, 1);
                  fragmentCountEl.textContent = fragments.length;
                }
              }
            }

            function updateLiquidDrops() {
              for(let i = liquidDrops.length - 1; i >= 0; i--) {
                const drop = liquidDrops[i];
                drop.x += drop.vx;
                drop.y += drop.vy;
                drop.vy += drop.gravity;
                drop.life -= 0.02;
                drop.vx *= 0.99;

                if(drop.y > canvas.height + 50 || drop.life <= 0) {
                  liquidDrops.splice(i, 1);
                }
              }
            }

            function drawFragments() {
              fragments.forEach(fragment => {
                ctx.save();
                ctx.translate(fragment.x, fragment.y);
                ctx.rotate(fragment.rotation);
                ctx.globalAlpha = fragment.life;
                ctx.fillStyle = fragment.color;
                ctx.beginPath();
                ctx.rect(-fragment.size/2, -fragment.size/2, fragment.size, fragment.size);
                ctx.fill();
                ctx.restore();
              });
            }

            function drawLiquidDrops() {
              liquidDrops.forEach(drop => {
                ctx.save();
                ctx.globalAlpha = drop.life;
                ctx.fillStyle = drop.color;
                ctx.beginPath();
                ctx.arc(drop.x, drop.y, drop.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
              });
            }

            function gameLoop() {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              
              updateBackground();
              
              objects.forEach(obj => {
                if (!obj.broken) {
                  obj.draw();
                }
              });

              updateFragments();
              updateLiquidDrops();
              drawFragments();
              drawLiquidDrops();

              objects = objects.filter(obj => !obj.broken);

              requestAnimationFrame(gameLoop);
            }

            objectTypeSelect.addEventListener("change", (e) => {
              selectedObjectType = e.target.value;
            });

            glassColorSelect.addEventListener("change", (e) => {
              selectedGlassColor = e.target.value;
            });

            liquidColorSelect.addEventListener("change", (e) => {
              selectedLiquidColor = e.target.value;
            });

            function setAutoBackground() {
              const colors = ["#e8f5e8", "#e8f4fd", "#fff0e6", "#f0e6ff", "#ffe6f2", "#fff9e6"];
              let colorIndex = 0;
              autoBgInterval = setInterval(() => {
                smoothBgChange(colors[colorIndex]);
                colorIndex = (colorIndex + 1) % colors.length;
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

  const wellnessCards = [
    {
      id: "adhd",
      title: "ADHD Focus & Attention Support",
      subtitle: "Enhance concentration and manage hyperactivity naturally",
      icon: "🧠",
      color: "from-indigo-200 to-blue-200",
      borderColor: "border-indigo-400",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-indigo-600 text-2xl">🧠</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">ADHD Focus & Attention Support</h2>
            <p className="text-gray-600">Enhance concentration and manage hyperactivity naturally</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-indigo-50 rounded-lg p-6">
              <h3 className="font-semibold text-indigo-900 mb-3">🧘 Mindful Attention Training</h3>
              <p className="text-indigo-700 mb-4">5-minute focused breathing to strengthen attention span and reduce hyperactivity</p>
              <ul className="text-sm text-indigo-600 space-y-2">
                <li>• Focus on breath for 30 seconds</li>
                <li>• Notice when mind wanders</li>
                <li>• Gently return attention to breath</li>
                <li>• Repeat for 5 minutes daily</li>
              </ul>
            </div>
            
            <div className="bg-indigo-50 rounded-lg p-6">
              <h3 className="font-semibold text-indigo-900 mb-3">⏰ Pomodoro Focus Sessions</h3>
              <p className="text-indigo-700 mb-4">25-minute work intervals with 5-minute breaks to optimize concentration</p>
              <ul className="text-sm text-indigo-600 space-y-2">
                <li>• Set timer for 25 minutes</li>
                <li>• Focus on single task</li>
                <li>• Take 5-minute break</li>
                <li>• Repeat 3-4 cycles</li>
              </ul>
            </div>
            
            <div className="bg-indigo-50 rounded-lg p-6">
              <h3 className="font-semibold text-indigo-900 mb-3">🏃 Movement Breaks</h3>
              <p className="text-indigo-700 mb-4">Brief physical exercises to channel hyperactivity and reset attention</p>
              <ul className="text-sm text-indigo-600 space-y-2">
                <li>• Jumping jacks (30 seconds)</li>
                <li>• Desk stretches</li>
                <li>• Walk around building</li>
                <li>• Deep breathing exercises</li>
              </ul>
            </div>
            
            <div className="bg-indigo-50 rounded-lg p-6">
              <h3 className="font-semibold text-indigo-900 mb-3">📝 Organization Strategies</h3>
              <p className="text-indigo-700 mb-4">Visual planning tools and task prioritization techniques</p>
              <ul className="text-sm text-indigo-600 space-y-2">
                <li>• Use visual calendars</li>
                <li>• Break tasks into steps</li>
                <li>• Set reminders</li>
                <li>• Prioritize daily tasks</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "anxiety",
      title: "Stress & Anxiety Relief", 
      subtitle: "Immediate and long-term strategies to calm the nervous system",
      icon: "🌿",
      color: "from-green-200 to-emerald-200",
      borderColor: "border-green-400",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 text-2xl">🌿</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Stress & Anxiety Relief</h2>
            <p className="text-gray-600">Immediate and long-term strategies to calm the nervous system</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 mb-3">🌬️ 4-7-8 Breathing</h3>
              <p className="text-green-700 mb-4">Inhale 4, hold 7, exhale 8 - activates relaxation response instantly</p>
              <div className="text-sm text-green-600 space-y-2">
                <p><strong>Steps:</strong></p>
                <p>1. Inhale through nose for 4 counts</p>
                <p>2. Hold breath for 7 counts</p>
                <p>3. Exhale through mouth for 8 counts</p>
                <p>4. Repeat 4-8 cycles</p>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 mb-3">🧘 Progressive Muscle Relaxation</h3>
              <p className="text-green-700 mb-4">Systematic tension and release for full-body stress relief</p>
              <div className="text-sm text-green-600 space-y-2">
                <p><strong>Technique:</strong></p>
                <p>1. Tense muscle group for 5 seconds</p>
                <p>2. Release and notice relaxation</p>
                <p>3. Move systematically through body</p>
                <p>4. End with whole-body relaxation</p>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 mb-3">🎯 5-4-3-2-1 Grounding</h3>
              <p className="text-green-700 mb-4">Sensory awareness technique to interrupt anxiety spirals</p>
              <div className="text-sm text-green-600 space-y-2">
                <p><strong>Notice:</strong></p>
                <p>5 things you can see</p>
                <p>4 things you can touch</p>
                <p>3 things you can hear</p>
                <p>2 things you can smell</p>
                <p>1 thing you can taste</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "depression",
      title: "Depression Support & Energy Boost",
      subtitle: "Evidence-based practices to lift mood and increase energy levels", 
      icon: "☀️",
      color: "from-yellow-200 to-orange-200",
      borderColor: "border-yellow-400",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-yellow-600 text-2xl">☀️</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Depression Support & Energy Boost</h2>
            <p className="text-gray-600">Evidence-based practices to lift mood and increase energy levels</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-yellow-50 rounded-lg p-6">
              <h3 className="font-semibold text-yellow-900 mb-3">🌅 Morning Light Therapy</h3>
              <p className="text-yellow-700 mb-4">15-minute guided sunlight exposure to regulate circadian rhythm</p>
              <div className="text-sm text-yellow-600 space-y-2">
                <p><strong>Protocol:</strong></p>
                <p>• Get sunlight within 1 hour of waking</p>
                <p>• Sit outside for 10-15 minutes</p>
                <p>• No sunglasses needed</p>
                <p>• Do daily for best results</p>
              </div>
            </div>
            
            <div className="bg-yellow-50 rounded-lg p-6">
              <h3 className="font-semibold text-yellow-900 mb-3">📝 Gratitude Practice</h3>
              <p className="text-yellow-700 mb-4">Daily journaling of 3 positive experiences to rewire brain patterns</p>
              <div className="text-sm text-yellow-600 space-y-2">
                <p><strong>Daily Practice:</strong></p>
                <p>• Write 3 things you're grateful for</p>
                <p>• Include why you're grateful</p>
                <p>• Focus on specific details</p>
                <p>• Review weekly entries</p>
              </div>
            </div>
            
            <div className="bg-yellow-50 rounded-lg p-6">
              <h3 className="font-semibold text-yellow-900 mb-3">🏃 Gentle Movement</h3>
              <p className="text-yellow-700 mb-4">Low-impact exercises that boost endorphins and energy</p>
              <div className="text-sm text-yellow-600 space-y-2">
                <p><strong>Activities:</strong></p>
                <p>• 10-minute morning walk</p>
                <p>• Gentle yoga stretches</p>
                <p>• Dancing to favorite music</p>
                <p>• Tai chi movements</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "ptsd",
      title: "PTSD Support & Trauma Recovery",
      subtitle: "Gentle, trauma-informed practices for healing and safety building",
      icon: "💜", 
      color: "from-purple-200 to-pink-200",
      borderColor: "border-purple-400",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 text-2xl">💜</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">PTSD Support & Trauma Recovery</h2>
            <p className="text-gray-600">Gentle, trauma-informed practices for healing and safety building</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="font-semibold text-purple-900 mb-3">🛡️ Safe Space Visualization</h3>
              <p className="text-purple-700 mb-4">Creating mental sanctuary for emotional regulation and calm</p>
              <div className="text-sm text-purple-600 space-y-2">
                <p><strong>Practice:</strong></p>
                <p>• Visualize a safe, peaceful place</p>
                <p>• Include all senses in detail</p>
                <p>• Practice accessing this space</p>
                <p>• Use during overwhelming moments</p>
              </div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="font-semibold text-purple-900 mb-3">🌱 Gentle Embodiment</h3>
              <p className="text-purple-700 mb-4">Slow, mindful body awareness practices for nervous system healing</p>
              <div className="text-sm text-purple-600 space-y-2">
                <p><strong>Techniques:</strong></p>
                <p>• Body scan meditation</p>
                <p>• Gentle movement</p>
                <p>• Breath awareness</p>
                <p>• Self-compassion practices</p>
              </div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="font-semibold text-purple-900 mb-3">🔄 Resource Building</h3>
              <p className="text-purple-700 mb-4">Developing internal resources for stability and resilience</p>
              <div className="text-sm text-purple-600 space-y-2">
                <p><strong>Resources:</strong></p>
                <p>• Identify personal strengths</p>
                <p>• Build support network</p>
                <p>• Create daily routines</p>
                <p>• Practice self-care</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const routineCards = [
    {
      id: "morning",
      title: "Morning Foundation",
      subtitle: "Start your day with evidence-based practices for optimal brain function",
      icon: "🌅",
      color: "from-orange-200 to-yellow-200",
      borderColor: "border-orange-400",
      timeframe: "6-9 AM",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-orange-600 text-2xl">🌅</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Morning Foundation (6-9 AM)</h2>
            <p className="text-gray-600">Start your day with evidence-based practices for optimal brain function</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-orange-50 rounded-lg p-6">
              <h3 className="font-semibold text-orange-900 mb-3">☀️ Light Exposure (10-15 mins)</h3>
              <p className="text-orange-700 mb-4">Natural sunlight within 1 hour of waking to regulate circadian rhythm and boost mood</p>
              <ul className="text-sm text-orange-600 space-y-2">
                <li>• Step outside within 1 hour of waking</li>
                <li>• Face east toward the sunrise if possible</li>
                <li>• No sunglasses needed for maximum benefit</li>
                <li>• 10-15 minutes is sufficient</li>
                <li>• Works even on cloudy days</li>
              </ul>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-6">
              <h3 className="font-semibold text-orange-900 mb-3">💧 Hydration + Nutrition</h3>
              <p className="text-orange-700 mb-4">16-20oz water + protein-rich breakfast to stabilize blood sugar and neurotransmitter production</p>
              <ul className="text-sm text-orange-600 space-y-2">
                <li>• Drink 16-20oz water immediately upon waking</li>
                <li>• Include 20-30g protein in breakfast</li>
                <li>• Add healthy fats (avocado, nuts, olive oil)</li>
                <li>• Choose complex carbohydrates</li>
                <li>• Avoid high sugar foods</li>
              </ul>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-6">
              <h3 className="font-semibold text-orange-900 mb-3">🧘 Mindful Breathing (5 mins)</h3>
              <p className="text-orange-700 mb-4">Box breathing or 4-7-8 technique to activate parasympathetic nervous system</p>
              <ul className="text-sm text-orange-600 space-y-2">
                <li>• Find a quiet spot to sit comfortably</li>
                <li>• Try box breathing: 4-4-4-4 pattern</li>
                <li>• Or 4-7-8: inhale 4, hold 7, exhale 8</li>
                <li>• Focus only on the breath</li>
                <li>• Start with 5 minutes daily</li>
              </ul>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-6">
              <h3 className="font-semibold text-orange-900 mb-3">📝 Intention Setting</h3>
              <p className="text-orange-700 mb-4">Write 3 priorities and 1 gratitude to improve focus and motivation</p>
              <ul className="text-sm text-orange-600 space-y-2">
                <li>• Write down 3 main priorities for the day</li>
                <li>• Note 1 thing you're grateful for</li>
                <li>• Keep it simple and specific</li>
                <li>• Review priorities throughout the day</li>
                <li>• Celebrate completed tasks</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "midday",
      title: "Midday Reset",
      subtitle: "Maintain energy and focus through the afternoon",
      icon: "☀️",
      color: "from-blue-200 to-cyan-200",
      borderColor: "border-blue-400",
      timeframe: "12-2 PM",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 text-2xl">☀️</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Midday Reset (12-2 PM)</h2>
            <p className="text-gray-600">Maintain energy and focus through the afternoon</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-3">🍽️ Mindful Eating</h3>
              <p className="text-blue-700 mb-4">Balanced lunch with protein, healthy fats, and complex carbs</p>
              <div className="text-sm text-blue-600 space-y-2">
                <p><strong>Include:</strong></p>
                <p>• Lean protein (chicken, fish, legumes)</p>
                <p>• Healthy fats (avocado, nuts, olive oil)</p>
                <p>• Complex carbs (quinoa, sweet potato)</p>
                <p>• Colorful vegetables</p>
                <p>• Eat slowly and mindfully</p>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-3">🚶 Movement Break</h3>
              <p className="text-blue-700 mb-4">10-15 minute walk outdoors to boost circulation and clear mental fog</p>
              <div className="text-sm text-blue-600 space-y-2">
                <p><strong>Activities:</strong></p>
                <p>• Walk outside for fresh air</p>
                <p>• Take stairs instead of elevator</p>
                <p>• Do desk stretches</p>
                <p>• Practice deep breathing while walking</p>
                <p>• Leave devices behind</p>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-3">🧘 Mini Meditation</h3>
              <p className="text-blue-700 mb-4">3-5 minute breathing exercise to reset stress levels</p>
              <div className="text-sm text-blue-600 space-y-2">
                <p><strong>Technique:</strong></p>
                <p>• Sit comfortably and close eyes</p>
                <p>• Focus on natural breathing</p>
                <p>• Count breaths from 1 to 10</p>
                <p>• Start over if mind wanders</p>
                <p>• End with 3 deep breaths</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "evening",
      title: "Evening Wind-Down",
      subtitle: "Prepare mind and body for restorative sleep",
      icon: "🌙",
      color: "from-purple-200 to-indigo-200",
      borderColor: "border-purple-400",
      timeframe: "7-9 PM",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 text-2xl">🌙</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Evening Wind-Down (7-9 PM)</h2>
            <p className="text-gray-600">Prepare mind and body for restorative sleep</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="font-semibold text-purple-900 mb-3">📝 Reflection Journaling (10 mins)</h3>
              <p className="text-purple-700 mb-4">Write about emotions, challenges, and wins to process experiences</p>
              <ul className="text-sm text-purple-600 space-y-2">
                <li>• What went well today?</li>
                <li>• What was challenging?</li>
                <li>• How did I handle stress?</li>
                <li>• What am I grateful for?</li>
                <li>• What would I do differently?</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="font-semibold text-purple-900 mb-3">🛁 Calming Activity</h3>
              <p className="text-purple-700 mb-4">Warm bath, gentle yoga, or reading to lower cortisol</p>
              <ul className="text-sm text-purple-600 space-y-2">
                <li>• Warm bath with Epsom salts</li>
                <li>• Gentle yoga or stretching</li>
                <li>• Read a physical book</li>
                <li>• Listen to calming music</li>
                <li>• Practice progressive muscle relaxation</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="font-semibold text-purple-900 mb-3">📱 Digital Sunset</h3>
              <p className="text-purple-700 mb-4">Blue light reduction 1 hour before bed to support melatonin</p>
              <ul className="text-sm text-purple-600 space-y-2">
                <li>• Turn off phones, tablets, computers</li>
                <li>• Use blue light filters if needed</li>
                <li>• Dim household lights</li>
                <li>• Avoid stimulating content</li>
                <li>• Create phone-free bedroom</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="font-semibold text-purple-900 mb-3">🙏 Gratitude Practice</h3>
              <p className="text-purple-700 mb-4">List 3 things appreciated today to rewire brain for positivity</p>
              <ul className="text-sm text-purple-600 space-y-2">
                <li>• Write 3 specific things you're grateful for</li>
                <li>• Include why you're grateful</li>
                <li>• Focus on small, everyday moments</li>
                <li>• Notice positive emotions</li>
                <li>• End with a smile</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "sleep",
      title: "Sleep Preparation",
      subtitle: "Optimize for 7-9 hours of quality sleep - the foundation of mental health",
      icon: "😴",
      color: "from-indigo-200 to-blue-200",
      borderColor: "border-indigo-400", 
      timeframe: "9-10 PM",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-indigo-600 text-2xl">😴</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Sleep Preparation (9-10 PM)</h2>
            <p className="text-gray-600">Optimize for 7-9 hours of quality sleep - the foundation of mental health</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-indigo-50 rounded-lg p-6">
              <h3 className="font-semibold text-indigo-900 mb-3">🛏️ Sleep Environment</h3>
              <p className="text-indigo-700 mb-4">Cool, dark room with comfortable bedding to optimize sleep</p>
              <div className="text-sm text-indigo-600 space-y-2">
                <p><strong>Optimal Setup:</strong></p>
                <p>• Temperature: 65-68°F (18-20°C)</p>
                <p>• Complete darkness or eye mask</p>
                <p>• Comfortable mattress and pillows</p>
                <p>• White noise or earplugs if needed</p>
                <p>• Well-ventilated room</p>
              </div>
            </div>
            
            <div className="bg-indigo-50 rounded-lg p-6">
              <h3 className="font-semibold text-indigo-900 mb-3">🧘 Body Scan (5-10 mins)</h3>
              <p className="text-indigo-700 mb-4">Progressive relaxation from toes to head to release tension</p>
              <div className="text-sm text-indigo-600 space-y-2">
                <p><strong>Technique:</strong></p>
                <p>• Lie down comfortably</p>
                <p>• Start with toes, notice tension</p>
                <p>• Consciously relax each body part</p>
                <p>• Move slowly up to your head</p>
                <p>• End with whole-body relaxation</p>
              </div>
            </div>
            
            <div className="bg-indigo-50 rounded-lg p-6">
              <h3 className="font-semibold text-indigo-900 mb-3">📋 Tomorrow's Prep</h3>
              <p className="text-indigo-700 mb-4">Set out clothes and write top 3 priorities to reduce morning decisions</p>
              <div className="text-sm text-indigo-600 space-y-2">
                <p><strong>Prepare:</strong></p>
                <p>• Lay out tomorrow's clothes</p>
                <p>• Write 3 key priorities</p>
                <p>• Pack work bag or lunch</p>
                <p>• Set a consistent wake time</p>
                <p>• Review calendar briefly</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "weekly",
      title: "Weekly Enhancements",
      subtitle: "Additional practices to deepen your wellness routine",
      icon: "📅",
      color: "from-emerald-200 to-green-200",
      borderColor: "border-emerald-400",
      timeframe: "Weekly",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-emerald-600 text-2xl">📅</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Weekly Enhancements</h2>
            <p className="text-gray-600">Additional practices to deepen your wellness routine</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-emerald-50 rounded-lg p-6">
              <h3 className="font-semibold text-emerald-900 mb-3">🏃 Exercise (3-4x/week)</h3>
              <p className="text-emerald-700 mb-4">20-30 mins moderate activity to boost BDNF and improve mood regulation</p>
              <ul className="text-sm text-emerald-600 space-y-2">
                <li>• Brisk walking or jogging</li>
                <li>• Swimming or cycling</li>
                <li>• Strength training</li>
                <li>• Dancing or sports</li>
                <li>• Yoga or Pilates</li>
              </ul>
            </div>
            
            <div className="bg-emerald-50 rounded-lg p-6">
              <h3 className="font-semibold text-emerald-900 mb-3">🧘 Meditation (Daily)</h3>
              <p className="text-emerald-700 mb-4">10-20 mins mindfulness practice to strengthen emotional regulation</p>
              <ul className="text-sm text-emerald-600 space-y-2">
                <li>• Guided meditation apps</li>
                <li>• Breath-focused meditation</li>
                <li>• Body scan techniques</li>
                <li>• Walking meditation</li>
                <li>• Loving-kindness practice</li>
              </ul>
            </div>
            
            <div className="bg-emerald-50 rounded-lg p-6">
              <h3 className="font-semibold text-emerald-900 mb-3">🌱 Nature Exposure (2x/week)</h3>
              <p className="text-emerald-700 mb-4">Minimum 20 mins in green spaces to reduce cortisol and restore attention</p>
              <ul className="text-sm text-emerald-600 space-y-2">
                <li>• Parks or hiking trails</li>
                <li>• Beach or lakeside walks</li>
                <li>• Gardening activities</li>
                <li>• Outdoor sports</li>
                <li>• Forest bathing (Shinrin-yoku)</li>
              </ul>
            </div>
            
            <div className="bg-emerald-50 rounded-lg p-6">
              <h3 className="font-semibold text-emerald-900 mb-3">📚 Learning/Creativity (Weekly)</h3>
              <p className="text-emerald-700 mb-4">Engage in novel activities to promote neuroplasticity and accomplishment</p>
              <ul className="text-sm text-emerald-600 space-y-2">
                <li>• Learn a new skill or hobby</li>
                <li>• Creative writing or art</li>
                <li>• Play musical instruments</li>
                <li>• Cooking new recipes</li>
                <li>• Puzzles or brain games</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "science",
      title: "Scientific Foundation",
      subtitle: "Understanding the research behind these wellness practices",
      icon: "🧬",
      color: "from-gray-200 to-slate-200",
      borderColor: "border-gray-400",
      timeframe: "Evidence-Based",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-600 text-2xl">🧬</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Scientific Foundation</h2>
            <p className="text-gray-600">Understanding the research behind these wellness practices</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">🔬 Circadian Regulation</h3>
              <p className="text-gray-700 mb-4">Light exposure and sleep timing optimize cortisol/melatonin cycles</p>
              <div className="text-sm text-gray-600 space-y-2">
                <p><strong>Research Shows:</strong></p>
                <p>• Morning light exposure regulates circadian rhythm</p>
                <p>• Proper sleep timing improves mood disorders</p>
                <p>• Light therapy effective for depression</p>
                <p>• Consistent sleep schedule reduces anxiety</p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">🧠 Neuroplasticity</h3>
              <p className="text-gray-700 mb-4">Movement, mindfulness, and novel experiences promote brain growth</p>
              <div className="text-sm text-gray-600 space-y-2">
                <p><strong>Key Findings:</strong></p>
                <p>• Exercise increases BDNF production</p>
                <p>• Meditation strengthens prefrontal cortex</p>
                <p>• Learning creates new neural pathways</p>
                <p>• Mindfulness reduces amygdala reactivity</p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">⚡ Stress Response</h3>
              <p className="text-gray-700 mb-4">Regular practices strengthen parasympathetic nervous system</p>
              <div className="text-sm text-gray-600 space-y-2">
                <p><strong>Evidence Base:</strong></p>
                <p>• Breathing exercises activate vagus nerve</p>
                <p>• Yoga reduces inflammation markers</p>
                <p>• Meditation lowers cortisol levels</p>
                <p>• Nature exposure decreases stress hormones</p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">💝 Social Connection</h3>
              <p className="text-gray-700 mb-4">Human interaction releases oxytocin and reduces isolation</p>
              <div className="text-sm text-gray-600 space-y-2">
                <p><strong>Research Highlights:</strong></p>
                <p>• Social support improves mental health outcomes</p>
                <p>• Loneliness increases depression risk</p>
                <p>• Community engagement boosts resilience</p>
                <p>• Positive relationships extend lifespan</p>
              </div>
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

      <Tabs defaultValue="games" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="games" className="flex items-center gap-2">
            <Gamepad2 className="w-4 h-4" />
            Stress Relief Games
          </TabsTrigger>
          <TabsTrigger value="toolkit" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Wellness Toolkit
          </TabsTrigger>
          <TabsTrigger value="routine" className="flex items-center gap-2">
            🌅
            Evidence Wellness Routine
          </TabsTrigger>
        </TabsList>

        <TabsContent value="games" className="mt-6">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                🎮 Interactive Stress Relief Games
              </h2>
              <p className="text-gray-600">
                Fun activities to release tension and unwind
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bottle Smash Game */}
              <div
                className="bg-white rounded-lg p-4 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={openBottleGameWindow}
              >
                <div className="relative overflow-hidden rounded-lg mb-3">
                  <div className="w-full h-20 bg-gradient-to-r from-purple-200 to-red-200 border-2 border-dashed border-purple-400 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 text-xs font-medium">🔨 Bottle Smash Game</span>
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
                  <div className="w-full h-20 bg-gradient-to-r from-blue-200 to-green-200 border-2 border-dashed border-blue-400 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-xs font-medium">🎣 Peaceful Fishing</span>
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
                  Relax by a serene lake. Cast your line and enjoy the meditative rhythm of fishing.
                </p>
                <div className="flex items-center text-xs text-blue-600">
                  <span className="mr-2">🌊</span>
                  <span>Peaceful • Meditative</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="toolkit" className="mt-6">
          {selectedWellnessCard ? (
            <div className="bg-gradient-to-r from-white via-gray-50 to-white rounded-xl p-6 border border-gray-200">
              <button
                onClick={() => setSelectedWellnessCard(null)}
                className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                Back to Wellness Toolkit
              </button>
              {wellnessCards.find(card => card.id === selectedWellnessCard)?.content}
            </div>
          ) : (
            <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-xl p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  💚 Evidence-Based Wellness Toolkit
                </h2>
                <p className="text-gray-600">
                  Choose a wellness area to explore targeted interventions
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {wellnessCards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => setSelectedWellnessCard(card.id)}
                    className={`bg-gradient-to-br ${card.color} rounded-lg p-4 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group`}
                  >
                    <div className="relative overflow-hidden rounded-lg mb-3">
                      <div className={`w-full h-20 bg-gradient-to-r ${card.color} border-2 border-dashed ${card.borderColor} rounded-lg flex items-center justify-center`}>
                        <span className="text-gray-600 text-xs font-medium">{card.icon} {card.title}</span>
                      </div>
                      <div className="absolute inset-0 bg-gray-600 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Explore →
                        </span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {card.subtitle}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span className="mr-2">📚</span>
                      <span>Evidence-Based • Interactive</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="routine" className="mt-6">
          {selectedRoutineCard ? (
            <div className="bg-gradient-to-r from-white via-gray-50 to-white rounded-xl p-6 border border-gray-200">
              <button
                onClick={() => setSelectedRoutineCard(null)}
                className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                Back to Wellness Routine
              </button>
              {routineCards.find(card => card.id === selectedRoutineCard)?.content}
            </div>
          ) : (
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-xl p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  🌅 Evidence-Based Daily Wellness Routine
                </h2>
                <p className="text-gray-600">
                  Choose a time period or topic to explore comprehensive wellness practices
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {routineCards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => setSelectedRoutineCard(card.id)}
                    className={`bg-gradient-to-br ${card.color} rounded-lg p-4 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group`}
                  >
                    <div className="relative overflow-hidden rounded-lg mb-3">
                      <div className={`w-full h-20 bg-gradient-to-r ${card.color} border-2 border-dashed ${card.borderColor} rounded-lg flex items-center justify-center`}>
                        <span className="text-gray-600 text-xs font-medium">{card.icon} {card.title}</span>
                      </div>
                      <div className="absolute inset-0 bg-gray-600 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Explore →
                        </span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {card.subtitle}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center text-gray-500">
                        <span className="mr-2">⏰</span>
                        <span>{card.timeframe}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <span className="mr-2">📚</span>
                        <span>Evidence-Based</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}