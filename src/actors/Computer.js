import Player from "./Player";

class Computer extends Player {
    constructor(wins, type, name, winCombinations) {
        super(wins, type, name);
        this.allWinCombinations = winCombinations;
    }

    getRandomCeil(cells) {
        const winLine = this.canPlayerWin(cells, this.type);

        if (winLine) {
            return this.getRandomEmptyCell(winLine, cells);
        }

        const opponentWinLine = this.canPlayerWin(cells, 'x');

        if (opponentWinLine) {
            return this.getRandomEmptyCell(opponentWinLine, cells);
        }

        if (!this.isPathActual(cells)) {
            this.updateWinLines(cells);
        }

        const currentPath = this.getCurrentPath();

        if (!currentPath) {
            return this.getRandomEmptyCell(this.allWinCombinations, cells);
        }

        return this.getRandomEmptyCell(currentPath, cells);
    }

    getWinLines(combinations, cells, type) {
        return combinations.reduce((acc, c) => {
            if (c.every(cellIndex => cells[cellIndex] === '' || cells[cellIndex] === type)) {
                return [...acc, c];
            }
            return acc;
        }, []);
    }

    getRandomPathIndex() {
        return this.getRandomByLength(this.winCombinations);
    }

    getCurrentPath() {
        return this.path;
    }

    getRandomByLength(arr) {
        return arr[Math.floor(Math.random() * arr.length)]
    }

    updateWinLines(cells) {
        this.winCombinations = this.getWinLines(this.allWinCombinations, cells, 'o');
        this.path = this.getRandomPathIndex();
        // console.log(this.winCombinations, this.path);
    }

    isPathActual(cells) {
        return this.path.every(index => cells[index] !== 'x');
    }

    canPlayerWin(cells, cellType) {
        for (let i = 0; i < this.allWinCombinations.length; i++) {
            const count = this.allWinCombinations[i].reduce((acc, index) => {
                if (cells[index] === cellType) return acc + 1;
                if (cells[index] !== '') return acc - 1;
                return acc;
            }, 0);

            if (count >= 2) {
                return this.allWinCombinations[i];
            }
        }

        return false;
    }

    getRandomEmptyCell(arr, cells) {
        const emptyIndexes = arr.reduce((acc, index) => {
            if (cells[index] === '') return [...acc, index];
            return acc;
        }, []);

        return this.getRandomByLength(emptyIndexes);
    }

    init(cells) {
        this.updateWinLines(cells);
    }
}

export default Computer;
