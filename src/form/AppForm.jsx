import { ErrorMessage, Field, Form, Formik } from 'formik'

function AppForm() {
  return (
    <Formik
      initialValues={{message:"Hola te contacto por..."}}
      validate={values => {
        let errors = {}
        if (!values.name) {
          errors.name = "Este campo es requerido"
        } else if(!values.email){
          errors.email = "Este campo es requerido"
        } else if(
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ){
          errors.email = "El correo no es valido"
        }
        return errors
      }}
      onSubmit={
        (values, {setSubmitting}) => {
          let url = "https://formspree.io/f/xjvnggyr"
          let formData = new FormData()
          formData.append("name", values.name)
          formData.append("email", values.email)
          formData.append("message", values.message)

          fetch(url,{
            method: "POST",
            body: formData,
            headers: {
              'Accept': 'application/json'
          }
          }).then(response => {
            setSubmitting(false)
            alert("Gracias por contactarme")
          })
        }
      }
    >
      {
        ({isSubmitting, values}) => (
          <Form className='form'>
            <div>
              <label htmlFor="name">Nombre:</label>
              <Field type="text" name="name"></Field>
              <ErrorMessage name='name' className='error-message' 
              component="p" />
            </div>
            <div>
              <label htmlFor="email">Correo electronico:</label>
              <Field type="email" name="email"></Field>
              <ErrorMessage name='email' className='error-message' component="p" />
            </div>
            <div>
              <label htmlFor="message">Mensaje:</label>
              <Field component="textarea" value={values.message} name="message"></Field>
            </div>
            <button type='submit' disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar mensaje"}
            </button>
          </Form>
        )
      }
    </Formik>
  )
}

export default AppForm
