export const SERVER_PORT = 6970;
export const PLAYER_SIZE = 0.5;
export const PLAYER_SPEED = 2;
export const PLAYER_RADIUS = 0.5;
export const BOMB_LIFETIME = 2;
export const BOMB_THROW_VELOCITY = 5;
export const BOMB_GRAVITY = 10;
export const BOMB_DAMP = 0.8;
export const BOMB_SCALE = 0.25;

export class Vector2 {
    x: number;
    y: number;
    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }
    setPolar(angle: number, len: number = 1): this {
        this.x = Math.cos(angle)*len;
        this.y = Math.sin(angle)*len;
        return this;
    }
    clone(): Vector2 {
        return new Vector2(this.x, this.y)
    }
    copy(that: Vector2): this {
        this.x = that.x;
        this.y = that.y;
        return this;
    }
    set(x: number, y: number): this {
        this.x = x;
        this.y = y;
        return this;
    }
    setScalar(scalar: number): this {
        this.x = scalar;
        this.y = scalar;
        return this;
    }
    add(that: Vector2): this {
        this.x += that.x;
        this.y += that.y;
        return this;
    }
    sub(that: Vector2): this {
        this.x -= that.x;
        this.y -= that.y;
        return this;
    }
    div(that: Vector2): this {
        this.x /= that.x;
        this.y /= that.y;
        return this;
    }
    mul(that: Vector2): this {
        this.x *= that.x;
        this.y *= that.y;
        return this;
    }
    sqrLength(): number {
        return this.x*this.x + this.y*this.y;
    }
    length(): number {
        return Math.sqrt(this.sqrLength());
    }
    angle(): number {
        return Math.atan2(this.y, this.x);
    }
    scale(value: number): this {
        this.x *= value;
        this.y *= value;
        return this;
    }
    norm(): this {
        const l = this.length();
        return l === 0 ? this : this.scale(1/l);
    }
    rot90(): this {
        const oldX = this.x;
        this.x = -this.y;
        this.y = oldX;
        return this;
    }
    sqrDistanceTo(that: Vector2): number {
        const dx = that.x - this.x;
        const dy = that.y - this.y;
        return dx*dx + dy*dy;
    }
    distanceTo(that: Vector2): number {
        return Math.sqrt(this.sqrDistanceTo(that));
    }
    lerp(that: Vector2, t: number): this {
        this.x += (that.x - this.x)*t;
        this.y += (that.y - this.y)*t;
        return this;
    }
    dot(that: Vector2): number {
        return this.x*that.x + this.y*that.y;
    }
    map(f: (x: number) => number): this {
        this.x = f(this.x);
        this.y = f(this.y);
        return this;
    }
}

export class Vector3 {
    x: number;
    y: number;
    z: number;
    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    clone(): Vector3 {
        return new Vector3(this.x, this.y, this.z)
    }
    clone2(): Vector2 {
        return new Vector2(this.x, this.y)
    }
    copy(that: Vector3): this {
        this.x = that.x;
        this.y = that.y;
        this.z = that.z;
        return this;
    }
    copy2(that: Vector2, z: number): this {
        this.x = that.x;
        this.y = that.y;
        this.z = z;
        return this;
    }
    setScalar(scalar: number): this {
        this.x = scalar;
        this.y = scalar;
        this.z = scalar;
        return this;
    }
    add(that: Vector3): this {
        this.x += that.x;
        this.y += that.y;
        this.z += that.z;
        return this;
    }
    sub(that: Vector3): this {
        this.x -= that.x;
        this.y -= that.y;
        this.z -= that.z;
        return this;
    }
    div(that: Vector3): this {
        this.x /= that.x;
        this.y /= that.y;
        this.z /= that.z;
        return this;
    }
    mul(that: Vector3): this {
        this.x *= that.x;
        this.y *= that.y;
        this.z *= that.z;
        return this;
    }
    sqrLength(): number {
        return this.x*this.x + this.y*this.y + this.z*this.z;
    }
    length(): number {
        return Math.sqrt(this.sqrLength());
    }
    scale(value: number): this {
        this.x *= value;
        this.y *= value;
        this.z *= value;
        return this;
    }
    norm(): this {
        const l = this.length();
        return l === 0 ? this : this.scale(1/l);
    }
    sqrDistanceTo(that: Vector3): number {
        const dx = that.x - this.x;
        const dy = that.y - this.y;
        const dz = that.z - this.z;
        return dx*dx + dy*dy + dz*dz;
    }
    distanceTo(that: Vector3): number {
        return Math.sqrt(this.sqrDistanceTo(that));
    }
    lerp(that: Vector3, t: number): this {
        this.x += (that.x - this.x)*t;
        this.y += (that.y - this.y)*t;
        this.z += (that.z - this.z)*t;
        return this;
    }
    dot(that: Vector3): number {
        return this.x*that.x + this.y*that.y + this.z*that.z;
    }
    map(f: (x: number) => number): this {
        this.x = f(this.x);
        this.y = f(this.y);
        this.z = f(this.z);
        return this;
    }
}

