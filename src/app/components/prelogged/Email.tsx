import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const Email: React.FC = ({ }) => {
    const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      emailjs
        .sendForm(
          "service_hls7pk1",
          "template_q9do1tj",
          form.current as HTMLFormElement,
          "tW78cuPW4vf9Xroeo"
        )
        .then((result) => {
          form.current?.reset();
 
        });
    }
  };

  const validateForm = (): boolean => {
    const formFields: any = form.current?.elements as HTMLCollectionOf<HTMLInputElement | HTMLTextAreaElement>;
    let isValid = true;

    for (const field of formFields) {
      if (field.tagName === "INPUT" || field.tagName === "TEXTAREA") {
        if (!field.value) {
          field.classList.add("invalid");
          isValid = false;
        } else {
          field.classList.remove("invalid");
        }
      }
    }

    return isValid;
  };

  return (
    <form ref={form} onSubmit={sendEmail} className='mt-1 flex flex-col text-white'>
      <h2 className="text-5xl text-center  text-white mb-3">Quiere saber más?</h2>
      <p className=' mx-20 px-24 pb-5 text-sm'>Háganos una consulta rellenando el formulario a continuación:</p>
      <div className='flex flex-col mx-5 text-xs text-left  px-5 '>
        <label>Nombre</label>
        <input type="text" name="from_name" className='mt-1 rounded-lg bg-white bg-opacity-10  p-1 pl-3 placeholder-gray-300'  placeholder='Escriba aquí su nombre'/>
        <label className='mt-5'>Email</label>
        <input type="email" name="email" className='mt-1 rounded-lg bg-white bg-opacity-10 p-1 pl-3 placeholder-gray-300'  placeholder='Escriba aquí su email'/>
        <label className='mt-5'>Mensaje</label>
        <textarea name="message" className='mt-1 rounded-lg bg-white bg-opacity-10 p-1 h-40 pl-3 placeholder-gray-300' placeholder='Escríbanos su consulta aquí' />
        <button type="submit" value="Send" className='my-5 py-3 w-40  bg-sky-50  text-xs rounded-lg shadow-white hover:scale-110 hover:bg-white text-gray-700 transition-transform duration-1000'> Send </button>
      </div>
    </form>
  );
};

export default Email