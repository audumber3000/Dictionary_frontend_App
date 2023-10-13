import axios from 'axios';
import { base_url } from '../utils/constants'

async function authenticate_contact(contact) {
  const url = base_url + `/v1/auth/otp/send`;

  const response = await axios.post(url, {
    contact: contact
  });
  console.log('Dummy')
  console.log(response.data)
  return response.data;
}


async function authenticate_otp(contact, otp) {
  try {
    const url = base_url + `/v1/auth/otp/verify`;

    const response = await axios.post(url, {
      contact: contact,
      otp: otp
    });
    console.log(response.data)
    return response.data;
  }
  catch (error) {
    console.log(error.response.data)
    return error.response.data
  }

}

async function authenticate_signup(contact, password, name , email) {
  try {
    const url = base_url + `/v1/auth/register`;
    console.log("In Signup...........................................")
    const response = await axios.post(url, {
      contact: contact,
      password: password,
      name: name,
      email: email,
    });
    console.log("REquest send.........................................")
    return response.data;
  }
  catch (error) {
    //console.log(error.response.data)
    return error.response.data
  }

}




//------------------------------------------------------------------------------------
export function send_otp(contact) {
  console.log(contact)
  return authenticate_contact(contact);
}

export function verify_otp(contact, otp) {
  console.log(contact, otp)
  return authenticate_otp(contact, otp);
}

export function signup(contact, password, name , email) {
  console.log(contact, password, name , email)
  return authenticate_signup(contact, password, name , email);
}

export function logout() {
  return logout()
}