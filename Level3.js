export default class Level3 extends Phaser.Scene {
	constructor() {
		super("level3");
		this.deaths = localStorage.getItem("deaths");
		this.score = 0;
		this.gameW = 640;
		this.gameH = 360;
		this.centerX = this.gameW / 2;
		this.centerY = this.gameH / 2;
		this.velocity = 200;
		this.step = 40;
		this.dead = false;
	}

	preload() {
		//* load images
		this.load.audio("theme", "assets/music.mp3");
		this.load.image("background", "assets/background.png");
		this.load.image("player", "assets/player.png");
		this.load.image("enemy", "assets/dragon.png");
		this.load.image("treasure", "assets/treasure.png");
		this.load.image("dead", "assets/player-dead.png");
		this.load.bitmapFont(
			"carrier_command",
			"assets/carrier_command.png",
			"assets/carrier_command.xml"
		);
	}

	create() {
		//* create evreything
		this.bg = this.add.sprite(this.centerX, this.centerY, "background");
		this.treasure = this.physics.add.sprite(
			this.gameW - 80,
			this.centerY,
			"treasure"
		);
		this.treasure.scale = 0.075;
		this.player = this.physics.add.sprite(50, this.centerY, "player");
		this.player.setCollideWorldBounds(true);
		this.player.scale = 0.025;

		this.enemies = this.physics.add.group({
			key: "enemy",
			repeat: 2,
			setXY: {
				x: this.centerX - 80,
				y: this.centerY,
				stepX: 80,
			},
		});

		this.enemies.getChildren().forEach((enemy) => {
			enemy.setVelocityY(this.velocity);
			enemy.setCollideWorldBounds(true);
			enemy.scale = 0.03;
			enemy.setBounce(1);
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
			"Level 3",
			20
		);
		this.title.setPosition(this.title.x - this.title.width / 2, this.title.y);
		this.music = this.sound.add("theme");
		this.music.play();
	}

	update() {
		//* dont move if dead
		if (this.dead == true) {
			this.player.setVelocityX(0);
			this.player.setVelocityY(0);
			this.enemies.getChildren().forEach((enemy) => {
				enemy.setVelocityX(0);
				enemy.setVelocityY(0);
			});
			return;
		}
		const cursors = this.input.keyboard.createCursorKeys();
		const deathsTxt = this.deathsTxt;
		const velocity = this.velocity;
		const step = this.step;

		this.deaths = localStorage.getItem("deaths");

		//* movement
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

		//* move enemy
		for (let i = 0; i < this.enemies.getChildren().length; i++) {
			if (this.enemies.getChildren()[i].y == 332) {
				this.enemies.getChildren()[i].setVelocityY(-(velocity + step * i));
			} else if (this.enemies.getChildren()[i].y == 28) {
				this.enemies.getChildren()[i].setVelocityY(velocity + step * i);
			}

			if (this.player.x > this.enemies.getChildren()[i].x) {
				this.enemies.getChildren()[i].flipX = false;
			} else {
				this.enemies.getChildren()[i].flipX = true;
			}

			this.physics.collide(this.player, this.enemies.getChildren()[i], () => {
				const cam = this.cameras.main;
				this.dead = true;
				this.player.setTexture("dead");
				cam.pan(this.player.x, this.player.y, 10);
				cam.setZoom(5);
				cam.fade(1500);
				setTimeout(() => {
					this.deaths++;
					deathsTxt.setText(`Deaths: ${this.deaths}`);
					localStorage.setItem("deaths", this.deaths);
					this.dead = false;
					this.scene.restart();
				}, 2000);
			});
		}
		this.physics.collide(this.player, this.treasure, () => {
			this.scene.start("level4");
		});
	}
}