export enum Moving {
    MovingForward,
    MovingBackward,
    TurningLeft,
    TurningRight,
    Count,
}

export interface Player {
    id: number,
    position: Vector2,
    direction: number,
    moving: number,
    hue: number,
}

// IMPORTANT: This must be synchronized with the MessageKind in common.c3 until common.mts is fully rewritten in C3.
export enum MessageKind {
    Hello,
    PlayerJoined,
    PlayerLeft,
    PlayerMoving,
    AmmaMoving,
    AmmaThrowing,
    Ping,
    Pong,
    ItemSpawned,
    ItemCollected,
    BombSpawned,
    BombExploded,
}

interface Field {
    offset: number,
    size: number,
    read(view: DataView): number;
    write(view: DataView, value: number): void;
}

export const UINT8_SIZE = 1;
export const UINT16_SIZE = 2;
export const UINT32_SIZE = 4;
export const FLOAT32_SIZE = 4;

function allocUint8Field(allocator: { size: number }): Field {
    const offset = allocator.size;
    const size = UINT8_SIZE;
    allocator.size += size;
    return {
        offset,
        size,
        read: (view) => view.getUint8(offset),
        write: (view, value) => view.setUint8(offset, value)
    }
}

function allocUint32Field(allocator: { size: number }): Field {
    const offset = allocator.size;
    const size = UINT32_SIZE;
    allocator.size += size;
    return {
        offset,
        size,
        read: (view) => view.getUint32(offset, true),
        write: (view, value) => view.setUint32(offset, value, true)
    }
}

function allocFloat32Field(allocator: { size: number }): Field {
    const offset = allocator.size;
    const size = FLOAT32_SIZE;
    allocator.size += size;
    return {
        offset,
        size,
        read: (view) => view.getFloat32(offset, true),
        write: (view, value) => view.setFloat32(offset, value, true)
    }
}

function verifier(kindField: Field, kind: number, size: number): (view: DataView) => boolean {
    return (view) =>
        view.byteLength == size &&
        kindField.read(view) == kind
}

export function BatchMessageStruct<Item extends { size: number }>(messageKind: MessageKind, itemType: Item) {
    const allocator  = { size: 0 };
    const kind       = allocUint8Field(allocator);
    const headerSize = allocator.size;
    const verify = (view: DataView) =>
        view.byteLength >= headerSize &&
        (view.byteLength - headerSize)%itemType.size === 0 &&
        kind.read(view) == messageKind;
    const count = (view: DataView) => (view.byteLength - headerSize)/itemType.size
    const item = (buffer: ArrayBuffer, index: number): DataView => {
        return new DataView(buffer, headerSize + index*itemType.size);
    }
    const allocateAndInit = (countItems: number): ArrayBuffer => {
        const buffer = new ArrayBuffer(headerSize + itemType.size*countItems);
        const view = new DataView(buffer);
        kind.write(view, messageKind);
        return buffer;
    }
    return {kind, headerSize, verify, count, item, itemType, allocateAndInit};
};

