import { useRoutes } from 'react-router';
import HomePage from './pages/site/HomePage/HomePage';
// import SiteLayout from './pages/site/SiteLayout/SiteLayout';
import LoginPage from './pages/site/LoginPage/LoginPage';
import LoginLayout from './components/site/LoginLayout/LoginLayout';
import RegistrationPage from './pages/site/RegistrationPage/RegistrationPage';
import ChangePasswordPage from './pages/site/ChangePasswordPage/ChangePasswordPage';
import HomeLayout from './components/site/HomeLayout/HomeLayout';
import OverviewPage from './pages/site/OverviewPage/OverviewPage';
import SettingPage from './pages/site/SettingPage/SettingPage';
import AccountPage from './pages/site/AccountPage/AccountPage';
import NotFoundPage from './pages/site/NotFoundPage/NotFoundPage';
import AccountLayout from './components/site/AccountLayout/AccountLayout';
import PricingPage from './pages/site/PricingPage/PricingPage';
import ResetPasswordPage from './pages/site/ResetPasswordPage/ResetPasswordPage';
import PasswordSentPage from './pages/site/PasswordSentPage/PasswordSentPage';

function App() {
  let routes = useRoutes([
    {
      path: '*',
      element: (
        <HomeLayout>
          <NotFoundPage />
        </HomeLayout>
      ),
    },
    {
      path: '/',
      element: (
        <HomeLayout>
          <HomePage />
        </HomeLayout>
      ),
    },
    {
      path: '/pricing',
      element: (
        <HomeLayout>
          <PricingPage />
        </HomeLayout>
      ),
    },
    {
      path: '/overview',
      element: (
        <HomeLayout>
          <OverviewPage />
        </HomeLayout>
      ),
    },
    {
      path: '/account/reset-password',
      element: (
        <HomeLayout>
          <AccountLayout title={'Сброс пароля'}>
            <ResetPasswordPage />
          </AccountLayout>
        </HomeLayout>
      ),
    },
    {
      path: '/password-sent',
      element: (
        <LoginLayout>
          <PasswordSentPage />
        </LoginLayout>
      ),
    },
    {
      path: '/account/edit',
      element: (
        <HomeLayout>
          <AccountLayout title={'Редактирование'}>
            <AccountPage />
          </AccountLayout>
        </HomeLayout>
      ),
    },
    {
      path: '/account/setting',
      element: (
        <HomeLayout>
          <AccountLayout title={'Настройки'}>
            <SettingPage />
          </AccountLayout>
        </HomeLayout>
      ),
    },
    {
      path: '/login',
      element: (
        <LoginLayout>
          <LoginPage />
        </LoginLayout>
      ),
    },
    {
      path: '/forget-password',
      element: (
        <LoginLayout>
          <ChangePasswordPage />
        </LoginLayout>
      ),
    },
    {
      path: '/registration',
      element: (
        <LoginLayout>
          <RegistrationPage />
        </LoginLayout>
      ),
    },
  ]);

  return routes;
}

export default App;
