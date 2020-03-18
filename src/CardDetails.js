import React from "react";
import {FetchProjects, fetchProjects} from "./FetchProjects";
import Trianglify from "../node_modules/trianglify";

class CardDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            projects: props.data
        };
    }

    getRandomArbitrary = (min, max) => {
        let randomFloat = Math.random() * (max - min) + min;
        return Math.trunc(randomFloat);
    }


    componentDidMount() {
        const id = this.getRandomArbitrary(1, 12000);
        fetch("https://api.nasa.gov/techport/api/projects/" + this.state.projects[id].id + "?api_key=CggcbLsc9vvABUw1FHiLHeVZtmuavPpFyOgDkJxb")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        projectDetails: result.project
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
        const {error, isLoaded, projectDetails} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading project...</div>;
        } else {
            const parser = new DOMParser();
            const arrow = parser.parseFromString('&#709', 'text/html').body.textContent;
            const description = parser.parseFromString(projectDetails.description, 'text/html').body.textContent;
            // const mainTitle = projectDetails.leadOrganization.type;
            const mainTitle = projectDetails.responsibleProgram;
            return (
                <div className="card" id={projectDetails.id}>
                    <RandomBackground mainClass="header" acronym={mainTitle}/>
                        <h4><b>{projectDetails.title}</b></h4>
                    <div className='container'>

                    <span className="card-action">{arrow}</span>
                        <blockquote className="hidden">
                            {description}
                        </blockquote>
                    </div>
                </div>
            );
        }
    }
}

function RandomBackground(props) {
    const pattern = Trianglify().canvas();
    let container = React.createElement('div', {className: props.mainClass}, [<h3>{props.acronym}</h3>,
        <img mainClass={'container'} src={pattern.toDataURL()}/>]);
    return container;
}

export {CardDetails};