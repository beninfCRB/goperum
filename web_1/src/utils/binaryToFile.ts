export function binaryToBlob(base64Data: string): Blob {
    base64Data = base64Data.replace(/=+$/, '');
    const binaryString = window.atob(base64Data);
    const arrayBuffer = new ArrayBuffer(binaryString.length);
    const view = new Uint8Array(arrayBuffer);

    for (let i = 0; i < binaryString.length;
        i++) {
        view[i] = binaryString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: 'image/jpeg' })
}

export function binaryToFile(base64Data: string): File {
    const blob = binaryToBlob(base64Data);
    return new File([blob], 'image.jpeg', { type: 'image/jpeg' })
}