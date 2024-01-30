import React from 'react';
import styles from './AccountLayout.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
const AccountLayout = ({ children, title }) => {
  const profileMenuData = [
    {
      label: 'Профиль',
      icon: '/img/svg/user.svg',
      link: '/account/edit',
    },
    {
      label: 'Сброс пароля',
      icon: '/img/svg/key.svg',
      link: '/account/reset-password',
    },

    {
      label: 'Настройки',
      icon: '/img/svg/settings.svg',
      link: '/account/setting',
    },
  ];
  const { pathname } = useLocation();
  const {
    userAuth: { data: userData },
  } = useSelector((state) => state.user);
  return (
    <>
      <div class="profile-setting">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12">
              <div class="breadcrumb-main">
                <h4 class="text-capitalize breadcrumb-title">Аккаунт</h4>
                <div class="breadcrumb-action justify-content-center flex-wrap">
                  <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                      <li class="breadcrumb-item">
                        <a href="#">
                          <i class="uil uil-estate"></i>Аккаунт
                        </a>
                      </li>
                      <li class="breadcrumb-item active" aria-current="page">
                        {title}
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
            <div class="col-xxl-3 col-lg-4 col-sm-5">
              <div class="card mb-25">
                <div class="card-body text-center p-0">
                  <div class="account-profile border-bottom pt-25 px-25 pb-0 flex-column d-flex align-items-center">
                    <span class="avatar avatar-primary avatar-circle   avatar-transparent avatar-xl">
                      <span class="avatar-letter">{userData?.email?.substring(0, 1)}</span>
                    </span>
                    <div class="ap-nameAddress pb-25">
                      <h5 class="ap-nameAddress__title">{userData?.email}</h5>
                    </div>
                  </div>
                  <div class="ps-tab p-20 pb-25">
                    <div class="nav flex-column text-start" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                      {profileMenuData?.map((item) => (
                        <Link to={item?.link} class={`nav-link ${item?.link == pathname ? 'active' : ''}`} id="v-pills-home-tab" data-bs-toggle="pill" href="#v-pills-home" role="tab" aria-selected="true">
                          {' '}
                          <img src={item?.icon} alt="user" class="svg" />
                          {item?.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xxl-9 col-lg-8 col-sm-7">
              <div class="as-cover">
                <div class="as-cover__imgWrapper">
                  <input id="file-upload1" type="file" name="fileUpload" class="d-none" />
                  <label for="file-upload1">
                    <img src="/img/cover-img.png" alt="image" class="w-100" />
                  </label>
                </div>
              </div>

              <div class="mb-50">
                <div class="tab-content" id="v-pills-tabContent">
                  <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                    <div class="edit-profile mt-25">
                      <div class="card">
                        <div class="card-header px-sm-25 px-3">
                          <div class="edit-profile__title">
                            <h6>{title}</h6>
                          </div>
                        </div>
                        <div class="card-body">{children}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountLayout;
