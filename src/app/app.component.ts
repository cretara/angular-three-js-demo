import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import * as THREE from "three";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('canvas') private canvasRef!: ElementRef<HTMLCanvasElement>;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private cube!: THREE.Mesh;

  constructor() {
  }

  ngAfterViewInit(): void {
    this.initThreeJS();
    this.animate();
  }

  /**
   * Initialize ThreeJS
   */
  private initThreeJS(): void {
    // Renderer
    this.renderer = new THREE.WebGLRenderer({canvas: this.canvasRef.nativeElement});
    this.renderer.setSize(this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;

    // Cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({color: 0xffffff});
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
  }

  /**
   * Animate the cube and render the scene
   */
  private animate(): void {
    requestAnimationFrame(() => this.animate());
    this.cube.rotation.x += 0.01;
    this.cube.rotation.z += 0.01;
    this.renderer.render(this.scene, this.camera);
  }

}
