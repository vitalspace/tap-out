<!--
Auto-generated by: https://github.com/threlte/threlte/tree/main/packages/gltf
Command: npx @threlte/gltf@2.0.3 .\christmas.glb -T --draco /draco
-->

<script>
  import { Group } from "three";
  import { T, forwardEventHandlers } from "@threlte/core";
  import {
    useGltf,
    useGltfAnimations,
    Text3DGeometry,
    interactivity,
  } from "@threlte/extras";
  import { spring } from "svelte/motion";

  interactivity();
  const scale = spring(1);

  export const ref = new Group();

  const gltf = useGltf("/christmas-transformed.glb", { useDraco: "/draco/" });
  export const { actions, mixer } = useGltfAnimations(gltf, ref);

  let isHover = false;

  const component = forwardEventHandlers();

  const sayHello = () => {
    $actions.hi.setDuration(2);
    $actions.hi.play();
  };

  const sayGoodbye = () => {
    // $actions.hi.setDuration(2);
    $actions.hi?.stop();
  };
</script>

<T.Mesh position={[0, 2, 5]} rotation={[0, -Math.PI / 2, 0]}>
  <Text3DGeometry
    size={0.2}
    height={0.1}
    font="/fonts/Mountains of Christmas_Bold.json"
    text="Happy Christmas"
  />

  <T.MeshStandardMaterial
    color="white"
    toneMapped={false}
    metalness={0.1}
    roughness={0.1}
  />
</T.Mesh>

<T.PointLight
  color="red"
  distance={1}
  intensity={60}
  position={[-0.6, 1.5, 5.5]}
/>

<T.PointLight
  color="purple"
  distance={1}
  intensity={60}
  position={[-0.6, 1, 5.5]}
/>

<T.PointLight
  color="orange"
  distance={1}
  intensity={60}
  position={[-0.6, 1.5, 6.6]}
/>

<T is={ref} dispose={false} {...$$restProps} bind:this={$component}>
  {#await gltf}
    <slot name="fallback" />
  {:then gltf}
    <T.Group position={[0, 0, 6]} rotation={[0, -1.4, 0]} name="Scene">
      <T.Group
        name="metarig"
        position={[0.52, -0.02, 0]}
        rotation={[0, -0.06, 0]}
      >
        <T is={gltf.nodes.spine} />
        <T.Group
          on:pointerenter={sayHello}
          on:pointerleave={sayGoodbye}
          name="snoo"
        >
          <T.SkinnedMesh
            name="Head_Collapsed"
            geometry={gltf.nodes.Head_Collapsed.geometry}
            material={gltf.materials["Material.002"]}
            skeleton={gltf.nodes.Head_Collapsed.skeleton}
          />
          <T.SkinnedMesh
            name="Head_Collapsed_1"
            geometry={gltf.nodes.Head_Collapsed_1.geometry}
            material={gltf.materials["Material.001"]}
            skeleton={gltf.nodes.Head_Collapsed_1.skeleton}
          />
          <T.SkinnedMesh
            name="Head_Collapsed_2"
            geometry={gltf.nodes.Head_Collapsed_2.geometry}
            material={gltf.materials["Material.003"]}
            skeleton={gltf.nodes.Head_Collapsed_2.skeleton}
          />
        </T.Group>
      </T.Group>
      <T.Mesh
        scale={$scale}
        on:pointerenter={() => scale.set(1.5)}
        on:pointerleave={() => scale.set(1)}
        name="tree"
        geometry={gltf.nodes.tree.geometry}
        material={gltf.materials.Material_0}
        position={[-0.08, 1, -0.07]}
        rotation={[0, -0.07, 0]}
      />
      <T.Mesh
        name="gitfs"
        geometry={gltf.nodes.gitfs.geometry}
        material={gltf.materials["Material_0.001"]}
        position={[-0.79, 0.42, 0.39]}
        rotation={[0, 0.39, 0]}
        scale={0.49}
      />
    </T.Group>
  {:catch error}
    <slot name="error" {error} />
  {/await}

  <slot {ref} />
</T>
