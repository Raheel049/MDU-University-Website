import * as React from "react";
import { Link } from "react-router-dom"; // Link import karna na bhoolen
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Fade,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AdbIcon from "@mui/icons-material/Adb";

// 1. Navigation Data: Yahan aap apne paths define karein
const navItems = [
  { title: "Home", path: "/", subItems: [] },
  { title: "About", path: "/about", subItems: ["Team", "Partners"] },
  {
    title: "Department",
    path: "/department",
    subItems: ["Computer Science", "BBA", "Education"],
  },
  { title: "Admission", path: "/admission", subItems: ["Apply Now", "Fees"] },
  { title: "Student", path: "/student", subItems: ["Portal", "LMS"] },
  { title: "Resource", path: "/resource", subItems: ["Library", "Downloads"] },
  { title: "CMS", path: "/cms", subItems: ["cmsLink1", "cmsRegistration"] },
  { title: "Sign Up", path: "/signUp", subItems: [] },
];

export default function ResponsiveAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [activeMenu, setActiveMenu] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleOpenMenu = (event, page) => {
    setAnchorEl(event.currentTarget);
    setActiveMenu(page);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setActiveMenu(null);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ bgcolor: "white", color: "black", boxShadow: 1 }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            {/* Mobile Menu Icon */}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton onClick={toggleDrawer(true)} color="inherit">
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Logo */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AdbIcon sx={{ mr: 1, color: "green" }} />
              <Typography
                variant="h6"
                noWrap
                component={Link} // Logo bhi link hai
                to="/"
                sx={{ fontWeight: 700, color: "black", textDecoration: "none" }}
              >
                LOGO
              </Typography>
            </Box>

            {/* Desktop Menu */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "space-evenly",
                ml: 4,
              }}
            >
              {navItems.map((item) => (
                <div
                  key={item.title}
                  onMouseEnter={(e) => handleOpenMenu(e, item.title)}
                  onMouseLeave={handleCloseMenu}
                >
                  <Button
                    component={Link} // Isse Button <a> tag ban jayega
                    to={item.path} // Page ka rasta
                    disableRipple
                    disableElevation
                    endIcon={
                      item.subItems.length > 0 && <KeyboardArrowDownIcon />
                    }
                    sx={{
                      my: 2,
                      color: "black",
                      fontWeight: "600",
                      textTransform: "capitalize",
                      backgroundColor: "transparent !important",
                      "&:hover": { color: "green" },
                    }}
                  >
                    {item.title}
                  </Button>

                  {/* Dropdown Menu */}
                  {item.subItems.length > 0 && (
                  <Menu
                  anchorEl={anchorEl}
                  open={activeMenu === item.title}
                  onClose={handleCloseMenu}
                  TransitionComponent={Fade}
                  sx={{ pointerEvents: "none" }}
                  PaperProps={{
                    onMouseEnter: () => setActiveMenu(item.title),
                    onMouseLeave: handleCloseMenu,
                    sx: {
                       backgroundColor: "transparent",  
                      boxShadow: 3, // optional, thoda shadow
                    },
                    style: { pointerEvents: "auto" },
                  }}
                >
                  {item.subItems.map((sub) => (
                    <MenuItem
                      key={sub}
                      onClick={handleCloseMenu}
                      sx={{
                        width: "250px",
                        backgroundColor: "green",       // default green
                        borderTop: "1px solid white",
                        borderBottom: "1px solid white",
                        p: 0,
                        color: "white",
                        "&:hover": {
                          backgroundColor: "transparent", // hover transparent
                          color: "green",
                        },
                        "&.Mui-focusVisible": {
                          backgroundColor: "green",
                          color: "white",
                        },
                        "&.Mui-selected": {
                          backgroundColor: "green",
                          color: "white",
                        },
                        "&.Mui-selected:hover": {
                          backgroundColor: "transparent",
                          color: "green",
                        },
                      }}
                    >
                      <Link
                        to={`${item.path}/${sub.toLowerCase().replace(" ", "-")}`}
                        style={{
                          display: "block",
                          width: "100%",
                          textAlign: "center",
                          padding: "8px 0",
                          color: "inherit",
                          textDecoration: "none",
                          fontWeight: 500,
                        }}
                      >
                        {sub}
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
                
                  
                  )}
                </div>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 280, p: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List sx={{ pt: 0 }}>
            {navItems.map((item) => (
              <Accordion
                key={item.title}
                disableGutters
                sx={{ boxShadow: "none", "&:before": { display: "none" } }}
              >
                <AccordionSummary
                  expandIcon={
                    item.subItems.length > 0 && <KeyboardArrowDownIcon />
                  }
                >
                  <Typography
                    component={Link}
                    to={item.path}
                    onClick={toggleDrawer(false)}
                    sx={{
                      fontWeight: 600,
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    {item.title}
                  </Typography>
                </AccordionSummary>

                {item.subItems.length > 0 && (
                  <AccordionDetails sx={{ p: 0 }}>
                    <List disablePadding>
                      {item.subItems.map((sub) => (
                        <ListItem key={sub} disablePadding>
                          <ListItemButton
                            component={Link}
                            to={`${item.path}/${sub
                              .toLowerCase()
                              .replace(" ", "-")}`}
                            onClick={toggleDrawer(false)}
                            sx={{ pl: 4 }}
                          >
                            <ListItemText primary={sub} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                )}
              </Accordion>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
