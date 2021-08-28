import React, { Component } from 'react';
import { Button, TextField, IconButton } from '@material-ui/core';
import SignOutIcon from '@material-ui/icons/ExitToApp'

import styled from 'styled-components';

import './SignUpPage.scss';
import { inject } from 'mobx-react';
import ErrorMessage from '../../components/ErrorMessage';

const Heading = styled.h1`
  margin-top: 0;
  display: flex;
  justify-content: space-between;
`;

const FormContainer = styled.div`
  max-width: 480px;
  width: 100%;
  background-color: #f1f1f1;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0px 0px 2px 0 #000;


  .title {
    font-size: 16px;
  }
  
  p {
    font-size: 14px;
  }
`;

const SignOutIconContainer = styled.div`
  margin-left: 10px;
  
  .signOutIcon {
    fill: #303f9f;
  }
`;


const FormField = styled(TextField)`
  width: 100%;
`;

@inject('userStore', 'routerStore')
class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: null,
    };
  }

  submit = async () => {
    const { username, password } = this.state;

    try {
      await this.props.userStore.signup(username, password);
      window.location.hash = '/signin';
    } catch (error) {
      const errorMessage = error.response.data.message;
      this.setState({ errorMessage });
    }
  };

  render() {
    const { errorMessage } = this.state;

    return (
      <div className="fullscreen-wrapper">
        <FormContainer>
          <Heading>
            Junte-se a nós!  
            <SignOutIconContainer>
              <IconButton onClick={() => {window.location.hash = '/signin'}}>
                <SignOutIcon className="signOutIcon" />
              </IconButton>
            </SignOutIconContainer>
          </Heading>
          <p className='title'>Comece a gerenciar tarefas facilmente.</p>

          {errorMessage && <ErrorMessage message={this.state.errorMessage} />}

          <div>
            <FormField
              id="outlined-name"
              label="Nome"
              margin="dense"
              variant="outlined"
              onChange={e => this.setState({ username: e.target.value })}
            />
          </div>
          <div>
            <FormField
              id="outlined-name"
              label="Senha"
              margin="dense"
              variant="outlined"
              type="password"
              onChange={e => this.setState({ password: e.target.value })}
            />
          </div>
          <p>As senhas devem conter:</p>
          <p> 
          Pelo menos 1 letra maiúscula <br />
          Pelo menos 1 letra minúscula. <br />
          Pelo menos um número ou caractere especial.
          </p>
          <hr/>
          <div>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.submit}
            >
              CRIAR CONTA
            </Button>
          </div>
        </FormContainer>
      </div>
    );
  }
}

export default SignUpPage;
