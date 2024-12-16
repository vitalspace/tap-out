<script lang="ts">
  import {
    currentGame,
    currentGameIndex,
    showLevel,
    showWin,
    userGlobalScore,
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
    showWin.set(false);
  };

  const next = () => {
    // const index = get(currentGameIndex);

    // Verifica si estamos en el último índice
    // if (index >= allGames.length - 1) {
    //   return;
    // }

    showWin.set(false);

    currentGameIndex.update((index) => {
      return index + 1;
    });

    currentGame.set(deepClone(allGames[$currentGameIndex]));
  };
</script>

{#if $showWin}
  <div
    class="absolute inset-0 grid h-screen w-full place-items-center p-4 select-none"
  >
    <div
      class="grid mx-4 gap-8 w-96 bangers-regular border-2 rounded-md p-4 text-center bg-[#0d1320] text-white"
    >
      <div>
        <div class="flex justify-center place-items-end">
          <img class="w-10 -rotate-45" src="crown.svg" alt="" />
          <img class="w-20" src="crown.svg" alt="" />
          <img class="w-10 rotate-45" src="crown.svg" alt="" />
        </div>

        <span class="text-7xl">- Win - </span>
      </div>
      <div
        class="flex h-40 place-items-center justify-center rounded-md border-4 bg-[#313847] text-center text-white"
      >
        <span class="text-7xl bangers-regular text-white"
          >{$userGlobalScore}</span
        >
      </div>

      <div class="flex space-x-4">
        <button
          class="border rounded-md py-1 px-2 w-full text-4xl bg-[#211C33] hover:bg-[#383349] transition-all hover:scale-110"
          on:click={levels}
        >
          Levels
        </button>

        <!-- <button disabled={isLastLevel} on:click={next}> next map </button> -->
        {#if $currentGameIndex < allGames.length - 1}
          <button
            class="border rounded-md py-1 px-2 w-full text-4xl bg-[#211C33] hover:bg-[#383349] transition-colors hover:scale-110 transition-all"
            on:click={next}
          >
            Next Map
          </button>
        {/if}
      </div>
    </div>
  </div>
  <div class="fixed bottom-1 right-2 select-none px-2 text-white">
    <span class="bangers-regular">Made with ❤️ by @vital</span>
  </div>
{/if}
