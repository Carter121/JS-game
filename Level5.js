export default class Level5 extends Phaser.Scene {
	constructor() {
		super("level5");
		this.deaths = localStorage.getItem("deaths");
		this.score = 0;
		this.gameW = 640;
		this.gameH = 360;
		this.centerX = this.gameW / 2;
		this.centerY = this.gameH / 2;
		this.velocity = 300;
		this.step = -20;
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
		this.load.image("rock", "assets/rock.png");
	}

	create() {
		this.bg = this.add.sprite(this.centerX, this.centerY, "background");
		this.treasure = this.physics.add.sprite(
			this.gameW - 40,
			this.centerY,
			"treasure"
		);
		this.treasure.scale = 0.5;
		this.player = this.physics.add.sprite(50, this.centerY, "player");
		this.player.setCollideWorldBounds(true);
		this.player.scale = 0.6;

		this.enemies = this.physics.add.group({
			key: "enemy",
			repeat: 4,
			setXY: {
				x: this.centerX - 170,
				y: this.centerY,
				stepX: 85,
			},
		});

		this.enemies.getChildren().forEach((enemy) => {
			enemy.setVelocityY(this.velocity);
			enemy.setCollideWorldBounds(true);
			enemy.scale = 0.7;
		});

		for (let i = 0; i < this.enemies.getChildren().length; i++) {
			this.enemies.getChildren()[i].setVelocityY(this.velocity + this.step * i);
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
			"Level 5",
			20
		);
		this.title.setPosition(this.title.x - this.title.width / 2, this.title.y);

		this.walls = this.physics.add.staticGroup();
		// this.walls.add.rectangle(200, 200, 148, 148, 0x6666ff);
		this.rect1 = this.add.rectangle(200, 200, 148, 14, 0xffffff);
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
			if (this.enemies.getChildren()[i].y == 335.5) {
				this.enemies.getChildren()[i].setVelocityY(-(velocity + step * i));
			} else if (this.enemies.getChildren()[i].y == 24.5) {
				this.enemies.getChildren()[i].setVelocityY(velocity + step * i);
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
			this.scene.start("level6");
		});
		this.physics.add.collider(this.player, this.walls);
	}
}
