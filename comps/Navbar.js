import React, {useContext} from 'react'
import Link from 'next/link'
import Image from 'next/image' //image comp provided by next

function Navbar() {
    return (
        <div className="container">
            <nav className="navbar navbar-expand-sm navbar-light bg-none">
				<div className="container-fluid ">
					<ul className="navbar-nav mx-auto">
						<li className="nav-item" key="1">
						<Link href="/">
						<a className="navbar-brand" href="#"><Image src="/logo.png" width={160} height={160}/></a>
						</Link>
						</li>
					</ul>
					<ul className="navbar-nav justify-end">
						<li className="nav-item" key="2">
							<Link href="/cart">
								<a>My Cart</a>
							</Link>
						</li>
					</ul>
				</div>
			</nav>
        </div>
    )
}

export default Navbar
