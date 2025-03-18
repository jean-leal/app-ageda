export function phoneMask(value) {
  return value
    .replace(/\D/g, '') // Remove todos os caracteres não numéricos
    .replace(/(\d{2})(\d)/, '($1) $2') // Coloca parênteses em volta dos dois primeiros dígitos
    .replace(/(\d{1})(\d{4})(\d{4})/, '$1 $2-$3'); // Coloca hífen entre o quarto e o quinto dígitos
}