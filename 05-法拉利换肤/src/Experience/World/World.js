import * as THREE from "three";

import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Floor from "./Floor.js";
import Box from "./Box";
import Fox from "./Ferrari";
import House from "./House";
import Ferrari from "./Ferrari";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.environment = new Environment();

    this.resources = this.experience.resources;

    // Wait for resources
    this.resources.on("ready", () => {
      // Setup
      // this.floor = new Floor();
      // this.box = new Box();
      // this.house = new House();
      // this.fox = new Fox();
      this.ferrari = new Ferrari();

      this.environment = new Environment();
    });
  }

  update() {
    if (this.fox) this.fox.update();
    if (this.box) this.box.update();
    if (this.ferrari) this.ferrari.update();
  }
}
