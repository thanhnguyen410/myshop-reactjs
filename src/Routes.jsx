import React, { lazy, Suspense } from 'react'
import { Routes as Switch, Route } from 'react-router-dom'
import { path } from './constants/path'

import NotFound from './pages/NotFound/NotFound'
import RegisterLayout from './layouts/RegisterLayout/RegisterLayout'
import MainLayout from './layouts/MainLayout/MainLayout'
import CartLayout from './layouts/CartLayout/CartLayout'

import UnAuthenticated from './guards/UnAuthenticated/UnAuthenticated'
import Authenticated from './guards/Authenticated/Authenticated'
import Fallback from './components/Fallback/Fallback'

const Home = lazy(() => import('./pages/Home/Home'))
const Login = lazy(() => import('./pages/Auth/Login/Login'))
const Register = lazy(() => import('./pages/Auth/Register/Register'))
const User = lazy(() => import('./pages/User/User'))
const Password = lazy(() => import('./pages/User/Password/Password'))
const Profile = lazy(() => import('./pages/User/Profile/Profile'))
const Purchase = lazy(() => import('./pages/User/Purchase/Purchase'))
const Cart = lazy(() => import('./pages/Cart/Cart'))
const ProductDetail = lazy(() => import('./pages/ProductDetail/ProductDetail'))

export default function Routes() {
  return (
    <Switch>
      <Route
        path={path.home}
        element={
          <MainLayout>
            <Suspense fallback={<Fallback />}>
              <Home />
            </Suspense>
          </MainLayout>
        }
      ></Route>
      <Route
        path={path.productDetail}
        element={
          <MainLayout>
            <Suspense fallback={<Fallback />}>
              <ProductDetail />
            </Suspense>
          </MainLayout>
        }
      ></Route>
      <Route
        path={path.login}
        element={
          <UnAuthenticated>
            <RegisterLayout title="Đăng nhập">
              <Suspense fallback={<Fallback />}>
                <Login />
              </Suspense>
            </RegisterLayout>
          </UnAuthenticated>
        }
      ></Route>
      <Route
        path={path.register}
        element={
          <UnAuthenticated>
            <RegisterLayout title="Đăng ký">
              <Suspense fallback={<Fallback />}>
                <Register />
              </Suspense>
            </RegisterLayout>
          </UnAuthenticated>
        }
      ></Route>
      <Route
        path={path.user}
        element={
          <Authenticated>
            <MainLayout>
              <Suspense fallback={<Fallback />}>
                <User />
              </Suspense>
            </MainLayout>
          </Authenticated>
        }
      >
        <Route
          path={path.profile}
          element={
            <Suspense fallback={<Fallback />}>
              <Profile />
            </Suspense>
          }
        />
        <Route
          path={path.password}
          element={
            <Suspense fallback={<Fallback />}>
              <Password />
            </Suspense>
          }
        />
        <Route
          path={path.purchase}
          element={
            <Suspense fallback={<Fallback />}>
              <Purchase />
            </Suspense>
          }
        />
      </Route>
      <Route
        path={path.cart}
        element={
          <Authenticated>
            <CartLayout>
              <Suspense fallback={<Fallback />}>
                <Cart />
              </Suspense>
            </CartLayout>
          </Authenticated>
        }
      ></Route>
      <Route path={path.notFound} exact element={<NotFound />}></Route>
    </Switch>
  )
}
