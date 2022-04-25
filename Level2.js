export default class Level2 extends Phaser.Scene {
	constructor() {
		super("level2");
		this.deaths = localStorage.getItem("deaths");
		this.score = 0;
		this.gameW = 640;
		this.gameH = 360;
		this.centerX = this.gameW / 2;
		this.centerY = this.gameH / 2;
		this.velocity = 180;
		this.step = 30;
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

		this.enemies = this.physics.add.group({
			key: "enemy",
			repeat: 1,
			setXY: {
				x: this.centerX - 40,
				y: this.centerY,
				stepX: 80,
			},
		});

		this.enemies.getChildren().forEach((enemy) => {
			enemy.setVelocityY(this.velocity);
			enemy.setCollideWorldBounds(true);
			enemy.scale = 0.8;
		});

		for (let i = 0; i < this.enemies.getChildren().length; i++) {
			this.enemies
				.getChildren()
				[i].setVelocityY(this.velocity + this.step * (i + 1));
		}

		this.deathsTxt = this.add.bitmapText(
			10,
			this.gameH - 35,
			"carrier_command",
			`Deaths: ${localStorage.getItem("deaths")}`,
			20
		);
		this.title = this.add.bitmapText(
			this.centerX,
			5,
			"carrier_command",
			"Level 2",
			20
		);
		this.title.setPosition(this.title.x - this.title.width / 2, this.title.y);
	}

	update() {
		const cursors = this.input.keyboard.createCursorKeys();
		const deathsTxt = this.deathsTxt;
		const velocity = this.velocity;
		const step = this.step;

		this.deaths = localStorage.getItem("deaths");

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

		for (let i = 0; i < this.enemies.getChildren().length; i++) {
			if (this.enemies.getChildren()[i].y == 332) {
				this.enemies
					.getChildren()
					[i].setVelocityY(-(velocity + step * (i + 1)));
			} else if (this.enemies.getChildren()[i].y == 28) {
				this.enemies.getChildren()[i].setVelocityY(velocity + step * (i + 1));
			}

			if (this.player.x > this.enemies.getChildren()[i].x) {
				this.enemies.getChildren()[i].flipX = false;
			} else {
				this.enemies.getChildren()[i].flipX = true;
			}

			this.physics.collide(this.player, this.enemies.getChildren()[i], () => {
				this.deaths++;
				deathsTxt.setText(`Deaths: ${this.deaths}`);
				localStorage.setItem("deaths", this.deaths);
				this.scene.restart();
			});
		}
		this.physics.collide(this.player, this.treasure, () => {
			this.scene.start("level3");
		});
	}
}
