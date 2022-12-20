import { Mesh, Element } from "./Mesh";

export interface MeshDto {
  elements: ElementDto[];
  nodes: NodeDto[];
  values: ElementValueDto[];
}

interface ElementDto {
  id: number;
  nodes: number[];
}

interface NodeDto {
  id: number;
  x: number;
  y: number;
}

interface ElementValueDto {
  element_id: number;
  value: number;
}

export function meshDtoToDomain(dto: MeshDto): Mesh {
  const elements = dto.elements.map((elementDto) => {
    const id = elementDto.id;
    const nodes = filterNodesById(dto.nodes, elementDto.nodes);
    const value = filterValueByElementId(dto.values, elementDto.id);

    return {
      id,
      nodes,
      value,
    };
  });

  return new Mesh(elements);
}

function filterNodesById(nodes: NodeDto[], nodeIds: number[]): NodeDto[] {
  return nodes.filter((node) => nodeIds.includes(node.id));
}

function filterValueByElementId(
  values: ElementValueDto[],
  elementId: number
): number {
  return values.find((value) => value.element_id === elementId)!.value!;
}

export function elementToElementValueDto(element: Element): ElementValueDto {
  return {
    element_id: element.id,
    value: element.value,
  };
}
