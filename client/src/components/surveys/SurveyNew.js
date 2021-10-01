import React, { Component } from "react";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";
import { reduxForm } from "redux-form"; 
class SurveyNew extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {new: false};
    // } //This way to initialize state is exactly equivalent of the below line of code
    state = { showFormReview: false }

    renderContent() {
        if (this.state.showFormReview) {
            return <SurveyFormReview onCancel={() => this.setState({ showFormReview: false })}/>
        }

        return <SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true })}/>;
    }

    render(){
        return(
            <div>
                {this.renderContent()}
            </div>
        )
    }
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyNew) ; /*Here we need to tie this Component with Redux Form and the Survey we have been working on
                    because where the user unmount SurveyNew(which contains SurveyForm and SuvrveyFormReview
                    destroys everything inside surveyForm)*/ 
