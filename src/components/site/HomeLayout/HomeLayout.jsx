import React, { useEffect, useState } from 'react';
import styles from './HomeLayout.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading/Loading';
import { userAuth } from '../../../redux/actions/user/userAuth';
import { userProfile } from '../../../redux/actions/user/userProfile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { resetUserAuth, resetUserProfile } from '../../../redux/slices/user.slice';
const menuData = [
  {
    label: 'Overview',
    icon: 'uil-chart',
    link: '/overview',
  },
  {
    label: 'Профиль',
    icon: 'uil-user',
    link: '/account/edit',
  },
  {
    label: 'Тарифы',
    icon: 'uil-bill',
    link: '/pricing',
  },
  {
    label: 'Настройки',
    icon: 'uil-setting',
    link: '/account/setting',
  },
];

const HomeLayout = ({ children }) => {
  const [showMenu, setShowMenu] = useState(true);
  const { pathname } = useLocation();
  const {
    userAuth: { data: userData, loading: userLoading, error: userError },
  } = useSelector((state) => state.user);
  useEffect(() => {
    if (userData) {
    }
  }, []);
  const dipsatch = useDispatch();
  useEffect(() => {
    dipsatch(userAuth());
    dipsatch(userProfile());
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    if (userError) {
      localStorage.removeItem('token');
      dipsatch(resetUserAuth());
      dipsatch(resetUserProfile());
      navigate('/login');
    }
  }, [userError]);

  return userData ? (
    <>
      <ToastContainer theme="colored" />
      <div class="mobile-search">
        <form action="/" class="search-form">
          <img src="/img/svg/search.svg" alt="search" class="svg" />
          <input class="form-control me-sm-2 box-shadow-none" type="search" placeholder="Search..." aria-label="Search" />
        </form>
      </div>
      <div class="mobile-author-actions"></div>
      <header class="header-top">
        <nav class="navbar navbar-light">
          <div class="navbar-left">
            <div class="logo-area">
              <a class="navbar-brand" href="index.html">
                <img class="dark" src="/img/logo-dark.png" alt="logo" />
                <img class="light" src="/img/logo-white.png" alt="logo" />
              </a>
              <a
                href="#"
                class="sidebar-toggle"
                onClick={() => {
                  setShowMenu(!showMenu);
                }}>
                <img class="svg" src="/img/svg/align-center-alt.svg" alt="img" />
              </a>
            </div>
          </div>

          <div class="navbar-right">
            <ul class="navbar-right__menu">
              <li class="nav-author">
                <div class="dropdown-custom">
                  <a href="javascript:;" class="nav-item-toggle">
                    <span class="avatar avatar-primary avatar-sm avatar-circle   avatar-transparent ">
                      <span class="avatar-letter">{userData?.email?.substring(0, 1)}</span>
                    </span>
                    <span class="nav-item__title ml-0" style={{ textTransform: 'none' }}>
                      {userData?.email}
                      <i class="las la-angle-down nav-item__arrow"></i>
                    </span>
                  </a>
                  <div class="dropdown-parent-wrapper">
                    <div class="dropdown-wrapper">
                      <div class="nav-author__options">
                        <ul>
                          {menuData?.map((item) => (
                            <li>
                              <Link to={item?.link}>
                                <i class={`uil ${item?.icon}`}></i> {item?.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <div
                          href=""
                          class="nav-author__signout"
                          onClick={() => {
                            localStorage.removeItem('token');
                            dipsatch(resetUserAuth());
                            dipsatch(resetUserProfile());
                            navigate('/login');
                          }}>
                          <i class="uil uil-sign-out-alt"></i> Выход
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <main class="main-content">
        <div class="sidebar-wrapper">
          <div class={`sidebar sidebar-collapse ${!showMenu ? 'collapsed' : ''}`} id="sidebar">
            <div class="sidebar__menu-group">
              <ul class="sidebar_nav">
                {menuData?.map((item) => (
                  <li>
                    <Link to={item?.link} class={pathname == item?.link ? 'active' : ''}>
                      <span class={`nav-icon uil ${item?.icon}`}></span>
                      <span class="menu-text">{item?.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div class={`contents ${!showMenu ? 'expanded' : ''}`}>{children}</div>
        {/* <footer class="footer-wrapper">
          <div class="footer-wrapper__inside">
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-6">
                  <div class="footer-copyright">
                    <p>
                      <span>© 2023</span>
                    </p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="footer-menu text-end">
                    <ul>
                      <li>
                        <a href="#">About</a>
                      </li>
                      <li>
                        <a href="#">Team</a>
                      </li>
                      <li>
                        <a href="#">Contact</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer> */}
      </main>
    </>
  ) : userLoading ? (
    <Loading isWhite />
  ) : (
    <Loading isWhite />
  );
};

export default HomeLayout;
