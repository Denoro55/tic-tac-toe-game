import Player from "./Player";

class Computer extends Player {
    constructor(wins, type, name) {
        super(wins, type, name);
    }

    getRandomCeil(cells) {
        const emptyIndexes = cells.reduce((acc, el, index) => {
            if (el === '') return [...acc, index];
            return acc;
        }, []);
        return emptyIndexes[Math.floor(Math.random() * (emptyIndexes.length))];
    }
}

export default Computer;
