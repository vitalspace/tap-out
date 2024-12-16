<script lang="ts">
  import { get } from "svelte/store";
  import {
    currentGame,
    Games,
    currentGameIndex,
    showLevel,
  } from "../../../stores/stores";
  import { allGames } from "../../../stores/Games";

  // const deepClone = (obj: any) => JSON.parse(JSON.stringify(obj));

  const deepClone = (obj: any) => {
    const baseClone = JSON.parse(JSON.stringify(obj));
    return Object.assign(baseClone, {
      winCondition: obj.winCondition,
      loseCondition: obj.loseCondition,
    });
  };

  // Cambia al nivel seleccionado
  const setLevel = (level: number) => {
    showLevel.set(false);
    // Object.assign(allGames[level]);

    // console.log(Object.assign(allGames[level]));
    // console.log(deepClone(allGames[level]));

    currentGame.set(deepClone(allGames[level]));

    // currentGame.set(Object.assign(allGames[level]));

    currentGameIndex.set(level);
  };
</script>

{#if !$currentGame && $showLevel}
  <div class="absolute inset-0 grid h-screen place-items-center p-4 select-none">
    <div
      class="grid w-96 bangers-regular mx-4 gap-8 border-2 rounded-md p-4 text-center bg-[#0d1320] text-white itim-regular"
    >
      <div class="my-6">
        <h1 class="text-5xl">Select Level</h1>
      </div>

      <div class="grid grid-cols-3 gap-4">
        {#each get(Games) as _, index}
          <button
            class="border-2 p-4 rounded-md bg-[#0C081B] hover:bg-[#211C33] transition-all"
            on:click={() => setLevel(index)}
          >
            Level {index + 1}
          </button>
        {/each}
      </div>
    </div>
  </div>
  <div class="fixed bottom-1 right-2 select-none  px-2 text-white">
    <span class="bangers-regular">Made with ❤️ by @vital</span>
  </div>
{/if}
