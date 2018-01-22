import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { string, object } from 'prop-types'
// Separate local imports from dependencies
// Use decorators if needed
@observer
export default class ProfileContainer extends Component {
    state = { expanded: false };
    // Initialize state here (ES7) or in a constructor method (ES6)

    // Declare propTypes as static properties as early as possible
    static propTypes = {
        model: object.isRequired,
        title: string,
    };
    // Default props below propTypes
    static defaultProps = {
        model: {
            id: 0,
        },
        title: 'Your Name',
    };
    // Use fat arrow functions for methods to preserve context (this will thus be the component instance)
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.model.save()
    };

    handleNameChange = (e) => {
        this.props.model.id = e.target.value;
        this.forceUpdate()
    };

    handleExpand = (e) => {
        e.preventDefault();
        this.setState(prevState => ({ expanded: !prevState.expanded }))
    };

    render() {
        console.log('render');
        // Destructure props for readability
        const {
            model,
            title,
        } = this.props;
        return (

            <div>
                <h1>{title}</h1>
                <input
                    type="text"
                    value={model.id}
                    // onChange={(e) => { model.name = e.target.value }}
                    // Avoid creating new closures in the render method- use methods like below
                    onChange={this.handleNameChange}
                    placeholder="Your Name"/>
            </div>

        )
    }
}