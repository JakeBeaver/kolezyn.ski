import { Matrix4, Scene, Spherical, Sprite, SpriteMaterial, TextureLoader, Texture, Vector3 } from 'three';
const iconPaths = [
    'angular.svg',
    'cs.svg',
    'vscode.svg',
    'docker.png',
    'firebase.svg',
    'flutter.png',
    'powershell.png',
    'sql.svg',
    'vs.svg',
    'typescript.svg',
    'npm.svg',
    'jenkins.svg',
    'dotnet.svg',
    'git.svg',
    'svelte.png',
    'python.svg',
    'GCP.png',
    'mssql.png',
];
export class OrbitingIcon {
    readonly planeAngle = this.rand(0, Math.PI / 2.5, true);
    readonly phaseOffset = this.rand(0, Math.PI);
    readonly speed = this.rand(0.005, 0.01, true);
    readonly sprite: Sprite;
    ready = false;
    frame = 0;
    constructor(
        iconPath: string,
        private radius: number,
        private scale: number,
        private orbitCenter: Vector3
    ) {
        const texture: Texture = (new TextureLoader().load(`/images/${iconPath}`,
            () => {
                let aspectRatio = texture.image.height / texture.image.width;
                this.sprite.scale.set(
                    this.scale / Math.max(aspectRatio, 1),
                    this.scale * Math.min(aspectRatio, 1),
                    1);
                this.ready = true;
            }));

        
        const material = new SpriteMaterial({ map: texture });
        this.sprite = new Sprite(material);
        this.orbitFrame();
    }
    orbitFrame() {
        this.frame += this.speed;
        let radius = this.radius;

        let orbit = new Spherical(radius, Math.PI / 2, this.frame + this.phaseOffset);
        let orbitCartesian = new Vector3().setFromSpherical(orbit);

        this.sprite.position.setFromMatrixPosition(
            this.CombineTransformations(
                new Matrix4().makeTranslation(this.orbitCenter.x, this.orbitCenter.y, this.orbitCenter.z),
                new Matrix4().makeRotationZ(this.planeAngle),
                new Matrix4().makeTranslation(orbitCartesian.x, orbitCartesian.y, orbitCartesian.z)
            )
        );
    }

    rand(from: number, to: number, anyDir: boolean = false): number {
        return (Math.random() * (to - from) + from)
            * ((anyDir && Math.random() > 0.5) ? -1 : 1);
    }

    CombineTransformations(...Transformations: Matrix4[]): Matrix4 {
        let output = new Matrix4().identity();
        for (let t of Transformations) {
            output = output.multiply(t);
        }
        return output;
    }
}

export class OrbitingIconSwarm {
    readonly Icons: OrbitingIcon[] = [];

    constructor(radius: number, scale: number, center: Vector3 = new Vector3()) {
        this.Icons = iconPaths.map(iconFile =>
            new OrbitingIcon(
                iconFile,
                radius,
                scale,
                center,
            )
        );

    }

    Animate() {
        this.Icons.forEach(x => x.orbitFrame());
    }

    addToScene(scene: Scene) {
        this.Icons.forEach(x => scene.add(x.sprite));
    }
}