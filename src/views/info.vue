<template>
    <div>
        <p>I am {{name}}</p>
        <p>avatar: {{avatar}}</p>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState([
            'name',
            'avatar'
        ])
    }
}

</script>

<style scoped>
div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height:100px;
}
</style>