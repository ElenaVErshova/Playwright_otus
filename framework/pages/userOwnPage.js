const UserOwnPage = function UserOwnPage() {
    const profileName = "//*[@class = 'profile-user-info_name']";

    this.check = async (page) => {
        await page.waitForSelector(profileName);
    }

    this.getUsername = async (page) => {
        return await page.textContent(profileName);
    }
}

export { UserOwnPage };