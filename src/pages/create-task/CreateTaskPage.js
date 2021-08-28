import React, { Component } from 'react';
import { TextField, FormControl, Button, IconButton } from '@material-ui/core';
import styled from 'styled-components';
import { inject } from 'mobx-react';
import ErrorMessage from '../../components/ErrorMessage';
import SignOutIcon from '@material-ui/icons/ExitToApp'


const FormWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #191420;
`;

const FormContainer = styled.div`
  max-width: 480px;
  width: 100%;
  background-color: #f1f1f1;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0px 0px 2px 0 #000;

`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SignOutIconContainer = styled.div`
  margin-top: 20px;
  
  .signOutIcon {
    fill: #9475b8;
  }
`;

@inject('tasksStore', 'routerStore')
class CreateTaskPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      errorMessage: null,
    };
  }

  handleSubmitTask = async () => {
    const { tasksStore } = this.props;
    const { title, description } = this.state;

    try {
      await tasksStore.createTask(title, description);
      window.location.hash = '/tasks';
    } catch (error) {
      const errorMessage = error.response.data.message;
      this.setState({ errorMessage });
    }
  };

  render() {
    return (
      <FormWrapper>
        <FormContainer>
          <Title>
          <h1>Criar uma nova tarefa</h1>
          <SignOutIconContainer>
              <IconButton onClick={() => {window.location.hash = '/tasks'}}>
                <SignOutIcon className="signOutIcon" />
              </IconButton>
            </SignOutIconContainer>
          </Title>
          <p>Forneça informações sobre a tarefa que você deseja concluir..</p>

          { this.state.errorMessage && <ErrorMessage message={this.state.errorMessage} />}

          <FormControl fullWidth>
            <TextField
              label="Título"
              placeholder="Título"
              margin="normal"
              variant="outlined"
              onChange={e => this.setState({ title: e.target.value })}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label="Descrição"
              placeholder="Descrição"
              multiline
              rows="8"
              margin="normal"
              variant="outlined"
              onChange={e => this.setState({ description: e.target.value })}
            />
          </FormControl>

          <Button
            style={{ marginTop: '10px' }}
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.handleSubmitTask}
          >
            CRIAR TAREFA
          </Button>
        </FormContainer>
      </FormWrapper>
    );
  }
}

export default CreateTaskPage;
