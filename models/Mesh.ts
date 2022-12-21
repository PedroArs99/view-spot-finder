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

      for (const element of this.elements) {
        if (this.isUnknownViewSpot(element)) {
          element.neighbours = this.findNeighbours(element);
          
          if(this.isViewSpot(element)) {
            element.isViewSpot = true;
            sortedViewSpots.push(element);
          } else {
            element.isViewSpot = false;
          }
          
          this.boundNeighbours(element);
        }

        if (this.areThereEnoughViewSpots(sortedViewSpots, n)) {
          break;
        }
      }

      return sortedViewSpots;
    }
  }

  private boundNeighbours(element: Element): void {
    element.neighbours?.forEach((neighbour) => {
      if (neighbour.value <= element.value)
        neighbour.isViewSpot = false;
    });
  }

  private isViewSpot(element: Element): boolean {
    const higherNeighbour = element.neighbours?.find(
      (neighbour) => neighbour.value > element.value
    );

    return !higherNeighbour
  }

  private isUnknownViewSpot(element: Element): boolean {
    return element.isViewSpot === undefined;
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

  private sortViewSpotsByValueDesc(viewSpots: Element[]): Element[] {
    return viewSpots.sort((spotA: Element, spotB: Element) => {
      if (spotA.value === spotB.value) {
        return spotA.id - spotB.id;
      } else {
        return spotB.value - spotA.value;
      }
    });
  }

  private areThereEnoughViewSpots(sortedViewSpots: Element[], n: number) {
    return sortedViewSpots.length === n;
  }
}

export interface Element {
  readonly id: number;
  isViewSpot?: boolean;
  readonly nodes: Node[];
  neighbours?: Element[];
  readonly value: number;
}

export interface Node {
  readonly id: number;
  readonly x: number;
  readonly y: number;
}
