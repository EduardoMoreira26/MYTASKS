import React, { Component } from 'react';
import {
  IconButton,
  MenuItem,
  Select,
  FormControl,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import styled from 'styled-components';
import { inject } from 'mobx-react';

const Container = styled.div`
  padding-top: 10px;
  padding: 10px;
`;

const CardStatus = styled.div`
  ${({ status }) => status === 'OPEN' && 'background: #EE9984;'}
  ${({ status }) => status === 'IN_PROGRESS' && 'background: #e67e22;'}
  ${({ status }) => status === 'DONE' && 'background: #b6eed7;'}
  border-radius: 5px 0 5px 0;
  width: 20px;
  height: 20px;
`;

const CardContainer = styled.div`
  color: #191420;
  background: #f1f1f1;
  border-radius: 5px;
  width: 380px;
  box-shadow: 0px 0px 2px 0 #000;
`;

const CardTitle = styled.h1`
  margin: 8px 0;
  font-size: 22px;
  text-align: center; 
  color: #1f1f1f;

`;

const CardDescription = styled.h1`
  font-size: 16px;
  font-weight: 500;
  max-width: 370px;
  padding: 0 30px;
  height: 90px;
  color: #47537a;
`;

const ContainerItem = styled.div`
  padding: 0 0 0 20px;
  margin: 0 10px;
  display: flex;
  justify-content: space-between;

`;

@inject('tasksStore')
class Task extends Component {
  deleteTask = () => {
    this.props.tasksStore.deleteTask(this.props.id);
  };

  handleStatusChange = e => {
    this.props.tasksStore.updateTaskStatus(this.props.id, e.target.value);
  };

  render() {
    const { title, description } = this.props;

    return (
      <Container>
        <CardContainer>
              <CardStatus status={this.props.status}></CardStatus>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
                <ContainerItem>
                  <FormControl style={{ width: '140px' }}>
                    <Select
                      value={this.props.status}
                      onChange={this.handleStatusChange}
                      displayEmpty
                    >
                      <MenuItem value={'OPEN'}>Aberto</MenuItem>
                      <MenuItem value={'IN_PROGRESS'}>Em execução</MenuItem>
                      <MenuItem value={'DONE'}>Concluido</MenuItem>
                    </Select>
                  </FormControl>
                  <IconButton onClick={this.deleteTask}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </ContainerItem>
        </CardContainer> 
      </Container>
    );
  }
}

export default Task;
