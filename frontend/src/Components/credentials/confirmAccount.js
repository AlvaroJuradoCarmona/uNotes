import { useNavigate, useParams } from "react-router-dom";
import authServices from "../../services/auth.service";
import Button from '@mui/material/Button';

function ConfirmAccount() {
  const params = useParams();

  const nav = useNavigate();

  const confirmAndRedirect = () => {
    authServices.confirmAccount(params.token);
    nav('/');
  }

  return (
    <div>
        <h2>¡Bienvenido(a) a uNotes!</h2>
        <p>Estamos emocionados de informarte que tu cuenta en uNotes ha sido creada con éxito. Queremos confirmarte que tu registro ha sido procesado y que ahora tienes acceso a todos los beneficios y servicios que nuestra plataforma tiene para ofrecer. \n</p>
        <p>Para activar completamente tu cuenta y confirmar tu dirección de correo electrónico, te pedimos que hagas clic en el siguiente enlace de confirmación: \n</p>
        <Button variant="contained" onClick={confirmAndRedirect}>Verificar cuenta</Button>
        <p>Una vez más, gracias por unirte a uNotes. Esperamos que tu experiencia con nosotros sea enriquecedora y satisfactoria. \n \n</p>
        <p>¡Bienvenido(a) a nuestra comunidad!\n \n</p>
        <p>Atentamente,\n \n</p>
        <p>El Equipo de uNotes.</p>
    </div>)
}
export default ConfirmAccount;