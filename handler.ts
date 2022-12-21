"use strict";

import { FindNSpotsCommandDto } from "./models/FindNSpotsCommandDto";
import { elementToElementValueDto, meshDtoToDomain } from "./models/MeshDto";

export function viewSpotFinder(event: FindNSpotsCommandDto) {
  try {
    const mesh = meshDtoToDomain(event.mesh);
    const nViewSpots = mesh.findNViewSpots(event.n);

    const result = nViewSpots.map((element) =>
      elementToElementValueDto(element)
    );

    return {
      statusCode: 200,
      body: JSON.stringify(result, null, 2),
    };
  } catch (error) {
    return {
      statusCode: 400,
    };
  }
}
