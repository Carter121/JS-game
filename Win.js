export default class Win extends Phaser.Scene {
	constructor() {
		super("win");
		this.gameW = 640;
		this.gameH = 360;
		this.centerX = this.gameW / 2;
		this.centerY = this.gameH / 2;
		this.deaths = localStorage.getItem("deaths");
	}

	preload() {
		this.load.bitmapFont(
			"carrier_command",
			"assets/carrier_command.png",
			"assets/carrier_command.xml"
		);
	}

	create() {
		this.mainTxt = this.add.bitmapText(
			this.centerX,
			40,
			"carrier_command",
			`You Win!`,
			20
		);
		this.mainTxt.setPosition(
			this.centerX - this.mainTxt.width / 2,
			this.mainTxt.y
		);

		// this.playTxt = this.add.bitmapText(
		// 	this.centerX,
		// 	250,
		// 	"carrier_command",
		// 	`You only had ${this.deaths} deaths`,
		// 	12
		// );

		// 	this.playTxt.setPosition(
		// 		this.centerX - this.playTxt.width / 2,
		// 		this.playTxt.y
		// 	);
	}
}
