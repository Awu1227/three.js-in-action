import * as THREE from "three";

import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Floor from "./Floor.js";
import Box from "./Box";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.environment = new Environment();

    this.resources = this.experience.resources;

    // Wait for resources
    this.resources.on("ready", () => {
      // Setup
      this.floor = new Floor();
      this.box = new Box();
      this.environment = new Environment();
    });
  }

  update() {
    if (this.fox) this.fox.update();
    if (this.box) this.box.update();
  }
}
