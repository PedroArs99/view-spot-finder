import { MeshDto } from "./MeshDto";

export interface FindNSpotsCommandDto {
  n: number;
  mesh: MeshDto;
}
