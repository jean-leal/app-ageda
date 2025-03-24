export function timeMask(value) {
  return value
    .replace(/\D/g, "") // Remove tudo que não for número
    .replace(/^(\d{2})(\d)/, "$1:$2") // Insere ":" após os dois primeiros números
    .slice(0, 5); // Garante que só tenha no máximo 5 caracteres (HH:mm)
}