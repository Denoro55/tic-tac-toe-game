<template>
    <div class="game">
        <div class="game__title">Tic Tac Toe</div>
        <div class="game__wins">
            <div class="game__win">
                <div class="game__win-text">Крестики</div>
                <div class="game__win-count">{{player1.wins}}</div>
            </div>
            <div class="game__win game__win_toe">
                <div class="game__win-text">Нолики</div>
                <div class="game__win-count">{{player2.wins}}</div>
            </div>
        </div>
        <div class="game__current-mode">
            {{ getCurrentMode }}
        </div>
        <div class="game__cells">
            <Cell @make-turn="makeTurn" :active="isGameRunning" v-for="(cell, index) in cells" :type="cell" :key="index" :index="index" />
        </div>
        <div class="game__turn">
            {{ getText }}
        </div>
        <div v-if="!isGameRunning" class="game__again">
            <button @click="restartGame" class="button">
                Начать снова
            </button>
        </div>
        <div class="game__mode">
            <button v-if="isSingleMode" @click="changeMode('AI')" class="button">
                Играть с компьютером
            </button>
            <button v-else @click="changeMode()" class="button">
                Играть с другом
            </button>
        </div>
    </div>
</template>

<script>
    import Cell from "./Cell";
    import Player from "../actors/Player";
    import Computer from "../actors/Computer";

    export default {
        name: "Game",
        components: {
            Cell
        },
        data() {
            return {
                game: {
                    status: 'game',
                    result: '',
                    singleMode: true
                },
                player1: new Player(0, 'x', 'Крестики'),
                player2: new Player(0, 'o', 'Нолики'),
                timeout: null,
                currentPlayer: 1,
                cells: [
                    '','','',
                    '','','',
                    '','',''
                ],
                winCombinations: [
                    [0,1,2], [3,4,5], [6,7,8],
                    [0,3,6], [1,4,7], [2,5,8],
                    [0,4,8], [2,4,6]
                ]
            }
        },
        computed: {
            getText() {
                if (this.getGameStatus() === 'game') {
                    return this.getCurrentType() === 'x' ? 'Ход крестиков' : 'Ход ноликов'
                }

                return 'Игра окончена. ' + this.getGameResult() + '!';
            },
            isGameRunning() {
                return this.isGame();
            },
            isSingleMode() {
                return this.getMode();
            },
            getCurrentMode() {
                return this.getMode() ? 'Игра с другом' : 'Игра с компьютером'
            }
        },
        methods: {
            makeTurn(index, allow = false) {
                if (this.canTurn() || allow) {
                    this.setCeil(index, this.getCurrentType());
                    this.checkWinner();
                    this.changeTurn();
                }
            },
            makeAITurn() {
                if (this.aiTurn() && this.isGame()) {
                    this.timeout = setTimeout(() => {
                        this.makeTurn(this.getCurrentPlayer().getRandomCeil(this.cells), true);
                    }, 500);
                }
            },
            changeTurn() {
                this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
                this.makeAITurn();
            },
            setCeil(index, type) {
                this.cells.splice(index, 1, type);
            },
            aiTurn() {
                return !this.getMode() && this.currentPlayer === 2;
            },
            canTurn() {
                return this.getGameStatus() === 'game' && !this.aiTurn()
            },
            endGame(text) {
                this.setGameStatus('end');
                this.setGameResult(text);
            },
            isGame() {
                return this.getGameStatus() === 'game';
            },
            checkWinner() {
                for (let i = 0; i < this.winCombinations.length; i++) {
                    const combination = this.winCombinations[i];

                    let win = true;
                    for (let j = 1; j < combination.length; j++) {
                        if (this.cells[combination[j]] === '' || this.cells[combination[j]] !== this.cells[combination[j - 1]]) {
                            win = false;
                        }
                    }

                    if (win) {
                        const text = `${this.getCurrentName()} победили`;
                        this.getCurrentPlayer().wins++;
                        this.endGame(text);
                    }
                }

                if (this.cells.every(e => e !== '') && this.isGame()) { // ничья
                    this.endGame('Ничья');
                }
            },
            getCurrentPlayer() {
                return this.currentPlayer === 1 ? this.player1 : this.player2;
            },
            getCurrentType() {
                return this.getCurrentPlayer().type;
            },
            getCurrentName() {
                return this.getCurrentPlayer().name;
            },
            setGameStatus(status) {
                this.game.status = status;
            },
            getGameStatus() {
                return this.game.status;
            },
            setGameResult(text) {
                this.game.result = text;
            },
            getGameResult() {
                return this.game.result;
            },
            getMode() {
                return this.game.singleMode;
            },
            setMode(mode) {
                this.game.singleMode = mode;
            },
            changeMode(mode) {
                if (mode === 'AI') {
                    this.setMode(false);
                    this.player1 = new Player(0, 'x', 'Крестики');
                    this.player2 = new Computer(0, 'o', 'Нолики');
                } else {
                    this.setMode(true);
                    this.player1 = new Player(0, 'x', 'Крестики');
                    this.player2 = new Player(0, 'o', 'Нолики');
                }
                this.startGame();
            },
            startGame(turn = 1) {
                clearTimeout(this.timeout);
                this.setGameStatus('game');
                this.currentPlayer = turn;
                this.cells =  [
                    '','','',
                    '','','',
                    '','',''
                ];
                this.makeAITurn();
            },
            restartGame() {
                this.startGame(this.currentPlayer)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .game {
        padding-top: 20px;
        padding-bottom: 20px;
        width: 300px;
        margin: 20px auto;

        &__title {
            text-align: center;
            font-size: 28px;
            font-weight: 600;
            margin-bottom: 25px;
        }

        &__wins {
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
        }

        &__win {
            text-align: center;

            &-text {
                margin-bottom: 5px;
                color: greenyellow;
            }

            &_toe {
                .game__win-text {
                    color: coral;
                }
            }
        }

        &__cells {
            margin-bottom: 25px;
            width: 300px;
            display: flex;
            flex-wrap: wrap;
        }

        &__turn {
            margin-bottom: 25px;
            text-align: center;
        }

        &__mode {
            display: flex;
            justify-content: center;
        }

        &__current-mode {
            text-align: center;
            margin-bottom: 25px;
        }

        &__again {
            margin-bottom: 25px;
            display: flex;
            justify-content: center;
        }
    }
</style>
