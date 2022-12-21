"use strict";

import * as fs from "fs";

import { MeshDto } from "./models/MeshDto";

import { viewSpotFinder } from "./handler";

const [_, __, meshFilePath, n] = process.argv;

try {
  const meshFileContent: string = fs.readFileSync(meshFilePath, "utf8");
  const mesh: MeshDto = JSON.parse(meshFileContent);
  const numberOfViewSpots = Number.parseInt(n);

  const result = viewSpotFinder({ n: numberOfViewSpots, mesh });
  
  console.log(result);
} catch (err) {
  console.error(err);
}
