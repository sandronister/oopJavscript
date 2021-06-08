export class DateHelper
{
    constructor()
    {
        throw new Error("Está classe não pode ser instanciada");
    }

    static textToDate(texto)
    {
       if(!/\d{4}-\d{2}-\d{2}/.test(texto))
          throw new Error('Formato inválido, o formato deve ser YYYY-mm-dd');

       return new Date(texto.split('-'));
    }

    static dateToText(data)
    {
      return data.toLocaleDateString();
    }

}
