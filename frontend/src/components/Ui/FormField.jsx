import { useField } from 'formik'
import { FloatingLabel, Form } from 'react-bootstrap'

const FormField = ({ name, label, type, placeholder, ...props }) => {
  const [field, meta] = useField(name)

  return (
    <FloatingLabel controlId={name} label={label} className='mb-3'>
      <Form.Control
        {...field}
        {...props}
        type={type}
        placeholder={placeholder || label}
        isInvalid={meta.touched && meta.error}
      />

      <Form.Control.Feedback type='invalid'>
        {meta.error}
      </Form.Control.Feedback>
    </FloatingLabel>
  )
}

export default FormField
