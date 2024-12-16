import { get } from "svelte/store";
import { Raycaster, Vector2, Camera, Object3D } from "three";
import { attempts } from "../../../stores/stores";
import { AudioManager } from "./Audio";

const raycaster = new Raycaster();
const mouse = new Vector2();

const displacementAudio = new AudioManager("/displacement.mp3");

interface Size {
  width: number;
  height: number;
}

interface ObjectData {
  meshRef: Object3D;
  isMoving: boolean;
}

interface GameObjects {
  objs: ObjectData[];
}

export const handleClick = (
  event: MouseEvent,
  objects: GameObjects | undefined,
  camera: Camera | undefined,
  size: Size | undefined
) => {
  if (!camera || !size) {
    console.warn("Camera or size is undefined");
    return;
  }

  if (!objects || !Array.isArray(objects.objs)) {
    console.warn("Objects are undefined or not an array");
    return;
  }

  mouse.x = (event.clientX / get(size).width) * 2 - 1;
  mouse.y = -(event.clientY / get(size).height) * 2 + 1;

  // raycaster.setFromCamera(mouse, camera);
  raycaster.setFromCamera(mouse, get(camera));

  const validMeshRefs = objects.objs
    .map((obj: ObjectData) => obj.meshRef)
    .filter((mesh): mesh is Object3D => mesh instanceof Object3D);

  const intersects = raycaster.intersectObjects(validMeshRefs, true);

  if (intersects.length === 0) return;

  const clickedObject = intersects[0].object;
  const objectData = objects.objs.find(
    (obj: ObjectData) => obj.meshRef === clickedObject
  );

  if (objectData && !objectData.isMoving) {
    // attempts.set(objects.attempts--);

    // console.log(objectData);

    if (objects.attempts <= 0) return;
    attempts.update((attempts) => {
      return (objects.attempts = attempts - 1);
    });
    displacementAudio.play();

    objectData.isMoving = true;
  }

  // console.log("Objects:", objects);
  // console.log("Valid mesh refs:", validMeshRefs);
  // console.log("Intersects:", intersects);
};
