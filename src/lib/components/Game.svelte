<script lang="ts">
  import { T, useTask, useThrelte } from "@threlte/core";
  import {
    RoundedBoxGeometry,
    Stars,
    useTexture,
    FakeGlowMaterial,
    Outlines,
  } from "@threlte/extras";
  import { get } from "svelte/store";
  import { Box3, MeshStandardMaterial, type Object3D } from "three";
  import { allGames } from "../../stores/Games";
  import {
    attempts,
    currentGame,
    currentGameIndex,
    restart,
    showLose,
    showWin,
    userGlobalScore,
  } from "../../stores/stores";
  import { handleClick } from "./gameComponents/handleClick";
  import { playSound, AudioManager } from "./gameComponents/Audio";

  const collisionAudio = new AudioManager("/popping_bubble_sound.mp3");

  // Constants
  const RANGE_LIMIT = 10;
  const TEXTURE_PATH = "/arrowa.png";

  // Threlte setup
  const { size, camera, scene } = useThrelte();

  // Texture setup
  const texture = useTexture(TEXTURE_PATH, {
    transform: (texture) => {
      texture.center.set(0.5, 0.5); // Establecer el centro en el medio de la textura
      texture.offset.set(0.05, 0.05); // Sin desplazamiento
      texture.repeat.set(1, 1); // La textura se repite 3 veces en cada eje (más repeticiones = textura más pequeña)

      return texture;
    },
  });

  const deepClone = (obj: any) => {
    const baseClone = JSON.parse(JSON.stringify(obj));
    return Object.assign(baseClone, {
      winCondition: obj.winCondition,
      loseCondition: obj.loseCondition,
    });
  };

  // Reactive declarations
  $: texturedMaterial = $texture
    ? new MeshStandardMaterial({
        color: "#ffffff",
        map: $texture,
        // transparent: true,
        // alphaTest: 0.5, // Add alpha test to improve transparency
        // depthWrite: true,
        // depthTest: true,
      })
    : null;
  $: redMaterial = new MeshStandardMaterial({ color: "red" });
  $: initialObjects = deepClone(allGames[$currentGameIndex]);

  // State
  let resetFlag = false;

  // Utility functions
  currentGame.subscribe((game) => {
    if (!game) return;
    attempts.set(game.attempts);
  });

  const isOutOfBounds = (position: { x: number; y: number; z: number }) =>
    Math.abs(position.x) > RANGE_LIMIT ||
    Math.abs(position.y) > RANGE_LIMIT ||
    Math.abs(position.z) > RANGE_LIMIT;

  const updatePosition = (
    position: { x: number; y: number; z: number },
    direction: string
  ) => {
    const step = 0.1;
    switch (direction) {
      case "up":
        position.y += step;
        break;
      case "down":
        position.y -= step;
        break;
      case "left":
        position.x -= step;
        break;
      case "right":
        position.x += step;
        break;
      case "forward":
        position.z += step;
        break;
      case "backward":
        position.z -= step;
        break;
    }
  };

  // Game class
  class Game {
    init() {
      console.log("Init");
    }

    create() {
      console.log("Create");
      window.addEventListener("click", this.handleGlobalClick);
      restart.subscribe(this.handleRestart);
    }

    handleGlobalClick = (event: MouseEvent) => {
      if (!get(currentGame) && !get(currentGame)) return;
      handleClick(event, get(currentGame), camera, size);
    };

    handleRestart = (value: boolean) => {
      if (value) {
        this.restartGame();
        restart.set(false);
      }
    };

    update() {
      useTask(() => {
        if (!get(currentGame)) return;
        this.updateObjects();
      });
    }

    updateObjects() {
      const game = get(currentGame);

      for (let i = game.objs.length - 1; i >= 0; i--) {
        const obj = game.objs[i];
        if (obj.isMoving && obj.groupRef) {
          this.moveObject(obj, i);
        }
      }

      if (game.winCondition(game)) {
        showWin.set(true);
        currentGame.set(null);
      }

      if (game.loseCondition(game)) {
        showLose.set(true);
        currentGame.set(null);
      }
    }

    moveObject(obj: any, index: number) {
      const { position } = obj.groupRef;
      updatePosition(position, obj.direction);

      if (isOutOfBounds(position)) {
        this.removeObject(obj, index);
      } else {
        this.checkCollisions(obj);
      }
    }

    removeObject(obj: any, index: number) {
      scene.children = scene.children.filter((child) => child !== obj.groupRef);
      get(currentGame).objs.splice(index, 1);
      $userGlobalScore = $userGlobalScore + 1;
    }

    checkCollisions(obj: any) {
      const movingCubeBox = new Box3().setFromObject(obj.meshRef);
      for (const otherCube of get(currentGame).objs) {
        if (obj === otherCube || !otherCube.meshRef) continue;
        const otherCubeBox = new Box3().setFromObject(otherCube.meshRef);
        if (movingCubeBox.intersectsBox(otherCubeBox)) {
          collisionAudio.play();
          // playSound();
          // setTimeout(() => {
          //   stopSound();
          // }, 1000);

          // console.log("here", otherCube)

          otherCube.meshRef.scale.set(1.2, 1.2, 1.2);
          setTimeout(() => {
            otherCube.meshRef.scale.set(1, 1, 1);
          }, 100);

          this.resetObjectPosition(obj);
          break;
        }
      }
    }

    resetObjectPosition(obj: any) {
      const { x, y, z } = obj.initialPosition;
      obj.groupRef.position.set(x, y, z);
      obj.isMoving = false;
    }

    restartGame() {
      get(currentGame).objs.forEach((obj) => {
        if (obj.groupRef) {
          scene.remove(obj.groupRef);
        }
      });
      get(currentGame).objs = deepClone(initialObjects.objs);
      get(currentGame).score = deepClone(initialObjects.score);
      get(currentGame).attempts = deepClone(initialObjects.attempts);

      // score.set(get(currentGame).score);
      attempts.set(get(currentGame).attempts);

      this.triggerRerender();
    }

    triggerRerender() {
      resetFlag = true;
      setTimeout(() => {
        resetFlag = false;
      }, 50);
    }
  }

  // Initialize game
  const game = new Game();
  game.init();
  game.create();
  game.update();

  // Helper function for object creation
  const createObjectRef =
    (obj: any, type: "group" | "mesh") => (e: { ref: Object3D }) => {
      obj[`${type}Ref`] = e.ref;
    };
</script>

<Stars />

<div class="absolute top-0 left-0 bg-white p-2 z-40">
  <h1 class="text-white">hi</h1>
</div>

{#if !resetFlag && $currentGame}
  {#each $currentGame.objs as obj (obj.id)}
    <T.Group
      position={[obj.position.x, obj.position.y, obj.position.z]}
      rotation={[obj.rotation.x, obj.rotation.y, obj.rotation.z]}
      on:create={createObjectRef(obj, "group")}
    >
      <T.Mesh name={obj.id} on:create={createObjectRef(obj, "mesh")}>
        <RoundedBoxGeometry />
        <T
          is={[
            texturedMaterial,
            new MeshStandardMaterial({ color: obj.color }),
            redMaterial,
            redMaterial,
            redMaterial,
            redMaterial,
          ]}
          attach="material"
        />
        <Outlines color="white" />
        <Outlines color="hotpink" thickness={0.05} />
        <Outlines color="yellow" thickness={0.1} />
      </T.Mesh>

      <!-- <T.Mesh>
        <FakeGlowMaterial glowColor="white" />
        <T.IcosahedronGeometry args={[3, 4]} />
      </T.Mesh> -->
    </T.Group>
  {/each}
{/if}
