<script lang="ts">
  import {
    attempts,
    currentGame,
    userGlobalScore,
  } from "../../../stores/stores";
</script>

{#if $currentGame}
  <div
    class="absolute top-0 bangers-regular flex text-center space-x-4 place-items-center px-4 py-1 select-none"
  >
    <div class="text-center text-white">
      Global Score: {$userGlobalScore}
    </div>

    <div class="text-center text-white">
      Attempts:
      {$attempts}
    </div>
  </div>
{/if}
