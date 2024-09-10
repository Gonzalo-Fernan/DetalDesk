const LoginRegister = () =>{

    return(
        <section className="p-20 flex flex-col gap-20 items-center justify-start loginContainer">
            <p className="text-5xl text-white z-10">Bienvenido a Dental Desk</p>
            <article className="flex gap-16 z-10">
                <form action="" method="post" className="w-96 p-5 pt-8 flex flex-col gap-11 items-center justify-start bg-emerald-500 bg-opacity-30 rounded-lg text-white " >
                    <p className="text-3xl">Iniciar Sesion</p>
                    <input type="text" name="email" id="email" placeholder="E-mail" className="p-2 rounded-xl"/>
                    <input type="text" name="contraseña" id="contraseña" placeholder="Contraseña"  className="p-2 rounded-xl"/>
                    <button type="submit" className="bg-green-700 p-2 rounded-lg">Inciar Sesion</button>
                </form>
                
                <form action="" className="w-auto p-5 flex flex-col gap-11 items-center justify-center bg-cyan-900 bg-opacity-30 rounded-lg text-white ">
                <p className="text-3xl">Si no tenes cuenta, registrate en pocos pasos.</p>
                    <input type="text" name="nombre" id="nombre" placeholder="Nombre" className="p-2 rounded-xl" />
                    <input type="text" name="apellido" id="apellido" placeholder="Apellido" className="p-2 rounded-xl" />
                    <input type="text" name="email" id="email" placeholder="E-mail" className="p-2 rounded-xl"/>
                    <input type="text" name="contraseña" id="contraseña" placeholder="Contraseña"  className="p-2 rounded-xl"/>
                    
                    <button type="submit" className="bg-green-700 p-2 rounded-lg">Inciar Sesion</button>
                </form>
            </article>
        </section>
    )
}
export default LoginRegister