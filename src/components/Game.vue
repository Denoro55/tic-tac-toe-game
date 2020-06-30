<template>
    <div class="game">
        <div class="game__title">Tic Tac Toe</div>
        <div class="game__wins">
            <div class="game__win">
                <div class="game__win-text">Крестики</div>
                <div class="game__win-count">0</div>
            </div>
            <div class="game__win game__win_toe">
                <div class="game__win-text">Нолики</div>
                <div class="game__win-count">0</div>
            </div>
        </div>
        <div class="game__cells">
            <Cell @make-turn="makeTurn" v-for="(cell, index) in cells" :type="cell" :key="index" :index="index" />
        </div>
        <div class="game__turn">
            {{ getText }}
        </div>
        <div v-if="!isGameRunning" class="game__again">
            <button @click="startGame" class="button">
                Начать снова
            </button>
        </div>
    </div>
</template>

<script>
    import Cell from "./Cell";

    export default {
        name: "Game",
        components: {
            Cell
        },
        data() {
            return {
                gameStatus: 'game',
                gameResult: '',
                player1: {
                    wins: 0,
                    type: 'x',
                    name: 'Крестики'
                },
                player2: {
                    wins: 0,
                    type: 'o',
                    name: 'Нолики'
                },
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
                if (this.gameStatus === 'game') {
                    return this.getCurrentType() === 'x' ? 'Ход крестиков' : 'Ход ноликов'
                }

                return 'Игра окончена. ' + this.gameResult + '!';
            },
            isGameRunning() {
                return this.isGame();
            }
        },
        methods: {
            makeTurn(index) {
                if (this.canTurn()) {
                    this.cells.splice(index, 1, this.getCurrentType());
                    this.checkWinner();
                    this.changeTurn();
                }
            },
            changeTurn() {
                this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
            },
            canTurn() {
                return this.gameStatus === 'game'
            },
            endGame(text) {
                this.gameStatus = 'end';
                this.gameResult = text;
            },
            isGame() {
                return this.gameStatus === 'game';
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
            startGame() {
                this.gameStatus = 'game';
                this.cells =  [
                    '','','',
                    '','','',
                    '','',''
                ];
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

        &__again {
            display: flex;
            justify-content: center;
        }
    }
</style>
