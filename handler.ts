"use strict";

import { FindNSpotsCommandDto } from "./models/FindNSpotsCommandDto";
import { elementToElementValueDto, meshDtoToDomain } from "./models/MeshDto";

export async function viewSpotFinder(event: FindNSpotsCommandDto) {
  const mesh = meshDtoToDomain(event.mesh);
  const nViewSpots = mesh.findNViewSpots(event.n);

  const result = nViewSpots.map((element) => elementToElementValueDto(element));

  return {
    statusCode: 200,
    body: JSON.stringify(result, null, 2),
  };
}