import './App.css';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import app from './firebase.int';
import { Button, Form } from "react-bootstrap";
import { useState } from 'react';


const auth = getAuth(app);
function App() {
  const [validated, setValidated] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [regestered,setRegestered]= useState(false);
  const [success,setSuccess]=useState('');
  const [name,setName]=useState('');


  const handleOnSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    if(!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/.test(password)){
      setError(<p className='text-danger'>Password should be At least <li>One Upper Case Character</li> <li>one Lower Case character</li> <li>one digit</li> <li>one symbol/special character @$!%*#?&^_- </li> <li>Minimum 8 characters/digits</li> </p>);
      return;
    }
    setValidated(true);
    setError("");
    if(regestered){
      signInWithEmailAndPassword(auth,email,password)
      .then((result)=>{
        const user=result.user;
        console.log(user);

      })
      .catch((err)=>{
        setError(err.message);
      })
    }
    else{
      createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user
        console.log(user);
        setEmail('');
        setPassword('');
        verifyEmail();
        handleSuccess();
        setUserName();
      })
      .catch((err) => {
        setError(err.message)
      })
    }
    const verifyEmail=()=>{
      sendEmailVerification(auth.currentUser)
      .then(()=>{
        console.log('email verification link sent');
      })
    }
    
  }

  const handleEmail = (event) => {
    setEmail(event.target.value);
  }
  const handlePass = (event) => {
    setPassword(event.target.value);
  }
  const handleChange =(event)=>{
    setRegestered(event.target.checked)
  }
  const handleResetPassword =()=>{
    sendPasswordResetEmail(auth,email)
    .then(()=>{
      console.log('reset link sent')
    })
    .catch((err)=>{
      setError(err.message);
    })
  }
const handleSuccess =()=>{
  if(regestered){
    setSuccess(<p className='text-danger'> You are old user  </p>)
  }
  else{
    setSuccess(<p className='text-primary'>Welcome To your Account </p>)
  }
}
const handleName = (event)=>{
  setName(event.target.value);
}
const setUserName =()=>{
  updateProfile(auth.currentUser,{
    displayName:name
  })
  .then(()=>{
    console.log('name updated')
  })
  .catch((err)=>{
    setError(err.message)
  })
}

  return (
    <div >
      <div className="regestration w-50 m-auto"  >
        <h3>{success}</h3>
        <h1> {regestered ? 'Please Login' :'Please Register'}</h1>
        <Form noValidate validated={validated} onSubmit={handleOnSubmit}>
          {! regestered && <Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Label>Your Name</Form.Label>
            <Form.Control onBlur={handleName} type="text" placeholder="your name" required />
            <Form.Control.Feedback type="invalid">
              Please provide Your Sure Name.
            </Form.Control.Feedback>
          </Form.Group>}

          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmail} type="email" placeholder="Enter email" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePass} type="password" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleChange} type="checkbox" label="Already User?" />
          </Form.Group>
          <h3 className='text-danger'>{error}</h3>
         <Button onClick={handleResetPassword} variant="link">Forget password</Button><br/>
          <Button variant="primary" type="submit">
            { regestered ? 'Login':'Register'}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
