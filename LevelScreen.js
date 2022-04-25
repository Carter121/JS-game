export default class LevelScreen extends Phaser.Scene {
	constructor() {
		super("levels");
		this.gameW = 640;
		this.gameH = 360;
		this.centerX = this.gameW / 2;
		this.centerY = this.gameH / 2;
	}

	preload() {
		this.load.bitmapFont(
			"carrier_command",
			"assets/carrier_command.png",
			"assets/carrier_command.xml"
		);
	}

	create() {
		this.cameras.main.setBackgroundColor("#2da3c6");

		localStorage.setItem("deaths", 0);

		const offset = 50;

		const lvlClicked = (lvl) => {
			this.scene.start(`level${lvl}`);
		};

		this.lvl1 = this.add.bitmapText(
			80,
			offset * 1,
			"carrier_command",
			`Level 1`,
			8
		);
		this.lvl1.setPosition(this.lvl1.x - this.lvl1.width / 2, this.lvl1.y);

		this.lvl1.setInteractive();
		this.lvl1.on("pointerdown", () => lvlClicked(1));

		this.lvl2 = this.add.bitmapText(
			80,
			offset * 2,
			"carrier_command",
			`Level 2`,
			8
		);
		this.lvl2.setPosition(this.lvl2.x - this.lvl2.width / 2, this.lvl2.y);

		this.lvl2.setInteractive();
		this.lvl2.on("pointerdown", () => lvlClicked(2));

		this.lvl3 = this.add.bitmapText(
			80,
			offset * 3,
			"carrier_command",
			`Level 3`,
			8
		);
		this.lvl3.setPosition(this.lvl3.x - this.lvl3.width / 2, this.lvl3.y);

		this.lvl3.setInteractive();
		this.lvl3.on("pointerdown", () => lvlClicked(3));

		this.lvl4 = this.add.bitmapText(
			80,
			offset * 4,
			"carrier_command",
			`Level 4`,
			8
		);
		this.lvl4.setPosition(this.lvl4.x - this.lvl4.width / 2, this.lvl4.y);

		this.lvl4.setInteractive();
		this.lvl4.on("pointerdown", () => lvlClicked(4));

		this.lvl5 = this.add.bitmapText(
			80,
			offset * 5,
			"carrier_command",
			`Level 5`,
			8
		);
		this.lvl5.setPosition(this.lvl5.x - this.lvl5.width / 2, this.lvl5.y);

		this.lvl5.setInteractive();
		this.lvl5.on("pointerdown", () => lvlClicked(5));

		this.lvl6 = this.add.bitmapText(
			80,
			offset * 6,
			"carrier_command",
			`Level 6`,
			8
		);
		this.lvl6.setPosition(this.lvl6.x - this.lvl6.width / 2, this.lvl6.y);

		this.lvl6.setInteractive();
		this.lvl6.on("pointerdown", () => lvlClicked(6));
	}
}
