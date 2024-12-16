<script lang="ts">
  import {
    showSettings,
    userGlobalScore,
    audioStatus,
  } from "../../../stores/stores";

  const close = () => {
    showSettings.set(false);
  };
</script>

{#if $showSettings}
  <div
    class="absolute inset-0 grid h-screen w-full place-items-center p-4 select-none"
  >
    <div
      class="grid mx-4 gap-8 w-96 bangers-regular border-2 rounded-md p-4 text-center bg-[#0d1320] text-white"
    >
      <div class="flex justify-end">
        <button on:click={close}>
          <img class="w-6 h-6" src="close.svg" alt="" />
        </button>
      </div>

      <div>
        <span class="text-4xl">Settings</span>
      </div>

      <div class="grid gap-y-2">
        <div class="flex justify-between">
          <span> Reset Score </span>
          <button
            class="border rounded-md w-12 py-1 px-2 hover:bg-[#383349] hover:scale-105 transition-all"
            on:click={userGlobalScore.reset}>Reset</button
          >
        </div>

        <div>
          <div class="flex justify-between">
            <span> Audio </span>
            <button
              class="border w-12 rounded-md py-1 px-2 hover:bg-[#383349] hover:scale-105 transition-all"
              on:click={audioStatus.set(!$audioStatus)}
              >{$audioStatus ? "On" : "Off"}</button
            >
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="fixed bottom-1 right-2 select-none px-2 text-white">
    <span class="bangers-regular">Made with ❤️ by @vital</span>
  </div>
{/if}
