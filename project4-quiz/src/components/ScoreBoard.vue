<template>
    <div class="score">
        Player <span>{{this.winScore}}</span> x <span>{{this.loseScore}}</span> Computer
    </div>
</template>

<script>
export default {
    props: ['winScore', 'loseScore']
}
</script>

<style lang="scss">

    div.score{
        border-bottom: 1px solid black;
        padding: 24px;
        font-size: 18px;

        span: {
            padding: 8px;
            font-weight: bold;
            border: 1px solid black;
        }
    }
</style>