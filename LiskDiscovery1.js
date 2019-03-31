import React from 'react'
import LiskHubExtensions from 'LiskHubExtensions'

class Hello extends React.Component {

  componentDidMount() {
    console.log(LiskHubExtensions.identifiers);
  }

  render () {
    return (
      <LiskHubExtensions.components.Box >
      <h1>hello world</h1>
      </LiskHubExtensions.components.Box>
    )
  }
}

export default Hello

LiskHubExtensions.addModule({
  identifier:
  LiskHubExtensions.identifiers.dashboardColumn1,
  component: Hello
});
