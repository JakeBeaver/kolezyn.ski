
import { OrbitingIconSwarm } from './OrbitingIcon';
import {
    AmbientLight,
    BoxGeometry,
    Mesh,
    MeshStandardMaterial,
    PerspectiveCamera,
    PointLight,
    Scene,
    TextureLoader,
    Vector3,
    WebGLRenderer
} from 'three';

export function animate(error: boolean, orbitCamera: boolean) {
    const scene = new Scene();
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    let canvasElement = document.getElementById('bg') as HTMLElement;
    const renderer = new WebGLRenderer({
        canvas: canvasElement
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.position.setZ(30);

    const pointLight = new PointLight(0xffffff);
    const ambientLight = new AmbientLight(0x444444);
    pointLight.position.set(20, 20, 20);

    let swarm = orbitCamera
        ? new OrbitingIconSwarm(70, 8, new Vector3(0, 0, 30))
        : new OrbitingIconSwarm(15, 2);
    const cubes: Mesh[] = [];

    let cubeSize = 8;
    const geometry = new BoxGeometry(cubeSize, cubeSize, cubeSize);
    const material = new MeshStandardMaterial({
        color: error ? 0xff2222 : 0x00f0f0
    });

    cubes.push(new Mesh(geometry, material));
    if (error) {
        let cs = cubeSize + 0.005;
        let stickers = new Mesh(
            new BoxGeometry(cs, cs, cs),
            new MeshStandardMaterial({
                map: new TextureLoader().load('/images/404.png'),
                transparent: true
            })
        );
        cubes.push(stickers);
    }

    scene.add(...cubes);
    // swarm.addToScene(scene);
    scene.add(pointLight, ambientLight);



    renderer.render(scene, camera);
    function animate() {
        requestAnimationFrame(animate);
        for (let cube of cubes) {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.02;
        }
        swarm.Animate();
        renderer.render(scene, camera);
    }
    window.onresize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    };
    animate();

}