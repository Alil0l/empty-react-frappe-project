import "./Layout.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Spinner from './../Helpers/Spinner';
import { useAppContext } from './../../contexts/AppContext'
import Navbar from './../Navbar/Navbar';
import WhatsAppFloat from './../WhatsAppFloat/WhatsAppFloat';
import { useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
const contextClass = {
  success: " border-resk-secondary",
  error: " border-[#e74d3c]",
  info: " border-resk-primary",
  warning: " border-[#f1c40f]",
  default: "",
  dark: " font-gray-300",
};
export default function Layout() {
  const { isLoading } = useAppContext();
  const { t } = useTranslation();
  const location = useLocation();
  const noNavbar = location.pathname === '/portal/login' || location.pathname === '/portal/signup' || location.pathname === '/portal/forget-password' || location.pathname === '/portal/otp' || location.pathname === '/portal/terms';
  return (
    <>
    <Navbar />
      <div className={`layout ${noNavbar ? 'pt-0' : 'pt-14 md:pt-16'}`}>
        {isLoading && <Spinner fullScreen={true} text={t('common.loading', 'Loading...')} />}
        <Outlet />
        <ToastContainer
          toastClassName={(context) =>
            contextClass[context?.type || "default"] +
            " toast-className"
          }
          className="toast-container !top-[7%]"
          autoClose={2000}
          bodyClassName= "toast-body"
          progressClassName= "toast-progress"
        />
      </div>
      {!noNavbar && <WhatsAppFloat />}
    </>
  );
}   