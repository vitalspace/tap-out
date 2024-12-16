<script lang="ts">
  import { T } from "@threlte/core";
  import { ContactShadows, Grid, OrbitControls } from "@threlte/extras";
  // import MapEditor from "./gameComponents/MapEditor.svelte";
  import Game from "./Game.svelte";

  import { interactivity } from "@threlte/extras";
  import CursorLine from "./gameComponents/CursosLines.svelte";

  import Christmas from "./gameComponents/Christmas.svelte";

  interactivity();
  let cursorPosition = { x: 0, z: 0 };
  let colors = ["#fc6435", "#ff541f", "#f53c02", "#261f9a", "#1e168d"];
</script>

{#each colors as color, i}
  <CursorLine
    {color}
    {cursorPosition}
    position.y={5 - i}
    stiffness={0.02 * i + 0.02}
    damping={0.25 - 0.04 * i}
    width={15 + i * 10}
  />
{/each}

<T.PerspectiveCamera makeDefault position={[-10, 10, 10]} fov={50}>
  <OrbitControls
    autoRotate={false}
    enableZoom={false}
    enableDamping
    autoRotateSpeed={0.5}
    target.y={1.5}
  />
</T.PerspectiveCamera>

<T.AmbientLight intensity={0.5} />

<T.DirectionalLight color="#ffffff" intensity={1} position={[1.5, 2, 0.5]} />

<Grid
  position.y={-0.001}
  cellColor="#ffffff"
  sectionColor="#ffffff"
  sectionThickness={0}
  fadeDistance={25}
  cellSize={2}
/>

<ContactShadows scale={10} blur={2} far={2.5} opacity={0.5} />

<!-- <MapEditor /> -->

<Game />

<T.Mesh
  visible={false}
  on:pointermove={(e) => {
    cursorPosition.x = e.point.x;
    cursorPosition.z = e.point.z;
  }}
>
  <T.BoxGeometry args={[20, 0.1, 20]} />
  <T.MeshBasicMaterial />
</T.Mesh>

<Christmas />
