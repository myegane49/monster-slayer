new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        monsterAttack() {
            const damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.checkEnd();
            this.turns.unshift({
                isPlayer: false,
                text: `Monster hits player for ${damage}`
            });
        },
        attack() {
            // let max = 10;
            // let min = 3;
            // let damage = Math.max(Math.ceil(Math.random() * max), min);
            // this.monsterHealth -= damage;
            // if (this.monsterHealth <= 0) {
            //     alert('You won!');
            //     this.gameIsRunning = false;
            //     return;
            // }

            const damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: `Player hits monster for ${damage}`
            });
            if (this.checkEnd()) {
                return;
            }

            // max = 12;
            // min = 5;
            // damage = Math.max(Math.ceil(Math.random() * max), min);
            // this.playerHealth -= damage;
            // if (this.playerHealth <= 0) {
            //     alert('You lost!');
            //     this.gameIsRunning = false;
            // }

            // this.playerHealth -= this.calculateDamage(5, 12);
            // this.checkEnd();

            this.monsterAttack();
        },
        specialAttack() {
            const damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: `Player hits monster hard for ${damage}`
            });
            if (this.checkEnd()) {
                return;
            }

            this.monsterAttack();
        },
        heal() {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: `Player heals for 10`
            });
            this.monsterAttack();
        },
        giveUp() {
            this.gameIsRunning = false;
        },
        calculateDamage(min, max) {
            return Math.max(Math.ceil(Math.random() * max), min);
        },
        checkEnd() {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! New game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost! New game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true; 
            }
            return false;
        }
    }
});