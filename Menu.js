export default class Menu extends Phaser.Scene {
	constructor() {
		super("menu");
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

		this.mainTxt = this.add.bitmapText(
			this.centerX,
			40,
			"carrier_command",
			`Welcome!`,
			20
		);
		this.mainTxt.setPosition(
			this.centerX - this.mainTxt.width / 2,
			this.mainTxt.y
		);

		this.playTxt = this.add.bitmapText(
			this.centerX,
			250,
			"carrier_command",
			`Play`,
			12
		);

		this.playTxt.setPosition(
			this.centerX - this.playTxt.width / 2,
			this.playTxt.y
		);

		const playClicked = () => {
			this.scene.start("levels");
		};

		this.playTxt.setInteractive();
		this.playTxt.on("pointerdown", playClicked);
	}
}
