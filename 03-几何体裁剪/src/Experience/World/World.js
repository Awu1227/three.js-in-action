import * as THREE from "three";

import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Floor from "./Floor.js";
import CroppingCircle from "./CroppingCircle";

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
      this.croppingCircle = new CroppingCircle();
      this.environment = new Environment();
    });
  }

  update() {
    if (this.fox) this.fox.update();
    if (this.croppingCircle) this.croppingCircle.update();
  }
}
