// types.ts
export interface Object3D {
    id: number;
    position: [number, number, number];
    initialPosition: [number, number, number];
    rotation: [number, number, number];
    direction: Direction;
    color: string;
    groupRef: THREE.Group | null;
    meshRef: THREE.Mesh | null;
    htmlRef: HTMLImageElement | null;
    isMoving: boolean;
  }
  
  export type Direction = 'up' | 'down' | 'left' | 'right' | 'forward' | 'backward';