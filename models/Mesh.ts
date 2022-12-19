export class Mesh {
  constructor(readonly elements: Element[]) {}

  findNViewSpots(n: number): Element[] {
    if (n < 1) {
      return [];
    } else {
      const viewSpots: Element[] = [];

      for (let i = 0; i < this.elements.length; i++) {
        const element = this.elements[i];

        const neighbours = this.findNeighbours(element);

        // If is ViewSpot
        let j = 0;
        let isNeighbourHigher = false;

        while (!isNeighbourHigher && j < neighbours.length) {
          const neighbour = neighbours[j];

          if (neighbour.value > element.value) {
            isNeighbourHigher = true;
          } else {
            j++;
          }
        }

        // Then append it to the viewSpots list
        if (j === neighbours.length) {
          viewSpots.push(element);
        }
      }
      
      // Sort list by value and return
      return viewSpots
        .sort(
          (spotA: Element, spotB: Element) => spotB.value - spotA.value
        )
        .slice(0, n);
    }
  }

  private findNeighbours(element: Element): Element[] {
    const neighbours: Element[] = [];

    this.elements.forEach((otherElement) => {
      if (otherElement.id !== element.id) {
        const isNeighbour = otherElement.nodes.find(
          (node) => !!element.nodes.find((n) => n.id === node.id)
        );

        if (isNeighbour) neighbours.push(otherElement);
      }
    });

    return neighbours;
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
