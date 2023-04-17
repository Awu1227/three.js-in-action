import * as THREE from "three";

import Experience from "../Experience.js";

export default class Line {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Setup
    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array([
      -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0,

      1.0, 1.0, 1.0, -1.0, -1.0, 1.0,
    ]);

    // itemSize = 3 因为每个顶点都是一个三元组。
    this.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(vertices, 3)
    );
  }

  setMaterial() {
    this.material = new THREE.LineBasicMaterial({
      color: "red",
    });
  }

  setMesh() {
    this.line = new THREE.Line(this.geometry, this.material);
    this.line.position.y = 1;
    this.line.rotation.x = -Math.PI * 0.5;
    this.line.castShadow = true;
    this.scene.add(this.line);
  }
  update() {
    this.line.rotation.x += 0.01;
    this.line.rotation.y += 0.01;
  }
}
