import React, { Component, Fragment } from 'react';
import LiskHubExtensions from 'LiskHubExtensions';

const Box = LiskHubExtensions.components.Box;
const { moment, grid } = LiskHubExtensions.dependencies;
const styles = LiskHubExtensions.css;
const URI = 'https://api.liskdiscovery.com/projects';

const Project = ({ project = {} }) => {
  const date = moment(project.date_updated);
  const url = "https://www.liskdiscovery.com" + project.resource_url;
  return (
    <div className={`${grid.row} ${styles.row}`} >
      <div className={`${grid['col-xs-6']} ${grid['col-sm-4']} ${grid['col-lg-3']}`}>
        {project.name}
      </div>
        <div className={`${grid['col-sm-3']} ${grid['col-lg-3']}`}>
        {project.type}
      </div>
        <div className={`${grid['col-sm-3']} ${grid['col-lg-3']} `}>
        {date.format('DD MMM YYYY')}
      </div>
        <a style={{ fontSize: '12px' }} href={url} target="_blank" className={`${grid['col-xs-6']} ${grid['col-sm-3']} ${grid['col-lg-3']} `}>
        {url}
      </a>
  </div>
)
};

const Projects = ({ projects = [] }) => {
  return (
    <Fragment>
    <TableHeader />
    {
      projects.map(project => <Project key={project.project_key} project={project} />)
}
</Fragment>
)
};

const TableHeader = () => (
  <div style={{ color: '#999' }} className={`${grid.row} ${styles.row}`}>
<div className={`${grid['col-xs-6']} ${grid['col-sm-4']} ${grid['col-lg-3']} `}>
Name
</div>
<div className={`${grid['col-sm-3']} ${grid['col-lg-3']} `}>
Type
</div>
<div className={`${grid['col-sm-3']} ${grid['col-lg-3']} `}>
Last updated
</div>
<div className={`${grid['col-xs-6']} ${grid['col-sm-3']} ${grid['col-lg-3']}`}>
Url
</div>
</div>
);

const Placeholder = () => (
  <div className={`${grid.row} ${styles.row}`}>
<p>Please visit <a href="www.liskdiscovery.com" target="_blank">www.liskdiscovery.com</a> to associate projects with this account.</p>
</div>
);

class ProjectTab extends Component{
  state = {
    projects: [],
  };

  componentDidMount() {
    const { data } = this.props;
    this.getProjects(data.address);
  }

  async getProjects(address) {
    if (!address){
      return;
    }
    try {
      const response = await fetch(`${URI}/address/${address}`);
      const data = await response.json();
      if (data.projects && data.projects.length > 0){
        this.setState({ projects: data.projects })
      }
    }catch(error){
    }
  }

  renderProjects() {
    const { projects } = this.state;
    if (projects && projects.length > 0) {
      return <Projects projects={projects} />
    }else {
      return <Placeholder />
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.address !== nextProps.address) {
      this.getProjects(nextProps.data.address);
    }
  }

  render() {
    return (
      <Box>
      <header>
      <h1>Lisk Discovery projects</h1>
    </header>
    <main className={styles.wrapper}>
      <div className={`${styles.results}`}>
    {this.renderProjects()}
  </div>
    </main>
    </Box>
  );
  }
}

ProjectTab.defaultProps = {
  delegate: {
    account: {
      address: '',
    }
  },
  address: '',
  tabClassName : 'delegate-statistics',
  tabName: 'Projects'
};

export default ProjectTab;


LiskHubExtensions.addModule({
  identifier:
  LiskHubExtensions.identifiers.delegateTab,
  component: ProjectTab
});
