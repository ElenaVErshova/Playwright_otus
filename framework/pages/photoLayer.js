import chai from 'chai';

const { expect } = chai;

const PhotoLayer = function PhotoLayer() {
    const photolayer = "//*[@id = 'photoLayerScrollingWrapper']";

    this.check = async (page) => {
        await page.waitForSelector(photolayer);
        let isPhoto = await page.isVisible(photolayer);
        expect(isPhoto).to.be.true;
    }
}

export { PhotoLayer };