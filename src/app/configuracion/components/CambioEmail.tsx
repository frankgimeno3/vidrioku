import { useState } from "react";

function cambioEmail() {
    const [currentEmail, setCurrentEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
  
    const handleSubmit = (e:any) => {
      e.preventDefault();
  
      // Aquí puedes agregar la lógica para cambiar la contraseña
      // Por ejemplo, enviar una solicitud al servidor para cambiar la contraseña.
  
      // Limpia los campos de contraseña después de enviar el formulario
      setCurrentEmail('');
      setNewEmail('');
      setConfirmEmail('');
    };
  
    return (
      <div className=" text-white flex items-center justify-center">
        <div className="w-full max-w-md">
    
          <form className="px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <h1 className="text-2xl mb-6 text-center">Cambiar Email</h1>
            <p className="text-sm mb-12">Introduzca sus datos para resetear el email</p>

            <div className="mb-4">
              <label className="block  text-sm font-bold mb-2" htmlFor="currentEmail">
                Email Actual
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                id="currentEmail"
                type="password"
                placeholder="Contraseña Actual"
                value={currentEmail}
                onChange={(e) => setCurrentEmail(e.target.value)}
                required
              />
            </div>
  
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="newEmail">
                Nuevo Email
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="newEmail"
                type="text"
                placeholder="Nuevo Email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
              />
            </div>
  
            <div className="mb-6">
              <label className="block   text-sm font-bold mb-2" htmlFor="confirmEmail">
                Confirmar Email
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="confirmEmail"
                type="text"
                placeholder="Confirmar Email"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                required
              />
            </div>
  
            <div className="flex items-center justify-center w-full ">
              <button
                className="px-auto bg-blue-500 hover:bg-blue-700   font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Cambiar Email
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  export default cambioEmail;