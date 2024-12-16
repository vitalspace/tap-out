export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface GroupObject {
  position: Position;
  initialPosition: Position;
  rotation: Position;
  direction: "up" | "down" | "left" | "right" | "forward" | "backward";
  groupRef: THREE.Group | null;
  meshRef: THREE.Mesh | null;
  htmlRef: HTMLImageElement | null;
  isMoving: boolean;
  color: string;
  id: number;
}

export interface Gamelevel {
  name: string;
  attempts: number;
  score: number;
  objects: GroupObject[];
  winCondition?: (objects: GroupObject[]) => boolean;
  loseCondition?: (objects: number) => boolean;
}
