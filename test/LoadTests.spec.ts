import { meshDtoToDomain } from "../models/MeshDto";
import mesh10K from "../examples/serverless/mesh_10K.json";
import mesh20K from "../examples/serverless/mesh_20K.json";

describe("Load Tests", () => {
  it.each([
    0, 1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 10000,
  ])("Time needed to get view spots on the 10K Mesh", (n: number) => {
    const startTime = performance.now();
    const mesh = meshDtoToDomain(mesh10K.mesh);
    mesh.findNViewSpots(n);
    const endTime = performance.now();

    const elapsedTime = endTime - startTime;
    expect(elapsedTime).toBeLessThan(7500);
  });

  it.each([
    0, 1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384,
    20000,
  ])("Time needed to get view spots on the 20K Mesh", (n: number) => {
    const startTime = performance.now();
    const mesh = meshDtoToDomain(mesh20K.mesh);
    mesh.findNViewSpots(n);
    const endTime = performance.now();

    const elapsedTime = endTime - startTime;
    expect(elapsedTime).toBeLessThan(22500);
  });
});
