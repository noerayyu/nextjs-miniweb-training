import React, {useContext} from 'react'
import Link from 'next/link'
import Image from 'next/image' //image comp provided by next
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


function Navbar() {
    return (
	<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
		<Box display='flex' flexGrow={1}>
		<Link href="/">
			<a style={{textDecoration:'none', color:'#fff'}}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Klambi
          </Typography>
		  </a></Link>
		</Box>
		<Link href="/cart">
			<a style={{textDecoration:'none', color:'#fff'}}>
          		<Button color="inherit" edge="end">My Cart</Button>
		  	</a>
		</Link>
        </Toolbar>
      </AppBar>
    </Box>
        // <div className="container">
        //     <nav className="navbar navbar-expand-sm navbar-light bg-none">
		// 		<div className="container-fluid ">
		// 			<ul className="navbar-nav mx-auto">
		// 				<li className="nav-item" key="1">
		// 				<Link href="/">
		// 				<a className="navbar-brand" href="#"><Image src="/logo.png" width={160} height={160}/></a>
		// 				</Link>
		// 				</li>
		// 			</ul>
		// 			<ul className="navbar-nav justify-end">
		// 				<li className="nav-item" key="2">
		// 					<Link href="/cart">
		// 						<a>My Cart</a>
		// 					</Link>
		// 				</li>
		// 			</ul>
		// 		</div>
		// 	</nav>
        // </div>
    )
}

export default Navbar
