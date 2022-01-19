import React from 'react';
import { render } from '@testing-library/react';
import { Link } from 'react-router-dom';
import { Card } from '../cmps/UI/Card';
import { groupService } from '../services/group.service';

import { GroupList } from '../cmps/group-list.jsx';

export class BoardDetails extends React.Component {
  state = {
    groups: [],
  };

  componentDidMount() {
    this.loadGroups();
  }
  

  loadGroups = async () => {
    const groups = await groupService.query();
    if (groups) this.setState({ groups });
  };

  render() {
    const { groups } = this.state;
    if (!groups || !groups.length) return <q>Loading...</q>;
    return (
      <Card className='board-details-container flex column '>
        Welcome To The Board Details Page
        <GroupList groups={groups} />
      </Card>
    );
  }
}
