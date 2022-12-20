export class Mesh {
  constructor(readonly elements: Element[]) {}

  findNViewSpots(n: number): Element[] {
    if (n < 1) {
      return [];
    } else {
      const viewSpots: Element[] = this.getViewSpots();
      const sortedViewSpots = this.sortViewSpotsByValueDesc(viewSpots);
      const firstNViewSpots = sortedViewSpots.slice(0, n);

      return firstNViewSpots;
    }
  }

  private getViewSpots(): Element[] {
    return this.elements.filter((element) => this.isViewSpot(element));
  }

  private isViewSpot(element: Element): boolean {
    const neighbours = this.findNeighbours(element);
    const higherNeighbour = neighbours.find(
      (neighbour) => neighbour.value > element.value
    );

    return !higherNeighbour;
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
    return viewSpots.sort(
      (spotA: Element, spotB: Element) => spotB.value - spotA.value
    );
  }
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
