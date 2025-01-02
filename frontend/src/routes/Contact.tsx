import React from 'react';
import { EMAIL_ADDRESS, FULL_ADDRESS, PHONE_NUMBER } from '../utils/Constants';

const Contact: React.FC = () => {
    return (
        <div className="flex flex-col h-screen text-sm">
            <div className="flex-1">
                <iframe
                    title="Google Maps"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.3531815236306!2d-69.82783992399423!3d18.467654670786864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaf87eb62dd5dc9%3A0x122a3ca21abfed08!2sCentro%20Educativo%20Villa%20de%20Angeles!5e0!3m2!1sen!2sdo!4v1735766717122!5m2!1sen!2sdo"
                    className="w-full h-full border-0"
                    allowFullScreen={false}
                    loading="lazy"
                ></iframe>
            </div>
            <div className="flex flex-col p-1">
                <div className="flex-1 lg:pr-5 justify-center my-auto text-center">
                    <p className="font-bold">{FULL_ADDRESS}</p>
                    <p>Tel: {PHONE_NUMBER}</p>
                    <p>Email: {EMAIL_ADDRESS}</p>
                </div>
                <hr className="my-1" /> 
                <div className="flex-1 lg:w-1/2 mx-auto">
                    <form className="space-y-2">
                        <div>
                            <label htmlFor="name">Nombre:</label>
                            <input type="text" id="name" name="name" required className="border p-2 w-full" />
                        </div>
                        <div>
                            <label htmlFor="phone">Telefono:</label>
                            <input type="phone" id="phone" name="phone" required className="border p-2 w-full" />
                        </div>
                        <div>
                            <label htmlFor="subject">Asunto:</label>
                            <textarea id="subject" name="subject" required className="border p-2 w-full"></textarea>
                        </div>
                        <div>
                            <label htmlFor="message">Mensaje:</label>
                            <textarea id="message" name="message" required className="border p-2 w-full"></textarea>
                        </div>
                        <div>
                            <button type="submit" className="bg-blue-500 text-white p-2 mt-2">Enviar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
