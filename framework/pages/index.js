import { LoginPage } from './loginPage';
import { UserMainPage } from './userMainPage';
import { LogoutPopup } from './logoutPopup';
import { PhotoLayer } from './photoLayer';
import { UserOwnPage } from './userOwnPage';
import { PostForm } from './postForm';
import { UserTopicsPage } from './userTopicsPage';

const app = {
    LoginPage: () => new LoginPage(),
    UserMainPage: () => new UserMainPage(),
    LogoutPopup: () => new LogoutPopup(),
    PhotoLayer: () => new PhotoLayer(),
    UserOwnPage: () => new UserOwnPage(),
    PostForm: () => new PostForm(),
    UserTopicsPage: () => new UserTopicsPage(),
}

export { app };
