import React from "react";
import {CardDetails} from "./CardDetails";

class FetchProjects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            projects: []
        };
    }

    componentDidMount() {
        fetch("https://api.nasa.gov/techport/api/projects?api_key=CggcbLsc9vvABUw1FHiLHeVZtmuavPpFyOgDkJxb")
            .then(res => res.json())
            .then(
                (result) => {
                    //TODO: Verify result.projects.projects is not undefined.
                    this.setState({
                        isLoaded: true,
                        projects: result.projects.projects
                    });
                },

                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const {error, isLoaded, items} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading Projects List...</div>;
        } else {
            return (
                <div className="row">
                    <div className="column">
                        <CardDetails data={this.state.projects}/>
                        <CardDetails data={this.state.projects}/>
                        <CardDetails data={this.state.projects}/>
                    </div>
                    <div className="column">
                        <CardDetails data={this.state.projects}/>
                        <CardDetails data={this.state.projects}/>
                        <CardDetails data={this.state.projects}/>
                    </div>
                    <div className="column">
                        <CardDetails data={this.state.projects}/>
                        <CardDetails data={this.state.projects}/>
                        <CardDetails data={this.state.projects}/>
                    </div>
                </div>
            );
        }
    }
}

export {FetchProjects};