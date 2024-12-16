<script lang="ts">
  import App from "$lib/components/App.svelte";
  import "../app.css";
</script>

<div>
  <App />
</div>

<style>
  div {
    width: 100vw;
    height: 100vh;
    background: #0d1320;
    background: linear-gradient(
      180deg,
      rgba(13, 19, 32, 1) 0%,
      rgba(8, 12, 21, 1) 100%
    );
  }
</style>
