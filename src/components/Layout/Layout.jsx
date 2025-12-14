import "./Layout.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Spinner from './../Helpers/Spinner';
import { useAppContext } from './../../contexts/AppContext'
import Navbar from './../Navbar/Navbar';

const contextClass = {
  success: " border-[#00a896]",
  error: " border-[#e74d3c]",
  info: " border-[#3498db]",
  warning: " border-[#f1c40f]",
  default: "",
  dark: " font-gray-300",
};
export default function Layout() {
  const { isLoading } = useAppContext();

  return (
    <>
    <Navbar />
      <div className="layout pt-14 md:pt-16">
        {isLoading && <Spinner />}
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
    </>
  );
}   