import { Link } from "react-router-dom"

const NavBar = () => {
    return(
        <nav className="flex items-center gap-52 bg-gray-950 w-full h-20 p-8 text-teal-400">
            <Link to={"/"}><h1 className="text-3xl font-bold" >DENTAL DESK</h1></Link>
            <ul className="linklist flex gap-48 mr-11 items-center justify-center">
                <Link to={"/agenda"}><li className=" hover:bg-slate-600 hover:rounded-t-xl p-5">Agenda</li></Link>
                <Link to={"/pacientes"}><li className=" hover:bg-slate-600 hover:rounded-t-xl p-5">Pacientes</li></Link>
                <li className=" hover:bg-slate-600 hover:rounded-t-xl p-5">Doctores</li>
                <li className=" hover:bg-slate-600 hover:rounded-t-xl p-5">Pagos</li>
            </ul>
        </nav>
    )

}

export default NavBar