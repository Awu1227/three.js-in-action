import * as THREE from "three";

import Experience from "../Experience.js";

export default class Floor {
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
    this.mesh = new THREE.Line(this.geometry, this.material);
    this.mesh.position.y = 1;
    this.mesh.rotation.x = -Math.PI * 0.5;
    this.mesh.castShadow = true;
    this.scene.add(this.mesh);
  }
  update() {
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.01;
  }
}
