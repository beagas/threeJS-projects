export default async function initializeGUI() {
    const dat = await import('dat.gui')
    return new dat.GUI();
}