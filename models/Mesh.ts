export class Mesh {
  constructor(readonly elements: Element[]) {}
}

export interface Element {
  readonly id: number;
  readonly nodes: Node[];
  readonly value: number;
}

export interface Node {
  readonly id: number;
  readonly x: number;
  readonly y: number;
}
