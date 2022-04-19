const gameW = 640;
const gameH = 360;

const centerX = gameW / 2;
const centerY = gameH / 2;

const gameScene = new Phaser.Scene("Game");

gameScene.preload = function () {
	this.load.image("background", "assets/background.png");
	this.load.image("player", "assets/player.png");
	this.load.image("enemy", "assets/dragon.png");
};

gameScene.create = function () {
	bg = this.add.sprite(centerX, centerY, "background");
	this.player = this.physics.add.sprite(50, centerY, "player");
	this.player.setCollideWorldBounds(true);
	this.player.scale = 0.75;
	this.enemy = this.physics.add.sprite(centerX, centerY, "enemy");
	this.enemy.scale = 0.8;
	this.enemy.setCollideWorldBounds(true);
	this.enemy.setVelocityY(200);
};

const config = {
	type: Phaser.AUTO,
	width: gameW,
	height: gameH,
	scene: gameScene,
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 0 },
			debug: false,
		},
	},
};

const game = new Phaser.Game(config);

gameScene.update = function () {
	const cursors = this.input.keyboard.createCursorKeys();

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

	this.physics.collide(this.player, this.enemy, gameOver);
};

function gameOver() {
	let allSprites = gameScene.children.list.filter(
		(x) => x instanceof Phaser.GameObjects.Sprite
	);

	allSprites.forEach((x) => x.destroy());

	gameScene.cameras.main.setRoundPixels(true);

	const loseText = gameScene.add.text(centerX, centerY, "You Died!");
	loseText.setPosition(
		centerX - loseText.width / 2,
		centerY - loseText.height / 2
	);
}
