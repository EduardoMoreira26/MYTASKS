import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Fab, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SignOutIcon from '@material-ui/icons/ExitToApp'
import styled from 'styled-components';
import Task from '../../components/Task';
import TasksFilters from '../../components/TasksFilters';

const TasksWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 20px 0;
  box-sizing: border-box;
  color: #191420;
`;

const TasksHeader = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 2px solid #9475b8;
  
`;

const Title = styled.h1`
  width: 100%;
  color: #9475b8;
`;

const CreateButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const TasksContainer = styled.div`
  padding-top: 10px;
  max-width: 150px;
  display: flex;
  flex-wrap: wrap;
  max-width: 1200px
`;

const EmptyTasksPlaceholder = styled.p`
  color: #edf4ff;
  text-align: center;
  font-size: 22px;
`;

const SignOutIconContainer = styled.div`
  margin-left: 10px;
  
  .signOutIcon {
    fill: #9475b8;
  }
`;

@inject('tasksStore', 'routerStore', 'userStore')
@observer
class TasksPage extends Component {
  componentDidMount() {
    this.props.tasksStore.fetchTasks();
  }

  
  handleSignOut = () => {
    const { userStore, tasksStore } = this.props;
    userStore.signout();
    tasksStore.resetTasks();
    window.location.hash = '/signin';
  };

  renderTasks = () => {
    const { tasksStore } = this.props;

    if (!tasksStore.tasks.length) {
      return <EmptyTasksPlaceholder>Sem tarefas. Criar uma?</EmptyTasksPlaceholder>
    }

    return tasksStore.tasks.map(task => (
      <Task
        key={task.id}
        id={task.id}
        title={task.title}
        description={task.description}
        status={task.status}
      />
    ));
  };

  render() {
    return (
      <TasksWrapper>
        <TasksHeader>
          <Title>MyTASKS</Title>

          <CreateButtonContainer>
            <Fab
              variant="extended"
              onClick={() => { window.location.hash = '/tasks/create'; }}
            >
              <AddIcon />
              Criar Tarefa
            </Fab>

            <SignOutIconContainer>
              <IconButton onClick={this.handleSignOut}>
                <SignOutIcon className="signOutIcon" />
              </IconButton>
            </SignOutIconContainer>
          </CreateButtonContainer>
        </TasksHeader>

        <TasksFilters />

        <TasksContainer>
          {this.renderTasks()}
        </TasksContainer>
      </TasksWrapper>
    );
  }
}

export default TasksPage;
