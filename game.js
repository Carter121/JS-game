import Menu from "./Menu.js";
import Level1 from "./Level1.js";
import LevelScreen from "./LevelScreen.js";

const gameW = 640;
const gameH = 360;

const centerX = gameW / 2;
const centerY = gameH / 2;

const config = {
	type: Phaser.AUTO,
	width: gameW,
	height: gameH,
	scene: [Menu, LevelScreen, Level1],
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 10 },
			debug: false,
		},
	},
};

const game = new Phaser.Game(config);
