<template>
    <div class="results">
            <div class="text-center">
                <h2>Search results: </h2>
            </div>
        <div v-for="result in results" class="result-list">
            <single-user v-if="result.username" :userId="result._id" :key="result._id"></single-user>
            <single-post v-if="result.title" :post="result" :key="result._id"></single-post>
        </div>
    </div>
</template>

<script>
    import SingleUser from './SingleUser.vue';
    import SinglePost from './SinglePost.vue';
    export default{
        components: {
            singleUser: SingleUser,
            singlePost: SinglePost
        },
        props: {
            results: Array
        }
    }
</script>

<style scoped>

    .results {
        margin-bottom: 2em;
        padding: 1em;
        border-bottom-width: 3px;
        border-bottom-style: solid;
        border-bottom-color: #3333;
    }

</style>