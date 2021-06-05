import chai from 'chai';

const { expect } = chai;

const UserOwnPage = function UserOwnPage() {
    const profileName = "//*[@class = 'profile-user-info_name']";

    this.check = async (page) => {
        await page.waitForSelector(profileName);
        let isNamePresent = await page.isVisible(profileName);
        expect(isNamePresent).to.be.true;
    }

    this.getUsername = async (page) => {
        return await page.textContent(profileName);
    }
}

export { UserOwnPage };