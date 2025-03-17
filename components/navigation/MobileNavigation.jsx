import React from "react";
import Link from "next/link";
import {
  Divider,
  List,
  ListItem,
  Drawer,
  ListItemButton,
  ListItemText,
  Box,
  Typography,
} from "@/components/mui";
import { useTheme } from "@mui/material/styles";
import { useUser } from "@auth0/nextjs-auth0/client";

import ShoppingCartDisplay from "@/components/BasketDisplay";

function MobileNavigation({
  mobileOpen = false,
  handleDrawerToggle = () =>
    console.log("no handleDrawerToggle function provided"),
  drawerWidth = 240,
}) {
  const theme = useTheme();
  const { user } = useUser();
  const lightTextColor = theme.palette.common.white;
  const buttonColor = theme.palette.secondary.main;
  const backGroundColor = theme.palette.primary.main;
  const blur = theme.backdropFilter.blur;
  const itemLinkStyles = {
    display: "block",
    textDecoration: "none",
    flexGrow: "1",
  };
  return (
    <Box component="nav">
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth,
            backgroundColor: `${backGroundColor}`,
            position: "relative",
            marginBottom: "0px",
          },
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
        <Box
          onClick={handleDrawerToggle}
          sx={{ textAlign: "center", zIndex: 1 }}
        >
          <Typography variant="h6" sx={{ my: 2, color: `${lightTextColor}` }}>
            Eclectic Shop {user && <ShoppingCartDisplay user={user} />}
          </Typography>
          <Divider />
          <List>
            <ListItem>
              <Link href={"/"} passHref style={itemLinkStyles}>
                <ListItemButton sx={{ textAlign: "left", width: "100%", color: `${buttonColor}` }}>
                  <ListItemText primary={"Shop"} />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem>
              <Link href={"/blog"} passHref style={itemLinkStyles}>
                <ListItemButton sx={{ textAlign: "left", width: "100%", color: `${buttonColor}` }}>
                  <ListItemText primary={"Blog"} />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem>
              <Link href={"/contact"} passHref style={itemLinkStyles}>
                <ListItemButton sx={{ textAlign: "left", width: "100%", color: `${buttonColor}` }}>
                  <ListItemText primary={"Contact"} />
                </ListItemButton>
              </Link>
            </ListItem>
            {/* {user && user["https://ch15-fs-shop.vercel.app/admin"] && (
              <ListItem>
                <Link href={"/admin"} passHref style={itemLinkStyles}>
                  <ListItemButton sx={{ textAlign: "left", width: "100%", color: `${buttonColor}` }}>
                    <ListItemText primary={"Admin"} />
                  </ListItemButton>
                </Link>
              </ListItem>
            )} */}
            {user ? (
              <>
                <ListItem>
                  <Link href={"/profile"} passHref style={itemLinkStyles}>
                    <ListItemButton sx={{ textAlign: "left", color: `${buttonColor}` }}>
                      <ListItemText primary={"Profile"} />
                    </ListItemButton>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    href={"/api/auth/logout"}
                    passHref
                    style={itemLinkStyles}
                  >
                    <ListItemButton sx={{ textAlign: "left", width: "100%", color: `${buttonColor}` }}>
                      <ListItemText primary={"Log Out"} />
                    </ListItemButton>
                  </Link>
                </ListItem>
              </>
            ) : (
              <ListItem>
                <Link
                  href={"/api/auth/login"}
                  passHref
                  style={{ textDecoration: "none" }}
                >
                  <ListItemButton sx={{ textAlign: "left" }}>
                    <ListItemText primary={"Log In"} />
                  </ListItemButton>
                </Link>
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

export default MobileNavigation;
