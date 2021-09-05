<template>
    <footer class="footer">
        <span>&copy; Copyright 2021 - {{ new Date().getFullYear() }}</span>
    </footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style scoped>
.footer {
    grid-area: footer;
    background: linear-gradient(to right, #070606, #0c0c0c);
    color: #fff;
    font-size: 1.2rem;

    display: flex;
    justify-content: center;
    align-items: center;
}
</style>