export const BombSpawnedStruct = (() => {
    const allocator = { size: 0 };
    const bombIndex = allocUint32Field(allocator);
    const x         = allocFloat32Field(allocator);
    const y         = allocFloat32Field(allocator);
    const z         = allocFloat32Field(allocator);
    const dx        = allocFloat32Field(allocator);
    const dy        = allocFloat32Field(allocator);
    const dz        = allocFloat32Field(allocator);
    const lifetime  = allocFloat32Field(allocator);
    const size      = allocator.size;
    return {bombIndex, x, y, z, dx, dy, dz, lifetime, size};
})();
export const BombsSpawnedHeaderStruct = BatchMessageStruct(MessageKind.BombSpawned, BombSpawnedStruct)

export const BombExplodedStruct = (() => {
    const allocator = { size: 0 };
    const bombIndex = allocUint32Field(allocator);
    const x         = allocFloat32Field(allocator);
    const y         = allocFloat32Field(allocator);
    const z         = allocFloat32Field(allocator);
    const size      = allocator.size;
    return {bombIndex, x, y, z, size};
})();
export const BombsExplodedHeaderStruct = BatchMessageStruct(MessageKind.BombExploded, BombExplodedStruct);

export const PingStruct = (() => {
    const allocator = { size: 0 };
    const kind      = allocUint8Field(allocator);
    const timestamp = allocUint32Field(allocator);
    const size      = allocator.size;
    const verify    = verifier(kind, MessageKind.Ping, size);
    return {kind, timestamp, size, verify}
})();

export const PongStruct = (() => {
    const allocator = { size: 0 };
    const kind      = allocUint8Field(allocator);
    const timestamp = allocUint32Field(allocator);
    const size      = allocator.size;
    const verify    = verifier(kind, MessageKind.Pong, size);
    return {kind, timestamp, size, verify}
})();

export const HelloStruct = (() => {
    const allocator = { size: 0 };
    const kind     = allocUint8Field(allocator);
    const id       = allocUint32Field(allocator);
    const x        = allocFloat32Field(allocator);
    const y        = allocFloat32Field(allocator);
    const direction = allocFloat32Field(allocator);
    const hue      = allocUint8Field(allocator);
    const size     = allocator.size;
    const verify = verifier(kind, MessageKind.Hello, size);
    return {kind, id, x, y, direction, hue, size, verify}
})();

export const AmmaMovingStruct = (() => {
    const allocator = { size: 0 };
    const kind      = allocUint8Field(allocator);
    const direction = allocUint8Field(allocator);
    const start     = allocUint8Field(allocator);
    const size      = allocator.size;
    const verify    = verifier(kind, MessageKind.AmmaMoving, size);
    return {kind, direction, start, size, verify}
})();

export const AmmaThrowingStruct = (() => {
    const allocator = { size: 0 };
    const kind      = allocUint8Field(allocator);
    const size      = allocator.size;
    const verify    = verifier(kind, MessageKind.AmmaThrowing, size);
    return {kind, size, verify}
})();

// [kind] [count] [id] [x] [y] [moving] [id] [x] [y] [moving] [id] [x] [y] [moving]
//                ^

export const PlayerStruct = (() => {
    const allocator = { size: 0 };
    const id     = allocUint32Field(allocator);
    const x      = allocFloat32Field(allocator);
    const y      = allocFloat32Field(allocator);
    const direction = allocFloat32Field(allocator);
    const hue    = allocUint8Field(allocator);
    const moving = allocUint8Field(allocator);
    const size   = allocator.size;
    return {id, x, y, direction, hue, moving, size};
})();

export const PlayersJoinedHeaderStruct = BatchMessageStruct(MessageKind.PlayerJoined, PlayerStruct);
export const PlayersMovingHeaderStruct = BatchMessageStruct(MessageKind.PlayerMoving, PlayerStruct);
export const PlayersLeftHeaderStruct = BatchMessageStruct(MessageKind.PlayerLeft, { size: UINT32_SIZE });

// It's such mod that properMod(-1, 100) === 99
export function properMod(a: number, b: number): number {
    return (a%b + b)%b;
}

export function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

export interface Scene {
    wallsPtr: number;
    width: number;
    height: number;
}

export function sceneContains(scene: Scene, p: Vector2): boolean {
    return 0 <= p.x && p.x < scene.width && 0 <= p.y && p.y < scene.height;
}

