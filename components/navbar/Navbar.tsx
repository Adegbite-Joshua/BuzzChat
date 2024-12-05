import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Apple from '@mui/icons-material/Apple';
import Link from 'next/link';
import Close from '@mui/icons-material/Close';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
  { title: 'Home', link: '/' },
  { title: 'Features', link: '/features' },
  { title: 'About', link: '/about' },
  { title: 'Contact', link: '/contact' },
  { title: 'Login', link: '/login' },
  { title: 'Create Account', link: '/signup' },
];


export default function Navbar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        BUZZCHAT
      </Typography>
      <Divider />
      <List className=''>
        {navItems.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <Link href={item.link}>{item.title}</Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    // <Box sx={{ display: 'flex' }}>
    //   <AppBar className='bg-blue-600' component="nav">
    //     <Toolbar>
    //       <IconButton
    //         color="inherit"
    //         aria-label="open drawer"
    //         edge="start"
    //         onClick={handleDrawerToggle}
    //         sx={{ mr: 2, display: { sm: 'none' } }}
    //       >
    //         <MenuIcon />
    //       </IconButton>
    //       <Image src={'/logo-t.png'} alt='Logo' height={100} width={100} />
    //       <Typography
    //         variant="h6"
    //         component="div"
    //         sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
    //       >
    //         BUZZCHAT
    //       </Typography>
    //       <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
    //       {/* <div className='hidden md:flex'> */}
    //         {navItems.map((item) => (
    //           <Button key={item} sx={{ color: '#fff' }}>
    //             {item}
    //           </Button>
    //         ))}
    //       </Box>
    //     </Toolbar>
    //   </AppBar>
    //   <nav>
    //     <Drawer
    //       container={container}
    //       variant="temporary"
    //       open={mobileOpen}
    //       onClose={handleDrawerToggle}
    //       ModalProps={{
    //         keepMounted: true, // Better open performance on mobile.
    //       }}
    //       sx={{
    //         display: { xs: 'block', sm: 'none' },
    //         '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
    //       }}
    //     >
    //       {drawer}
    //     </Drawer>
    //   </nav>
    // </Box>
    <nav className='bg-blue-600 h-20 flex justify-around items-center'>
      <Button className='text-white font-bold text-3xl items-center' startIcon={
        <Image src={'/logo-t.png'} alt='Logo' height={100} width={100} />
      }>BUZZCHAT</Button>
      <div className='hidden md:flex w-2/3 justify-evenly'>
        <Link className='text-white font-semibold px-3 py-2 hover:bg-slate-100 hover:text-blue-600 duration-300 ease-in-out rounded-full ' href={'/'}>Home</Link>
        <Link className='text-white font-semibold px-3 py-2 hover:bg-slate-100 hover:text-blue-600 duration-300 ease-in-out rounded-full ' href={'/'}>About</Link>
        <Link className='text-white font-semibold px-3 py-2 hover:bg-slate-100 hover:text-blue-600 duration-300 ease-in-out rounded-full ' href={'/'}>Features</Link>
        <Link className='text-white font-semibold px-3 py-2 hover:bg-slate-100 hover:text-blue-600 duration-300 ease-in-out rounded-full ' href={'/'}>Log in</Link>
        <Link className='text-white font-semibold px-3 py-2 hover:bg-slate-100 hover:text-blue-600 duration-300 ease-in-out rounded-full ' href={'/'}>Create Account</Link>
      </div>
      <IconButton className='text-white md:hidden' onClick={handleDrawerToggle}>
        <MenuIcon fontSize='large' />
        {/* <Close fontSize='large'/> */}
      </IconButton>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
    </nav>
  );
}
