import Menu from "./Menu.js";
import Level1 from "./Level1.js";
import LevelScreen from "./LevelScreen.js";
import Level2 from "./Level2.js";
import Level3 from "./Level3.js";
import Level4 from "./Level4.js";
import Level5 from "./Level5.js";

const gameW = 640;
const gameH = 360;

const centerX = gameW / 2;
const centerY = gameH / 2;

const config = {
	type: Phaser.AUTO,
	width: gameW,
	height: gameH,
	scene: [Menu, LevelScreen, Level1, Level2, Level3, Level4, Level5],
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 0 },
			debug: false,
		},
	},
};

const game = new Phaser.Game(config);
