import mesh1 from "../examples/mesh_1.json";
import mesh2 from "../examples/mesh_2.json";
import mesh3 from "../examples/mesh_3.json";
import mesh4 from "../examples/mesh_4.json";
import mesh200 from "../examples/mesh_200.json";
import { MeshDto, meshDtoToDomain } from "./MeshDto";

describe("Mesh Tests", () => {
  it.each([-1, 0])("Should return empty array", (n: number) => {
    const mesh = meshDtoToDomain(mesh200.mesh);

    const result = mesh.findNViewSpots(n);

    expect(result.length).toBe(0);
  });

  it.each([1, 2, 100])(
    "Should return the only item on the mesh",
    (n: number) => {
      const mesh = meshDtoToDomain(mesh1.mesh);

      const result = mesh.findNViewSpots(n);

      const expectedResult = {
        id: 0,
        isViewSpot: true,
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
        value: 0.15154957113761364,
      };
      expect(result.length).toBe(1);
      expect(result[0]).toEqual(expectedResult);
    }
  );

  it.each([mesh2.mesh, mesh3.mesh])(
    "Should return just one element",
    (meshDto: MeshDto) => {
      const mesh = meshDtoToDomain(meshDto);

      const result = mesh.findNViewSpots(2);

      const expectedResult = {
        id: 0,
        isViewSpot: true,
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
        value: 0.15154957113761364,
      };
      expect(result.length).toBe(1);
      expect(result[0]).toEqual(expectedResult);
    }
  );

  it("Should return 2 results", () => {
    const mesh = meshDtoToDomain(mesh4.mesh);

    const result = mesh.findNViewSpots(2);

    const expectedResult = [
      {
        id: 0,
        isViewSpot: true,
        nodes: [
          {
            id: 0,
            x: 1.0,
            y: 0.0,
          },
          {
            id: 1,
            x: 0.0,
            y: 1.0,
          },
          {
            id: 2,
            x: 1.0,
            y: 1.0,
          },
        ],
        value: 1,
      },
      {
        id: 3,
        isViewSpot: true,
        nodes: [
          {
            id: 3,
            x: 1.0,
            y: 2.0,
          },
          {
            id: 4,
            x: 0.0,
            y: 2.0,
          },
          {
            id: 5,
            x: 1.0,
            y: 3.0,
          },
        ],
        value: 1,
      },
    ];
    expect(result.length).toBe(2);
    expect(result).toEqual(expectedResult);
  });

  it("Should return the first 5 results", () => {
    const mesh = meshDtoToDomain(mesh200.mesh);

    const result = mesh.findNViewSpots(5);

    const expectedResult = [
      {
        id: 153,
        isViewSpot: true,
        nodes: [
          {
            id: 83,
            x: 7,
            y: 6,
          },
          {
            id: 94,
            x: 8,
            y: 6,
          },
          {
            id: 95,
            x: 8,
            y: 7,
          },
        ],
        value: 5.99412916855438,
      },
      {
        id: 141,
        isViewSpot: true,
        nodes: [
          {
            id: 77,
            x: 7,
            y: 0,
          },
          {
            id: 88,
            x: 8,
            y: 0,
          },
          {
            id: 89,
            x: 8,
            y: 1,
          },
        ],
        value: 5.59673083328692,
      },
      {
        id: 99,
        isViewSpot: true,
        nodes: [
          {
            id: 53,
            x: 4,
            y: 9,
          },
          {
            id: 64,
            x: 5,
            y: 9,
          },
          {
            id: 65,
            x: 5,
            y: 10,
          },
        ],
        value: 3.7165791791790643,
      },
      {
        id: 87,
        isViewSpot: true,
        nodes: [
          {
            id: 47,
            x: 4,
            y: 3,
          },
          {
            id: 58,
            x: 5,
            y: 3,
          },
          {
            id: 59,
            x: 5,
            y: 4,
          },
        ],
        value: 3.6258426752667208,
      },
      {
        id: 199,
        isViewSpot: true,
        nodes: [
          {
            id: 108,
            x: 9,
            y: 9,
          },
          {
            id: 119,
            x: 10,
            y: 9,
          },
          {
            id: 120,
            x: 10,
            y: 10,
          },
        ],
        value: 2.047341538506613,
      },
    ];
    expect(result.length).toBe(5);
    expect(result).toEqual(expectedResult);
  });
});

describe("Load Tests", () => {
  it("Time needed to parse 10K Mesh", () => {
    const startTime = performance.now();
    const mesh = meshDtoToDomain(mesh10K.mesh);
    const endTime = performance.now();

    console.log(`Time elapsed in ms: ${endTime - startTime}`);
  });

  it("Time needed to parse 20K Mesh", () => {
    const startTime = performance.now();
    const mesh = meshDtoToDomain(mesh20K.mesh);
    const endTime = performance.now();

    console.log(`Time elapsed in ms: ${endTime - startTime}`);
  });

  it.each([
    0, 1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 10000,
  ])("Time needed to get view spots on the 10K Mesh", (n: number) => {
    const startTime = performance.now();
    const mesh = meshDtoToDomain(mesh10K.mesh);
    const result = mesh.findNViewSpots(n);
    const endTime = performance.now();

    console.log(`Time elapsed in ms: ${endTime - startTime}`);
  });

  it.each([
    0, 1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384,
    20000,
  ])("Time needed to get view spots on the 20K Mesh", (n: number) => {
    const startTime = performance.now();
    const mesh = meshDtoToDomain(mesh20K.mesh);
    const result = mesh.findNViewSpots(n);
    const endTime = performance.now();

    console.log(`Time elapsed in ms: ${endTime - startTime}`);
  });
});
