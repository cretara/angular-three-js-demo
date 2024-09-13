import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import * as THREE from "three";
import {Clock} from "three";
import gsap from "gsap";

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
  private clock: THREE.Clock = new Clock();
  private delta = 0;

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
    // Set canvas size to match the parent container
    const canvas = this.canvasRef.nativeElement;
    canvas.width = canvas.parentElement?.clientWidth ?? window.innerWidth;
    canvas.height = canvas.parentElement?.clientHeight ?? window.innerHeight;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({canvas});
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // Scene


    this.scene = new THREE.Scene();
    // Camera

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.x = 2;
    this.camera.position.y = 2;
    this.camera.position.z = 5;

    // Cube

    const geometry = new THREE.BoxGeometry(1, 1, 2);
    const material = new THREE.MeshBasicMaterial();
    this.cube = new THREE.Mesh(geometry, material);
    gsap.to(this.cube.position, {duration: 2, delay: 1, x: 3});
    gsap.to(this.cube.position, {duration: 2, delay: 3, x: 0});
    this.scene.add(this.cube);

    //Axis Helper
    const axesHelper = new THREE.AxesHelper(5);
    this.camera.lookAt(this.cube.position);
    this.scene.add(axesHelper);

  }

  /**
   * Animate the cube and render the scene
   */
  private animate(): void {
    // this.delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();
    requestAnimationFrame(this.animate.bind(this));
    // // this.cube.position.x = Math.cos(this.delta);
    // // this.cube.position.x = Math.cos(elapsedTime);
    // // this.cube.position.y = Math.sin(elapsedTime);
    // this.camera.position.x = Math.cos(elapsedTime);
    // this.camera.position.y = Math.sin(elapsedTime);
    // this.camera.lookAt(this.cube.position);
    // this.camera.rotation.y = this.cube.rotation.y;
    // this.camera.rotation.x = this.cube.rotation.x;
    // this.camera.lookAt(this.cube.position);
    // this.camera.updateProjectionMatrix();
    // console.log("this.cube.quaternion", this.cube.quaternion);
    this.renderer.render(this.scene, this.camera);
  }

  @HostListener('window:resize', ['$event'])
  handleWindowResizeEvent() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }
}
