<script lang="ts">
  import {
    Pane,
    Slider,
    ThemeUtils,
    List,
    type ListOptions,
  } from "svelte-tweakpane-ui";
  import { currentObject } from "../../stores/stores";

  import { MathUtils } from "three";

  let x = 0;
  let y = 0;
  let z = 0;
  let rx = 0;
  let ry = 0;
  let rz = 0;

  let direction = 0;
  currentObject.subscribe((value) => {
    if (!value) return;
    x = value.groupRef.position.x;
    y = value.groupRef.position.y;
    z = value.groupRef.position.z;

    rx = MathUtils.radToDeg(value.groupRef.rotation.x);
    ry = MathUtils.radToDeg(value.groupRef.rotation.y);
    rz = MathUtils.radToDeg(value.groupRef.rotation.z);

    // console.log(value);

    direction = value.obj.direction;
  });

  const options: ListOptions<string> = {
    up: "up",
    down: "down",
    left: "left",
    right: "right",
    forward: "forward",
    backward: "backward",
  };
</script>

<Pane theme={ThemeUtils.presets.light} position="fixed" title="InstancedSprite">
  <Slider
    label="X"
    min={-10}
    max={10}
    step={0.01}
    bind:value={x}
    on:change={() => {
      $currentObject.groupRef.position.x = x;
      $currentObject.obj.initialPosition.x = x;
    }}
  />
  <Slider
    label="Y"
    min={-10}
    max={10}
    step={0.01}
    bind:value={y}
    on:change={() => {
      $currentObject.groupRef.position.y = y;
      $currentObject.obj.initialPosition.y = y;
    }}
  />
  <Slider
    label="Z"
    min={-10}
    max={10}
    step={0.01}
    bind:value={z}
    on:change={() => {
      $currentObject.groupRef.position.z = z;
      $currentObject.obj.initialPosition.z = z;
    }}
  />

  <Slider
    label="RX"
    min={-180}
    max={180}
    step={0.01}
    bind:value={rx}
    on:change={() => {
      $currentObject.groupRef.rotation.x = MathUtils.degToRad(rx);
      // $currentObject.obj.rotation.x = rx; // Guarda la rotación en grados
    }}
  />
  <Slider
    label="RY"
    min={-180}
    max={180}
    step={0.01}
    bind:value={ry}
    on:change={() => {
      $currentObject.groupRef.rotation.y = MathUtils.degToRad(ry);
      // $currentObject.obj.rotation.y= ry; // Guarda la rotación en grados
    }}
  />
  <Slider
    label="RZ"
    min={-180}
    max={180}
    step={0.01}
    bind:value={rz}
    on:change={() => {
      $currentObject.groupRef.rotation.z = MathUtils.degToRad(rz);
      // $currentObject.obj.rotation.z = rz; // Guarda la rotación en grados
    }}
  />

  <List
    bind:value={direction}
    label="Selected"
    {options}
    on:change={() => ($currentObject.obj.direction = direction)}
  />
</Pane>
