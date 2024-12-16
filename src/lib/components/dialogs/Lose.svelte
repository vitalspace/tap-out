<script lang="ts">
  import {
    showLevel,
    showLose,
    currentGame,
    currentGameIndex,
  } from "../../../stores/stores";
  import { allGames } from "../../../stores/Games";

  const deepClone = (obj: any) => {
    const baseClone = JSON.parse(JSON.stringify(obj));
    return Object.assign(baseClone, {
      winCondition: obj.winCondition,
      loseCondition: obj.loseCondition,
    });
  };

  const levels = () => {
    showLevel.set(true);
    showLose.set(false);
  };

  const restart = () => {
    showLose.set(false);

    currentGame.set(deepClone(allGames[$currentGameIndex]));
  };
</script>

{#if $showLose}
  <div class="absolute inset-0 grid h-screen place-items-center p-4 select-none">
    <div
      class="grid w-96 mx-4 bangers-regular gap-8 border-2 rounded-md p-4 text-center bg-[#0d1320] text-white"
    >
      <div>
        <span class="text-7xl">You lost</span>
      </div>
      <div class="flex space-x-4">
        <button class="border rounded-md py-1 px-2 w-full text-4xl bg-[#211C33] hover:bg-[#383349] transition-all hover:scale-110" on:click={levels}> Levels </button>

        <button class="border rounded-md py-1 px-2 w-full text-4xl bg-[#211C33] hover:bg-[#383349] transition-all hover:scale-110" on:click={restart}> Restart </button>
      </div>
    </div>
  </div>
  <div class="fixed bottom-1 right-2 select-none  px-2 text-white">
    <span class="bangers-regular">Made with ❤️ by @vital</span>
  </div>
{/if}
