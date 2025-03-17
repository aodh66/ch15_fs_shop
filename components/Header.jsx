import { useState } from "react";
import Box from "@mui/material/Box";
import MobileNavigation from "@/components/navigation/MobileNavigation";
import DesktopNavigation from "@/components/navigation/DesktopNavigation";

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ display: "flex", position: "relative"}}>
      <div
        style={{
          backdropFilter: "blur(10px)",
          position: "absolute",
          minWidth: "100%",
          minHeight: "100%",
          zIndex: 0,
        }}
      />
      <MobileNavigation
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
      />
      <DesktopNavigation handleDrawerToggle={handleDrawerToggle} />
    </Box>
  );
}

export default Header;
