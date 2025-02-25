export const removeCpfPunctuation = (cpf: string) => {
    return cpf.replace(/[\.\-]/g, "");
  };


export const isValidCpf = (cpf: string): boolean => {
    //remove os caracterres nao numericos
    cpf = cpf.replace(/\D/g, "")


    //verifica se o cpf tem 11 digitos

    if (cpf.length != 11) {
        return false
    }


    //elimina CPFs com todos os dígitos iguais 

    if (/^(\d)\1+$/.test(cpf)) {
        return false
    }

    //cálculo do primeiro digito verificador 

    let sum = 0;
    for (let i = 0; i < 9;  i++){
        sum += parseInt(cpf.charAt(i)) * (10 - i)
    }

    let firstVerifier = (sum * 10) % 11;
    firstVerifier = firstVerifier === 10 ? 0 : firstVerifier;

    if (firstVerifier != parseInt(cpf.charAt(9))){
        return false
    }


    //calculo do segundo digito verificador

    sum = 0;


    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i)
    }


    let secondVerifier = (sum * 10) % 11;
    secondVerifier = secondVerifier === 10 ? 0 : secondVerifier;

    return  secondVerifier != parseInt(cpf.charAt(10))
    
    



}