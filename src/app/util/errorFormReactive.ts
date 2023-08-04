export default function MapErrors(form:any, errors:any){
    Object.keys(errors).forEach(prop => {
        const formControl = form.get(prop);
        if (formControl) {
          // activate the error message
          formControl.setErrors({
            serverError: errors[prop]
          });
        }
      });
}