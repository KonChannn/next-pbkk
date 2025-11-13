import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Navbar as MTNavbar,
  Collapse,
  Button,
  IconButton,
  Typography,
} from "./MTailwind";
import {
  TvIcon,
  BookOpenIcon,
  BookmarkIcon,
  UserCircleIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";

const NAV_MENU = [
  { name: "Anime", icon: TvIcon, href: "/web/anime" },
  { name: "Manga", icon: BookOpenIcon, href: "/web/manga" },
  { name: "My List", icon: BookmarkIcon, href: "/my-list" },
  { name: "Account", icon: UserCircleIcon, href: "/account" },
];

interface NavItemProps {
  children: React.ReactNode;
  href?: string;
}

function NavItem({ children, href }: NavItemProps) {
  return (
    <li>
      <Typography
        as="a"
        href={href || "#"}
        target={href ? "_self" : "_blank"}
        variant="paragraph"
        color="gray"
        className="flex items-center gap-2 font-medium text-gray-900"
        placeholder=""
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      >
        {children}
      </Typography>
    </li>
  );
}

export function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleResize = () => {
    if (window.innerWidth >= 960) {
      setOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setIsLoggedIn(false);
        router.push("/auth/login");
      } else {
        console.error("Gagal logout");
      }
    } catch (error) {
      console.error("Logout gagal:", error);
    }
  };

  const handleLogin = () => {
    router.push("/auth/login");
  };

  const handleOpen = () => {
    setOpen((cur) => !cur);
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await fetch("/api/check-login", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setIsLoggedIn(data.loggedIn || false);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="px-10 sticky top-4 z-50">
      <div className="mx-auto container">
        <MTNavbar
          blurred
          color="white"
          className="z-50 mt-6 relative border-0 pr-3 py-3 pl-6"
          placeholder="" // Added placeholder prop
          onPointerEnterCapture={() => {}} // Added onPointerEnterCapture prop
          onPointerLeaveCapture={() => {}} // Added onPointerLeaveCapture prop
        >
          <div className="flex items-center justify-between">
            <Typography
              color="blue-gray"
              className="text-lg font-bold"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              KomiXcel
            </Typography>
            <ul className="ml-10 hidden items-center gap-8 lg:flex">
              {NAV_MENU.map(({ name, icon: Icon, href }) => (
                <NavItem key={name} href={href}>
                  <Icon className="h-5 w-5" />
                  {name}
                </NavItem>
              ))}
            </ul>
            <div className="hidden items-center gap-4 lg:flex">
              {isLoggedIn ? (
                <Button
                  variant="text"
                  onClick={handleLogout}
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                >
                  Log out
                </Button>
              ) : (
                <>
                  <Button
                    variant="text"
                    onClick={handleLogin}
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                  >
                    Log in
                  </Button>
                  <a href="/auth/register">
                    <Button
                      color="gray"
                      placeholder=""
                      onPointerEnterCapture={() => {}}
                      onPointerLeaveCapture={() => {}}
                    >
                      Register
                    </Button>
                  </a>
                </>
              )}
            </div>
            <IconButton
              variant="text"
              color="gray"
              onClick={handleOpen}
              className="ml-auto inline-block lg:hidden"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              {open ? (
                <XMarkIcon strokeWidth={2} className="h-6 w-6" />
              ) : (
                <Bars3Icon strokeWidth={2} className="h-6 w-6" />
              )}
            </IconButton>
          </div>
          <Collapse open={open}>
            <div className="container mx-auto mt-3 border-t border-gray-200 px-2 pt-4">
              <ul className="flex flex-col gap-4">
                {NAV_MENU.map(({ name, icon: Icon, href }) => (
                  <NavItem key={name} href={href}>
                    <Icon className="h-5 w-5" />
                    {name}
                  </NavItem>
                ))}
              </ul>
              <div className="mt-6 mb-4 flex items-center gap-4">
                {isLoggedIn ? (
                  <Button
                    variant="text"
                    onClick={handleLogout}
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                  >
                    Log out
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="text"
                      onClick={handleLogin}
                      placeholder=""
                      onPointerEnterCapture={() => {}}
                      onPointerLeaveCapture={() => {}}
                    >
                      Log in
                    </Button>
                    <a href="/auth/register">
                      <Button
                        color="gray"
                        placeholder=""
                        onPointerEnterCapture={() => {}}
                        onPointerLeaveCapture={() => {}}
                      >
                        Register
                      </Button>
                    </a>
                  </>
                )}
              </div>
            </div>
          </Collapse>
        </MTNavbar>
      </div>
    </div>
  );
}

export default Navbar;
