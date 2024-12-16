<script lang="ts">
  import { currentObject } from "../../../stores/stores";
  import { T, useThrelte } from "@threlte/core";
  import { HTML, TransformControls } from "@threlte/extras";
  import { get } from "svelte/store";
  import { Raycaster, Vector2, Vector3 } from "three";

  const { scene, camera, size } = useThrelte();

  let objects: any = [];
  let selectedObject: any = null;

  const raycaster = new Raycaster();
  const mouse = new Vector2();

  function handleClick(event: MouseEvent) {
    // currentObject.set(null);
    if (!get(camera)) return;

    mouse.x = (event.clientX / get(size).width) * 2 - 1;
    mouse.y = -(event.clientY / get(size).height) * 2 + 1;

    raycaster.setFromCamera(mouse, get(camera));

    const intersects = raycaster.intersectObjects(
      objects.map((obj: any) => obj.meshRef).filter(Boolean),
      true
    );

    if (intersects.length === 0) {
      selectedObject = null;
      return;
    }

    const clickedCube = intersects[0].object;

    // currentObject.set(clickedCube);

    // Encuentra el objeto completo que coincide con el cubo clickeado
    selectedObject = objects.find((obj: any) => obj.meshRef === clickedCube);

    if (!selectedObject) {
      selectedObject = null;
      return;
    }

    console.log(selectedObject);

    //@ts-ignore
    currentObject.set({
      obj: selectedObject,
      groupRef: selectedObject.groupRef,
    });
  }

  window.addEventListener("click", handleClick);

  function addCube() {
    const color = "#" + Math.floor(Math.random() * 16777215).toString(16);

    objects = [
      ...objects,
      {
        position: [0, 0, 0],
        initialPosition: [0, 0, 0],
        rotation: [0, 0, 0],
        direction: "up",
        groupRef: null,
        meshRef: null,
        htmlRef: null,
        isMoving: false,
        color: color,
        id: Date.now(),
      },
    ];
  }

  const onchange = () => {
    if (selectedObject) {
      // console.log(selectedObject.groupRef.rotation);

      selectedObject.position = selectedObject.groupRef.position;
      // selectedObject.rotation.x = selectedObject.groupRef.rotation._x;
      // selectedObject.rotation.y = selectedObject.groupRef.rotation._y;
      // selectedObject.rotation.z = selectedObject.groupRef.rotation._z;

      selectedObject.rotation = new Vector3(
        selectedObject.groupRef.rotation._x,
        selectedObject.groupRef.rotation._y,
        selectedObject.groupRef.rotation._z
      );

      selectedObject.initialPosition = selectedObject.position;
    }
  };

  const printCubers = () => {
    const updatedArray = objects.map((obj) => {
      return {
        ...obj,
        groupRef: null,
        meshRef: null,
        htmlRef: null,
        isMoving: false,
      }; // Copia el objeto y actualiza el campo "name"
    });

    console.log(updatedArray);
  };
</script>

<HTML transform>
  <div class="flex space-x-4">
    <button class="text-white select-none bg-orange-500" on:click={addCube}>
      Crear Nuevo Cubo
    </button>

    <button class="text-white select-none bg-orange-500" on:click={printCubers}
      >See Cubes</button
    >
  </div>
</HTML>

{#each objects as obj (obj.id)}
  <T.Group position={obj.position} on:create={(e) => (obj.groupRef = e.ref)}>
    <T.Mesh name={obj.id} on:create={(e) => (obj.meshRef = e.ref)}>
      <T.BoxGeometry />
      <T.MeshStandardMaterial color={obj.color} />
    </T.Mesh>

    <HTML
      transform
      occlude={false}
      position={[0, 0, 0.52]}
      rotation={[0, 0, 0]}
    >
      <img
        bind:this={obj.htmlRef}
        class="h-6 w-6 select-none"
        src="arrow.svg"
        alt={`flecha ${obj.id}`}
      />
    </HTML>
  </T.Group>
{/each}

{#if selectedObject}
  <TransformControls
    object={selectedObject.groupRef}
    translationSnap={0.01}
    on:change={onchange}
  />
{/if}
