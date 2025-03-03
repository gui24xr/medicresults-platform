import { z } from "zod";

// Expresión regular para validar nombres y apellidos
const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
const phoneRegex = /^(\+?\d{1,3}[-\s]?)?\(?\d{2,3}\)?[-\s]?\d{3}[-\s]?\d{3}$/;
const alphanumericRegex = /^[a-zA-Z0-9]{1,6}$/;
const recordsRegex =/^[a-zA-Z0-9-]+$/
const dniPattern = /^[0-9]{7,8}$/;

// Crear el esquema Zod para validar el DNI argentino
const dniSchema = z.string().regex(dniPattern, "DNI inválido, debe contener entre 7 y 8 dígitos.");


const nameSchema = z.string().regex(nameRegex, {
  message: "El nombre solo puede contener letras y espacios",
}).min(2, { message: "Nombre/Apellido debe tener al menos 2 caracteres" });


const phoneSchema = z.string().regex(phoneRegex, {
    message: "El número de teléfono no es válido",
  });

const emailSchema = z.string().email({ message: "Email inválido" })

const accessCodeSchema = z.string().regex(alphanumericRegex, {
    message: "El codigo solo puede contener letras y numeros. Deben ser 6 numeros..."
})

const recordNumbersSchema = z.string().regex(recordsRegex {
    message: "Los Legajos y matriculas solo pueden contener numeros, letras y guiones"
})


export {
    nameSchema,emailSchema,accessCodeSchema,phoneSchema,dniSchema,recordNumbersSchema
}