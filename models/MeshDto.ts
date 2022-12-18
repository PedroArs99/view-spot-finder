import { Mesh } from "./Mesh";

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
    element_id: number;
    value: number;
  }[];
}

export function meshDtoToDomain(dto: MeshDto): Mesh {
  const elements = dto.elements.map((elementDto) => {
    const id = elementDto.id;
    const nodes = elementDto.nodes.map(
      (nodeId) => dto.nodes.find((node) => node.id === nodeId)!
    );
    const value = dto.values.find((value) => value.element_id === id)!.value;

    return {
      id,
      nodes,
      value,
    };
  });

  return new Mesh(elements);
}
