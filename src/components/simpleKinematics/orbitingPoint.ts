import { chainTransforms, Position, Rz, T } from './simpleKinematics'

export class OrbitingPoint {
    public pos: Position;
    readonly planeAngle = this.rand(0, Math.PI / 2.5, true);
    readonly phaseOffset = this.rand(0, Math.PI);
    readonly speed;
    private frame = 0;
    constructor(
        private radius: number,
        private orbitCenter: Position,
        speed: number
    ) {
        this.speed = speed * this.rand(0.005, 0.01, true);
        this.orbitFrame();
    }

    orbitFrame() {
        this.frame += this.speed;
        
        this.pos = chainTransforms(
            new T(this.orbitCenter),
            new Rz(this.planeAngle),
            new T(
                Position.fromPolar(
                    this.radius,
                    this.frame + this.phaseOffset,
                    Math.PI / 2,
                )
            )
        )
    }

    rand(from: number, to: number, anyDir: boolean = false): number {
        return (Math.random() * (to - from) + from)
            * ((anyDir && Math.random() > 0.5) ? -1 : 1);
    }
}

