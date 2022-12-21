import mesh1 from "../examples/serverless/mesh_1.json";
import mesh2 from "../examples/serverless/mesh_2.json";
import mesh3 from "../examples/serverless/mesh_3.json";
import mesh4 from "../examples/serverless/mesh_4.json";
import mesh200 from "../examples/serverless/mesh_200.json";
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
        value: 0.15154957113761364,
      };
      expect(result.length).toBe(1);
      expect(result[0]).toMatchObject(expectedResult);
    }
  );

  it.each([mesh2.mesh, mesh3.mesh])(
    "Should return just one element",
    (meshDto: MeshDto) => {
      const mesh = meshDtoToDomain(meshDto);

      const result = mesh.findNViewSpots(2);

      const expectedResult = {
        id: 0,
        value: 0.15154957113761364,
      };
      expect(result.length).toBe(1);
      expect(result[0]).toMatchObject(expectedResult);
    }
  );

  it("Should return 2 results", () => {
    const mesh = meshDtoToDomain(mesh4.mesh);

    const result = mesh.findNViewSpots(2);

    const expectedResult = [
      {
        id: 0,
        value: 1,
      },
      {
        id: 3,
        value: 1,
      },
    ];
    expect(result.length).toBe(2);
    expect(result).toMatchObject(expectedResult);
  });

  it("Should return the first 5 results", () => {
    const mesh = meshDtoToDomain(mesh200.mesh);

    const result = mesh.findNViewSpots(5);

    const expectedResult = [
      {
        id: 153,
        value: 5.99412916855438,
      },
      {
        id: 141,
        value: 5.59673083328692,
      },
      {
        id: 99,
        value: 3.7165791791790643,
      },
      {
        id: 87,
        value: 3.6258426752667208,
      },
      {
        id: 199,
        value: 2.047341538506613,
      },
    ];
    expect(result.length).toBe(5);
    expect(result).toMatchObject(expectedResult);
  });
});
