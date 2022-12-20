export class Mesh {
  readonly elements: Element[];

  constructor(elements: Element[]) {
    this.elements = this.sortViewSpotsByValueDesc(elements);
  }

  findNViewSpots(n: number): Element[] {
    if (n < 1) {
      return [];
    } else {
      const sortedViewSpots: Element[] = [];

      for (
        let i = 0;
        sortedViewSpots.length < n && i < this.elements.length;
        i++
      ) {
        const element = this.elements[i];

        if (element.isViewSpot === undefined) {
          const neighbours = this.findNeighbours(element);
          const higherNeighbour = neighbours.filter(
            (neighbour) => neighbour.value > element.value
          );

          if (higherNeighbour.length > 0) {
            element.isViewSpot = false;
          } else {
            element.isViewSpot = true;
            sortedViewSpots.push(element);
            neighbours.forEach(neighbour => neighbour.isViewSpot = false)
          }
        }
      }

      return sortedViewSpots;
    }
  }

  private findNeighbours(element: Element): Element[] {
    const neighbours: Element[] = this.elements.filter((otherElement) =>
      this.areElementsNeighbours(element, otherElement)
    );

    return neighbours;
  }

  private areElementsNeighbours(
    element: Element,
    otherElement: Element
  ): boolean {
    return (
      element.id !== otherElement.id &&
      this.areThereSharedNodes(element.nodes, otherElement.nodes)
    );
  }

  private areThereSharedNodes(
    elementNodes: Node[],
    otherElementNodes: Node[]
  ): boolean {
    return !!otherElementNodes.find(
      (node) => !!elementNodes.find((n) => n.id === node.id)
    );
  }

  private sortViewSpotsByValueDesc(viewSpots: Element[]) {
    return viewSpots.sort((spotA: Element, spotB: Element) => {
      if (spotA.value === spotB.value) {
        return spotA.id - spotB.id;
      } else {
        return spotB.value - spotA.value;
      }
    });
  }
}

export interface Element {
  readonly id: number;
  isViewSpot?: boolean;
  readonly nodes: Node[];
  readonly value: number;
}

export interface Node {
  readonly id: number;
  readonly x: number;
  readonly y: number;
}
