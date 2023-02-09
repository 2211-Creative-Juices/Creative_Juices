import { React } from 'react';
import { Form, Input, TextArea, Button } from 'semantic-ui-react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

const SERVICE_ID = 'philip-rau-email';
const TEMPLATE_ID = 'fake-email-template-id';
const USER_ID = 'a_hjRYWHRArTH61UM';

const ContactForm = () => {
  const handleOnSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID).then(
      (result) => {
        console.log(result.text);
        Swal.fire({
          icon: 'success',
          title: 'Message Sent Successfully',
        });
      },
      (error) => {
        console.log(error.text);
        Swal.fire({
          icon: 'error',
          title: 'Ooops, something went wrong',
          text: error.text,
        });
      }
    );
    e.target.reset();
  };

  return (
    <div className='ContactForm-container'>
      <Form
        onSubmit={handleOnSubmit}
        className='ContactForm'
      >
        <div id='contact-shelley'>CONTACT SHELLEY</div>
        <Form.Field
          id='form-input-control-email'
          control={Input}
          label='EMAIL'
          name='user_email'
          placeholder='Email'
          required
          // icon='mail'
          // iconPosition='left'
        />
        <Form.Field
          id='form-input-control-last-name'
          control={Input}
          label='NAME'
          name='user_name'
          placeholder='Name'
          required
          // icon='user circle'
          // iconPosition='left'
        />
        <Form.Field
          id='form-textarea-control-opinion'
          control={TextArea}
          label='MESSAGE'
          name='user_message'
          placeholder='Message'
          required
        />
        <Button type='submit'>Submit</Button>
      </Form>
    </div>
  );
};

export default ContactForm;
