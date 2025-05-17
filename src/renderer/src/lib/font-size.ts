export const calcSizeByZoom = (zoom: number, baseSize: number = 16) => {
    //  zoom = 1 时 字体大小为12
    return Math.max(baseSize / zoom, baseSize);
};