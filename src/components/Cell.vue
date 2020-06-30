<template>
    <div @click="onClick" class="game__cell cell">
        <svg v-if="type === 'x'" class="cross-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="0" x2="100" y2="100" />
            <line x1="100" y1="0" x2="0" y2="100" />
        </svg>
        <svg v-else-if="type === 'o'" class="toe-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" />
        </svg>
    </div>
</template>

<script>
    export default {
        name: "Cell",
        props: ['type', 'index'],
        methods: {
            onClick() {
                if (!this.type) {
                    this.$emit('make-turn', this.index);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .cell {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 33.333%;
            height: 100px;
            border: 1px solid #ddd;
            box-sizing: border-box;
            cursor: pointer;
            transition: all .2s;

        &:hover {
            background-color: #ddd;
        }
    }

    .cross-icon {
        width: 30px;
        height: 30px;
        stroke: greenyellow;
        stroke-width: 10px;
    }

    .toe-icon {
        width: 40px;
        height: 40px;
        stroke-width: 8px;
        stroke: coral;
        fill: none;
    }
</style>
