export default class Level1 extends Phaser.Scene {
	constructor() {
		super("level1");
		if (localStorage.getItem("deaths")) {
			this.deaths = localStorage.getItem("deaths");
		} else {
			this.deaths = 0;
		}
		this.score = 0;
		this.gameW = 640;
		this.gameH = 360;
		this.centerX = this.gameW / 2;
		this.centerY = this.gameH / 2;
	}

	preload() {
		this.load.image("background", "assets/background.png");
		this.load.image("player", "assets/player.png");
		this.load.image("enemy", "assets/dragon.png");
		this.load.image("treasure", "assets/treasure.png");
		this.load.bitmapFont(
			"carrier_command",
			"assets/carrier_command.png",
			"assets/carrier_command.xml"
		);
	}

	create() {
		this.bg = this.add.sprite(this.centerX, this.centerY, "background");
		this.treasure = this.physics.add.sprite(
			this.gameW - 80,
			this.centerY,
			"treasure"
		);
		this.treasure.scale = 0.75;
		this.player = this.physics.add.sprite(50, this.centerY, "player");
		this.player.setCollideWorldBounds(true);
		this.player.scale = 0.75;
		this.enemy = this.physics.add.sprite(this.centerX, this.centerY, "enemy");
		this.enemy.scale = 0.8;
		this.enemy.setCollideWorldBounds(true);
		this.enemy.setVelocityY(200);

		this.deathTxt = this.add.bitmapText(
			10,
			this.gameH - 35,
			"carrier_command",
			`Deaths: ${this.deaths}`,
			20
		);
		this.title = this.add.bitmapText(
			this.centerX,
			5,
			"carrier_command",
			"Level 1",
			20
		);
		this.title.setPosition(this.title.x - this.title.width / 2, this.title.y);
	}

	update() {
		const cursors = this.input.keyboard.createCursorKeys();
		const player = this.player;
		const enemy = this.enemy;
		const deathTxt = this.deathTxt;
		const treasure = this.treasure;

		if (cursors.left.isDown) {
			this.player.setVelocityX(-160);
			this.player.flipX = true;
		} else if (cursors.right.isDown) {
			this.player.setVelocityX(160);
			this.player.flipX = false;
		} else {
			this.player.setVelocityX(0);
		}

		if (cursors.up.isDown) {
			this.player.setVelocityY(-160);
		} else if (cursors.down.isDown) {
			this.player.setVelocityY(160);
		} else {
			this.player.setVelocityY(0);
		}

		if (this.enemy.y == 332) {
			this.enemy.setVelocityY(-200);
		} else if (this.enemy.y == 28) {
			this.enemy.setVelocityY(200);
		}

		if (this.player.x > this.enemy.x) {
			this.enemy.flipX = false;
		} else {
			this.enemy.flipX = true;
		}

		this.physics.collide(this.player, this.enemy, () => {
			this.deaths++;
			deathTxt.setText(`Deaths: ${this.deaths}`);
			localStorage.setItem("deaths", this.deaths);
			this.scene.restart();
		});
		this.physics.collide(this.player, this.treasure, () => {
			this.scene.start("level2");
		});
	}
}
