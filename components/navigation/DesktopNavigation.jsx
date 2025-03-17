import React from "react";
import Link from "next/link";
import Image from 'next/image'
import {
  AppBar,
  Box,
  IconButton,
  MenuIcon,
  Toolbar,
  Typography,
  Button,
} from "@/components/mui";
import { useTheme } from "@mui/material/styles";
import { useUser } from '@auth0/nextjs-auth0/client';
import logo from "@/images/shop.svg";

import ShoppingCartDisplay from "@/components/BasketDisplay";

function DesktopNavigation({
  handleDrawerToggle = () =>
    console.log("no handleDrawerToggle function provided"),
}) {
  const theme = useTheme();
  const { user } = useUser();
  const lightTextColor = theme.palette.common.white;
  const buttonColor = theme.palette.secondary.main;
  return (
    <>
      <AppBar component="nav" position="sticky" 
        sx={{ mb: 2, 
          // opacity: 1, 
          // backgroundColor: "hsla(90, 0%, 0%, 0.5)"  
        // backdropFilter: "blur(10px)",
        position: "relative",
        }}
      >
      <div
        style={{
          backdropFilter: "blur(10px)",
          position: "absolute",
          minWidth: "100%",
          minHeight: "100%",
          zIndex: 0,
        }}
      />
        <Toolbar sx={{ padding: "0px 10px"}} disableGutters={true} >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, pl: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Image
      src={logo}
      width={50}
      height={50}
      alt="Site Logo"
    />
          <Typography
            variant="h5"
            component={Link}
            href={`/`}
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              textDecoration: "none",
              color: lightTextColor,
              ml: 1,
              // fontWeight: "semibold",
            }}
          >
            Eclectic Shop
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
          {user && <ShoppingCartDisplay user={user} />}
            {/* {user && user["https://ch15-fs-shop.vercel.app/admin"] && (
              <Button
              sx={{ color: buttonColor }}
              component={Link}
              href="/admin"
            >
              Admin
            </Button>
            )} */}
            <Button
              sx={{ color: buttonColor }}
              component={Link}
              href="/blog"
            >
              Blog
            </Button>
            <Button
              sx={{ color: buttonColor }}
              component={Link}
              href="/contact"
            >
              Contact
            </Button>
            {user ? (
              <>
                <Button
                  href="/profile"
                  component={Link}
                  sx={{ color: buttonColor }}
                >
                  Profile
                </Button>
                <Button
                  href="/api/auth/logout"
                  component={Link}
                  sx={{ color: buttonColor }}
                >
                  Log Out
                </Button>
              </>
            ) : (
              <Button
                href="/api/auth/login"
                component={Link}
                sx={{ color: buttonColor }}
              >
                Log In
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default DesktopNavigation;
