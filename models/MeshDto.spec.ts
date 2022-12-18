import { meshDtoToDomain } from "./MeshDto";

describe("Mesh Dto Tests", () => {
  it("Should map to domain object", () => {
    const meshDto = {
      nodes: [
        {
          id: 0,
          x: 0.0,
          y: 0.0,
        },
        {
          id: 1,
          x: 0.0,
          y: 1.0,
        },
        {
          id: 12,
          x: 1.0,
          y: 1.0,
        },
      ],
      elements: [
        {
          id: 0,
          nodes: [0, 1, 12],
        },
      ],
      values: [
        {
          element_id: 0,
          value: 0.15154957113761364,
        },
      ],
    };

    const mesh = meshDtoToDomain(meshDto);

    const expectedResult = {
      id: 0,
      nodes: [
        {
          id: 0,
          x: 0,
          y: 0,
        },
        {
          id: 1,
          x: 0,
          y: 1,
        },
        {
          id: 12,
          x: 1,
          y: 1,
        },
      ],
      value: 0.15154957113761364,
    };
    expect(mesh.elements.length).toBe(1);
    expect(mesh.elements[0]).toEqual(expectedResult);
  });
});
