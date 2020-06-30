<template>
    <div @mouseleave="focusout" @mouseover="hover" @click="onClick" class="game__cell cell" :class="{hover: hoverClass}">
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
        props: ['type', 'index', 'active'],
        data() {
            return {
                hoverClass: false
            }
        },
        methods: {
            onClick() {
                if (!this.type) {
                    this.$emit('make-turn', this.index);
                }
            },
            hover() {
                if (!this.type && this.active) {
                    this.hoverClass = true;
                }
            },
            focusout() {
                this.hoverClass = false;
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
    }

    .cell.hover {
        background-color: #ddd;
    }

    .cross-icon {
        width: 30px;
        height: 30px;
        stroke: greenyellow;
        stroke-width: 10px;

        line {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            animation: cross-animation 1s linear forwards;

            &:nth-child(2) {
                animation: cross-animation-2 1s linear forwards;
                animation-delay: .15s;
            }
        }
    }

    .toe-icon {
        width: 40px;
        height: 40px;
        stroke-width: 8px;
        stroke: coral;
        fill: none;
        stroke-dasharray: 1000;
        stroke-dashoffset: 1000;
        animation: toe-animation 1s linear forwards;
    }

    @keyframes toe-animation {
        from {
            stroke-dashoffset: 1000;
        }

        to {
            stroke-dashoffset: 0;
        }
    }

    @keyframes cross-animation {
        from {
            stroke-dashoffset: 1000;
        }

        to {
            stroke-dashoffset: 0;
        }
    }

    @keyframes cross-animation-2 {
        from {
            stroke-dashoffset: 1000;
        }

        to {
            stroke-dashoffset: 0;
        }
    }
</style>
