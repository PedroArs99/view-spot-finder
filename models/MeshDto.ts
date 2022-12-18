export interface MeshDto {
  elements: {
    id: number;
    nodes: number[];
  }[];
  nodes: {
    id: number;
    x: number;
    y: number;
  }[];
  values: {
    elementId: number;
    value: number;
  }[];
}
