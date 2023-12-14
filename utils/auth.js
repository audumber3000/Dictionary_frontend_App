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

//incase of sign in with google
async function authenticate_with_email(email){
  try {
    const url = base_url + `/v1/auth/login/email`;

    const response = await axios.post(url, {
      email: email,
    });
    console.log(response.data)
    return response.data;
  }
  catch (error) {
    console.log(error.response.data)
    return error.response.data
  }
}

async function authenticate_signup(contact, password, name , email,level_of_english,native_language,examAspirant,topics) {
  try {
    const url = base_url + `/v1/auth/register`;
    console.log("In Signup...........................................")
    const response = await axios.post(url, {
      contact: contact,
      password: password,
      name: name,
      email: email,
      level_of_english: level_of_english,
      native_language:native_language,
      examAspirant:true,
      topics:topics
    });
    console.log("REquest send.........................................")
    return response.data;
  }
  catch (error) {
    //console.log(error.response.data)
    return error.response.data
  }

}

async function word_categories(words){
  const url = base_url + `/v1/wordifyme/user-word-category/652d2f9dae13eb62ecb17443`
  const response = await axios.post(url,{
    words : words
  });
  console.log("Word Categories")
  console.log(response.data)
  return response.data;
}


async function word_list(ListOfWords){
  const url = base_url + `/v1/wordifyme/word-list/Audumber`
  const response = await axios.post(url,{
    ListOfWords : ListOfWords
  });
  console.log('Word List ')
  console.log(response.data)
  return response.data
}







//------------------------------------------------------------------------------------
export function signin_with_google(email){
  console.log(email)
  return authenticate_with_email(email)
}
export function send_otp(contact) {
  console.log(contact)
  return authenticate_contact(contact);
}

export function verify_otp(contact, otp) {
  console.log(contact, otp)
  return authenticate_otp(contact, otp);
}

export function signup(contact, password, name , email,level_of_english,native_language,examAspirant,topics) {
  console.log(contact, password, name , email,level_of_english,native_language,examAspirant,topics)
  return authenticate_signup(contact, password, name , email,level_of_english,native_language,examAspirant,topics);
}

export function send_wordcategories(words){
  console.log(words)
  return word_categories(words);
}

export function send_list(ListOfWords){
  console.log(ListOfWords)
  return word_list(ListOfWords);
}

export function logout() {
  return logout()
}