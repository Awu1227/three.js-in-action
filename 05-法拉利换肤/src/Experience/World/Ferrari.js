import * as THREE from "three";

import Experience from "../Experience.js";

export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.resource = this.resources.items.ferrariModel;
    this.wheels = [];
    // Setup
    // this.setGeometry();
    this.setGrid();
    this.setTextures();
    this.setMaterial();
    this.setModel();
    this.setShadow();
    // this.setMesh();
  }
  setGrid() {
    this.grid = new THREE.GridHelper(60, 60, 0xffffff, 0xffffff);
    this.grid.material.opacity = 0.2;
    this.grid.material.depthWrite = false;
    this.grid.material.transparent = true;
    this.scene.add(this.grid);
  }
  setGeometry() {
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
  }

  setTextures() {
    this.textures = {};

    // 设置材质的颜色贴图纹理对象
    this.textures.color = this.resources.items.wallColorTexture;
    this.textures.color.encoding = THREE.sRGBEncoding; // 设置sRGB编码方式以提高颜色的准确性和一致性，避免出现色彩误差和变形等问题。
    this.textures.color.repeat.set(1.5, 1.5); // 用于控制材质贴图重复的次数，将贴图在S轴和T轴上重复1.5次
    this.textures.color.wrapS = THREE.RepeatWrapping; // 在S轴（水平）方向上采用重复纹理的方式，即在纹理周围填充与之相同的纹理，实现更好的纹理平铺效果
    this.textures.color.wrapT = THREE.RepeatWrapping; // 在T轴（垂直）方向上采用重复纹理的方式，即在纹理周围填充与之相同的纹理，实现更好的纹理平铺效果

    this.textures.normal = this.resources.items.wallNormalTexture;
    this.textures.normal.repeat.set(1.5, 1.5);
    this.textures.normal.wrapS = THREE.RepeatWrapping;
    this.textures.normal.wrapT = THREE.RepeatWrapping;
  }

  setMaterial() {
    this.bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xff0000,
      metalness: 1.0,
      roughness: 0.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      sheen: 0.5,
    });
    this.detailsMaterial = new THREE.MeshStandardMaterial({
      color: 0xb1b1e7,
      metalness: 1.0,
      roughness: 0.5,
    });

    this.glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.25,
      roughness: 0,
      transmission: 1.0,
    });
    const bodyColorInput = document.getElementById("body-color");
    bodyColorInput.addEventListener("input", (e) => {
      this.bodyMaterial.color.set(e.currentTarget.value);
    });

    const detailsColorInput = document.getElementById("details-color");
    detailsColorInput.addEventListener("input", (e) => {
      this.detailsMaterial.color.set(e.currentTarget.value);
    });

    const glassColorInput = document.getElementById("glass-color");
    glassColorInput.addEventListener("input", (e) => {
      this.glassMaterial.color.set(e.currentTarget.value);
    });
  }
  setModel(x = 2, y = 0, z = 0) {
    console.log("resource,", this.resource);

    this.model = this.resource.scene.children[0];
    this.model.getObjectByName("body").material = this.bodyMaterial;

    this.model.getObjectByName("rim_fl").material = this.detailsMaterial;
    this.model.getObjectByName("rim_fr").material = this.detailsMaterial;
    this.model.getObjectByName("rim_rr").material = this.detailsMaterial;
    this.model.getObjectByName("rim_rl").material = this.detailsMaterial;
    this.model.getObjectByName("trim").material = this.detailsMaterial;

    this.model.getObjectByName("glass").material = this.glassMaterial;

    this.wheels.push(
      this.model.getObjectByName("wheel_fl"),
      this.model.getObjectByName("wheel_fr"),
      this.model.getObjectByName("wheel_rl"),
      this.model.getObjectByName("wheel_rr")
    );

    // shadow
    // const mesh = new THREE.Mesh(
    //   new THREE.PlaneGeometry(0.655 * 4, 1.3 * 4),
    //   new THREE.MeshBasicMaterial({
    //     map: this.shadow,
    //     blending: THREE.MultiplyBlending,
    //     toneMapped: false,
    //     transparent: true,
    //   })
    // );
    // mesh.rotation.x = -Math.PI / 2;
    // mesh.renderOrder = 2;
    // this.model.add(mesh);
    // this.model.scale.set(0.01, 0.01, 0.01);
    // this.model.position.set(x, y, z);
    this.scene.add(this.model);

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
  }
  setShadow() {
    // this.shadow = new THREE.TextureLoader().load(
    //   models / Ferrari / ferrari_ao.png
    // );
  }
  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(2, 1, -2);
    this.mesh.rotation.x = -Math.PI * 0.5;
    this.mesh.castShadow = true;
    this.scene.add(this.mesh);
  }
  update() {
    console.log(11);
    const time = -performance.now() / 1000;
    if (this.wheels.length) {
      for (let i = 0; i < this.wheels.length; i++) {
        this.wheels[i].rotation.x = time * Math.PI * 2;
      }
    }
    this.grid.position.z = -time % 1;
  }
}