export function sceneGetTile(walls: Uint8ClampedArray, scene: Scene, p: Vector2): boolean {
    if (!sceneContains(scene, p)) return false;
    return walls[Math.floor(p.y)*scene.width + Math.floor(p.x)] !== 0;
}

export function sceneCanRectangleFitHere(wasmCommon: WasmCommon, scene: Scene, px: number, py: number, sx: number, sy: number): boolean {
    const x1 = Math.floor(px - sx*0.5);
    const x2 = Math.floor(px + sx*0.5);
    const y1 = Math.floor(py - sy*0.5);
    const y2 = Math.floor(py + sy*0.5);
    const walls = new Uint8ClampedArray(wasmCommon.memory.buffer, scene.wallsPtr, scene.width*scene.height);
    for (let x = x1; x <= x2; ++x) {
        for (let y = y1; y <= y2; ++y) {
            if (sceneGetTile(walls, scene, new Vector2(x, y))) {
                return false;
            }
        }
    }
    return true;
}

export interface WasmCommon {
    wasm: WebAssembly.WebAssemblyInstantiatedSource,
    memory: WebAssembly.Memory,
    _initialize: () => void,
    allocate_scene: (width: number, height: number) => number,
    allocate_items: () => number,
    reset_temp_mark: () => void,
    allocate_temporary_buffer: (size: number) => number,
}

export function makeWasmCommon(wasm: WebAssembly.WebAssemblyInstantiatedSource): WasmCommon {
    return {
        wasm,
        memory: wasm.instance.exports.memory  as WebAssembly.Memory,
        _initialize: wasm.instance.exports._initialize as () => void,
        allocate_scene: wasm.instance.exports.allocate_scene as (width: number, height: number) => number,
        allocate_items: wasm.instance.exports.allocate_items as () => number,
        reset_temp_mark: wasm.instance.exports.reset_temp_mark as () => void,
        allocate_temporary_buffer: wasm.instance.exports.allocate_temporary_buffer as (size: number) => number,
    }
}

export function createScene(walls: Array<Array<boolean>>, wasmCommon: WasmCommon): Scene {
    const scene: Scene = {
        height: walls.length,
        width: Number.MIN_VALUE,
        wallsPtr: 0,
    };
    for (let row of walls) {
        scene.width = Math.max(scene.width, row.length);
    }
    scene.wallsPtr = wasmCommon.allocate_scene(scene.width, scene.height);
    const wallsData = new Uint8ClampedArray(wasmCommon.memory.buffer, scene.wallsPtr, scene.width*scene.height);
    for (let y = 0; y < walls.length; ++y) {
        for (let x = 0; x < walls[y].length; ++x) {
            wallsData[y*scene.width + x] = Number(walls[y][x]);
        }
    }
    return scene;
}

export enum ItemKind {
    Key,
    Bomb,
}

export interface Item {
    alive: boolean,
    kind: ItemKind,
    position: Vector2,
}

export function collectItem(player: Player, item: Item): boolean {
    if (item.alive) {
        if (player.position.sqrDistanceTo(item.position) < PLAYER_RADIUS*PLAYER_RADIUS) {
            item.alive = false;
            return true;
        }
    }
    return false;
}

export interface Bomb {
    position: Vector3,
    velocity: Vector3,
    lifetime: number,
}

export function allocateBombs(capacity: number): Array<Bomb> {
    let bomb: Array<Bomb> = []
    for (let i = 0; i < capacity; ++i) {
        bomb.push({
            position: new Vector3(),
            velocity: new Vector3(),
            lifetime: 0,
        })
    }
    return bomb
}

export function throwBomb(player: Player, bombs: Array<Bomb>): number | null {
    for (let index = 0; index < bombs.length; ++index) {
        const bomb = bombs[index];
        if (bomb.lifetime <= 0) {
            bomb.lifetime = BOMB_LIFETIME;
            bomb.position.copy2(player.position, 0.6);
            bomb.velocity.x = Math.cos(player.direction);
            bomb.velocity.y = Math.sin(player.direction);
            bomb.velocity.z = 0.5;
            bomb.velocity.scale(BOMB_THROW_VELOCITY);
            return index;
        }
    }
    return null;
}

