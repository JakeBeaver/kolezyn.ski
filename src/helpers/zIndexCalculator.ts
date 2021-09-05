export function zIndex(elevation: number) {
    if (elevation <= -1) return -2147483648;
    if (elevation >= 1) return 2147483647;
    return ~~(elevation * 2147483647)
}

export function zIndexPx(elevation: number){
    return zIndex(elevation/1000);
}