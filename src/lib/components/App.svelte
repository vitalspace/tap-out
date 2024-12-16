<script lang="ts">
  import { Canvas } from "@threlte/core";
  import Scene from "./Scene.svelte";
  import CubeControls from "./CubeControls.svelte";
  import Controls from "./controls/Controls.svelte";
  import Levels from "../components/dialogs/Levels.svelte";
  import TopTextDraw from "./textDraws/TopTextDraw.svelte";
  import Win from "./dialogs/Win.svelte";
  import Lose from "./dialogs/Lose.svelte";
  import Settings from "../components/dialogs/Settings.svelte";
  import { useProgress } from "@threlte/extras";
  import { tweened } from "svelte/motion";
  import { fade } from "svelte/transition";
  import User from "./dialogs/User.svelte";

  const { progress } = useProgress();

  let showCanvas = false;

  const tweenedProgress = tweened(0, {
    duration: 800,
  });

  $: tweenedProgress.set($progress);

  $: {
    if ($tweenedProgress === 1) {
      showCanvas = true;
    }
  }
</script>

<User />
<Levels />
<Win />
<Lose />
<TopTextDraw />
<Controls />
<Settings />

{#if $tweenedProgress < 1 && !showCanvas}
  <div
    transition:fade|local={{
      duration: 200,
    }}
    class="absolute top-0 left-0 w-full h-full bg-[#0d1320] flex flex-col items-center justify-center"
  >
    <div class="grid gap-y-4 text-center bangers-regular">
      <div>
        <h1 class="font-doctor-terror text-9xl text-border text-white">
          Tap Out
        </h1>
      </div>

      <div class="w-full grid gap-4">
        <p class="font-doctor-terror text-xl text-white">Loading</p>
        <div class="w-full border h-3">
          <div
            class="h-full bg-white w-full"
            style="width: {$tweenedProgress * 100}%"
          />
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- <CubeControls /> -->

<div class="h-screen" class:showCanvas>
  <Canvas>
    <Scene />
  </Canvas>
</div>
