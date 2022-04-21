export default class Level1 extends Phaser.Scene {
	constructor() {
		super("level1");
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
		this.scoreTxt = this.add.bitmapText(
			10,
			5,
			"carrier_command",
			`Score: ${this.score}`,
			20
		);
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
	}

	update() {
		const reset = () => {
			this.player.setPosition(50, this.centerY);
			this.player.setVelocityX(0);
			this.player.setVelocityY(0);
			this.enemy.setPosition(this.centerX, this.centerY);
			this.enemy.setVelocityY(200);
			this.enemy.setVelocityX(0);
			this.treasure.setPosition(this.gameW - 80, this.centerY);
			this.treasure.setVelocityX(0);
			this.treasure.setVelocityY(0);
		};

		const cursors = this.input.keyboard.createCursorKeys();
		const player = this.player;
		const enemy = this.enemy;
		const scoreTxt = this.scoreTxt;
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
			reset();
			this.score = 0;
			scoreTxt.setText(`Score: ${this.score}`);
		});
		this.physics.collide(this.player, this.treasure, () => {
			reset();
			this.score++;
			this.scoreTxt.setText(`Score: ${this.score}`);
		});
	}
}
