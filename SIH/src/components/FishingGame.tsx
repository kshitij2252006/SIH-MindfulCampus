export function openFishingGameWindow() {
  const gameWindow = window.open('', 'FishingGame', 'width=1200,height=800,scrollbars=yes,resizable=yes');
  
  if (gameWindow) {
    gameWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>2D Fishing Simulator</title>
        <style>
          body {
            margin: 0;
            font-family: "Segoe UI", sans-serif;
            min-height: 100vh;
            background: linear-gradient(135deg, #e6e6fa 0%, #dbeafe 100%);
            display: flex;
            align-items: center;
            justify-content: center;
          }

          #main-wrapper {
            display: flex;
            gap: 18px;
            background: transparent;
            border-radius: 32px;
            margin: 40px 0;
            padding: 0;
            box-shadow: none;
          }

          #game-container {
            width: 820px;
            height: 560px;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            border-radius: 18px;
            overflow: hidden;
            box-shadow: 0 4px 24px 0 rgba(44, 62, 80, 0.18);
            margin: 0;
            border: 2px solid #d1d5db;
          }

          canvas {
            border-radius: 18px;
            box-shadow: none;
            background: transparent;
            display: block;
            outline: none;
          }

          canvas:focus {
            outline: none;
          }

          #sidebar {
            width: 350px;
            height: 560px;
            background: rgba(230, 230, 250, 0.75);
            color: #22223b;
            display: flex;
            flex-direction: column;
            padding: 24px 18px 18px 18px;
            border-radius: 18px;
            box-shadow: 0 4px 24px 0 rgba(44, 62, 80, 0.18);
            margin: 0;
            box-sizing: border-box;
            border: 2px solid #d1d5db;
          }

          #sidebar h2 {
            margin: 0 0 10px 0;
            font-size: 18px;
            border-bottom: 1px solid #7f8c8d;
            padding-bottom: 5px;
          }

          .stat {
            margin-bottom: 10px;
          }

          #inventory {
            height: 160px;
            overflow-y: auto;
            margin-bottom: 10px;
            background: linear-gradient(135deg, #e6e6fa 60%, #dbeafe 100%);
            border-radius: 10px;
            padding: 8px;
            box-shadow: 0 2px 8px 0 rgba(44, 62, 80, 0.08);
          }

          .fish-item {
            padding: 5px;
            margin: 3px 0;
            background: #c7d2fe;
            color: #22223b;
            border-radius: 6px;
            font-size: 15px;
            transition: background 0.2s;
          }

          .fish-item:nth-child(even) {
            background: #e0e7ff;
          }

          button {
            background: #1abc9c;
            border: none;
            padding: 8px;
            color: #fff;
            font-weight: bold;
            cursor: pointer;
            border-radius: 4px;
            margin-bottom: 5px;
            transition: background 0.2s;
          }

          button:hover {
            background: #16a085;
          }

          #miniGameOverlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            display: none;
            justify-content: center;
            align-items: center;
            color: #fff;
            font-size: 20px;
            flex-direction: column;
            z-index: 2;
          }

          #barContainer {
            width: 300px;
            height: 20px;
            background: #555;
            border-radius: 10px;
            overflow: hidden;
            margin-top: 20px;
            position: relative;
          }

          #barFill {
            width: 0;
            height: 100%;
            background: #1abc9c;
          }

          #redZone {
            position: absolute;
            height: 100%;
            background: rgba(255, 0, 0, 0.5);
            pointer-events: none;
            border-radius: 5px;
          }

          #inventoryFullMsg {
            display: none;
            position: absolute;
            left: 120px;
            top: 24px;
            background: #fffbe6;
            color: #b91c1c;
            border: 2px solid #fbbf24;
            border-radius: 8px;
            padding: 6px 18px;
            font-weight: bold;
            font-size: 18px;
            z-index: 10;
            box-shadow: 0 2px 8px #0001;
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
            z-index: 20;
          }

          .close-btn:hover {
            background: #ff3742;
          }

          .title {
            position: absolute;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            text-align: center;
            color: #333;
            z-index: 20;
          }

          .title h1 {
            margin: 0;
            font-size: 24px;
          }

          .title p {
            margin: 0;
            font-size: 14px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <button class="close-btn" onclick="window.close()">×</button>
        
        <div class="title">
          <h1>🎣 Peaceful Fishing Simulator</h1>
          <p>Click to cast your line and relax by the water</p>
        </div>
        
        <div id="main-wrapper">
          <div id="game-container">
            <canvas id="gameCanvas" width="820" height="560"></canvas>
            <div id="miniGameOverlay">
              <div>Mini-Game! Press SPACE to stop the bar</div>
              <div id="barContainer">
                <div id="redZone"></div>
                <div id="barFill"></div>
              </div>
            </div>
          </div>
          <div id="sidebar">
            <h2>Fisherman Info</h2>
            <div class="stat">Coins: <span id="coins">0</span></div>
            <div class="stat">
              <strong>Fish Bestiary</strong>
              <ul id="bestiary" style="list-style: none; padding-left: 0; margin: 6px 0 10px 0"></ul>
            </div>
            <h2 id="inventoryHeader">Inventory (0/20)</h2>
            <div id="inventory"></div>
            <button id="sellAll">Sell All Fishes</button>
            <h2>Upgrades</h2>
            <button id="upgradeRod">Upgrade Rod (Cost: 50)</button>
          </div>
        </div>

        <script>
          const canvas = document.getElementById("gameCanvas");
          const ctx = canvas.getContext("2d");
          canvas.width = 820;
          canvas.height = 560;
          let width = canvas.width;
          let height = canvas.height;
          let msgActive = false;
          let msgText = "";
          let msgColor = "#b91c1c";
          let msgY = 50;
          let msgAlpha = 1;
          let msgTimeout;
          const bestiaryCaught = {
            "Blue Fish": false,
            "Gold Fish": false,
            "Red Fish": false,
          };
          const barContainer = document.getElementById("barContainer");
          const barFill = document.getElementById("barFill");
          const miniGameOverlay = document.getElementById("miniGameOverlay");

          window.addEventListener("resize", () => {
            width = canvas.width = window.innerWidth - 300;
            height = canvas.height = window.innerHeight;
          });

          let coins = 0;
          let fishesCaught = 0;
          const inventory = [];

          const sidebarCoins = document.getElementById("coins");
          const sidebarFishCount = document.getElementById("fishCount");
          const inventoryDiv = document.getElementById("inventory");

          const sellAllBtn = document.getElementById("sellAll");
          sellAllBtn.onclick = () => {
            coins += inventory.reduce((a, b) => a + b.value, 0);
            inventory.length = 0;
            updateSidebar();
          };

          const upgradeRodBtn = document.getElementById("upgradeRod");
          let rodLevel = 1;
          upgradeRodBtn.onclick = () => {
            if (coins >= 50) {
              coins -= 50;
              rodLevel++;
              updateSidebar();
            }
          };

          function updateSidebar() {
            sidebarCoins.textContent = coins;
            inventoryDiv.innerHTML = "";
            document.getElementById("inventoryHeader").textContent = \`Inventory (\${inventory.length}/20)\`;
            inventory.forEach((f) => {
              const div = document.createElement("div");
              div.className = "fish-item";
              div.textContent = f.name + " (Value: " + f.value + ")";
              inventoryDiv.appendChild(div);
            });

            const bestiaryUl = document.getElementById("bestiary");
            bestiaryUl.innerHTML = "";
            fishTypes.forEach((fish) => {
              const li = document.createElement("li");
              if (bestiaryCaught[fish.name]) {
                li.textContent = fish.name;
                li.style.color = fish.color;
                li.style.fontWeight = "bold";
              } else {
                li.textContent = "Unknown";
                li.style.color = "#888";
                li.style.fontStyle = "italic";
              }
              bestiaryUl.appendChild(li);
            });
          }

          function showMessage(text, color = "#b91c1c") {
            msgText = text;
            msgColor = color;
            msgActive = true;
            msgY = 50;
            msgAlpha = 1;

            if (msgTimeout) clearTimeout(msgTimeout);
            msgTimeout = setTimeout(() => {
              msgActive = false;
            }, 2500);
          }

          const boat = { x: 120, y: 120, width: 90, height: 28 };

          let hook = {
            x: boat.x + 35,
            y: boat.y + 40,
            active: false,
            returning: false,
            dy: 3,
            vx: 0,
            vy: 0,
            targetY: 0,
            caughtFish: null
          };

          const fishTypes = [
            {
              name: "Blue Fish",
              color: "#3498db",
              value: 10,
              eye: "#fff",
              fin: "#2980b9",
            },
            {
              name: "Gold Fish",
              color: "#f1c40f",
              value: 15,
              eye: "#fff",
              fin: "#e67e22",
            },
            {
              name: "Red Fish",
              color: "#e74c3c",
              value: 20,
              eye: "#fff",
              fin: "#c0392b",
            },
          ];

          const fishes = [];

          function spawnFish() {
            const boatY = getWaveY(boat.x) - 10;
            const minFishY = boatY + 60;
            const oceanBottom = height - 60;
            const y = Math.random() * (oceanBottom - minFishY) + minFishY;
            const type = fishTypes[Math.floor(Math.random() * fishTypes.length)];
            const dir = Math.random() < 0.5 ? 1 : -1;
            const x = dir === 1 ? -50 : width + 50;
            const maxFish = 20;
            if (fishes.length >= maxFish) return;

            fishes.push({
              x,
              y,
              type,
              dir,
              speed: 1 + Math.random(),
              caught: false,
              size: 22 + Math.random() * 10,
            });
          }
          setInterval(spawnFish, 1500);

          canvas.addEventListener("click", (e) => {
            if (inventory.length >= 20) {
              showMessage("Inventory is full!", "#b91c1c");
              return;
            }
            if (!hook.active && !miniGameActive) {
              const rect = canvas.getBoundingClientRect();
              let clickX = e.clientX - rect.left;
              let clickY = e.clientY - rect.top;
              clickX = Math.max(0, Math.min(canvas.width, clickX));
              clickY = Math.max(0, Math.min(canvas.height, clickY));

              hook.active = true;
              hook.x = boat.x + 35;
              hook.y = getWaveY(boat.x) + 50;

              const dx = clickX - hook.x;
              const dy = clickY - hook.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              hook.vx = (dx / dist) * 6;
              hook.vy = (dy / dist) * 6;
              hook.targetY = clickY;
            }
          });

          let miniGameActive = false;
          let barWidth = 0;
          let barDir = 1;

          function startMiniGame(fish) {
            if (miniGameActive) return;

            miniGameActive = true;
            miniGameOverlay.style.display = "flex";
            barWidth = 0;
            barDir = 1;

            const barPx = barContainer.clientWidth;
            const redZoneWidthPx = barPx * 0.12;
            const redZoneStartPx = Math.random() * (barPx - redZoneWidthPx);
            const redZoneEndPx = redZoneStartPx + redZoneWidthPx;

            const redZoneDiv = document.getElementById("redZone");
            redZoneDiv.style.left = redZoneStartPx + "px";
            redZoneDiv.style.width = redZoneWidthPx + "px";

            function updateBar() {
              if (!miniGameActive) return;
              barWidth += barDir * 4;
              if (barWidth >= barPx) barDir = -1;
              if (barWidth <= 0) barDir = 1;
              barFill.style.width = barWidth + "px";
              requestAnimationFrame(updateBar);
            }
            updateBar();

            function stopGame(e) {
              if (e.code === "Space") {
                miniGameActive = false;
                miniGameOverlay.style.display = "none";
                document.removeEventListener("keydown", stopGame);

                if (barWidth >= redZoneStartPx && barWidth <= redZoneEndPx) {
                  if (inventory.length < 20) {
                    inventory.push(fish.type);
                    fishesCaught++;
                    bestiaryCaught[fish.type.name] = true;
                  }
                } else {
                  showMessage("Fish escaped!", "#111");
                }
                hook.active = false;
                updateSidebar();
              }
            }

            document.addEventListener("keydown", stopGame);
          }

          const splashes = [];
          function createSplash(x, y) {
            for (let i = 0; i < 10; i++) {
              splashes.push({
                x,
                y,
                dx: (Math.random() - 0.5) * 2,
                dy: Math.random() * -2,
                life: 30,
              });
            }
          }

          let bgOffset = 0;

          function drawBackground() {
            const sky = ctx.createLinearGradient(0, 0, 0, height * 0.35);
            sky.addColorStop(0, "#87ceeb");
            sky.addColorStop(1, "#b3e0ff");
            ctx.fillStyle = sky;
            ctx.fillRect(0, 0, width, height);

            ctx.save();
            const ocean = ctx.createLinearGradient(0, height * 0.35, 0, height);
            ocean.addColorStop(0, "#2980b9");
            ocean.addColorStop(1, "#0b3d91");
            ctx.fillStyle = ocean;
            ctx.beginPath();
            let y0 = Math.sin((0 + bgOffset) / 120) * 10 + height * 0.35 + 20;
            ctx.moveTo(0, y0);
            for (let x = 0; x <= width; x++) {
              const y = Math.sin((x + bgOffset) / 120) * 10 + height * 0.35 + 20;
              ctx.lineTo(x, y);
            }
            ctx.lineTo(width, height);
            ctx.lineTo(0, height);
            ctx.closePath();
            ctx.fill();
            ctx.restore();

            ctx.save();
            ctx.strokeStyle = "#b3e0ff";
            ctx.lineWidth = 4;
            ctx.beginPath();
            for (let x = 0; x <= width; x++) {
              const y = Math.sin((x + bgOffset) / 120) * 10 + height * 0.35 + 20;
              if (x === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.stroke();
            ctx.restore();
          }

          function drawWaves() {
            const waveHeight = 10;
            const waveLength = 120;
            ctx.save();
            ctx.globalAlpha = 0.25;
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 2;
            ctx.beginPath();
            for (let x = 0; x < width; x++) {
              const y = Math.sin((x + bgOffset) / waveLength) * waveHeight + height * 0.35 + 20;
              if (x === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.stroke();
            ctx.restore();
            bgOffset += 1;
          }

          const clouds = [];
          for (let i = 0; i < 5; i++) {
            clouds.push({
              x: Math.random() * width,
              y: Math.random() * 80 + 20,
              size: 60 + Math.random() * 40,
              speed: 0.2 + Math.random() * 0.3,
            });
          }

          function drawClouds() {
            clouds.forEach((c) => {
              ctx.save();
              ctx.globalAlpha = 0.7;
              ctx.fillStyle = "#fff";
              ctx.beginPath();
              ctx.arc(c.x, c.y, c.size, 0, 2 * Math.PI);
              ctx.arc(c.x + c.size * 0.6, c.y + 10, c.size * 0.8, 0, 2 * Math.PI);
              ctx.arc(c.x - c.size * 0.6, c.y + 10, c.size * 0.8, 0, 2 * Math.PI);
              ctx.fill();
              ctx.restore();
              c.x -= c.speed;
              if (c.x < -100) c.x = width + 100;
            });
          }

          function getWaveY(x) {
            const waveHeight = 10;
            const waveLength = 120;
            return Math.sin((x + bgOffset) / waveLength) * waveHeight + height * 0.35 + 20;
          }

          function drawBoatAndFisherman() {
            const boatY = getWaveY(boat.x) - 10;
            ctx.save();
            ctx.translate(boat.x, boatY);

            ctx.save();
            ctx.shadowColor = "#222";
            ctx.shadowBlur = 8;
            ctx.fillStyle = "#7c4a02";
            ctx.beginPath();
            ctx.moveTo(-40, 0);
            ctx.lineTo(40, 0);
            ctx.lineTo(28, 22);
            ctx.lineTo(-28, 22);
            ctx.closePath();
            ctx.fill();
            ctx.restore();

            ctx.strokeStyle = "#eee";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(0, -8);
            ctx.lineTo(0, -38);
            ctx.stroke();

            ctx.save();
            ctx.translate(-10, -8);
            ctx.beginPath();
            ctx.arc(0, -12, 7, 0, 2 * Math.PI);
            ctx.fillStyle = "#f1c27d";
            ctx.fill();
            ctx.fillStyle = "#e1b169";
            ctx.fillRect(-7, -20, 14, 5);
            ctx.beginPath();
            ctx.ellipse(0, -15, 8, 3, 0, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillStyle = "#2980b9";
            ctx.fillRect(-5, -4, 10, 16);
            ctx.strokeStyle = "#f1c27d";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(-5, 2);
            ctx.lineTo(-18, 10);
            ctx.moveTo(5, 2);
            ctx.lineTo(18, 10);
            ctx.stroke();
            ctx.restore();

            ctx.save();
            ctx.strokeStyle = "#111";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(10, -6);
            ctx.lineTo(50, -50);
            ctx.stroke();
            ctx.restore();

            ctx.restore();
          }

          function drawHook() {
            const rodTip = {
              x: boat.x + 50,
              y: getWaveY(boat.x) - 10 - 50,
            };

            ctx.save();
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(rodTip.x, rodTip.y);
            ctx.bezierCurveTo(
              rodTip.x + 5,
              rodTip.y + 30,
              hook.x,
              hook.y - 30,
              hook.x,
              hook.y
            );
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(hook.x, hook.y);
            const arcRadius = 6;
            const arcCenterX = hook.x;
            const arcCenterY = hook.y + 10;
            const rightAngle = Math.PI * 0.25;
            const rightX = arcCenterX + arcRadius * Math.cos(rightAngle);
            const rightY = arcCenterY + arcRadius * Math.sin(rightAngle);
            ctx.quadraticCurveTo(
              hook.x + 8,
              hook.y + 5,
              rightX,
              rightY
            );
            ctx.strokeStyle = "#111";
            ctx.lineWidth = 3;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(
              arcCenterX,
              arcCenterY,
              arcRadius,
              Math.PI * 0.25,
              Math.PI * 0.75,
              false
            );
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 3;
            ctx.stroke();

            ctx.restore();
          }

          function drawFish(f) {
            ctx.save();
            ctx.translate(f.x, f.y);
            ctx.scale(f.dir, 1);

            ctx.fillStyle = f.type.color;
            ctx.beginPath();
            ctx.ellipse(0, 0, f.size, f.size * 0.5, 0, 0, 2 * Math.PI);
            ctx.fill();

            ctx.fillStyle = f.type.fin;
            ctx.beginPath();
            ctx.moveTo(-f.size, 0);
            ctx.lineTo(-f.size - 12, 10);
            ctx.lineTo(-f.size - 12, -10);
            ctx.closePath();
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(-f.size * 0.2, -f.size * 0.5);
            ctx.lineTo(0, -f.size * 0.8);
            ctx.lineTo(f.size * 0.2, -f.size * 0.5);
            ctx.closePath();
            ctx.fillStyle = f.type.fin;
            ctx.globalAlpha = 0.7;
            ctx.fill();
            ctx.globalAlpha = 1;

            ctx.beginPath();
            ctx.arc(f.size * 0.5, -4, 3, 0, 2 * Math.PI);
            ctx.fillStyle = f.type.eye;
            ctx.fill();
            ctx.beginPath();
            ctx.arc(f.size * 0.5 + 1, -4, 1, 0, 2 * Math.PI);
            ctx.fillStyle = "#222";
            ctx.fill();

            ctx.beginPath();
            ctx.arc(f.size * 0.7, 4, 3, Math.PI * 0.2, Math.PI * 0.8, false);
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.restore();
          }

          function drawSplashes() {
            for (let i = splashes.length - 1; i >= 0; i--) {
              const s = splashes[i];
              ctx.fillStyle = "rgba(255,255,255," + s.life / 30 + ")";
              ctx.beginPath();
              ctx.arc(s.x, s.y, 2, 0, 2 * Math.PI);
              ctx.fill();
              s.x += s.dx;
              s.y += s.dy;
              s.dy += 0.05;
              s.life--;
              if (s.life <= 0) splashes.splice(i, 1);
            }
          }

          function draw() {
            ctx.clearRect(0, 0, width, height);

            drawBackground();
            drawClouds();
            drawWaves();
            drawBoatAndFisherman();

            const rodTipX = boat.x + 50;
            const rodTipY = getWaveY(boat.x) - 10 - 50;
            const restHookX = boat.x + 50;
            const restHookY = getWaveY(boat.x) - 10 + 60;

            if (hook.active) {
              hook.x += hook.vx;
              hook.y += hook.vy;

              if ((hook.vy > 0 && hook.y >= hook.targetY) || (hook.vy < 0 && hook.y <= hook.targetY)) {
                hook.vx = 0;
                hook.vy = 6;
              }

              if (hook.y > height - 60) {
                hook.active = false;
                hook.returning = true;
              }

              fishes.forEach((f) => {
                if (!f.caught && !miniGameActive && Math.hypot(f.x - hook.x, f.y - hook.y) < f.size) {
                  f.caught = true;
                  hook.caughtFish = f;
                  hook.vx = 0;
                  hook.vy = 0;
                  hook.x = f.x;
                  hook.y = f.y;
                  startMiniGame(f);
                  createSplash(f.x, f.y);
                }
              });

              drawHook();
            } else if (hook.returning) {
              const dx = restHookX - hook.x;
              const dy = restHookY - hook.y;
              hook.x += dx * 0.1;
              hook.y += dy * 0.1;

              if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {
                hook.x = restHookX;
                hook.y = restHookY;
                hook.returning = false;
                hook.caughtFish = null;
              }

              drawHook();
            } else {
              ctx.save();
              ctx.strokeStyle = "#fff";
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.moveTo(rodTipX, rodTipY);
              ctx.bezierCurveTo(rodTipX + 5, rodTipY + 30, restHookX, restHookY - 30, restHookX, restHookY);
              ctx.stroke();
              ctx.restore();

              ctx.save();
              const arcRadius = 7;
              const arcCenterX = restHookX;
              const arcCenterY = restHookY + 10;
              const rightAngle = Math.PI * 0.25;
              const rightX = arcCenterX + arcRadius * Math.cos(rightAngle);
              const rightY = arcCenterY + arcRadius * Math.sin(rightAngle);
              ctx.beginPath();
              ctx.moveTo(restHookX, restHookY);
              ctx.quadraticCurveTo(restHookX + 8, restHookY + 5, rightX, rightY);
              ctx.strokeStyle = "#111";
              ctx.lineWidth = 3;
              ctx.stroke();
              ctx.beginPath();
              ctx.arc(arcCenterX, arcCenterY, arcRadius, Math.PI * 0.25, Math.PI * 0.75, false);
              ctx.strokeStyle = "#fff";
              ctx.lineWidth = 3;
              ctx.stroke();
              ctx.restore();
            }

            for (let i = fishes.length - 1; i >= 0; i--) {
              const f = fishes[i];

              if (f.caught) {
                if (miniGameActive) {
                  f.x = hook.x;
                  f.y = hook.y;
                  drawFish(f);
                } else {
                  fishes.splice(i, 1);
                }
              } else {
                f.x += f.speed * f.dir;
                drawFish(f);

                if ((f.dir === 1 && f.x - f.size > width) || (f.dir === -1 && f.x + f.size < 0)) {
                  fishes.splice(i, 1);
                }
              }
            }

            drawSplashes();

            if (msgActive) {
              ctx.save();
              ctx.globalAlpha = msgAlpha;
              ctx.font = "bold 22px Segoe UI, sans-serif";
              ctx.textAlign = "center";
              ctx.fillStyle = msgColor;
              ctx.fillText(msgText, width / 2, msgY);
              ctx.restore();

              msgY -= 0.7;
              msgAlpha -= 0.012;
              if (msgAlpha <= 0) msgActive = false;
            }

            requestAnimationFrame(draw);
          }

          draw();
          updateSidebar();
        </script>
      </body>
      </html>
    `);
    gameWindow.document.close();
  }
}