export function updateBomb(wasmCommon: WasmCommon, bomb: Bomb, scene: Scene, deltaTime: number): boolean {
    let collided = false;
    bomb.lifetime -= deltaTime;
    bomb.velocity.z -= BOMB_GRAVITY*deltaTime;

    const nx = bomb.position.x + bomb.velocity.x*deltaTime;
    const ny = bomb.position.y + bomb.velocity.y*deltaTime;
    const walls = new Uint8ClampedArray(wasmCommon.memory.buffer, scene.wallsPtr, scene.width*scene.height);
    if (sceneGetTile(walls, scene, new Vector2(nx, ny))) {
        const dx = Math.abs(Math.floor(bomb.position.x) - Math.floor(nx));
        const dy = Math.abs(Math.floor(bomb.position.y) - Math.floor(ny));
        
        if (dx > 0) bomb.velocity.x *= -1;
        if (dy > 0) bomb.velocity.y *= -1;
        bomb.velocity.scale(BOMB_DAMP);
        if (bomb.velocity.length() > 1) collided = true; // Wall collision
    } else {
        bomb.position.x = nx;
        bomb.position.y = ny;
    }

    const nz = bomb.position.z + bomb.velocity.z*deltaTime;
    if (nz < BOMB_SCALE || nz > 1.0) {
        bomb.velocity.z *= -1
        bomb.velocity.scale(BOMB_DAMP);
        if (bomb.velocity.length() > 1) collided = true; // Floor collision
    } else {
        bomb.position.z = nz;
    }
    return collided;
}

// NOTE: This is basically the part of the state of the Game that is shared 
// between Client and Server and constantly synced over the network.
export interface Level {
    scene: Scene,
    itemsPtr: number,
    bombs: Array<Bomb>,
}

export function createLevel(wasmCommon: WasmCommon): Level {
    const scene = createScene([
        [ false, false, true, true, true, false, false],
        [ false, false, false, false, false, true, false],
        [ true, false, false, false, false, true, false],
        [ true,  false, false, false, false, true, false],
        [ true],
        [  false,  true, true, true, false, false, false],
        [  false,  false, false, false, false, false, false],
    ], wasmCommon);

    const itemsPtr = wasmCommon.allocate_items();
    const bombs = allocateBombs(20);
    return {scene, itemsPtr, bombs};
}

export function updatePlayer(wasmCommon: WasmCommon, player: Player, scene: Scene, deltaTime: number) {
    const controlVelocity = new Vector2();
    let angularVelocity = 0.0;
    if ((player.moving>>Moving.MovingForward)&1) {
        controlVelocity.add(new Vector2().setPolar(player.direction, PLAYER_SPEED))
    }
    if ((player.moving>>Moving.MovingBackward)&1) {
        controlVelocity.sub(new Vector2().setPolar(player.direction, PLAYER_SPEED))
    }
    if ((player.moving>>Moving.TurningLeft)&1) {
        angularVelocity -= Math.PI;
    }
    if ((player.moving>>Moving.TurningRight)&1) {
        angularVelocity += Math.PI;
    }
    player.direction = player.direction + angularVelocity*deltaTime;

    const nx = player.position.x + controlVelocity.x*deltaTime;
    if (sceneCanRectangleFitHere(wasmCommon, scene, nx, player.position.y, PLAYER_SIZE, PLAYER_SIZE)) {
        player.position.x = nx;
    }
    const ny = player.position.y + controlVelocity.y*deltaTime;
    if (sceneCanRectangleFitHere(wasmCommon, scene, player.position.x, ny, PLAYER_SIZE, PLAYER_SIZE)) {
        player.position.y = ny;
    }
}

export function make_environment(...envs: any): any {
    return new Proxy(envs, {
        get(_target, prop, _receiver) {
            for (let env of envs) {
                if (env.hasOwnProperty(prop)) {
                    return env[prop];
                }
            }
            return (...args: any) => {
                throw new Error(`NOT IMPLEMENTED: ${String(prop)} ${args}`)
            }
        }
    });
}
