import React from 'react';
import ComponentsSideBar from '../ComponentsSideBar';
import ComponentReview from '../ComponentReview';
import ModulePreview from '../ModulePreview';
import _ from "underscore";
import './index.scss';

/**
 * @class App
 * Main component
 */
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideBar: true
        };

        this.goToUrl = this.goToUrl.bind(this);
    }

    /**
     * Render component review for a specific component
     * @param {String} componentName 
     */
    renderComponentReview(componentName) {
        const { documentations, components, componentsByModule, match, compiler, baseRoute } = this.props;

        return (
            <div className="library-_-view-section library-_-review">
                <ComponentReview
                    components={components}
                    documentations={documentations}
                    componentName={componentName}
                    compiler={compiler}
                    exampleIndex={match.params.exampleIndex}
                    changeExampleIndexInUrl={exampleIndexParam => this.props.history.push(`${baseRoute}${componentName}${exampleIndexParam}`)} 
                    goToUrl={this.goToUrl} />
            </div>
        );
    }

    /**
     * Render module preview showing all module's components, 
     * or all library modules with their components
     * @param {String} moduleName 
     * @param {Boolean} doesDataExist 
     */
    renderModulePreview(moduleName, doesDataExist) {
        const { componentsByModule, components, documentations, compiler } = this.props;

        return (
            <div className="library-_-view-section library-_-module-preview">
                <ModulePreview
                    moduleName={doesDataExist ? moduleName : 'All'}
                    componentsByModule={componentsByModule}
                    components={components}
                    documentations={documentations}
                    compiler={compiler}
                    isMainModule={!doesDataExist}
                    goToUrl={this.goToUrl} />
            </div>
        );
    }

    goToUrl(url) {
        const { baseRoute } = this.props;
        this.props.history.push(`${baseRoute}${url}`);
    }

    render() {
        const { documentations, components, componentsByModule, match, compiler, baseRoute } = this.props;
        const componentName = match.params.componentName;
        const showSideBarClassName = this.state.showSideBar ? ' show-side-bar' : '';

        const isModule = _.includes(_.keys(componentsByModule), componentName);
        const isComponent = components[componentName] && !isModule;
        const doesDataExist = components[componentName] || isModule;

        return (
            <div className={`library-_-app${showSideBarClassName}`}>
                <button
                    className="library-_-toggle-side-bar"
                    onClick={() => this.setState({ showSideBar: !this.state.showSideBar })} />
                <div className="library-_-side-bar">
                    <ComponentsSideBar
                        components={components}
                        componentsByModule={componentsByModule}
                        selectedComponentName={componentName}
                        goToUrl={this.goToUrl} />
                </div>
                {isComponent ?
                    this.renderComponentReview(componentName) :
                    this.renderModulePreview(componentName, doesDataExist)}
            </div>
        );
    }
}