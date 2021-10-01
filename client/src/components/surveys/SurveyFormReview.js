import { connect } from 'react-redux';
import FIELDS from "../surveys/formFields";
import * as actions from '../../actions/index';
import { withRouter } from 'react-router-dom'; // Lo llamamos para poder acceder a la propiedad history en props, para conocer todas las rutas definidas en App BrowserRouter. (Funciona como connect)

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
console.log(history)

const renderReviewFields = FIELDS.map(({name, title}) => {
    return (
    <div key={name} style={{marginBottom:"10px"}}>
        <label>{title}</label>
        <div>{formValues[name]}</div>        
    </div>
    );
});
    return(        
        <div>
            <h5>Please review your entries</h5>            
            {renderReviewFields}
            <button className='yellow darken-3 white-text left btn-flat' onClick={()=>  onCancel()}>
                Back
            </button>
            <button className='green white-text right btn-flat' onClick={() => submitSurvey(formValues, history)}> 
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>

    );
}

function mapStateToProps(state) {    
    return { formValues: state.form.surveyForm.values }
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));