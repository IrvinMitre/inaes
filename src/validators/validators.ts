export class CustomValidator {

  static validatePaswword(password): any{
    if(password.pristine){
      return null;
    }
    const PASSWORD_REGEXP = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
    if(PASSWORD_REGEXP.test(password.value)){
      return null
    }
    return {
      invalidPassword:true
    }
  };
}
