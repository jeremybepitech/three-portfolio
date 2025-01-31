import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import './style.css'; // Import des styles
import Geometries from './utils/geometries';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'; // Pour charger les polices
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'; // Pour le texte 3D

class ThreeJSApp {
    constructor() {
        this.init();
        this.animate();
    }

    init() {
        // Scène
        this.scene = new THREE.Scene();
        this.loader = new FontLoader();

        // Caméra
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 6, 0);

        // Renderer
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        document.body.appendChild(this.renderer.domElement);

        // Contrôles avec PointerLockControls
        this.controls = new PointerLockControls(this.camera, document.body);
        this.ignoreNextClick = true;

        // Activer le contrôle en cliquant sur l'écran
        document.addEventListener('click', () => {
            this.controls.lock();
        });

        // Gestion des événements pour le déblocage
        this.controls.addEventListener('lock', () => {
            console.log('PointerLock activé');
        });
        this.controls.addEventListener('unlock', () => {
            console.log('PointerLock désactivé');
        });

        // Lumière
        this.light = new THREE.AmbientLight(0xffffff, 2);
        this.scene.add(this.light);

        this.titlesMesh = [];
        this.repoLinks = [];
        this.repoTitles = [];

        // Initialisation des géométries
        this.addMeshes();
        this.initRepoLinks();
        this.initRepoTitles();

        // Raycaster et souris
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        // Event Listeners
        window.addEventListener('resize', () => this.onWindowResize());
        window.addEventListener('click', (event) => this.onMouseClick(event));
    }

    initRepoLinks() {
        this.repoLinks.push("https://github.com/jeremybepitech/myprintf");
        this.repoLinks.push("https://github.com/jeremybepitech/myls");
        this.repoLinks.push("https://github.com/jeremybepitech/BSQ");
        this.repoLinks.push("https://github.com/jeremybepitech/PushSwap");
        this.repoLinks.push("https://github.com/jeremybepitech/Antman");
        this.repoLinks.push("https://github.com/jeremybepitech/Navy");
        this.repoLinks.push("https://github.com/jeremybepitech/Dante");
        this.repoLinks.push("https://github.com/jeremybepitech/Lemin");
        this.repoLinks.push("https://github.com/jeremybepitech/42sh");
        this.repoLinks.push("https://github.com/jeremybepitech/MyRPG");
        this.repoLinks.push("https://github.com/jeremybepitech/Corewar");
        this.repoLinks.push("https://github.com/jeremybepitech/NanoTekSpice");
        this.repoLinks.push("https://github.com/jeremybepitech/MyFTP");
        this.repoLinks.push("https://github.com/jeremybepitech/Arcade");
        this.repoLinks.push("https://github.com/jeremybepitech/Groundhog");
        this.repoLinks.push("https://github.com/jeremybepitech/Trade");
        this.repoLinks.push("https://github.com/jeremybepitech/Area");
        this.repoLinks.push("https://github.com/jeremybepitech/Survivor");
    }

    initRepoTitles() {
        this.repoTitles.push("MyPrintf");
        this.repoTitles.push("MyLs");
        this.repoTitles.push("BSQ");
        this.repoTitles.push("PushSwap");
        this.repoTitles.push("Antman");
        this.repoTitles.push("Navy");
        this.repoTitles.push("Dante");
        this.repoTitles.push("Lemin");
        this.repoTitles.push("42sh");
        this.repoTitles.push("MyRPG");
        this.repoTitles.push("Corewar");
        this.repoTitles.push("NanoTekSpice");
        this.repoTitles.push("MyFTP");
        this.repoTitles.push("Arcade");
        this.repoTitles.push("Groundhog");
        this.repoTitles.push("Trade");
        this.repoTitles.push("Area");
        this.repoTitles.push("Survivor");
    }

    addTitles() {
        this.loader.load(`${import.meta.env.BASE_URL}fonts/helvetiker_regular.typeface.json`, (font) => {
            let startingPoint = this.repoTitles.length / 4 * 8;
            this.repoTitles.forEach((title, index) => {
                const textGeometry = new TextGeometry(title, {
                    font: font,
                    size: 0.5,
                    height: 0.2,
                    curveSegments: 12,
                    bevelEnabled: true,
                    bevelThickness: 0.02,
                    bevelSize: 0.02,
                    bevelSegments: 5,
                });

                const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffaa00 });
                const textMesh = new THREE.Mesh(textGeometry, textMaterial);


                if (index % 2 === 0) {
                    textMesh.position.set(index / 2 * 8 - startingPoint, 5, 8);
                    textMesh.rotation.y = Math.PI;
                } else {
                    textMesh.position.set(index / 2 * 8 - startingPoint, 5, -8);
                }
                this.titlesMesh.push(textMesh);
                this.scene.add(textMesh);
            });
        });
    }

    addMeshes() {
        const geometry2 = new THREE.BoxGeometry(100, 20, 4);
        const material2 = new THREE.MeshLambertMaterial({ color: 0x191d1f });
        this.wall2 = new THREE.Mesh(geometry2, material2);
        this.wall2.position.set(0, 10, 10);
        this.scene.add(this.wall2);

        this.wall1 = new THREE.Mesh(geometry2, material2);
        this.wall1.position.set(0, 10, -10);
        this.scene.add(this.wall1);

        const forwardArrowGeometry = Geometries.createFlatArrow(10, 0.5, 1, 2, 0.5, 0.5);
        this.forwardArrow = new THREE.Mesh(forwardArrowGeometry, material2);
        this.forwardArrow.position.set(4, 1, 0);
        this.scene.add(this.forwardArrow);

        const backwardArrowGeometry = Geometries.createFlatArrow(10, 0.5, 1, 2, 0.5, 0.5);
        this.backwardArrow = new THREE.Mesh(backwardArrowGeometry, material2);
        this.backwardArrow.position.set(-4, 1, 0);
        this.backwardArrow.rotation.y = Math.PI;
        this.scene.add(this.backwardArrow);

        this.addTitles();
    }

    onMouseClick(event) {
        if (this.ignoreNextClick) {
            this.ignoreNextClick = false;
            return;
        }
        this.raycaster.setFromCamera(new THREE.Vector2(0, 0), this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children);

        if (intersects.length > 0 && intersects[0].object === this.forwardArrow) {
            const moveDistance = 8;
            this.camera.position.x += moveDistance;
            this.forwardArrow.position.x += moveDistance;
            this.backwardArrow.position.x += moveDistance;
        } else if (intersects.length > 0 && intersects[0].object === this.backwardArrow) {
            const moveDistance = -8;
            this.camera.position.x += moveDistance;
            this.forwardArrow.position.x += moveDistance;
            this.backwardArrow.position.x += moveDistance;
        } else if (intersects.length > 0 && this.titlesMesh.includes(intersects[0].object)) {
            const index = this.titlesMesh.indexOf(intersects[0].object);
            window.open(this.repoLinks[index], '_blank');
            this.ignoreNextClick = true;
        }
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.renderer.render(this.scene, this.camera);
    }
}

new ThreeJSApp();
